// src/alertifyjs.d.ts
declare module 'alertifyjs' {
    export interface Alertify {
      alert(message: string, onOk?: () => void): void;
      confirm(message: string, onOk: () => void, onCancel?: () => void): void;
      prompt(
        message: string,
        defaultValue: string,
        onOk: (value: string) => void,
        onCancel?: () => void
      ): void;
      success(message: string, wait?: number): void;
      error(message: string, wait?: number): void;
      warning(message: string, wait?: number): void;
      message(message: string, wait?: number): void;
    }
  
    const alertify: Alertify;
    export default alertify;
  }
  