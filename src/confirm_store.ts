import type { ConfirmOptions, ConfirmInput } from "./types";

type Listener = (alerts: ConfirmOptions[]) => void;

let confirms: ConfirmOptions[] = [];
let listeners = new Set<Listener>();

export async function addAlert(input: ConfirmInput): Promise<boolean | null> {
  return new Promise((resolve) => {
    const alert: ConfirmOptions = {
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

export async function closeAlert(result: boolean | null) {
  const alert = confirms[0];
  if (!alert) return;

  // Resolve current alert
  alert.resolve(result);
  // Remove from queue
  confirms = confirms.slice(1);

  emit();
}

export function subscribe(listener: Listener) {
  listeners.add(listener);
  listener(confirms);
  return () => listeners.delete(listener);
}

export function emit() {
  listeners.forEach((listener) => listener(confirms));
}

// Create a scroll lock manager
class ScrollLockManager {
  private static instance: ScrollLockManager;
  private scrollPosition = 0;
  private isLocked = false;

  private constructor() { }

  static getInstance(): ScrollLockManager {
    if (!ScrollLockManager.instance) {
      ScrollLockManager.instance = new ScrollLockManager();
    }
    return ScrollLockManager.instance;
  }

  // lock() {
  //   if (this.isLocked) return;

  //   // 1. Calculate current scroll position
  //   const scrollY = window.scrollY;
    
  //   // 2. Set it as a CSS variable for the CSS 'top' property
  //   document.body.style.setProperty('--scroll-position', `${scrollY}px`);
    
  //   // 3. Add the locking class
  //   document.body.classList.add('scroll-locked');
  //   this.isLocked = true;
  // }

  // unlock() {
  //   if (!this.isLocked) return;

  //   // 1. Get the locked scroll position
  //   const scrollY = document.body.style.getPropertyValue('--scroll-position').replace('px', '');
    
  //   // 2. Remove the locking class
  //   document.body.classList.remove('scroll-locked');
    
  //   // 3. Restore scroll position
  //   window.scrollTo(0, parseInt(scrollY || '0'));

  //   this.isLocked = false;
  // }
}


// Export simple functions
// export const lockBodyScroll = () => ScrollLockManager.getInstance().lock();
// export const unlockBodyScroll = () => ScrollLockManager.getInstance().unlock();