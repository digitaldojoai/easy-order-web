import { Menu as Dropdown, Transition } from "@headlessui/react";
import {
  PowerIcon,
  RocketLaunchIcon,
  SquaresPlusIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { NavLink } from "react-router-dom";

function ProfileImage() {
  return (
    <li className="relative inline-flex">
      <Dropdown>
        <Dropdown.Button className="inline-flex h-9 w-9 overflow-hidden rounded-full outline outline-2 outline-offset-2 outline-slate-300 dark:outline-slate-700">
          <img src="/images/avatar/a.jpg" alt="" />
        </Dropdown.Button>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Dropdown.Items className="absolute end-0 top-10 w-48 rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-center p-4">
              <div className="inline-flex h-10 w-10 flex-shrink-0 overflow-hidden rounded-full outline outline-2 outline-offset-2 outline-slate-300 dark:outline-slate-700">
                <img src="/images/avatar/a.jpg" alt="" />
              </div>
              <div className="ms-4">
                <h6 className="-mt-0.5 text-xs font-bold text-slate-700 dark:text-white">
                  Ryaan Sayegh
                </h6>
              </div>
            </div>
            <ul className="border-t border-slate-200 py-2 dark:border-slate-800">
              <li>
                <NavLink
                  to="/app/profile"
                  className="flex px-4 py-2 text-xs font-bold text-slate-500 transition-all hover:text-blue-600 dark:text-slate-400 hover:dark:text-blue-600"
                >
                  <UserIcon className="me-2 w-4" />
                  <span>Profile</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/login"
                  className="flex px-4 py-2 text-xs font-bold text-slate-500 transition-all hover:text-blue-600 dark:text-slate-400 hover:dark:text-blue-600"
                >
                  <PowerIcon className="me-2 w-4" />
                  <span>Logout</span>
                </NavLink>
              </li>
            </ul>
          </Dropdown.Items>
        </Transition>
      </Dropdown>
    </li>
  );
}

export default ProfileImage;
