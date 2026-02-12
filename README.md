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

### Complete Example

Place `<ConfirmContainer />` in your app (usually in root layout) and use it with `confirm`

```tsx
import { ConfirmContainer, confirm } from 'react-confirm-lite';

function App() {
  async function handleAction() {
    const result = await confirm('Are you sure?');
    
    if (result) {
      console.log('User confirmed!');
    } else {
      console.log('User cancelled!');
    }
  }
  return (
    <div>
      {/* Your app content */}
      <ConfirmContainer />
    </div>
  );
}
```

### Important 
By default it shows the first rendered component.
But, if you want to show a specific container by confirm api no matters where it is then you can pass the id like this
```jsx
// In confirm Api
confirm({id:'1' , message:'Are you sure?'})
// And in confirm Container
<ConfirmContainer id='1'/>
```

And make sure that not to pass same id to different `<ConfirmContainer />` In this way It will show both of these containers.

One more thing that if you want to show the closest container to button to which you clicked then you can do like this.
```ts
confirm('Are you sure?', true)
```
or if you want that everytime it show the closest without passing true in api then you can do like this in root component
```ts
import { showClosest } from 'react-confirm-lite'
showClosest()
```
For more info checkout [website](https://react-confirm-lite.github.io).