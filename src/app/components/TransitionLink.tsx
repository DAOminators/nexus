'use client';
import { usePathname, useRouter } from "next/navigation";
import { AnimatePageOut } from "../../utils/animations.js";
import React from "react";
import Link, {LinkProps} from "next/link.js";

interface TransitionLinkProps extends LinkProps {
    href: string;
    label: string;
    className: string;
}

const TransitionLinkno = ({ href, label, className, ...props }: TransitionLinkProps) => {
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = () => {
        if (pathname !== href) {
            AnimatePageOut(href, router);
        }
    };

    return (
        <button
            className={`z-50 ${className}`}            
            onClick={handleClick}
        >
            {label}
        </button>
    );
};

export default TransitionLinkno;