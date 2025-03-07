import { StackClientApp } from "@stackframe/react";
import {useNavigate} from "react-router";

export const stackClientApp = new StackClientApp({
    baseUrl: process.env.BUN_PUBLIC_STACK_API_URL,
    // You should store these in environment variables based on your project setup
    projectId: process.env.BUN_PUBLIC_STACK_PROJECT_ID,
    publishableClientKey: process.env.BUN_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY,
    tokenStore: "cookie",
    redirectMethod: {
        useNavigate,
    }
});
