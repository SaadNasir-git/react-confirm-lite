import confirmCSS from './confirm.css';
import animationsCSS from './animations.css';
import colorSchemasCSS from './colorSchemas.css';

// Combine all CSS
const ALL_CSS = `${confirmCSS}\n${animationsCSS}\n${colorSchemasCSS}`;

let stylesInjected = false;

export function ensureStyles() {
  if (typeof document === 'undefined') {
    return; // Server-side rendering
  }
  
  if (stylesInjected) {
    return; // Already injected
  }
  
  // Create and inject style tag
  const style = document.createElement('style');
  style.setAttribute('data-react-confirm-lite', '');
  style.textContent = ALL_CSS;
  document.head.appendChild(style);
  
  stylesInjected = true;
}