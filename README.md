# React Confirm Lite ✨

**An async, container-scoped confirmation lite for React with fully customizable dialogs.**

[![npm version](https://img.shields.io/npm/v/react-confirm-lite)](https://www.npmjs.com/package/react-confirm-lite)
[![bundle size](https://img.shields.io/bundlephobia/minzip/react-confirm-lite)](https://bundlephobia.com/package/react-confirm-lite)
[![npm downloads](https://img.shields.io/npm/dm/react-confirm-lite)](https://www.npmjs.com/package/react-confirm-lite)
[![license](https://img.shields.io/npm/l/react-confirm-lite)](https://github.com/SaadNasir-git/react-confirm-lite/blob/main/LICENSE)
[![typescript](https://img.shields.io/badge/types-TypeScript-blue)](https://www.typescriptlang.org/)
[![react](https://img.shields.io/badge/react-%3E%3D18-blue)](https://reactjs.org/)

![Sample Image](https://camo.githubusercontent.com/af08928ac7006e57dc2a28f01b1fbc7214ea742379365f364f37bb204a93906b/68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f646863716e35626d712f696d6167652f75706c6f61642f76313736363737383630322f53637265656e6361737466726f6d323032352d31322d323730302d34322d31342d657a6769662e636f6d2d6f7074696d697a655f6f64316874322e676966)


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

## Confirm Container Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| animation | AnimationType | slide | Animation type (16 options) |
| animationDuration | number | 300 | Base animation duration (ms) |
| animationDurationIn | number | - | Enter animation duration |
| animationDurationOut | number | - | Exit animation duration |
| defaultColorScheme | ColorSchema | dark | Default color scheme |
| closeOnEscape | boolean | true | Close with ESC key |
| closeOnClickOutside | boolean | true | Close on backdrop click |
| classes | ConfirmClasses | {} | Custom CSS classes |


## Confirm API options
```tsx
await confirm("Are you sure?");
// OR
await confirm({message:"Are you sure?",title:"Confirm",cancelText:"No",okText:"Yes",colorSchema:"light"})
```

## Custom Dialog
To make custom dialog pass children like this

```tsx
import { confirm, ConfirmContainer } from "react-confirm-manager"

const CustomDialog = () => {
    const handleClick = async () => {
        const isConfirmed = await confirm('Are you sure?')
        if (isConfirmed === null) console.log('User clicked outside or pressed escape')
        else if (isConfirmed) console.log('Ok')
        else console.log('Cancel')
    }

    return (
        <div>
            <button onClick={handleClick}>
                Try
            </button>
            <ConfirmContainer
                animation="flip"
                animationDuration={300}
                closeOnEscape={true}
                closeOnClickOutside={true}
                lockScroll={true}
            >
                {({
                    isVisible,
                    confirm,
                    handleCancel,
                    handleOk,
                    containerRef,
                    animationClass,
                    animationStyle
                }) => (
                    <div
                        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300`}
                    >
                        {/* Backdrop */}
                        <div
                            className={`absolute inset-0`}
                            onClick={handleCancel}
                        />

                        {/* Alert Modal - Uses Tailwind's dark mode classes */}
                        <div
                            ref={containerRef}
                            className={`relative z-10 w-full max-w-md transform rounded-2xl p-6 shadow-2xl transition-all duration-300 ${animationClass} bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border dark:border-gray-800`}
                            style={animationStyle}
                        >
                            {/* Title */}
                            <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                                {confirm.title}
                            </h2>

                            {/* Message */}
                            <p className="mb-6 text-gray-600 dark:text-gray-300">
                                {confirm.message}
                            </p>

                            {/* Buttons */}
                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={handleCancel}
                                    disabled={!isVisible}
                                    className="rounded-lg px-4 py-2 font-medium transition-colors text-gray-700 dark:text-gray-300  bg-gray-100 dark:bg-gray-800/50 hover:bg-gray-200 dark:hover:bg-gray-800 disabled:opacity-50"
                                >
                                    {confirm.cancelText || 'Cancel'}
                                </button>
                                <button
                                    onClick={handleOk}
                                    disabled={!isVisible}
                                    className="rounded-lg px-4 py-2 font-medium text-white transition-colors bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {confirm.okText || 'OK'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </ConfirmContainer>
        </div>
    )
}

export default CustomDialog

```

| Prop | Type | Description |
| :--- | :--- | :--- |
| isVisible | boolean | It's value is true when it starts showing and returns false when it starts hiding. It can be used when you made your own custom animation but, if you are using an built in animation then you will not need it. |
| confirm | { id?: string; title?: string; message: string; colorSchema?: ColorSchema; okText?: string; cancelText?: string; }; | It contains the data which you passed through confirm api. |
| containerRef | React.RefObject&lt;HTMLDivElement \| null&gt; | If you want that container hide when you click outside the container then it hides with animation then, you will have to use it mean you will have to give this ref to the container. |
| animationClass | string | It contains the classes for animation. |
| animationStyle | React.CSSProperties | It contains the css properties for animation. |
| handleCancel | () => void | You can give it to the cancle button and you will get false by the confirm api. |
| handleOk | () => void | You can give it to the ok button and you will get true by the confirm api. |
