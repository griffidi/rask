export enum ToastType {
  error = 'rk-toast--error',
  info = 'rk-toast--info',
  success = 'rk-toast--success',
  warning = 'rk-toast--warning',
}

export interface ToastOptions {
  message: string;
  title?: string;
  hideCloseButton?: boolean;
}
