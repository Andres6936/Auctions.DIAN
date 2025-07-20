/**
 * This file is the entry point for the React app, it sets up the root
 * element and renders the App component to the DOM.
 *
 * It is included in `src/index.html`.
 */

// You need to import RingUI styles once
import '@jetbrains/ring-ui-built/components/style.css';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {stackClientApp} from "@/stack";
import {createRoot} from "react-dom/client";
import {BrowserRouter, Route, Routes, useLocation} from "react-router";
import {StackHandler, StackProvider, StackTheme} from "@stackframe/react";
import {Employee} from "@/routes/Employee";
import {Home} from "@/routes/Home";

// Create a client
const queryClient = new QueryClient()

function HandlerRoutes() {
    const location = useLocation();

    return (
        <StackHandler app={stackClientApp} location={location.pathname} fullPage/>
    );
}

const elem = document.getElementById("root")!;
const app = (
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <StackProvider app={stackClientApp}>
                <StackTheme>
                    <Routes>
                        <Route path="/handler/*" element={<HandlerRoutes/>}/>
                        <Route path="/employee" element={<Employee/>}/>
                        <Route path="/" element={<Home/>}/>
                    </Routes>
                </StackTheme>
            </StackProvider>
        </BrowserRouter>
    </QueryClientProvider>
);

if (import.meta.hot) {
    // With hot module reloading, `import.meta.hot.data` is persisted.
    const root = (import.meta.hot.data.root ??= createRoot(elem));
    root.render(app);
} else {
    // The hot module reloading API is not available in production.
    createRoot(elem).render(app);
}
