import type { ConfirmOptions, ConfirmInput } from "./types";

type Listener = (alerts: ConfirmOptions[]) => void;

let confirms: ConfirmOptions[] = [];
let listeners = new Set<Listener>();

export function addAlert(input: ConfirmInput): Promise<boolean> {
  return new Promise((resolve) => {
    const alert: ConfirmOptions =
      typeof input === "string"
        ? {
          title: "Confirm",
          message: input,
          resolve
        }
        : {
          title: input.title || "Confirm",
          message: input.message,
          okText: input.okText,
          cancelText: input.cancelText,
          colorSchema: input.colorSchema,
          resolve
        };

    // Add to queue - don't replace!
    confirms = [...confirms, alert];
    
    // Only emit if this is the first/only alert
    if (confirms.length === 1) {
      emit();
    }
  });
}

export function closeAlert(result: boolean) {
  const alert = confirms[0];
  if (!alert) return;

  // Resolve current alert
  alert.resolve(result);
  
  // Remove from queue
  confirms = confirms.slice(1);
  
  emit()
}

export function subscribe(listener: Listener) {
  listeners.add(listener);
  listener(confirms);
  return () => listeners.delete(listener);
}

export function emit() {
  listeners.forEach((listener) => listener(confirms));
}