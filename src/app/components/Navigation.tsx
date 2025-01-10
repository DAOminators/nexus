'use client'
import React from "react";
import TransitionLink from "./TransitionLink";
import AnimatedText from "./AnimatedText";

// Here is the Navbar
const Navigation = () => {
    return(
        <>
            <nav className="w-full p-5 flex flex-row place-items-center justify-between">
                <h1>
                    <TransitionLink href="/" label="HOME"/>
                </h1>
                <ul className="flex flex-row space-x-5">
                    <li>
                        <TransitionLink href="/about" label="About" />
                    </li>
                    <li>
                        <TransitionLink href="/contact" label="Try it Out" />
                    </li>
                </ul>
            </nav>
            <AnimatedText text="HELLO HELLO HELLO HELLO HELLo" className="text-2xl" customText="🔥⭐✨💀✔️❤️" />
        </>
    )
}

export default Navigation;