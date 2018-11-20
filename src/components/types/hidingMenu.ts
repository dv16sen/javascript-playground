import {MenuProps} from "./menu";
import {ComponentProps, ReactChildren} from "react";

export interface HidingMenuState {
    showMenu: boolean
}

export interface HidingMenuProps extends MenuProps {
    breakpoint: string,
    containerProps: MenuProps,
    mobileMenuProps: MenuProps,
    mobileMenuItemProps: ComponentProps<"div">,
    mobileIcon: object,
    mobileMenuItemClass: string,
    mobileMenuChildren: ReactChildren
    stateReducer: (state: HidingMenuState, changes: any) => any,
    onStateChange: (changes: any) => any
}