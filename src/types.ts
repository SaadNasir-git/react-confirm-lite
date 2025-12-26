export type ColorSchema = 
  | 'light' 
  | 'dark' 
  | 'blue' 
  | 'red' 
  | 'green'
  | 'purple';

export type ConfirmClasses = {
  overlay?: string;
  wrapper?: string;
  title?: string;
  message?: string;
  button?: string;
  cancel?: string;
  ok?: string;
};

export type ConfirmInput =
  | string
  | {
      title?: string;
      message: string;
      colorSchema?: ColorSchema;
      okText?: string;
      cancelText?: string;
      isDestructive?: boolean;
    };

export type ConfirmOptions = {
  title: string;
  message: string;
  resolve: (value: boolean) => void;
  colorSchema?: ColorSchema;
  okText?: string;
  cancelText?: string;
  isDestructive?: boolean;
};