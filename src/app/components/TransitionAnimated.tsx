'use client';
import { usePathname, useRouter } from "next/navigation";
import { AnimatePageOut } from "../../utils/animations.js";
import React from "react";
import Link, {LinkProps} from "next/link.js";
import AnimatedText from "./AnimatedText.jsx";

interface TransitionLinkProps extends LinkProps {
    href: string;
    label: string;
    className: string;
    time: number;
    preStyle: string;
}

const TransitionLink = ({ href, label, className, time, preStyle, ...props }: TransitionLinkProps) => {
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = () => {
        if (pathname !== href) {
            AnimatePageOut(href, router);
        }
    };

    return (
        <button onClick={handleClick}>
            <AnimatedText text={label} time={1} className={className} preStyle={preStyle} />
        </button>
    );
};

export default TransitionLink;