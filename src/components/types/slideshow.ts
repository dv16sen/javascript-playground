import {OptionalClasses} from "../../services/className";
import {ComponentProps, ReactElement} from "react";

export interface SlideshowState {
    active: number,
    canChangeSlide: boolean,
    animationStatus: string
}

export interface SlideshowProps extends OptionalClasses, ComponentProps<"div"> {
    leftIcon: ReactElement<any>,
    rightIcon: ReactElement<any>,
    animation: string,
    outAnimation: string,
    duration: number,
    autoplaySpeed: number,
    stateReducer: (state: SlideshowState, changes: any) => any,
    onStateChange: (changes: any) => any,
}