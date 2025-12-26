'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';

// src/confirm_store.ts
var confirms = [];
var listeners = /* @__PURE__ */ new Set();
function addAlert(input) {
  return new Promise((resolve) => {
    const alert = typeof input === "string" ? {
      title: "Confirm",
      message: input,
      resolve
    } : {
      title: input.title || "Confirm",
      message: input.message,
      okText: input.okText,
      cancelText: input.cancelText,
      colorSchema: input.colorSchema,
      resolve
    };
    confirms = [...confirms, alert];
    if (confirms.length === 1) {
      emit();
    }
  });
}
function closeAlert(result) {
  const alert = confirms[0];
  if (!alert) return;
  alert.resolve(result);
  confirms = confirms.slice(1);
  emit();
}
function subscribe(listener) {
  listeners.add(listener);
  listener(confirms);
  return () => listeners.delete(listener);
}
function emit() {
  listeners.forEach((listener) => listener(confirms));
}

// src/confirm.css
var confirm_default = "/* confirm.css */\n.alert-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 9999;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  backdrop-filter: blur(4px);\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',\n    sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  animation: overlayFadeIn 0.3s ease-out forwards;\n}\n\n.alert-overlay-exit {\n  animation: overlayFadeOut 0.3s ease-in forwards;\n}\n\n.alert-wrapper {\n  width: 90%;\n  max-width: 400px;\n  border-radius: 12px;\n  padding: 24px;\n  box-shadow: \n    0 20px 25px -5px rgba(0, 0, 0, 0.1),\n    0 10px 10px -5px rgba(0, 0, 0, 0.04),\n    0 0 0 1px rgba(0, 0, 0, 0.05);\n  animation: modalSlideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;\n  opacity: 0;\n  transform: translateY(20px) scale(0.98);\n}\n\n.alert-wrapper-exit {\n  animation: modalSlideDown 0.3s ease-in forwards;\n}\n\n.alert-title {\n  font-size: 18px;\n  font-weight: 600;\n  line-height: 1.4;\n  margin: 0 0 12px 0;\n}\n\n.alert-message {\n  font-size: 14px;\n  line-height: 1.5;\n  margin: 0 0 24px 0;\n}\n\n.alert-buttons {\n  display: flex;\n  justify-content: flex-end;\n  gap: 12px;\n  margin-top: 8px;\n}\n\n.alert-button {\n  padding: 10px 20px;\n  border-radius: 8px;\n  font-size: 14px;\n  font-weight: 500;\n  border: none;\n  cursor: pointer;\n  font-family: inherit;\n  transition: all 0.2s ease;\n  min-width: 80px;\n  text-align: center;\n}\n\n.alert-button:focus {\n  outline-offset: 2px;\n}\n\n.alert-button:active {\n  transform: translateY(1px);\n}";

// src/animations.css
var animations_default = "/* Animation Keyframes */\n@keyframes overlayFadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n@keyframes overlayFadeOut {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n  }\n}\n\n@keyframes modalSlideUp {\n  from {\n    opacity: 0;\n    transform: translateY(20px) scale(0.98);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n\n@keyframes modalSlideDown {\n  from {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n  to {\n    opacity: 0;\n    transform: translateY(20px) scale(0.98);\n  }\n}\n\n/* Accessibility: Reduce motion */\n@media (prefers-reduced-motion: reduce) {\n  .alert-overlay,\n  .alert-wrapper,\n  .alert-button {\n    animation-duration: 0.01ms;\n    animation-iteration-count: 1;\n    transition-duration: 0.01ms;\n  }\n  \n  .alert-overlay {\n    animation: none;\n    opacity: 1;\n  }\n  \n  .alert-wrapper {\n    animation: none;\n    opacity: 1;\n    transform: none;\n  }\n}";

