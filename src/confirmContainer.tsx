//confirmContainer.tsx
import React, { useEffect, useState, useCallback, useRef, type ReactNode, type CSSProperties } from "react";
import { subscribe, closeAlert } from "./confirm_store";
import type { ConfirmClasses, ConfirmOptions, ColorSchema, AnimationType, animationPairs } from "./types";
import { lockBodyScroll, unlockBodyScroll } from "./confirm_store";
import "./confirm.css";
import './animations.css';
import './colorSchemas.css';
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
  children
}: Props) => {
  // CONSOLIDATED STATES:
  const [alerts, setAlerts] = useState<ConfirmOptions[]>([]);
  const [dialogState, setDialogState] = useState<{
    alert: ConfirmOptions | null;
    status: 'idle' | 'active' | 'exiting';
  }>({ alert: null, status: 'idle' });

  const overlayRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const exitTimerRef = useRef<number | null>(null);

  // Derived variables so the rest of your component doesn't have to change
  const isVisible = dialogState.status === 'active';
  const isExiting = dialogState.status === 'exiting';
  const currentAlert = dialogState.alert;

  useEffect(() => {
    subscribe((newAlerts) => {
      setAlerts(newAlerts);
    });
  }, []);

  useEffect(() => {
    ensureStyles();
  }, []);

  // Sync alerts queue with dialog status
  useEffect(() => {
    if (alerts.length > 0 && dialogState.status === 'idle') {
      if (lockScroll) lockBodyScroll();
      setDialogState({ alert: alerts[0], status: 'active' });
    } 
    else if (
      dialogState.status === 'active' &&
      (alerts.length === 0 || (currentAlert && alerts[0] !== currentAlert))
    ) {
      setDialogState((prev) => ({ ...prev, status: 'exiting' }));

      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
      const exitDuration = animationDurationOut || animationDuration;
      
      exitTimerRef.current = window.setTimeout(() => {
        setDialogState({ alert: null, status: 'idle' });
      }, exitDuration);
    }
  }, [alerts, currentAlert, dialogState.status, animationDuration, animationDurationOut, lockScroll]);

  const handleClose = useCallback((value: boolean | null) => {
    if (!currentAlert || isExiting) return;

    setDialogState((prev) => ({ ...prev, status: 'exiting' }));

    const exitDuration = animationDurationOut || animationDuration;
    if (exitTimerRef.current) clearTimeout(exitTimerRef.current);

    exitTimerRef.current = window.setTimeout(() => {
      closeAlert(value);
      setDialogState({ alert: null, status: 'idle' });
      unlockBodyScroll();
    }, exitDuration);
  }, [currentAlert, isExiting, animationDuration, animationDurationOut]);

  const handleCancel = useCallback(() => {
    if (currentAlert && isVisible && !isExiting) handleClose(false);
  }, [currentAlert, isVisible, isExiting, handleClose]);

  const handleOk = useCallback(() => {
    if (currentAlert && isVisible && !isExiting) handleClose(true);
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
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node) &&
        closeOnClickOutside &&
        currentAlert &&
        isVisible &&
        !isExiting
      ) {
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

  if (dialogState.status === 'idle' || !currentAlert) {
    return null;
  }

  const colorSchema = currentAlert?.colorSchema || defaultColorSchema;
  const schemaClass = `schema-${colorSchema}`;

  const animationStyle: CSSProperties = {};
  const currentDuration = isVisible
    ? (animationDurationIn || animationDuration)
    : (animationDurationOut || animationDuration);

  animationStyle.animationDuration = `${currentDuration}ms`;
  animationStyle.animationFillMode = 'forwards';

  const animationClass = isVisible
    ? animationPairs[animation as keyof typeof animationPairs].enter
    : animationPairs[animation as keyof typeof animationPairs].exit;

  if (children && currentAlert) {
    return children({
      isVisible: isVisible && !isExiting,
      confirm: currentAlert,
      handleCancel,
      handleOk,
      containerRef: wrapperRef,
      colorSchema,
      animationClass,
      animationStyle
    });
  }

  return (
    <>
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