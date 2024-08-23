"use client";
import { MenuItems, MenuButton, Transition, Menu } from "@headlessui/react";
import {
  Bars3Icon,
  PowerIcon,
  RocketLaunchIcon,
  SquaresPlusIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames";
import Container from "../../global/Container";
import Logo from "../../global/Logo";
import Link from "next/link";

function Header({ mobile, visibility, setVisibility, className }: any) {
  const menuClass = classNames({
    "flex flex-col py-4 xl:py-0 w-64 xl:w-auto fixed xl:transition-none xl:static start-0 top-0 border-e border-slate-200  xl:border-e-0 bg-white  z-[1020] h-screen xl:h-auto flex-shrink-0 xl:translate-x-0":
      true,
    "transition-all": mobile,
    "-translate-x-full": !visibility,
  });
  return (
    <div className="fixed start-0 top-0 isolate z-[1020] w-full border-b border-slate-200 bg-white px-3 py-4   xl:py-3">
      <Container>
        <div className="w-100 flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            {/* <div className="-ms-1.5 xl:hidden">
              <button
                onClick={() => {
                  setVisibility(true);
                }}
                className="inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-full text-slate-400 transition-all ui-open:bg-slate-200 ui-open:text-slate-600 hover:bg-slate-200 hover:text-slate-600 "
              >
                <Bars3Icon className="h-5" />
              </button>
            </div> */}
            <Link className="flex-shrink-0" href="/app">
              <Logo />
            </Link>
          </div>
          {/* {visibility && (
            <div
              onClick={() => {
                setVisibility(false);
              }}
              className="fixed inset-0 z-[1019] bg-slate-950 bg-opacity-50"
            ></div>
          )}
          <div className={menuClass}>
            <Menu mobile={mobile} />
          </div> */}
          <ul className="flex items-center gap-x-3 lg:gap-x-5">
            <li className="relative inline-flex">
              <Menu>
                <MenuButton className="inline-flex h-9 w-9 overflow-hidden rounded-full outline outline-2 outline-offset-2 outline-slate-300 ">
                  <img src="/images/avatar/a.jpg" alt="" />
                </MenuButton>
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <MenuItems className="absolute end-0 top-10 w-48 rounded-lg border border-slate-200 bg-white shadow-sm ">
                    <div className="flex items-center p-4">
                      <div className="inline-flex h-10 w-10 flex-shrink-0 overflow-hidden rounded-full outline outline-2 outline-offset-2 outline-slate-300 ">
                        <img src="/images/avatar/a.jpg" alt="" />
                      </div>
                      <div className="ms-4">
                        <h6 className="-mt-0.5 text-xs font-bold text-slate-700 =">
                          Phillip Burke
                        </h6>
                        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-500 ">
                          Balance $18.89
                        </span>
                      </div>
                    </div>
                    <ul className="border-t border-slate-200 py-2 ">
                      <li>
                        <Link
                          href="/admin/dashboard"
                          className="flex px-4 py-2 text-xs font-bold text-slate-500 transition-all hover:text-blue-600 "
                        >
                          <SquaresPlusIcon className="me-2 w-4" />
                          <span>Admin</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/app/profile"
                          className="flex px-4 py-2 text-xs font-bold text-slate-500 transition-all hover:text-blue-600 "
                        >
                          <UserIcon className="me-2 w-4" />
                          <span>Profile</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/app/packages"
                          className="flex px-4 py-2 text-xs font-bold text-slate-500 transition-all hover:text-blue-600 "
                        >
                          <RocketLaunchIcon className="me-2 w-4" />
                          <span>Upgrade</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/login"
                          className="flex px-4 py-2 text-xs font-bold text-slate-500 transition-all hover:text-blue-600 "
                        >
                          <PowerIcon className="me-2 w-4" />
                          <span>Logout</span>
                        </Link>
                      </li>
                    </ul>
                  </MenuItems>
                </Transition>
              </Menu>
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
}

export default Header;