// src/colorSchemas.css
var colorSchemas_default = "/* ========== LIGHT SCHEMA (Default) ========== */\n.schema-light-overlay {\n  background-color: rgba(0, 0, 0, 0.5);\n}\n\n.schema-light-wrapper {\n  background-color: #ffffff;\n  color: #111827;\n}\n\n.schema-light-title {\n  color: #111827;\n}\n\n.schema-light-message {\n  color: #6b7280;\n}\n\n.schema-light-cancel {\n  background-color: #f3f4f6;\n  color: #374151;\n  outline-color: #9ca3af;\n}\n\n.schema-light-cancel:hover {\n  background-color: #e5e7eb;\n  transform: translateY(-1px);\n}\n\n.schema-light-cancel:active {\n  background-color: #d1d5db;\n}\n\n.schema-light-cancel-danger {\n  background-color: #fee2e2;\n  color: #991b1b;\n  outline-color: #f87171;\n}\n\n.schema-light-cancel-danger:hover {\n  background-color: #fecaca;\n}\n\n.schema-light-ok {\n  background-color: #10b981;\n  color: #ffffff;\n  outline-color: #34d399;\n}\n\n.schema-light-ok:hover {\n  background-color: #059669;\n  transform: translateY(-1px);\n}\n\n.schema-light-ok:active {\n  background-color: #047857;\n}\n\n.schema-light-ok-danger {\n  background-color: #ef4444;\n  color: #ffffff;\n  outline-color: #f87171;\n}\n\n.schema-light-ok-danger:hover {\n  background-color: #dc2626;\n}\n\n/* ========== DARK SCHEMA ========== */\n.schema-dark-overlay {\n  background-color: rgba(0, 0, 0, 0.7);\n}\n\n.schema-dark-wrapper {\n  background-color: #18181b;\n  color: #f4f4f5;\n  box-shadow: \n    0 20px 25px -5px rgba(0, 0, 0, 0.3),\n    0 10px 10px -5px rgba(0, 0, 0, 0.2),\n    0 0 0 1px rgba(255, 255, 255, 0.1);\n}\n\n.schema-dark-title {\n  color: #f4f4f5;\n}\n\n.schema-dark-message {\n  color: #a1a1aa;\n}\n\n.schema-dark-cancel {\n  background-color: #27272a;\n  color: #e4e4e7;\n  outline-color: #71717a;\n}\n\n.schema-dark-cancel:hover {\n  background-color: #3f3f46;\n  transform: translateY(-1px);\n}\n\n.schema-dark-cancel:active {\n  background-color: #52525b;\n}\n\n.schema-dark-cancel-danger {\n  background-color: #7f1d1d;\n  color: #fecaca;\n  outline-color: #ef4444;\n}\n\n.schema-dark-cancel-danger:hover {\n  background-color: #991b1b;\n}\n\n.schema-dark-ok {\n  background-color: #10b981;\n  color: #ffffff;\n  outline-color: #34d399;\n}\n\n.schema-dark-ok:hover {\n  background-color: #059669;\n  transform: translateY(-1px);\n}\n\n.schema-dark-ok:active {\n  background-color: #047857;\n}\n\n.schema-dark-ok-danger {\n  background-color: #dc2626;\n  color: #ffffff;\n  outline-color: #ef4444;\n}\n\n.schema-dark-ok-danger:hover {\n  background-color: #b91c1c;\n}\n\n/* ========== BLUE SCHEMA ========== */\n.schema-blue-overlay {\n  background-color: rgba(59, 130, 246, 0.3);\n}\n\n.schema-blue-wrapper {\n  background-color: #eff6ff;\n  color: #1e3a8a;\n  box-shadow: \n    0 20px 25px -5px rgba(59, 130, 246, 0.15),\n    0 10px 10px -5px rgba(59, 130, 246, 0.1),\n    0 0 0 1px rgba(59, 130, 246, 0.1);\n}\n\n.schema-blue-title {\n  color: #1e3a8a;\n}\n\n.schema-blue-message {\n  color: #3b82f6;\n}\n\n.schema-blue-cancel {\n  background-color: #dbeafe;\n  color: #1e40af;\n  outline-color: #60a5fa;\n}\n\n.schema-blue-cancel:hover {\n  background-color: #bfdbfe;\n  transform: translateY(-1px);\n}\n\n.schema-blue-cancel:active {\n  background-color: #93c5fd;\n}\n\n.schema-blue-cancel-danger {\n  background-color: #fee2e2;\n  color: #991b1b;\n  outline-color: #f87171;\n}\n\n.schema-blue-ok {\n  background-color: #3b82f6;\n  color: #ffffff;\n  outline-color: #60a5fa;\n}\n\n.schema-blue-ok:hover {\n  background-color: #2563eb;\n  transform: translateY(-1px);\n}\n\n.schema-blue-ok:active {\n  background-color: #1d4ed8;\n}\n\n.schema-blue-ok-danger {\n  background-color: #ef4444;\n  color: #ffffff;\n  outline-color: #f87171;\n}\n\n/* ========== RED SCHEMA ========== */\n.schema-red-overlay {\n  background-color: rgba(220, 38, 38, 0.2);\n}\n\n.schema-red-wrapper {\n  background-color: #fef2f2;\n  color: #7f1d1d;\n  box-shadow: \n    0 20px 25px -5px rgba(220, 38, 38, 0.15),\n    0 10px 10px -5px rgba(220, 38, 38, 0.1),\n    0 0 0 1px rgba(220, 38, 38, 0.1);\n}\n\n.schema-red-title {\n  color: #7f1d1d;\n}\n\n.schema-red-message {\n  color: #ef4444;\n}\n\n.schema-red-cancel {\n  background-color: #fecaca;\n  color: #991b1b;\n  outline-color: #f87171;\n}\n\n.schema-red-cancel:hover {\n  background-color: #fca5a5;\n  transform: translateY(-1px);\n}\n\n.schema-red-cancel:active {\n  background-color: #f87171;\n}\n\n.schema-red-ok {\n  background-color: #dc2626;\n  color: #ffffff;\n  outline-color: #ef4444;\n}\n\n.schema-red-ok:hover {\n  background-color: #b91c1c;\n  transform: translateY(-1px);\n}\n\n.schema-red-ok:active {\n  background-color: #991b1b;\n}\n\n.schema-red-ok-danger {\n  background-color: #991b1b;\n  color: #ffffff;\n  outline-color: #dc2626;\n}\n\n/* ========== GREEN SCHEMA ========== */\n.schema-green-overlay {\n  background-color: rgba(16, 185, 129, 0.2);\n}\n\n.schema-green-wrapper {\n  background-color: #ecfdf5;\n  color: #064e3b;\n  box-shadow: \n    0 20px 25px -5px rgba(16, 185, 129, 0.15),\n    0 10px 10px -5px rgba(16, 185, 129, 0.1),\n    0 0 0 1px rgba(16, 185, 129, 0.1);\n}\n\n.schema-green-title {\n  color: #064e3b;\n}\n\n.schema-green-message {\n  color: #10b981;\n}\n\n.schema-green-cancel {\n  background-color: #d1fae5;\n  color: #047857;\n  outline-color: #34d399;\n}\n\n.schema-green-cancel:hover {\n  background-color: #a7f3d0;\n  transform: translateY(-1px);\n}\n\n.schema-green-cancel:active {\n  background-color: #6ee7b7;\n}\n\n.schema-green-cancel-danger {\n  background-color: #fee2e2;\n  color: #991b1b;\n  outline-color: #f87171;\n}\n\n.schema-green-ok {\n  background-color: #10b981;\n  color: #ffffff;\n  outline-color: #34d399;\n}\n\n.schema-green-ok:hover {\n  background-color: #059669;\n  transform: translateY(-1px);\n}\n\n.schema-green-ok:active {\n  background-color: #047857;\n}\n\n.schema-green-ok-danger {\n  background-color: #ef4444;\n  color: #ffffff;\n  outline-color: #f87171;\n}\n\n/* ========== PURPLE SCHEMA ========== */\n.schema-purple-overlay {\n  background-color: rgba(139, 92, 246, 0.2);\n}\n\n.schema-purple-wrapper {\n  background-color: #f5f3ff;\n  color: #5b21b6;\n  box-shadow: \n    0 20px 25px -5px rgba(139, 92, 246, 0.15),\n    0 10px 10px -5px rgba(139, 92, 246, 0.1),\n    0 0 0 1px rgba(139, 92, 246, 0.1);\n}\n\n.schema-purple-title {\n  color: #5b21b6;\n}\n\n.schema-purple-message {\n  color: #8b5cf6;\n}\n\n.schema-purple-cancel {\n  background-color: #ede9fe;\n  color: #6d28d9;\n  outline-color: #a78bfa;\n}\n\n.schema-purple-cancel:hover {\n  background-color: #ddd6fe;\n  transform: translateY(-1px);\n}\n\n.schema-purple-cancel:active {\n  background-color: #c4b5fd;\n}\n\n.schema-purple-cancel-danger {\n  background-color: #fee2e2;\n  color: #991b1b;\n  outline-color: #f87171;\n}\n\n.schema-purple-ok {\n  background-color: #8b5cf6;\n  color: #ffffff;\n  outline-color: #a78bfa;\n}\n\n.schema-purple-ok:hover {\n  background-color: #7c3aed;\n  transform: translateY(-1px);\n}\n\n.schema-purple-ok:active {\n  background-color: #6d28d9;\n}\n\n.schema-purple-ok-danger {\n  background-color: #ef4444;\n  color: #ffffff;\n  outline-color: #f87171;\n}\n";

