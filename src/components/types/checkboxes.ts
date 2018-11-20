import {ComponentProps} from "react";

export interface BouncingCheckboxProps extends ComponentProps<"input"> {}

export interface AndroidCheckboxProps extends ComponentProps<"input"> {
    id: string,
    label?: string,
}