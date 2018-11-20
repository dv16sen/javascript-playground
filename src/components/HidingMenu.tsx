import React, {Component} from "react";
import {compose} from "redux";
import {Menu} from "./Menu";
import {classNames, getOptionalClasses, filterOutOptionalClasses} from "../services/className";
import {HidingMenuState, HidingMenuProps} from "./types/hidingMenu";

class HidingMenu extends Component<HidingMenuProps, HidingMenuState> {
    static defaultProps: Partial<HidingMenuProps> = {
        breakpoint: "sm",
        className: "",
        containerProps: {},
        mobileMenuProps: {},
        mobileMenuItemProps: {},
        mobileMenuChildren: null,
        mobileMenuItemClass: "",
        mobileIcon: <i className="fas fa-bars"/>,
        stateReducer: (state, changes) => changes,
        onStateChange: () => {}
    };

    state = {
        showMenu: false
    };

    internalSetState = (changes: any, callback: (changes?: any) => any = () => {}) => {
        let allChanges: any;

        this.setState(() => {
            allChanges = this.props.stateReducer(this.state, changes);
            return allChanges;
        }, () => {
            this.props.onStateChange(allChanges);
            callback(allChanges);
        });
    };

    toggleShowMenu = () => this.internalSetState({showMenu: !this.state.showMenu});

    filterOutExtraProps = ({
       stateReducer,
       onStateChange,
       ...props
    }: Partial<HidingMenuProps>) => props;

    render(){
        const {
            className,
            breakpoint,
            mobileIcon,
            containerProps,
            mobileMenuProps,
            mobileMenuChildren,
            mobileMenuItemProps,
            mobileMenuItemClass,
            children,
            ...props
        } = this.props;

        const menuClass = classNames({
            [`hide-${breakpoint}`]: true,
            [`vertical-${breakpoint}`]: true,
            [`w-100-${breakpoint}`]: true,
            ...getOptionalClasses(props),
            "show": this.state.showMenu
        }, className);

        const menuItemClass = classNames({
            "menu-item": true,
            [`show-${breakpoint}`]: true,
            "active": this.state.showMenu
        }, mobileMenuItemClass);

        return (
            <Menu {...containerProps}>
                <Menu {...mobileMenuProps}>
                    <div
                        className={menuItemClass}
                        onClick={this.toggleShowMenu}
                        {...mobileMenuItemProps}
                    >{mobileIcon}</div>
                    {mobileMenuChildren}
                </Menu>
                <Menu className={menuClass} {...compose(
                    filterOutOptionalClasses,
                    this.filterOutExtraProps
                )(props)}>
                    {children}
                </Menu>
            </Menu>
        );
    }
}

export default HidingMenu;