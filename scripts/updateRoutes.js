const fs = require("fs");

const decapitalizeFirstLetter = (string = "") => {
    let firstLetter = string.charAt(0).toLowerCase();
    let restOfString = string.substring(1, string.length);
    return `${firstLetter}${restOfString}`;
};

const getMenu = (pages) => (
`import React, {Component} from "react";
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
                        Javascript Playgrounds
                    </a>
                </h3>
${pages.length > 1 ? (pages.filter(page => page !== "HomePage.tsx").map((page, i) => {
    const href = `routes.${decapitalizeFirstLetter(page).split(".tsx")[0]}`;
    const pageName = page.split("Page.tsx")[0];
    const lastPage = i === pages.length - 2;
    const tab = `                `;
    
    return (tab + 
        `<a href={${href}} \n` + 
        `${tab}   className={location.pathname === ${href} ? "active" : ""}>\n` + 
        `${tab}    ${pageName}\n${tab}</a>${lastPage ? "" : "\n"}`
    );
}).reduce((acc, next) => acc + next)) : ""}
            </HidingMenu>
        );
    }
}

export default withRouter(MainMenu);`);

const getRouterFile = (pages) => (
`import React, {Fragment} from "react";
import {BrowserRouter, Route} from "react-router-dom";
${pages.map((page, i) => {
    const lastPage = i === pages.length - 1;
    
    return `import ${page.split(".tsx")[0]} from "./pages/${page.split(".tsx")[0]}";${
        lastPage ? "" : "\n"
    }`;
}).reduce((acc, next) => acc + next)}
import {routes} from "./routes";

export const Router = () => {
    return (
        <BrowserRouter>
            <Fragment>
${pages.map((page, i) => {
    const path = `routes.${decapitalizeFirstLetter(page).split(".tsx")[0]}`;
    const component = page.split(".tsx")[0];
    const lastPage = i === pages.length - 1;
    return `                <Route exact path={${path}} component={${component}}/>${
        lastPage ? "" : "\n"
    }`;
}).reduce((acc, next) => acc + next)}
            </Fragment>
        </BrowserRouter>
    );
};`
);

const getRoutesFile = (pages) => (
`export const routes = {
${pages.map((page, i) => {
    if(page === "HomePage.tsx") return `    homePage: "/",\n`;
    
    const isLastPage = i === pages.length - 1;
    const key = decapitalizeFirstLetter(page).split(".tsx")[0];
    const value = `/${key.split("Page")[0]}`;
    return `    ${key}: "${value}"${isLastPage ? "" : ",\n"}`;
}).reduce((acc, next) => acc + next)}
};`);

module.exports = async () => {
    const pages = fs.readdirSync(`${global.PROJECT_ROOT}/src/pages`);

    return new Promise(resolve => {
        fs.writeFile(`${global.PROJECT_ROOT}/src/routes.tsx`, getRoutesFile(pages), (err) => {
            if(err) throw err;
            resolve();
        })
    }).then(() => new Promise(resolve => {
        fs.writeFile(`${global.PROJECT_ROOT}/src/Router.tsx`, getRouterFile(pages), (err) => {
            if(err) throw err;

            resolve();
        })
    })).then(() => new Promise(resolve => {
        fs.writeFile(`${global.PROJECT_ROOT}/src/site-components/MainMenu.tsx`, getMenu(pages), (err) => {
            if(err) throw err;

            console.log("Complete!");
            resolve();
        })
    }));
};