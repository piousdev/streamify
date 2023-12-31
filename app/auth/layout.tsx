import React from "react";

const AuthenticationLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className='h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-200 to-orange-800'>
            {children}
        </div>
    )
};

export default AuthenticationLayout