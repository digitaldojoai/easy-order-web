import { PlusCircleIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useRef, useState } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  MenuItemStyles,
  menuClasses,
} from "react-pro-sidebar";
import { AxiosGet } from "../../../../utilities/fetcher";
import ChatItem from "./ChatItem";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Loader from "@/components/Loader";
import { useGetThreadsQuery } from "../redux/rtk";
import { useDispatch } from "react-redux";
import { setBroken, setChat, setToggle } from "../redux/redux";
import { useAppSelector } from "@/core/StoreWrapper";
const themes = {
  light: {
    sidebar: {
      backgroundColor: "#ffffff",
      color: "#607489",
    },
    menu: {
      menuContent: "#fbfcfd",
      icon: "#0098e5",
      hover: {
        backgroundColor: "#c5e4ff",
        color: "#44596e",
      },
      disabled: {
        color: "#9fb6cf",
      },
    },
  },
  dark: {
    sidebar: {
      backgroundColor: "#0b2948",
      color: "#8ba1b7",
    },
    menu: {
      menuContent: "#082440",
      icon: "#59d0ff",
      hover: {
        backgroundColor: "#00458b",
        color: "#b6c8d9",
      },
      disabled: {
        color: "#3e5e7e",
      },
    },
  },
};
function SideBar({ chatWindow, mobile, refetch, listVisibility }: any) {
  const dispatch = useDispatch();
  const { broken, collapsed, toggle } = useAppSelector(
    (state) => state.BotSlice
  );
  const [rtl, setRtl] = useState(false);
  const [hasImage, setHasImage] = useState(false);
  let searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [items, setItems] = useState([
    {
      thread_id: "thread_w1hvZUgfBEDFpI8GqhRSnouT",
      id: "66c3746ae1ab8bc56103c59f",
    },
  ]);
  const {
    data,
    error,
    isLoading,
    refetch: refetchThreads,
  } = useGetThreadsQuery();
  useEffect(() => {
    refetchThreads();
  }, [refetch]);
  const router = useRouter();
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  const menuItemStyles: MenuItemStyles = {
    root: {
      fontSize: "13px",
      fontWeight: 400,
    },
    icon: {
      color: themes["light"].menu.icon,
      [`&.${menuClasses.disabled}`]: {
        color: themes["light"].menu.disabled.color,
      },
    },
    SubMenuExpandIcon: {
      color: "#b6b7b9",
    },
    subMenuContent: ({ level }) => ({
      backgroundColor:
        level === 0
          ? hexToRgba(themes["light"].menu.menuContent, 1)
          : "transparent",
    }),
    button: {
      margin: "0.5rem 1rem",
      borderRadius: "8px",
      [`&.${menuClasses.disabled}`]: {
        color: themes["light"].menu.disabled.color,
      },
      "&:hover": {
        backgroundColor: hexToRgba(
          themes["light"].menu.hover.backgroundColor,
          1
        ),
        color: themes["light"].menu.hover.color,
        transition: "all 0.2s ease",
      },
      // "&:focus": {
      //   backgroundColor: hexToRgba(
      //     themes[theme].menu.hover.backgroundColor,
      //     hasImage ? 0.8 : 1
      //   ),
      //   color: "var(--primary)",
      // },
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
  };

  return (
    <div
      style={{
        display: "flex",
        direction: "ltr",
      }}
      className=" z-20 h-[calc(100vh-2rem)]"
    >
      {data?.length ? (
        <Sidebar
          collapsed={collapsed}
          toggled={toggle}
          onBackdropClick={() => setToggle(false)}
          onBreakPoint={() => {
            // dispatch
            dispatch(setBroken(true));
          }}
          rtl={rtl}
          breakPoint="md"
          backgroundColor={hexToRgba(
            themes["light"].sidebar.backgroundColor,
            hasImage ? 0.9 : 1
          )}
          rootStyles={{
            color: themes["light"].sidebar.color,
            width: toggle ? "max-md:w-[75vh]" : "",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              position: "relative",
            }}
          >
            <div
              style={{ flex: 1, marginBottom: "32px", position: "relative" }}
              className="relative"
            >
              <div
                className="px-4 pl-8 pt-4 sm:px-7 sm:pt-7 md:mx-[26px] max-md:mx-[10px]"
                style={{
                  padding: "0 24px",
                  marginBottom: "8px",
                  marginTop: "32px",
                }}
              >
                <div
                  className="mb-8 flex cursor-pointer justify-between items-center gap-4 "
                  // onClick={() => {
                  //   setListVisibility(false);
                  // }}
                >
                  <p className="text-[22px]">Order History</p>
                  <p
                    className="md:hidden"
                    onClick={() => {
                      dispatch(setToggle(false));
                    }}
                  >
                    X
                  </p>
                </div>
                <button
                  className="flex items-center gap-x-2 text-sm text-blue-600"
                  onClick={() => {
                    mobile && dispatch(setToggle(false));
                    router.push("/chat-bot");
                    dispatch(setChat([]));
                  }}
                >
                  <PlusCircleIcon className="h-4" />
                  <span>New Conversation</span>
                </button>
              </div>
              {data?.map((item: any, index: any) => {
                return (
                  <div key={index}>
                    {item.title && (
                      <div
                        style={{
                          padding: "0 24px",
                          marginBottom: "8px",
                          marginTop: "32px",
                        }}
                      >
                        <p
                          style={{
                            opacity: 0.7,
                            letterSpacing: "0.5px",
                          }}
                        >
                          {item.thread_id}
                        </p>
                      </div>
                    )}

                    <Menu menuItemStyles={menuItemStyles} key={index}>
                      <MenuItem
                        style={{
                          fontWeight: 500,
                          color: id === `${item.id}` ? "var(--primary)" : "",
                          backgroundColor:
                            id === `${item.id}`
                              ? themes["light"].menu.hover.backgroundColor
                              : "",
                        }}
                      >
                        <ChatItem data={item} mobile={mobile} count={index} />{" "}
                      </MenuItem>
                    </Menu>
                  </div>
                );
              })}
            </div>
            <div
              className="cursor-pointer p-4 sm:p-6 bg-white w-full"
              style={{
                position: "sticky",
                bottom: 0,
                left: 0,
                right: 0,
              }}
              onClick={() => {
                localStorage.removeItem("token");
                router.push("/login");
              }}
            >
              <div className="flex items-center justify-center rounded-lg border border-slate-200 py-2 transition-all hover:border-blue-200">
                <div className="">
                  <h3 className="text-center font-bold text-slate-600">
                    Logout
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </Sidebar>
      ) : (
        <div
          style={{
            height: "90vh",
            direction: rtl ? "rtl" : "ltr",
            backgroundColor: "white",
            width: "25vw",
          }}
          className=" bg-white flex justify-center items-center max-md:hidden relative"
        >
          <Loader />
        </div>
      )}
    </div>
  );
}

export default SideBar;
