export interface AlertParams {
    type?: string,
    message?: string,
    title?: string,
    htmlMessage?: JSX.Element,
    titleIcon?: JSX.Element,
    closeIcon?: JSX.Element,
    confirmText?: string,
    cancelText?: string,
    className?: string,
    callbacks?: {[callback: string]: any},
    onClose?: any,
    onConfirm?: any,
    onCancel?: any,
}

export interface AlertContentProps {
    closeIcon: JSX.Element,
    titleIcon: JSX.Element,
    title: string,
    cancelText: string,
    confirmText: string,
    cancelButtonId: string,
    confirmButtonId: string,
    closeButtonId: string,
    onCancel?: any,
    showCancel: boolean,
    animationTime: number,
    onConfirm?: any,
    onClose?: any,
    message: string | JSX.Element,
    remove: any
}

export interface AlertContentState {
    hidden: boolean,
    disabled: boolean
}