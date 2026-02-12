export type ColorSchema =
  | 'light'
  | 'dark'
  | 'blue'
  | 'red'
  | 'green'
  | 'purple';

export type AnimationType =
  | 'slide'
  | 'fadeScale'
  | 'bounce'
  | 'flip'
  | 'zoom'
  | 'rotate'
  | 'fadeUp'
  | 'drop'
  | 'slideRight'
  | 'slideLeft'
  | 'fadeDown'
  | 'slideDown'
  | 'rotateRight'
  | 'zoomSmall'
  | 'bounceSmall'
  | 'fadeBlur'
  | 'fadeShrink';

export type ConfirmClasses = {
  overlay?: string;
  wrapper?: string;
  title?: string;
  message?: string;
  button?: string;
  cancel?: string;
  ok?: string;
};

export type ConfirmInput = {
  id?: string;
  title?: string;
  message: string;
  colorSchema?: ColorSchema;
  okText?: string;
  cancelText?: string;
};

export type ConfirmOptions = {
  id?: string;
  title: string;
  message: string;
  resolve: (value: boolean | null) => void;
  colorSchema?: ColorSchema;
  okText?: string;
  cancelText?: string;
};

interface EnterExit {
  enter: string;
  exit: string;
}

export interface animationPairs {
  slide: EnterExit;
  fadeScale: EnterExit;
  bounce: EnterExit;
  flip: EnterExit;
  zoom: EnterExit;
  rotate: EnterExit;
  fadeUp: EnterExit;
  drop: EnterExit;
  slideRight: EnterExit;
  slideLeft: EnterExit;
  fadeDown: EnterExit;
  slideVertical: EnterExit;
  rotateRight: EnterExit;
  zoomSmall: EnterExit;
  bounceSmall: EnterExit;
  fadeBlur: EnterExit;
  fadeShrink: EnterExit;
}
