'use client'
import React from "react";
import TransitionLink from "./TransitionLink";
import AnimatedText from "./AnimatedText";
import HOME from "../home/page";

// Here is the Navbar
const Navigation = () => {
    return(
        <>
            <nav className="fixed w-full px-2 font-helvetica flex flex-row place-items-center justify-between">
                <h1>
                    <TransitionLink className="" href="/home" label="HOME" />
                </h1>
                <ul className="flex flex-row space-x-5">
                    <li>
                        <TransitionLink className="" href="/about" label="About" />
                    </li>
                    <li>
                        <TransitionLink className="" href="/dashboard" label="Try it Out" />
                    </li>
                </ul>
            </nav>
            {/* <AnimatedText text="HELLO HELLO HELLO HELLO HELLo" className="text-2xl" customText="🔥⭐✨💀✔️❤️" /> */}
        </>
    )
}

export default Navigation;