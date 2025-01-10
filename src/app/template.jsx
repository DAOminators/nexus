"use client"

import { AnimatePageIn } from "../utils/animations";
import { useEffect } from "react";

// Page Transitions

// Here's an example
export default function Template({ children }) {
    useEffect(() => {
        AnimatePageIn();
    }, []);
    return (
        <div>
            <div
                id="banner-1"
                className="bg-white z-10 fixed top-0 left-0 w-1/4 min-h-screen"
            ></div>
            <div
                id="banner-2"
                className="bg-white z-10 fixed top-0 left-1/4 w-1/4 min-h-screen"
            ></div>
            <div
                id="banner-3"
                className="bg-white z-10 fixed top-0 left-2/4 w-1/4 min-h-screen"
            ></div>
            <div
                id="banner-4"
                className="bg-white z-10 fixed top-0 left-3/4 w-1/4 min-h-screen"
            ></div>
            {children}
        </div>
    );
}