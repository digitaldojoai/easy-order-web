import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { useState } from "react";
import { usePopper } from "react-popper";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setToggle } from "../redux/redux";

const ChatItem = ({ data, setListVisibility, mobile, count }: any) => {
  let searchParams = useSearchParams();
  const id = searchParams.get("id");
  const dispatch = useDispatch();

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
        <div className="flex-shrink-0">
          <ChatBubbleLeftRightIcon className="h-4 text-slate-600 " />
        </div>
        <p className="truncate text-sm capitalize text-slate-500 ">
          Order Sheet #{count} {data.language}
        </p>
      </Link>
      {/* <Menu
        className="absolute end-2 top-1/2 z-10 -translate-y-1/2 opacity-0 group-hover:opacity-100"
        as="div"
      >
        <Menu.Button
          ref={setReferenceElement}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-900"
        >
          <EllipsisHorizontalIcon className="h-5 text-slate-600 dark:text-slate-200" />
        </Menu.Button>
        <Menu.Items
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
          className="absolute end-0 top-10 w-36 rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950"
        >
          <ul className="border-slate-200 py-2 dark:border-slate-800">
            <li>
              <a
                href="#"
                className="flex px-4 py-2 text-xs font-medium text-slate-500 transition-all hover:text-blue-600 dark:text-slate-200 hover:dark:text-blue-600"
              >
                <PencilSquareIcon className="me-2 w-4" />
                <span>Rename</span>
              </a>
              <a
                href="#"
                className="flex px-4 py-2 text-xs font-medium text-slate-500 transition-all hover:text-blue-600 dark:text-slate-200 hover:dark:text-blue-600"
              >
                <ShareIcon className="me-2 w-4" />
                <span>Share</span>
              </a>
              <a
                href="#"
                className="flex px-4 py-2 text-xs font-medium text-slate-500 transition-all hover:text-blue-600 dark:text-slate-200 hover:dark:text-blue-600"
              >
                <TrashIcon className="me-2 w-4" />
                <span>Delete</span>
              </a>
            </li>
          </ul>
        </Menu.Items>
      </Menu> */}
    </li>
  );
};

export default ChatItem;
