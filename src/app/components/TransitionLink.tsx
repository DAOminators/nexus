'use client';
import { usePathname, useRouter } from "next/navigation";
import { AnimatePageOut } from "../../utils/animations.js";
import React from "react";
import Link, {LinkProps} from "next/link.js";

interface TransitionLinkProps extends LinkProps {
    href: string;
    label: string;
}

const TransitionLink = ({ href, label, ...props }: TransitionLinkProps) => {
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = () => {
        if (pathname !== href) {
            AnimatePageOut(href, router);
        }
    };

    return (
        <button
            className="text-xl text-white hover:text-neutral-700"
            onClick={handleClick}
        >
            {label}
        </button>
    );
};

export default TransitionLink;