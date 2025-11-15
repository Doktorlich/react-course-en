import { Outlet } from "react-router-dom";
import { Fragment } from "react";
import MainNavigation from "../components/MainNavigation";
import classes from "./RootLayout.module.css"

export default function RootLayout() {
    return (
        <Fragment>
            <MainNavigation/>
            <main className={classes.content}>
                <Outlet />
            </main>
        </Fragment>
    );
}
