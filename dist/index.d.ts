import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import { ReactNode } from 'react';

type ColorSchema = 'light' | 'dark' | 'blue' | 'red' | 'green' | 'purple';
type ConfirmClasses = {
    overlay?: string;
    wrapper?: string;
    title?: string;
    message?: string;
    button?: string;
    cancel?: string;
    ok?: string;
};
type ConfirmInput = string | {
    title?: string;
    message: string;
    colorSchema?: ColorSchema;
    okText?: string;
    cancelText?: string;
    isDestructive?: boolean;
};
type ConfirmOptions = {
    title: string;
    message: string;
    resolve: (value: boolean) => void;
    colorSchema?: ColorSchema;
    okText?: string;
    cancelText?: string;
    isDestructive?: boolean;
};

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
declare const ConfirmContainer: ({ classes, animationDuration, defaultColorSchema, children }: Props) => string | number | bigint | boolean | Iterable<ReactNode> | Promise<string | number | bigint | boolean | react.ReactPortal | react.ReactElement<unknown, string | react.JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | react_jsx_runtime.JSX.Element | null | undefined;

declare function confirm(input: ConfirmInput): Promise<boolean>;

export { type ColorSchema, type ConfirmClasses, ConfirmContainer, type ConfirmInput, type ConfirmOptions, confirm };
