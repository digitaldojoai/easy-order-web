import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { useRef, useState } from "react";
import { usePopper } from "react-popper";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setToggle } from "../redux/redux";
import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import {
  PencilSquareIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";

const ChatItem = ({ data, setListVisibility, mobile, count }: any) => {
  let searchParams = useSearchParams();
  const id = searchParams.get("id");
  const dispatch = useDispatch();
  const referenceElement = useRef<HTMLButtonElement | null>(null);
  const popperElement = useRef<HTMLElement | null>(null);
  let { styles, attributes } = usePopper(
    referenceElement.current,
    popperElement.current,
    {
      placement: "bottom-end",
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [-12, -8],
          },
        },
      ],
    }
  );

  return (
    <li className="group relative flex max-w-full items-center justify-stretch">
      <Link
        href={`/chat-bot?id=${data.id}`}
        onClick={() => {
          mobile && dispatch(setToggle(false));
        }}
        className={classNames({
          "flex w-full items-center gap-2 rounded-md md:px-4 py-3  ": true,
          active: data.id === id,
        })}
      >
        {/* <div className="flex-shrink-0">
          <ChatBubbleLeftRightIcon className="h-4 text-slate-600 " />
        </div> */}
        <p className="truncate text-sm capitalize text-slate-500 ">
          Order Sheet #{data.order_number} {data.language}
        </p>
      </Link>
      {/* <Menu
        className="absolute end-2 top-1/2 z-[1000000000000000] -translate-y-1/2 opacity-0 group-hover:opacity-100"
        as="div"
      >
        <MenuButton
          ref={referenceElement}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 "
        >
          <FontAwesomeIcon icon={faBars} className="text-slate-500" />
        </MenuButton>
        <MenuItems
          ref={popperElement}
          style={styles.popper}
          {...attributes.popper}
          className="absolute end-0 top-10 w-36 rounded-lg border border-slate-200 bg-white shadow-sm  z-[1000000000000000]"
        >
          <ul className="border-slate-200 py-2 ">
            <li>
              <a
                href="#"
                className="flex px-4 py-2 text-xs font-medium text-slate-500 transition-all hover:text-blue-600 "
              >
                <PencilSquareIcon className="me-2 w-4" />
                <span>Rename</span>
              </a>
              <a
                href="#"
                className="flex px-4 py-2 text-xs font-medium text-slate-500 transition-all hover:text-blue-600 "
              >
                <ShareIcon className="me-2 w-4" />
                <span>Share</span>
              </a>
              <a
                href="#"
                className="flex px-4 py-2 text-xs font-medium text-slate-500 transition-all hover:text-blue-600 "
              >
                <TrashIcon className="me-2 w-4" />
                <span>Delete</span>
              </a>
            </li>
          </ul>
        </MenuItems>
      </Menu> */}
    </li>
  );
};

export default ChatItem;
