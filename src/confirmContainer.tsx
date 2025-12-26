import { useEffect, useState, useCallback, useRef, type ReactNode } from "react";
import { subscribe, closeAlert } from "./confirm_store";
import type { ConfirmClasses, ConfirmOptions, ColorSchema } from "./types";
import "./confirm.css";
import './animations.css'
import './colorSchemas.css'
import { ensureStyles } from "./bundle-css";

function cx(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

type Props = {
  classes?: ConfirmClasses;
  animationDuration?: number;
  defaultColorSchema?: ColorSchema;
  children?: (props: {
    isVisible: boolean;
    confirm: ConfirmOptions;
    handleCancel: () => void;
    handleOk: () => void;
    colorSchema: ColorSchema;
  }) => ReactNode;
};

const ConfirmContainer = ({
  classes = {},
  animationDuration = 300,
  defaultColorSchema = 'dark',
  children
}: Props) => {
  const [alerts, setAlerts] = useState<ConfirmOptions[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [currentAlert, setCurrentAlert] = useState<ConfirmOptions | null>(null);
  const [isAnimating, setisAnimating] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    subscribe((newAlerts) => {
      setAlerts(newAlerts);
    });
  }, []);

  useEffect(() => {
    ensureStyles();
  }, []);

  useEffect(() => {
    if (alerts.length > 0 && !currentAlert) {
      setCurrentAlert(alerts[0]);
    } else if (alerts.length > 0 && currentAlert && alerts[0] !== currentAlert) {
      requestAnimationFrame(() => {
        setIsVisible(false);
      });
      setTimeout(() => {
        setCurrentAlert(alerts[0]);
      }, animationDuration);
    } else if (alerts.length === 0 && currentAlert) {
      requestAnimationFrame(() => {
        setIsVisible(false);
      });
      setTimeout(() => {
        setCurrentAlert(null);
      }, animationDuration);
    }
  }, [alerts, animationDuration]);

  useEffect(() => {
    if (currentAlert) {
      setisAnimating(true)
    } else if (!currentAlert) {
      setisAnimating(false)
    }
    if (currentAlert && !children) {
      setIsVisible(true);
    } else if (currentAlert && children) {
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    }
  }, [currentAlert, children])

  const handleClose = useCallback((value: boolean) => {
    closeAlert(value);
  }, []);

  const handleCancel = useCallback(() => handleClose(false), [handleClose]);
  const handleOk = useCallback(() => handleClose(true), [handleClose]);

  if (!currentAlert && !isVisible) {
    return null;
  }

  if (!currentAlert) {
    return null
  }

  if (currentAlert && !isAnimating) {
    return null
  }

  const colorSchema = currentAlert.colorSchema || defaultColorSchema;

  if (children) {
    return children({
      isVisible,
      confirm: currentAlert,
      handleCancel,
      handleOk,
      colorSchema
    });
  }

  const schemaClass = `schema-${colorSchema}`;

  return (
    <div
      ref={overlayRef}
      className={cx(
        "alert-overlay",
        !isVisible ? "alert-overlay-exit" : '',
        `${schemaClass}-overlay`,
        classes.overlay
      )}
    >
      <div
        className={cx(
          "alert-wrapper",
          !isVisible ? "alert-wrapper-exit" : '',
          `${schemaClass}-wrapper`,
          classes.wrapper
        )}
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
            disabled={!isVisible}
            className={cx(
              "alert-button alert-button-cancel",
              `${schemaClass}-cancel`,
              currentAlert.isDestructive ? `${schemaClass}-cancel-danger` : '',
              classes.button,
              classes.cancel
            )}
          >
            {currentAlert.cancelText || 'Cancel'}
          </button>
          <button
            onClick={handleOk}
            disabled={!isVisible}
            className={cx(
              "alert-button alert-button-ok",
              `${schemaClass}-ok`,
              currentAlert.isDestructive ? `${schemaClass}-ok-danger` : '',
              classes.button,
              classes.ok
            )}
          >
            {currentAlert.okText || 'OK'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmContainer;