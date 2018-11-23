import React, {Fragment} from "react";
import {BrowserRouter, Route} from "react-router-dom";
import DecoratorPage from "./pages/DecoratorPage";
import HomePage from "./pages/HomePage";
import HooksPage from "./pages/HooksPage";
import {routes} from "./routes";

export const Router = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <Route exact path={routes.decoratorPage} component={DecoratorPage}/>
                <Route exact path={routes.homePage} component={HomePage}/>
                <Route exact path={routes.hooksPage} component={HooksPage}/>
            </Fragment>
        </BrowserRouter>
    );
};