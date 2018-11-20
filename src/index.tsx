import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {initStore} from "./redux/store";
import "./sass/style.scss";
import * as serviceWorker from "./serviceWorker";
import {Router} from "./Router";
import $ from "jquery";

render(
    <Provider store={initStore()}>
        <Router/>
    </Provider>,
    $("#root")[0]
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();