"use client";

import { logout } from "@/actions/logout";
import React from "react";

interface LogoutButtonProps {
    children?: React.ReactNode;
}

export const LogoutButton = ({
    children
}: LogoutButtonProps) => {
    const onClick = () => {
        logout().then(response => {
            console.log(response);
        });
    };

    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    );
};