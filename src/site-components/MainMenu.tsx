import React, {Component} from "react";
import {routes} from "../routes";
import HidingMenu from "../components/HidingMenu";
import {joinClassNames} from "../services/className";
import {withRouter} from 'react-router-dom';
import $ from "jquery";
import {RouteComponentProps} from "react-router";

interface MainMenuProps extends RouteComponentProps {
    className?: string
}

class MainMenu extends Component<MainMenuProps> {
    withoutRouterExtras = ({
        history,
        match,
        staticContext,
        ...props
    }: Partial<RouteComponentProps>) => props;

    componentWillUnmount(){
        $("body").removeClass("prevent-scroll-md");
    }

    render(){
        const {
            className,
            location,
            ...props
        } = this.props;
        
        return (
            <HidingMenu
                id="main-menu"
                vertical
                breakpoint="md"
                containerProps={{
                    className: "scrollable fixed-md w-25 w-100-md b-dark-gray h-100 h-0-md"
                }}
                mobileMenuProps={{
                    className: joinClassNames("b-dark-gray w-100-md", className)
                }}
                mobileMenuItemClass="grow"
                className={joinClassNames("fixed static-md w-25", className)}
                stateReducer={(state, changes) => {
                    if(changes.showMenu){
                        $("body").addClass("prevent-scroll-md");
                    } else {
                        $("body").removeClass("prevent-scroll-md");
                    }

                    return changes;
                }}
                {...this.withoutRouterExtras(props)}
            >
                <h3 className="effectless menu-item">
                    <a href={routes.homePage}>
                        Javascript Playground
                    </a>
                </h3>
                <a href={routes.decoratorPage} 
                   className={location.pathname === routes.decoratorPage ? "active" : ""}>
                    Decorator
                </a>
                <a href={routes.hooksPage} 
                   className={location.pathname === routes.hooksPage ? "active" : ""}>
                    Hooks
                </a>
            </HidingMenu>
        );
    }
}

export default withRouter(MainMenu);