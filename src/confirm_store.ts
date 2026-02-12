import type { ConfirmOptions, ConfirmInput } from "./types";

type Listener = (alerts: ConfirmOptions[]) => void;

let containerId: string = '';
let confirms: ConfirmOptions[] = [];
let listeners = new Set<Listener>();
let isActiveContainer: boolean = false
let containers: NodeListOf<Element> = document.querySelectorAll('.null-confirm-container');
let showClose = false

export function showClosest() {
  showClose = true
}

export function isClosest() {
  return showClose
}

// Global lock - only ONE container can show alerts at a time
let activeContainerId: string | null = null;

export function setIsContainerActive(value: boolean) {
  isActiveContainer = value;
}

export function getIsContainerActive() {
  return isActiveContainer;
}

export function setActiveContainer(id: string | null) {
  activeContainerId = id;
}

export function getActiveContainerId(): string | null {
  return activeContainerId;
}

export function makeId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  } else {
    // Fallback for older environments if necessary, though this method is widely supported.
    console.error("crypto.randomUUID is not supported in this environment. Using less reliable fallback.");
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
}

export async function addAlert(input: ConfirmInput): Promise<boolean | null> {
  return new Promise((resolve) => {
    const alert: ConfirmOptions = {
      id: input.id || '', // Keep the ID for container targeting
      title: input.title || "Confirm",
      message: input.message,
      okText: input.okText,
      cancelText: input.cancelText,
      colorSchema: input.colorSchema,
      resolve
    };

    confirms = [...confirms, alert];

    // If this alert has an ID, set it as the active container
    if (input.id) {
      setActiveContainer(input.id);
    }
    // If this alert doesn't have an ID, clear any active container
    // so any container can potentially show it
    else {
      setActiveContainer(null);
    }

    if (confirms.length === 1) {
      emit();
    }
  });
}

export async function closeAlert(result: boolean | null) {
  const alert = confirms[0];
  containerId = '';
  if (!alert) return;

  // Resolve current alert
  alert.resolve(result);
  // Remove from queue
  confirms = confirms.slice(1);

  // If there are no more alerts, clear the active container
  if (confirms.length === 0) {
    setActiveContainer(null);
  }

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

const EventListener = (e: PointerEvent) => {
  if (containers.length === 0) {
    containers = document.querySelectorAll('.null-confirm-container');
  }
  if (containers.length === 0) return;

  let parentElement = e.view?.document.activeElement?.parentElement;
  let container = parentElement?.querySelector('.null-confirm-container');

  while (true) {
    if (container?.id) {
      break;
    }
    parentElement = parentElement?.parentElement;
    container = parentElement?.querySelector('.null-confirm-container');
  }

  if (container?.id) {
    containerId = container.id;
  }
}

export async function getElement() {
  document.addEventListener('click', EventListener, { once: true })
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      document.removeEventListener('click', EventListener)
      resolve()
    }, 0);
  })
  if (containerId === '') {
    if (containers.length === 0) return;
    containerId = containers[0].id
    return containerId
  }
  return containerId;
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

  lock() {
    if (this.isLocked) return;

    // Save current scroll position
    this.scrollPosition = window.scrollY;

    // Get scrollbar width BEFORE hiding it
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    // Add padding to body BEFORE hiding scrollbar (prevents layout shift)
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    // Lock scroll on both html and body
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    // Add class for any additional CSS
    document.body.classList.add('scroll-locked');

    this.isLocked = true;
  }

  unlock() {
    if (!this.isLocked) return;

    // Remove overflow hidden
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';

    // Remove padding
    document.body.style.paddingRight = '';

    // Remove class
    document.body.classList.remove('scroll-locked');

    // Restore scroll position AFTER styles are removed
    window.scrollTo(0, this.scrollPosition);

    this.isLocked = false;
  }
}

// Export simple functions
export const lockBodyScroll = () => ScrollLockManager.getInstance().lock();
export const unlockBodyScroll = () => ScrollLockManager.getInstance().unlock();