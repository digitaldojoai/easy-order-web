import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../global/Logo";
import {
    Bars3Icon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {MoonIcon, SunIcon} from "@heroicons/react/24/solid";
import NotificationDropdown from "./NotificationDropdown";
import ProfileDropdown from "./ProfileDropdown";
import { useTheme, useThemeUpdate } from "../../provider";
function Header({sidebarVisibility, setSidebarVisibility}) {
    const theme = useTheme();
    const themeUpdate = useThemeUpdate();

    return (
        <div className="isolate fixed top-0 start-0 2xl:start-64 w-full 2xl:w-[calc(100%-theme(space.64))] py-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 z-[1010]">
            <div className="flex items-center px-6">
                <div className="flex items-center gap-x-2 2xl:hidden -ms-1">
                    <button
                        onClick={()=>{
                            setSidebarVisibility(!sidebarVisibility)
                        }}
                        className="inline-flex items-center justify-center h-8 w-8 rounded-full overflow-hidden transition-all text-slate-400 hover:bg-slate-200 hover:dark:bg-slate-800 hover:text-slate-600 hover:dark:text-slate-200 ui-open:bg-slate-200 ui-open:dark:bg-slate-800 ui-open:text-slate-600 ui-open:dark:text-slate-200"
                    >
                        <Bars3Icon className="h-5" />
                    </button>
                    <Link to="/admin">
                        <Logo />
                    </Link>
                </div>
                <div className="hidden xl:flex flex-grow items-center ms-8 me-8 2xl:ms-0">
                    <MagnifyingGlassIcon className="h-4 text-slate-400 dark:text-slate-200" />
                    <input
                        className="z-10 w-full rounded-md text-sm py-1 px-2 border-0 text-slate-600 dark:text-slate-300 placeholder:dark:text-slate-500  placeholder:text-slate-400 bg-transparent focus:ring-0 focus:shadow-none focus:outline-none"
                        placeholder="Search"
                        type="text"
                    />
                </div>
                <ul className="flex items-center gap-x-2 ms-auto">
                    <li className="inline-flex relative">
                        <button
                            onClick={()=>{
                                theme.mode === "dark" && themeUpdate.mode("light")
                                theme.mode === "light" && themeUpdate.mode("dark")
                            }}
                            className={`inline-flex items-center justify-center h-8 w-8 rounded-full overflow-hidden transition-all text-slate-400 hover:text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:bg-slate-800`}>
                            {theme.mode === "dark" && <MoonIcon className="h-4" />}
                            {theme.mode === "light" && <SunIcon className="h-5" />}
                        </button>
                    </li>
                    <li className="inline-flex relative">
                        <NotificationDropdown />
                    </li>
                    <li className="inline-flex relative ms-2">
                        <ProfileDropdown />
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Header;
