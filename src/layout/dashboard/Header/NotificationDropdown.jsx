import React, {useState} from 'react'
import { Menu, Transition } from "@headlessui/react";
import { usePopper } from 'react-popper';
import {
    BellAlertIcon,
} from "@heroicons/react/24/outline";
function NotificationDropdown() {
    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    let { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement : "bottom-end",
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [0,8],
                },
            },
            {
                name: 'preventOverflow',
                options: {
                  padding: 8,
                },
            },
        ],
    })
  return (
    <Menu>
        <Menu.Button ref={setReferenceElement} className="inline-flex items-center justify-center h-8 w-8 rounded-full overflow-hidden transition-all text-slate-400 hover:bg-slate-200 hover:dark:bg-slate-800 hover:text-slate-600 hover:dark:text-slate-200 ui-open:bg-slate-200 ui-open:dark:bg-slate-800 ui-open:text-slate-600 ui-open:dark:text-slate-200">
            <BellAlertIcon className="h-5" />
        </Menu.Button>
        <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
        >
            <Menu.Items ref={setPopperElement} style={styles.popper} {...attributes.popper} className="absolute end-0 top-10 w-80 bg-white dark:bg-slate-950 shadow-sm border border-slate-200 dark:border-slate-800 rounded-lg">
                <div className="py-3 px-5 flex items-center border-b border-slate-200 dark:border-slate-800">
                    <h5 className="text-md font-bold text-slate-600 dark:text-slate-100 inline-flex items-center">
                        <span>Notifications </span>
                        <span className="inline-flex ms-2 rounded-full text-xs font-bold text-blue-500">( 6 )</span>
                    </h5>
                </div>
                <div className="flex flex-col py-3">
                    <div className="px-5 py-2 flex items-start">
                        <div className="inline-flex items-center justify-center h-10 w-10 rounded-full overflow-hidden text-xs font-bold bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-100">
                            <span>MG</span>
                        </div>
                        <div className="ps-3 py-0.5">
                            <h6 className="text-sm text-slate-500 dark:text-slate-200"><strong className="text-slate-600 dark:text-slate-100">Marie George</strong> Registered</h6>
                            <div className="text-xs text-slate-400 dark:text-slate-300 mt-0.5">10 Minutes Ago</div>
                        </div>
                    </div>
                    <div className="px-5 py-2 flex items-start">
                        <div className="inline-flex items-center justify-center h-10 w-10 rounded-full overflow-hidden text-xs font-bold bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-100">
                            <span>RS</span>
                        </div>
                        <div className="ps-3 py-0.5">
                            <h6 className="text-sm text-slate-500 dark:text-slate-200"><strong className="text-slate-600 dark:text-slate-100">Romy Schulte</strong> Registered</h6>
                            <div className="text-xs text-slate-400 dark:text-slate-300 mt-0.5">02 Hours Ago</div>
                        </div>
                    </div>
                    <div className="px-5 py-2 flex items-start">
                        <div className="inline-flex items-center justify-center h-10 w-10 rounded-full overflow-hidden text-xs font-bold bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-100">
                            <span>MW</span>
                        </div>
                        <div className="ps-3 py-0.5">
                            <h6 className="text-sm text-slate-500 dark:text-slate-200"><strong className="text-slate-600 dark:text-slate-100">Maxim Werner</strong> Registered</h6>
                            <div className="text-xs text-slate-400 dark:text-slate-300 mt-0.5">2 Weeks Ago</div>
                        </div>
                    </div>
                </div>
            </Menu.Items>
        </Transition>
    </Menu>
  )
}

export default NotificationDropdown