// src/bundle-css.ts
var ALL_CSS = `${confirm_default}
${animations_default}
${colorSchemas_default}`;
var stylesInjected = false;
function ensureStyles() {
  if (typeof document === "undefined") {
    return;
  }
  if (stylesInjected) {
    return;
  }
  const style = document.createElement("style");
  style.setAttribute("data-react-confirm-lite", "");
  style.textContent = ALL_CSS;
  document.head.appendChild(style);
  stylesInjected = true;
  console.log("React Confirm Lite: Styles injected");
}
function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}
var ConfirmContainer = ({
  classes = {},
  animationDuration = 300,
  defaultColorSchema = "dark",
  children
}) => {
  const [alerts, setAlerts] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [currentAlert, setCurrentAlert] = useState(null);
  const [isAnimating, setisAnimating] = useState(false);
  const overlayRef = useRef(null);
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
      setisAnimating(true);
    } else if (!currentAlert) {
      setisAnimating(false);
    }
    if (currentAlert && !children) {
      setIsVisible(true);
    } else if (currentAlert && children) {
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    }
  }, [currentAlert, children]);
  const handleClose = useCallback((value) => {
    closeAlert(value);
  }, []);
  const handleCancel = useCallback(() => handleClose(false), [handleClose]);
  const handleOk = useCallback(() => handleClose(true), [handleClose]);
  if (!currentAlert && !isVisible) {
    return null;
  }
  if (!currentAlert) {
    return null;
  }
  if (currentAlert && !isAnimating) {
    return null;
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
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: overlayRef,
      className: cx(
        "alert-overlay",
        !isVisible ? "alert-overlay-exit" : "",
        `${schemaClass}-overlay`,
        classes.overlay
      ),
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: cx(
            "alert-wrapper",
            !isVisible ? "alert-wrapper-exit" : "",
            `${schemaClass}-wrapper`,
            classes.wrapper
          ),
          children: [
            /* @__PURE__ */ jsx("h2", { className: cx(
              "alert-title",
              `${schemaClass}-title`,
              classes.title
            ), children: currentAlert.title }),
            /* @__PURE__ */ jsx("p", { className: cx(
              "alert-message",
              `${schemaClass}-message`,
              classes.message
            ), children: currentAlert.message }),
            /* @__PURE__ */ jsxs("div", { className: "alert-buttons", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: handleCancel,
                  disabled: !isVisible,
                  className: cx(
                    "alert-button alert-button-cancel",
                    `${schemaClass}-cancel`,
                    currentAlert.isDestructive ? `${schemaClass}-cancel-danger` : "",
                    classes.button,
                    classes.cancel
                  ),
                  children: currentAlert.cancelText || "Cancel"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: handleOk,
                  disabled: !isVisible,
                  className: cx(
                    "alert-button alert-button-ok",
                    `${schemaClass}-ok`,
                    currentAlert.isDestructive ? `${schemaClass}-ok-danger` : "",
                    classes.button,
                    classes.ok
                  ),
                  children: currentAlert.okText || "OK"
                }
              )
            ] })
          ]
        }
      )
    }
  );
};
var confirmContainer_default = ConfirmContainer;

// src/confirm.ts
async function confirm(input) {
  const result = await addAlert(input);
  return result;
}

export { confirmContainer_default as ConfirmContainer, confirm };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map