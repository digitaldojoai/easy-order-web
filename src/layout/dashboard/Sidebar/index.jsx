import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import Logo from "../../global/Logo";
import Menu from "./Menu";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { useTheme } from "../../provider";

function Sidebar({ mobile, visibility, setVisibility, className }) {
    const theme = useTheme();
    const compClass = classNames({
        "fixed 2xl:translate-x-0 start-0 top-0 border-e border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 z-[1020] w-64 min-h-screen flex-shrink-0": true,
        "-translate-x-full": !visibility && theme.direction === "ltr",
        "translate-x-full": !visibility && theme.direction === "rtl",
        "transition-transform": mobile,
        [`${className}`]: className,
    });
    return (
        <>
            <div className={compClass}>
                <div className="flex px-6 py-4 border-b border-slate-200 dark:border-slate-800">
                    <Link to="/admin/dashboard" className="inline-flex h-8">
                        <Logo />
                    </Link>
                </div>
                <SimpleBar>
                    <Menu />
                </SimpleBar>
            </div>
            {visibility && (
                <div
                    onClick={()=>{
                        setVisibility(false)
                    }}
                    className="fixed inset-0 bg-slate-950 bg-opacity-50 z-[1019]"
                ></div>
            )}
        </>
    );
}

export default Sidebar;
