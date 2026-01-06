# React Confirm Lite ✨

**A lightweight, promise-based confirm dialog for React, designed to be as easy to use as react-toastify, while remaining fully customizable.**

[![npm version](https://img.shields.io/npm/v/react-confirm-lite)](https://www.npmjs.com/package/react-confirm-lite)
[![bundle size](https://img.shields.io/bundlephobia/minzip/react-confirm-lite)](https://bundlephobia.com/package/react-confirm-lite)
[![npm downloads](https://img.shields.io/npm/dm/react-confirm-lite)](https://www.npmjs.com/package/react-confirm-lite)
[![license](https://img.shields.io/npm/l/react-confirm-lite)](https://github.com/SaadNasir-git/react-confirm-lite/blob/main/LICENSE)
[![typescript](https://img.shields.io/badge/types-TypeScript-blue)](https://www.typescriptlang.org/)
[![react](https://img.shields.io/badge/react-%3E%3D18-blue)](https://reactjs.org/)

![Sample Image](https://camo.githubusercontent.com/af08928ac7006e57dc2a28f01b1fbc7214ea742379365f364f37bb204a93906b/68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f646863716e35626d712f696d6167652f75706c6f61642f76313736363737383630322f53637265656e6361737466726f6d323032352d31322d323730302d34322d31342d657a6769662e636f6d2d6f7074696d697a655f6f64316874322e676966)

## 🔗 Live Demo

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/vitejs-vite-bfthlpmw?file=src%2FApp.tsx)

## 📦 Installation

```bash
npm install react-confirm-lite
# or
yarn add react-confirm-lite
# or
pnpm add react-confirm-lite
```

## 🚀 Quick Start

### 1. Add the Container Component

Place `<ConfirmContainer />` in your app (usually in root layout):

```tsx
import { ConfirmContainer } from 'react-confirm-lite';

function App() {
  return (
    <div>
      {/* Your app content */}
      <ConfirmContainer />
    </div>
  );
}
```

### 2. Use the Confirm Function

Import and use `confirm()` anywhere in your app:

```tsx
import { confirm } from 'react-confirm-lite';

async function handleAction() {
  const result = await confirm('Are you sure?');
  
  if (result) {
    console.log('User confirmed!');
  } else {
    console.log('User cancelled!');
  }
}
```

## 🎯 Features

### ✅ Simple Promise-based API
```tsx
const result = await confirm('Message here');
// Returns true for OK, false for Cancel, null for ESC/outside click
```

### ✅ 18 Built-in Animations
Choose from various animations:
- `slide` (default) - Smooth slide up/down
- `fadeScale` - Fade with scale effect
- `bounce` - Playful bounce animation
- `flip` - 3D flip effect
- `zoom` - Zoom in/out
- `rotate` - Rotate animation
- `fadeUp` / `fadeDown` - Directional fade
- `drop` - 3D drop effect
- `slideRight` / `slideLeft` - Horizontal slides
- `slideVertical` - Vertical slide
- `slideDown` - Slide down
- `rotateRight` - Rotate from right
- `zoomSmall` / `bounceSmall` - Subtle animations
- `fadeBlur` / `fadeShrink` - Creative effects

### ✅ 6 Color Schemes
Pre-built color themes:
- `dark` (default) - Dark theme
- `light` - Light theme
- `blue` - Blue theme
- `red` - Perfect for destructive actions
- `green` - Success actions
- `purple` - Premium/feature actions

### ✅ Interactive Controls
- `closeOnEscape` (default: true) - Press ESC to close
- `closeOnClickOutside` (default: true) - Click backdrop to close
- Returns `null` when closed via ESC or backdrop click

### ✅ Customizable Options
Control every aspect:
- Custom OK/Cancel button text
- Separate animation durations for enter/exit
- Override colors per dialog
- Custom CSS classes for all elements

### ✅ Queue System
Multiple confirm requests automatically queue and show one at a time:
```tsx
// These will show sequentially
await confirm('First?');
await confirm('Second?');
await confirm('Third?');
```

### ✅ Zero Configuration
No CSS imports needed. Styles are automatically injected.

## 🎨 Usage Examples

### Basic Usage
```tsx
const result = await confirm('Delete this item?');
if (result) {
  // User clicked OK
  deleteItem();
} else if (result === false) {
  // User clicked Cancel
  console.log('Cancelled');
} else if (result === null) {
  // User pressed ESC or clicked outside
  console.log('Closed via ESC/backdrop');
}
```

### Custom Dialog Options
```tsx
const result = await confirm({
  title: 'Delete Account',
  message: 'This will permanently delete your account and all data.',
  okText: 'Delete Forever',
  cancelText: 'Cancel',
  colorSchema: 'red'
});
```

### Disable ESC and Backdrop Closing
```tsx
<ConfirmContainer 
  closeOnEscape={false}
  closeOnClickOutside={false}
/>
// Now dialog can only be closed with Cancel/OK buttons
```

## 🔧 API Reference

### Confirm Container Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `animation` | `AnimationType` | `'slide'` | Animation type (18 options) |
| `animationDuration` | `number` | `300` | Base animation duration (ms) |
| `animationDurationIn` | `number` | - | Enter animation duration |
| `animationDurationOut` | `number` | - | Exit animation duration |
| `defaultColorSchema` | `ColorSchema` | `'dark'` | Default color scheme |
| `closeOnEscape` | `boolean` | `true` | Close with ESC key |
| `closeOnClickOutside` | `boolean` | `true` | Close on backdrop click |
| `classes` | `ConfirmClasses` | `{}` | Custom CSS classes |

### Confirm Function

```tsx
// String input (simple)
await confirm('Simple message');

// Object input (full options)
await confirm({
  title: 'Custom Title',           // Optional
  message: 'Required message',     // Required
  okText: 'Proceed',               // Optional
  cancelText: 'Go Back',           // Optional
  colorSchema: 'blue',             // Optional
});
```

**Return values:**
- `true` - User clicked OK
- `false` - User clicked Cancel
- `null` - User pressed ESC or clicked outside (if enabled)

### Custom Styling with CSS Classes

```tsx
<ConfirmContainer 
  classes={{
    overlay: "my-overlay-class",    // Background overlay
    wrapper: "my-modal-class",      // Modal container
    title: "my-title-class",        // Title text
    message: "my-message-class",    // Message text
    button: "my-button-class",      // Both buttons
    cancel: "my-cancel-class",      // Cancel button only
    ok: "my-ok-class",              // OK button only
  }}
/>
```

## 🎭 Custom UI with Render Prop

Want complete control over the UI? Use the render prop:

```tsx
<ConfirmContainer animationDuration={500}>
  {({ 
    isVisible, 
    confirm, 
    handleCancel, 
    handleOk, 
    containerRef, 
    animationClass, 
    animationStyle 
  }) => (
    <div className={`modal-overlay ${isVisible ? 'show' : 'hide'}`}>
      {/* Your custom backdrop */}
      <div className="backdrop" onClick={handleCancel} />
      
      {/* Your custom modal */}
      <div 
        ref={containerRef}
        className={`custom-modal ${animationClass}`}
        style={animationStyle}
      >
        <h2>{confirm.title}</h2>
        <p>{confirm.message}</p>
        
        <div className="buttons">
          <button onClick={handleCancel}>
            {confirm.cancelText || 'Cancel'}
          </button>
          <button onClick={handleOk}>
            {confirm.okText || 'OK'}
          </button>
        </div>
      </div>
    </div>
  )}
</ConfirmContainer>
```

**Available render props:**
- `isVisible`: Boolean indicating if dialog should be visible
- `confirm`: The current confirm options object
- `handleCancel`: Function to cancel the dialog (returns false)
- `handleOk`: Function to confirm the dialog (returns true)
- `containerRef`: React ref for the modal container
- `colorSchema`: Current color scheme
- `animationClass`: CSS class for current animation
- `animationStyle`: Style object with animation duration

## 📱 Real-World Examples

### Delete Confirmation with ESC Disabled
```tsx
const handleDelete = async () => {
  // Force user to make explicit choice
  const result = await confirm({
    title: 'Delete Item',
    message: 'This action cannot be undone. Are you sure?',
    okText: 'Delete',
    cancelText: 'Keep',
    colorSchema: 'red'
  });

  // Result can only be true or false (no null since ESC/backdrop disabled)
  if (result) {
    await deleteItem();
  }
};

// In your component
<ConfirmContainer closeOnEscape={false} closeOnClickOutside={false} />
```

### Form Submission with Backdrop Only
```tsx
// Allow closing by clicking backdrop but not ESC
<ConfirmContainer closeOnEscape={false} closeOnClickOutside={true} />

const handleSubmit = async () => {
  const result = await confirm({
    title: 'Submit Form',
    message: 'Ready to submit this form?',
    okText: 'Submit',
    cancelText: 'Review',
    colorSchema: 'green'
  });

  if (result) {
    await submitForm();
  } else if (result === null) {
    // User clicked backdrop
    console.log('Closed by clicking outside');
  }
};
```

### Different Behaviors for Different Dialogs
```tsx
// Global: ESC and backdrop disabled
<ConfirmContainer 
  closeOnEscape={false} 
  closeOnClickOutside={false} 
/>

// Some dialogs can override via custom UI
const handleFlexibleDialog = async () => {
  // Create custom UI that allows ESC/backdrop
  const result = await confirm('Flexible dialog?');
  // result can be true, false, or null
};
```

## 🏗️ Container Configuration

### Global Settings
```tsx
<ConfirmContainer
  defaultColorSchema="light"        // Light theme by default
  animation="zoom"                  // Zoom animation for all dialogs
  animationDuration={400}           // 400ms animations
  closeOnEscape={true}              // Allow ESC to close
  closeOnClickOutside={true}        // Allow backdrop click to close
  animationDurationIn={350}         // Enter: 350ms
  animationDurationOut={250}        // Exit: 250ms
/>
```

### Different Close Behaviors
```tsx
// Option 1: Fully closable (default)
<ConfirmContainer closeOnEscape={true} closeOnClickOutside={true} />
// Users can close via: OK, Cancel, ESC, or backdrop click

// Option 2: Force explicit choice
<ConfirmContainer closeOnEscape={false} closeOnClickOutside={false} />
// Users can only close via: OK or Cancel buttons

// Option 3: Backdrop only
<ConfirmContainer closeOnEscape={false} closeOnClickOutside={true} />
// Users can close via: OK, Cancel, or backdrop click

// Option 4: ESC only
<ConfirmContainer closeOnEscape={true} closeOnClickOutside={false} />
// Users can close via: OK, Cancel, or ESC key
```

## 🎨 Animation Gallery

### Slide Animations
- `slide` - Smooth vertical slide (default)
- `slideRight` / `slideLeft` - Horizontal slides
- `slideVertical` - Vertical slide
- `slideDown` - Slide down

### Fade Animations
- `fadeScale` - Fade with scaling
- `fadeUp` / `fadeDown` - Directional fades
- `fadeBlur` - Fade with blur effect
- `fadeShrink` - Fade with shrink effect

### 3D Animations
- `flip` - Card flip effect
- `drop` - 3D drop animation
- `rotate` / `rotateRight` - Rotation effects

### Playful Animations
- `bounce` / `bounceSmall` - Bounce effects
- `zoom` / `zoomSmall` - Zoom in/out

## 🚨 Troubleshooting

### Dialog not showing?
- Make sure `<ConfirmContainer />` is mounted
- Check it's not conditionally rendered

### ESC key not working?
- Check if `closeOnEscape={true}` (default)
- Ensure no other event is preventing ESC
- Try different browsers

### Backdrop click not working?
- Verify `closeOnClickOutside={true}` (default)
- Check if any parent element is preventing clicks

### Animation not working?
- Verify animation name is correct
- Check browser console for errors

### TypeScript errors?
- Ensure you have `@types/react` installed
- Update to latest TypeScript version

### Styling issues?
- Use `classes` prop to override styles
- Check CSS specificity

## 📱 Next.js Support

### App Router (Next.js 15+)
```tsx
// app/layout.tsx
import { ConfirmContainer } from 'react-confirm-lite';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <ConfirmContainer />
      </body>
    </html>
  );
}
```

### Server Components
```tsx
// Server actions
'use server';
import { confirm } from 'react-confirm-lite';

export async function serverAction() {
  const result = await confirm('Confirm from server?');
  if (result) {
    // Perform action
  } else if (result === null) {
    // User pressed ESC or clicked outside
    console.log('Action cancelled');
  }
}
```

## 🔄 Migration from Other Libraries

### From window.confirm()
```tsx
// Old way (always returns true/false)
if (window.confirm('Delete?')) {
  deleteItem();
}

// New way (returns true/false/null)
const result = await confirm('Delete?');
if (result === true) {
  await deleteItem();
} else if (result === false) {
  console.log('User clicked Cancel');
} else if (result === null) {
  console.log('User pressed ESC');
}
```

### From Other Confirm Libraries
- No CSS imports needed
- Automatic queue system
- Built-in animations
- Zero configuration
- Three return states (true/false/null)

# Contributing to react-confirm-lite

Thanks for your interest in contributing. This project is intentionally lightweight, so the contribution workflow is kept simple and explicit. Please read this fully before starting.

---

## 📦 Project Structure

```
react-confirm-lite/
├─ src/               # Library source code
├─ dist/              # Built output (generated)
├─ example/           # Local playground app (Vite + React)
├─ CONTRIBUTING.md
├─ README.md
├─ package.json
├─ tsup.config.ts
```

* **src/** → where you make changes
* **dist/** → auto-generated by tsup (do not edit manually)
* **example/** → used to test changes locally

---

## 🧰 Prerequisites

* Node.js >= 18
* npm >= 9
* Basic familiarity with React + TypeScript

---

## 🚀 Local Development Setup

### 1. Clone the repository

```bash
git clone https://github.com/SaadNasir-git/react-confirm-lite.git
cd react-confirm-lite
```

### 2. Install dependencies (root)

```bash
npm install
```

---

## 🔁 Development Workflow (IMPORTANT)

This project uses **tsup watch mode** for live rebuilding.

### Terminal 1 — Run library in watch mode

From the project root:

```bash
npm run build:watch
```

This will:

* Watch `src/` for changes
* Automatically rebuild `dist/`
* Re-run post-build steps when files change

⚠️ Leave this terminal running.

---

### Terminal 2 — Run example app

```bash
cd example
npm install
npm run dev
```

Open the provided local URL in your browser.

---

## 🧪 How to Test Your Changes

1. Modify files inside `src/`
2. tsup automatically rebuilds the library
3. Refresh the browser running the example app
4. Verify behavior visually and via console logs

You **do not** need to:

* run `npm pack`
* reinstall the package
* publish to npm

This setup mirrors real-world library development.

---

## 🧠 What to Change (and What Not to)

### ✅ You can change

* Logic in `src/`
* Types in `types.ts`
* Styles / animations
* README documentation

### ❌ Do not change

* `dist/` files manually
* Version number (maintainer handles releases)
* Build configuration unless discussed

---

## 🧹 Code Style

* Use TypeScript types explicitly
* Avoid unnecessary abstractions
* Prefer clarity over cleverness
* Keep bundle size in mind

---

## 🐞 Reporting Bugs

When opening an issue, include:

* What you expected
* What actually happened
* Steps to reproduce
* Browser and React version

---

## 💡 Feature Requests

Feature requests are welcome, but keep in mind:

* This library aims to stay minimal
* Features should not add heavy dependencies
* API simplicity is a priority

---

## 🛠 Development & Contributing

If you want to contribute or modify the library locally, use the built-in example app and watch mode.

### Local Development Setup

```bash
git clone https://github.com/SaadNasir-git/react-confirm-lite.git
cd react-confirm-lite
npm install
```

### Run Library in Watch Mode

In the project root:

```bash
npm run build:watch
```

This watches the `src/` directory and automatically rebuilds `dist/` on every change.

### Run Example App

In a second terminal:

```bash
cd example
npm install
npm run dev
```

Open the local URL shown by Vite. Any change you make in `src/` will be reflected after a browser refresh.

### Notes

* Do **not** edit files inside `dist/` manually
* You do **not** need to run `npm pack` or reinstall the package
* Versioning and releases are handled by the maintainer

For more details, see **CONTRIBUTING.md**.

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thanks for contributing to **react-confirm-lite** 🙌


## 📄 License

MIT License - free for personal and commercial use.

## 👨‍💻 Author

**Saad Nasir** - Creator of react-confirm-lite

---

⭐ **Found this useful? Give it a star on GitHub!** ⭐