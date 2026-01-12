import React, { useEffect, useState, useCallback, useRef, type ReactNode, type CSSProperties } from "react";
import { subscribe, closeAlert, setActiveContainer, setIsContainerActive, getIsContainerActive, getActiveContainerId, makeId } from "./confirm_store";
import type { ConfirmClasses, ConfirmOptions, ColorSchema, AnimationType, animationPairs } from "./types";
import { lockBodyScroll, unlockBodyScroll } from "./confirm_store";
import "./confirm.css";
import './animations.css'
import './colorSchemas.css'
import { ensureStyles } from "./bundle-css";

function cx(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

const animationPairs = {
  slide: { enter: '', exit: 'alert-wrapper-exit' },
  fadeScale: { enter: 'alert-animate-fadeInScale', exit: 'alert-animate-fadeOutScale' },
  bounce: { enter: 'alert-animate-bounceIn', exit: 'alert-animate-bounceOut' },
  flip: { enter: 'alert-animate-flipIn', exit: 'alert-animate-flipOut' },
  zoom: { enter: 'alert-animate-zoomIn', exit: 'alert-animate-zoomOut' },
  rotate: { enter: 'alert-animate-rotateIn', exit: 'alert-animate-rotateOut' },
  fadeUp: { enter: 'alert-animate-fadeInUp', exit: 'alert-animate-fadeOutDown' },
  drop: { enter: 'alert-animate-dropIn', exit: 'alert-animate-dropOut' },
  slideRight: { enter: 'alert-animate-slideInRight', exit: 'alert-animate-slideOutLeft' },
  slideLeft: { enter: 'alert-animate-slideInLeft', exit: 'alert-animate-slideOutRight' },
  fadeDown: { enter: 'alert-animate-fadeInDown', exit: 'alert-animate-fadeOutUp' },
  slideVertical: { enter: 'alert-animate-slideDownIn', exit: 'alert-animate-slideUpOut' },
  rotateRight: { enter: 'alert-animate-rotateInRight', exit: 'alert-animate-rotateOutLeft' },
  zoomSmall: { enter: 'alert-animate-zoomInSmall', exit: 'alert-animate-zoomOutSmall' },
  bounceSmall: { enter: 'alert-animate-bounceInSmall', exit: 'alert-animate-bounceOutSmall' },
  fadeBlur: { enter: 'alert-animate-fadeInBlur', exit: 'alert-animate-fadeOutBlur' },
  fadeShrink: { enter: 'alert-animate-fadeInShrink', exit: 'alert-animate-fadeOutShrink' },
} as const;

type Props = {
  classes?: ConfirmClasses;
  defaultColorSchema?: ColorSchema;
  closeOnEscape?: boolean;
  closeOnClickOutside?: boolean;
  animation?: AnimationType;
  animationDuration?: number;
  animationDurationIn?: number;
  animationDurationOut?: number;
  lockScroll?: boolean;
  children?: (props: {
    isVisible: boolean;
    confirm: ConfirmOptions;
    handleCancel: () => void;
    handleOk: () => void;
    containerRef: React.RefObject<HTMLDivElement | null>;
    colorSchema: ColorSchema;
    animationClass: string;
    animationStyle: CSSProperties;
  }) => ReactNode;
  id?: string;
};

const ConfirmContainer = ({
  classes = {},
  animationDuration = 300,
  defaultColorSchema = 'dark',
  closeOnEscape = true,
  closeOnClickOutside = true,
  animation = 'slide',
  animationDurationIn,
  animationDurationOut,
  lockScroll = true,
  children,
  id
}: Props) => {
  const [alerts, setAlerts] = useState<ConfirmOptions[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [currentAlert, setCurrentAlert] = useState<ConfirmOptions | null>(null);
  const [isExiting, setIsExiting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const exitTimerRef = useRef<number | null>(null);
  const containerId = useRef(id || `confirm-${makeId()}`)
  const nullElement = <div id={containerId.current} className="null-confirm-container"></div>

  useEffect(() => {
    subscribe((newAlerts) => {
      setAlerts(newAlerts);
    });
  }, []);

  useEffect(() => {
    ensureStyles()
  }, []);

  useEffect(() => {
    if (alerts.length > 0 && !currentAlert && !isExiting) {
      const nextAlert = alerts[0];

      // Check if we should show this alert
      const shouldShowAlert =
        !nextAlert.id ||
        nextAlert.id === containerId.current ||
        !getActiveContainerId();

      if (shouldShowAlert) {
        // Check if we can become active
        const currentActive = getActiveContainerId();

        if (!currentActive || currentActive === containerId.current) {
          if (lockScroll) {
            lockBodyScroll()
          }
          setActiveContainer(containerId.current);
          setIsContainerActive(true);

          // Show the alert
          setIsMounted(true);
          setCurrentAlert(nextAlert);
          setIsVisible(true);
        }
      }
    }
    else if (alerts.length === 0 && currentAlert && isVisible) {
      // No more alerts, but we're showing one - start exit
      setIsExiting(true);
      setIsVisible(false);

      if (exitTimerRef.current) {
        clearTimeout(exitTimerRef.current);
      }

      const exitDuration = animationDurationOut || animationDuration;
      exitTimerRef.current = setTimeout(() => {
        setIsContainerActive(false);
        setIsExiting(false);
        setCurrentAlert(null);
        setIsMounted(false);
      }, exitDuration);
    }
    else if (alerts.length > 0 && currentAlert && alerts[0].id !== currentAlert.id) {
      // New alert with different ID is replacing current one
      setIsExiting(true);
      setIsVisible(false);

      if (exitTimerRef.current) {
        clearTimeout(exitTimerRef.current);
      }

      const exitDuration = animationDurationOut || animationDuration;
      exitTimerRef.current = setTimeout(() => {
        setIsContainerActive(false);
        setIsExiting(false);
        setCurrentAlert(null);
        setIsMounted(false);
        // The new alert will be picked up in the next render
      }, exitDuration);
    }
  }, [alerts, currentAlert, animationDuration, animationDurationOut, isVisible]);

  const handleClose = useCallback(async (value: boolean | null) => {
    if (!currentAlert || isExiting) return;

    // Start exit animation immediately
    setIsExiting(true);
    setIsVisible(false);

    // Delay the actual closeAlert call until animation completes
    const exitDuration = animationDurationOut || animationDuration;

    if (exitTimerRef.current) {
      clearTimeout(exitTimerRef.current);
    }

    exitTimerRef.current = setTimeout(() => {
      // Now call closeAlert which will resolve the promise
      closeAlert(value);

      // Reset state
      setIsExiting(false);
      setCurrentAlert(null);
      setIsMounted(false);
      setIsContainerActive(false);
      unlockBodyScroll()
    }, exitDuration);
  }, [currentAlert, isExiting, animationDuration, animationDurationOut]);

  const handleCancel = useCallback(() => {
    if (currentAlert && isVisible && !isExiting) {
      handleClose(false);
    }
  }, [currentAlert, isVisible, isExiting, handleClose]);

  const handleOk = useCallback(() => {
    if (currentAlert && isVisible && !isExiting) {
      handleClose(true);
    }
  }, [currentAlert, isVisible, isExiting, handleClose]);

  const handleEscKey = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape' && closeOnEscape && currentAlert && isVisible && !isExiting) {
      event.preventDefault();
      event.stopPropagation();
      handleClose(null);
    }
  }, [closeOnEscape, currentAlert, isVisible, isExiting, handleClose]);

  useEffect(() => {
    if (currentAlert && isVisible && !isExiting) {
      window.addEventListener('keydown', handleEscKey, { capture: true });
    }

    return () => {
      window.removeEventListener('keydown', handleEscKey, { capture: true });
    };
  }, [handleEscKey, currentAlert, isVisible, isExiting]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node) &&
        closeOnClickOutside &&
        currentAlert &&
        isVisible &&
        !isExiting) {
        handleClose(null);
      }
    };

    if (currentAlert && isVisible && !isExiting) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeOnClickOutside, currentAlert, isVisible, isExiting, handleClose]);

  // Replace the render conditions with:
  if (!isMounted && !isExiting) {
    return nullElement;
  }

  if (!currentAlert || !getIsContainerActive()) {
    return nullElement;
  }

  // Always render if we have a current alert
  const colorSchema = currentAlert?.colorSchema || defaultColorSchema;
  const schemaClass = `schema-${colorSchema}`;

  const animationStyle: CSSProperties = {};
  const currentDuration = isVisible
    ? (animationDurationIn || animationDuration)
    : (animationDurationOut || animationDuration);

  animationStyle.animationDuration = `${currentDuration}ms`;
  animationStyle.animationFillMode = 'forwards';

  const animationClass = isVisible
    ? animationPairs[animation as keyof animationPairs].enter
    : animationPairs[animation as keyof animationPairs].exit;


  // For children render
  if (children && currentAlert && getActiveContainerId() === containerId.current) {
    return (
      <>
        {nullElement}
        {children({
          isVisible: isVisible && !isExiting,
          confirm: currentAlert,
          handleCancel,
          handleOk,
          containerRef: wrapperRef,
          colorSchema,
          animationClass,
          animationStyle
        })}
      </>
    )
  }

  return (
    <>
      {nullElement}
      <div
        ref={overlayRef}
        className={cx(
          "alert-overlay",
          !isVisible ? "alert-overlay-exit" : '',
          `${schemaClass}-overlay`,
          classes.overlay
        )}
        style={animationStyle}
      >
        <div
          ref={wrapperRef}
          className={cx(
            "alert-wrapper",
            animationClass,
            `${schemaClass}-wrapper`,
            classes.wrapper
          )}
          style={animationStyle}
        >
          <h2 className={cx(
            "alert-title",
            `${schemaClass}-title`,
            classes.title
          )}>
            {currentAlert.title}
          </h2>
          <p className={cx(
            "alert-message",
            `${schemaClass}-message`,
            classes.message
          )}>
            {currentAlert.message}
          </p>
          <div className="alert-buttons">
            <button
              onClick={handleCancel}
              disabled={isExiting || !isVisible}
              className={cx(
                "alert-button alert-button-cancel",
                `${schemaClass}-cancel`,
                classes.button,
                classes.cancel
              )}
            >
              {currentAlert.cancelText || 'Cancel'}
            </button>
            <button
              onClick={handleOk}
              disabled={isExiting || !isVisible}
              className={cx(
                'alert-button alert-button-ok',
                `${schemaClass}-ok`,
                classes.button,
                classes.ok
              )}
            >
              {currentAlert.okText || 'OK'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmContainer;