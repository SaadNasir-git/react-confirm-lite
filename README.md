# react-confirm-lite

**A lightweight, promise-based confirm dialog for React with built-in styling**

✨ **Features:**
- Promise-based API like window.confirm
- Built-in styling with multiple color schemes
- Zero dependencies
- Fully customizable
- TypeScript support
- Queue system for multiple dialogs
- Works with Next.js App Router (no 'use client' needed)
- Automatic CSS injection (no separate imports needed)
---

## Recommendations
- Always use the latest version for bug fixes and improvements
- If you face any issues, please report them on [GitHub](https://github.com/SaadNasir-git/react-confirm-lite/issues)

![react-confirm-lite sample](https://res.cloudinary.com/dhcqn5bmq/image/upload/v1766778602/Screencastfrom2025-12-2700-42-14-ezgif.com-optimize_od1ht2.gif)

## Quick Comparison

| Feature | react-confirm-lite | react-confirm | react-confirm-toast |
|---------|-------------------|---------------|---------------------|
| Built-in styling | ✅ Multiple color schemes | ❌ None | ✅ Toast style |
| Promise-based | ✅ | ✅ | ✅ |
| Zero dependencies | ✅ | ✅ | ✅ |
| Queue system | ✅ | ❌ | ❌ |
| Automatic CSS | ✅ No separate imports | ❌ | ❌ |
| Next.js App Router | ✅ Works out of the box | ❌ Needs 'use client' | ✅ |

## Why Choose react-confirm-lite?

If you want a **simple, lightweight** confirm dialog that **just works** without any configuration, `react-confirm-lite` is perfect. No separate CSS imports, no 'use client' directives needed in Next.js App Router, and fully customizable when you need it.

## 🔗 Live Demo

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/vitejs-vite-bfthlpmw?file=src%2FApp.tsx)

## Getting Started

### Step 1: **Install the package**:
```bash
npm install react-confirm-lite
```

### Step 2: Import in your component:
```tsx
import { confirm, ConfirmContainer } from 'react-confirm-lite';
```

### Step 3: Add ConfirmContainer to your component tree:
```jsx
function App() {
  return (
    <>
      <ConfirmContainer />
      {/* Your app content */}
    </>
  );
}
```

### Step 4: Use the confirm function:
```tsx
const handleAction = async () => {
  const isConfirmed = await confirm('Are you sure?');
  if (isConfirmed) {
    // Perform action
    console.log('Confirmed!');
  }
};
```

### Complete Example:

```tsx
import { confirm, ConfirmContainer } from 'react-confirm-lite';

function App() {
  const handleDelete = async () => {
    const isConfirmed = await confirm('Are you sure you want to delete this item?');
    if (isConfirmed) {
      // Delete logic here
      console.log('Item deleted');
    }
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete Item</button>
      <ConfirmContainer />
    </div>
  );
}
```

## Advanced Usage

### Custom Options:
```tsx
const handleCustomConfirm = async () => {
  const isConfirmed = await confirm({
    title: "Delete Item",
    message: "This action cannot be undone. Are you sure?",
    cancelText: 'No, keep it',
    okText: 'Yes, delete',
    colorSchema: 'red',
    isDestructive: true
  });
  
  if (isConfirmed) {
    // Delete item
  }
};
```

### Custom Color Scheme:
```jsx
<ConfirmContainer defaultColorSchema="light" />
// Available options: 'light', 'dark', 'blue', 'red', 'green', 'purple'
```

### Custom Styling:
```jsx
<ConfirmContainer 
  classes={{
    overlay: "bg-black/50",
    wrapper: "rounded-xl shadow-2xl",
    title: "text-2xl font-bold",
    message: "text-gray-600",
    button: "px-6 py-3 rounded-lg font-medium",
    cancel: "border border-gray-300 hover:bg-gray-50",
    ok: "bg-blue-600 hover:bg-blue-700 text-white"
  }}
/>
```

### Fully Custom UI with Render Prop:
```jsx
<ConfirmContainer animationDuration={500}>
  {({ isVisible, confirm, handleCancel, handleOk }) => (
    <div className={`modal ${isVisible ? 'show' : 'hide'}`}>
      <div className="modal-content">
        <h2>{confirm.title}</h2>
        <p>{confirm.message}</p>
        <div className="modal-actions">
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

## Next.js App Router Support

Works automatically! No 'use client' directive needed for the library. The library handles everything internally.

### Server Components Example:
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
```tsx
// app/page.tsx (server component)
import { confirm } from 'react-confirm-lite';

export default async function Page() {
  // Server-side logic here
  
  return (
    <form action={async () => {
      'use server';
      const isConfirmed = await confirm('Are you sure?');
      if (isConfirmed) {
        // Server action
      }
    }}>
      <button>Submit</button>
    </form>
  );
}
```

### Client Component Example:
```tsx
'use client';
import { confirm, ConfirmContainer } from 'react-confirm-lite';

export default function ClientComponent() {
  const handleClick = async () => {
    const result = await confirm('Confirm action?');
    if (result) {
      // Handle confirmation
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Click me</button>
      <ConfirmContainer />
    </div>
  );
}
```

## API Reference

### `confirm(message: string | ConfirmOptions): Promise<boolean>`

Displays a confirmation dialog. Returns a promise that resolves to `true` if confirmed, `false` if cancelled.

**String usage:**
```ts
await confirm('Simple message');
// Equivalent to: { title: 'Confirm', message: 'Simple message' }
```

**Object usage:**
```ts
await confirm({
  title: 'Warning',
  message: 'This action cannot be undone',
  cancelText: 'Cancel',
  okText: 'Delete',
  colorSchema: 'red',
  isDestructive: true
});
```

### `ConfirmContainer` Props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultColorSchema` | `ColorSchema` | `'dark'` | Default color scheme |
| `animationDuration` | `number` | `300` | Animation duration in ms |
| `classes` | `ConfirmClasses` | `{}` | Custom CSS classes |
| `children` | Render function | - | For complete UI customization |

### Types:
```ts
type ColorSchema = 'light' | 'dark' | 'blue' | 'red' | 'green' | 'purple';

interface ConfirmClasses {
  overlay?: string;
  wrapper?: string;
  title?: string;
  message?: string;
  button?: string;
  cancel?: string;
  ok?: string;
}

interface ConfirmOptions {
  title?: string;
  message: string;
  cancelText?: string;
  okText?: string;
  colorSchema?: ColorSchema;
  isDestructive?: boolean;
}
```

## Troubleshooting

### ❌ Dialog not appearing?
- Make sure `<ConfirmContainer />` is rendered in your component tree
- Check that you're not conditionally rendering it in a way that unmounts it

### ❌ Multiple dialogs overlapping?
- The library has a built-in queue system that handles multiple confirm requests sequentially

### ❌ Styling not working?
- If using custom classes, ensure they have proper CSS specificity
- Try using `!important` flag for custom styles if needed
- Make sure you're on the latest version

### ❌ Animation issues with custom UI?
- When using the `children` render prop, use the `isVisible` prop for animations
- Set appropriate `animationDuration` to match your CSS transitions

### ❌ Next.js hydration errors?
- The library is designed to work with Next.js App Router
- If using in a layout, ensure it's placed after dynamic content

## Features in Detail

### 🎨 Multiple Color Schemes
Six built-in color schemes: light, dark, blue, red, green, purple. Set globally or per confirm dialog.

### 🔄 Queue System
Multiple confirm requests are queued and shown one at a time, preventing overlapping dialogs.

### 🎯 Zero Configuration
Works out of the box with default styling. No CSS imports needed.

### 🔧 Fully Customizable
From simple class overrides to complete UI replacement with render props.

### 📱 Responsive Design
Built-in responsive styling that works on all screen sizes.

### 🔒 Type Safety
Full TypeScript support with comprehensive type definitions.

## Performance

- **Zero dependencies**: Only React as a peer dependency
- **Tree-shakeable**: Only imports what you use
- **Small bundle size**: ~5KB gzipped (including styles)
- **Optimized renders**: Minimal re-renders with React.memo

## Migration from Older Versions

If you're upgrading from version <1.3.0:

1. **'use client' not needed**: The library handles this internally
2. **Simpler API**: Same functions, better internals


## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Add tests for your changes
4. Submit a pull request

## Author

**Saad Nasir** - Full Stack Developer
- GitHub: [@SaadNasir-git](https://github.com/SaadNasir-git)
- For support: Open an issue on GitHub

## License

MIT © Saad Nasir

---

![npm version](https://img.shields.io/npm/v/react-confirm-lite)
![bundle size](https://img.shields.io/bundlephobia/minzip/react-confirm-lite)
![npm downloads](https://img.shields.io/npm/dm/react-confirm-lite)
![license](https://img.shields.io/npm/l/react-confirm-lite)
![typescript](https://img.shields.io/badge/types-TypeScript-blue)
![react](https://img.shields.io/badge/react-%3E%3D18-blue)
![next.js](https://img.shields.io/badge/next.js-15+-black)

## Support

If you find this library helpful, please consider:
- ⭐ Starring the repository on GitHub
- 📢 Sharing with your network
- 🐛 Reporting issues you encounter
- 💡 Suggesting new features

Happy coding! 🚀