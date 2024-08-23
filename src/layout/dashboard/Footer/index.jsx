import React from "react";
import { Link } from "react-router-dom";
function Footer() {
    return (
        <div className="isolate relative py-4 px-6 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 mt-auto">
            <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-slate-600 dark:text-white">
                    &copy; 2024. Crafted By&nbsp;
                    <a
                        className="text-slate-700 dark:text-white hover:text-blue-600 hover:dark:text-blue-600 transition-all"
                        href="https://themeforest.net/user/themeyn/portfolio"
                        target="_blank"
                    >
                        themeyn
                    </a>
                </p>
                <ul className="-mx-3 flex flex-wrap">
                    <li>
                        <Link
                            className="px-3 text-sm font-medium text-slate-600 dark:text-slate-100 hover:text-blue-600 hover:dark:text-blue-600 transition-all"
                            to="#"
                        >
                            Terms
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="px-3 text-sm font-medium text-slate-600 dark:text-slate-100 hover:text-blue-600 hover:dark:text-blue-600 transition-all"
                            to="#"
                        >
                            About
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Footer;
