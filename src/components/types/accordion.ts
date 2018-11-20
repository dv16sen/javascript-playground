import {MenuProps} from "./menu";
import {ComponentProps} from "react";

export interface AccordionState {
    elementsToShow: Array<number>
}

export interface AccordionProps extends MenuProps {
    initialElementsToShow: number[]
}

export interface AccordionToggleProps extends ComponentProps<"div"> {
    content?: JSX.Element | string
}