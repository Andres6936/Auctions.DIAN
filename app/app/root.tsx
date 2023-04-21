import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react";
import {MasterCSS} from '@master/css'
import config from '../master.css'
import React, {useLayoutEffect} from "react";

// Suppress useLayoutEffect warnings when running outside a browser
if (typeof window === 'undefined') {
    React.useLayoutEffect = React.useEffect;
}

export default function App() {
    useLayoutEffect(() => {
        new MasterCSS(config)
    })

    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width,initial-scale=1"/>
            <Meta/>
            <Links/>
        </head>
        <body>
        <Outlet/>
        <ScrollRestoration/>
        <Scripts/>
        <LiveReload/>
        </body>
        </html>
    );
}
