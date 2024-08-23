"use client";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components";
import Loader from "@/components/Loader";
import ProfileImage from "@/components/ProfileImage";
import Container from "@/layout/global/Container";
import Section from "@/layout/global/Section";
import { baseUrl } from "@/utilities/constants";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useCheckAuthQuery,
  useGetLanguagesQuery,
  useGetThreadMessagesQuery,
  useSendFirstMessageMutation,
  useSendMessageThreadMutation,
} from "../redux/rtk";
import NoChatComp from "./NoChatComp";
import SideBar from "./SideBar";
import Chats from "./chats";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/core/StoreWrapper";
import { setChat, setToggle } from "../redux/redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function ChatBotS2() {
  const router = useRouter();
  const chatWindow = useRef(null);
  let params = useSearchParams();
  const id = params.get("id");
  const [mobile, setMobile] = useState(false);

  const dispatch = useDispatch();
  const { chat, toggle } = useAppSelector((state) => state.BotSlice);
  const [selectedFiles, setSelectedFiles] = useState<any>([]);
  const [sidebarRefetch, setSidebarRefetch] = useState(0);

  const [excelFile, setExcelFile] = useState("");
  const [message, setMessage] = useState("");
  const [selectedCount, setSelectedCount] = useState<any>();

  const {
    isLoading: loadingLanguages,
    data: languages,
    error: languagesError,
  } = useGetLanguagesQuery();

  const {
    isLoading: fetchAuthIsLoading,
    data: fetchAuthData,
    error: fetchAuthError,
    isSuccess: fetchAuthIsSuccess,
  } = useCheckAuthQuery();

  useEffect(() => {
    if (fetchAuthError) {
      router.push("/login");
    }
  }, [fetchAuthError]);

  useEffect(() => {
    if (languages && languages.length) {
      setSelectedCount({
        name: languages[0].label,
        value: languages[0].value,
      });
    }
  }, [languages]);

  const [chatData, setChatData] = useState<any>(null);
  const {
    data: fetchChatData,
    isLoading: chatIsLoading,
    error: chatError,
    refetch: refetchNessages,
  } = useGetThreadMessagesQuery(id as string, {
    skip: !id || id === "error_sending_message",
  });
  useEffect(() => {
    if (id) {
      setChatData([]);
    }
  }, [id]);
  useEffect(() => {
    if (fetchChatData) {
      setChatData(fetchChatData);
      dispatch(setChat(fetchChatData));
    }
  }, [fetchChatData]);

  // useEffect(() => {
  //   if (chatData) {

  //   }
  // }, [chatData]);

  useEffect(() => {
    const handleMobile = () => {
      if (window.innerWidth < 1140) {
        setTimeout(() => setMobile(true), 3000);
      } else {
        setMobile(false);
      }
    };
    handleMobile();
    window.addEventListener("resize", handleMobile);
    return () => {
      window.removeEventListener("resize", handleMobile);
    };
  }, []);
  useEffect(() => {
    if (window.innerWidth > 1140) {
    }
  }, [mobile]);

  const fileInputRef = useRef(null);

  const handleFileChange = (event: any) => {
    const files = event.target.files;
    if (files.length > 0) {
      if (selectedFiles.length) {
        setSelectedFiles([...selectedFiles, ...files]);
      } else {
        setSelectedFiles([...files]);
      }
      // Handle the selected file here (e.g., upload it to your server)
    }
  };

  const [
    sendThreadMessage,
    {
      isLoading: sendThreadMessageLoading,
      error: sendThreadMessageError,
      data: sendThreadMessageData,
    },
  ] = useSendMessageThreadMutation();
  const handleSendMessageThread = (threadId: any, content: any) => {
    sendThreadMessage({
      threadId,
      data: {
        content,
      },
    });
  };
  const [
    sendFirstMessage,
    {
      isLoading: sendFirstMessageLoading,
      error: sendFirstMessageError,
      data: sendFirstMessageData,
      isError: sendFirstMessageIsError,
    },
  ] = useSendFirstMessageMutation();
  useEffect(() => {
    if (sendFirstMessageData) {
      router.push(`/chat-bot?id=${sendFirstMessageData.thread.id}`);
      setExcelFile(sendFirstMessageData.thread.excel_file_url);
      setSidebarRefetch((prev) => prev + 1);
    }
    if (sendFirstMessageIsError) {
      const updatedChat = chat.filter((item: any) => !item.loading);
      dispatch(
        setChat([
          ...updatedChat,
          {
            from: "assistant",
            text: "Sorry, I am unable to process your request",
          },
        ])
      );

      router.push("?id=error_sending_message");
    }
  }, [sendFirstMessageData, sendFirstMessageIsError]);
  function handleSend() {
    const formData = new FormData();
    selectedFiles.forEach((file: any) => {
      formData.append("files", file);
    });
    formData.append("language", selectedCount.value);
    sendFirstMessage({ data: formData, threadId: id });
  }

  useEffect(() => {
    if (sendFirstMessageData) {
      dispatch(
        setChat([
          ...chat,
          {
            from: sendFirstMessageData.message.role,
            text: sendFirstMessageData.message.content[0].text.value,
            fileId:
              sendFirstMessageData.message.content[0].text?.annotations[0]
                ?.file_path?.file_id,
            messageId: sendFirstMessageData.message.id,
          },
        ])
      );
    }
  }, [sendFirstMessageData]);

  const SendButtonRef = useRef(null);
  window.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      (SendButtonRef?.current as HTMLDivElement | null)?.click();
    }
  });
  const BottomDiv = useRef(null);
  console.log("this is the chat", chat);
  return (
    <div title="Chat Bot">
      {fetchAuthIsLoading ? (
        <div className="h-screen">
          <Loader />
        </div>
      ) : (
        fetchAuthIsSuccess && (
          <Section className="">
            <Container className={""}>
              <div className=" flex h-[calc(100vh-2rem)] min-h-[95dvh] gap-x-8">
                {/* {listVisibility && mobile && (
                <div
                  onClick={() => {
                    setListVisibility(false);
                  }}
                  className="fixed inset-0 z-[1019] bg-slate-950 bg-opacity-50 max-xl:-top-4 "
                ></div>
              )} */}
                <div
                  className={classNames({
                    "max-sm:hidden max-md:w-[75vh]": !toggle,

                    // hidden: !mobile && !listVisibility,
                  })}
                >
                  <SideBar
                    chatWindow={chatWindow}
                    mobile={mobile}
                    refetch={sidebarRefetch}
                    listVisibility={true}
                  />
                </div>
                <div className="relative w-full max-w-full ">
                  <button
                    onClick={() => {
                      dispatch(setToggle(true));
                    }}
                    className={classNames({
                      "fixed top-2 start-2 z-10 inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded bg-slate-200 text-slate-500 transition-all ui-open:bg-slate-200 ui-open:text-slate-600 hover:bg-slate-300 hover:text-slate-600   ":
                        true,
                      "xl:hidden": true,
                      // "start-0": !selectedChat,
                      // "start-4": selectedChat,
                    })}
                  >
                    <FontAwesomeIcon icon={faBars} />
                  </button>
                  <div className="flex h-full flex-col justify-stretch w-full">
                    {(!chatData?.length &&
                      id &&
                      id !== "error_sending_message") ||
                    chatIsLoading ||
                    loadingLanguages ||
                    !languages ? (
                      <div className="relative h-full flex-grow overflow-auto rounded-lg border border-slate-200 bg-white ">
                        <div className="grid grid-cols-5">
                          <div className="col-span-3 flex items-center justify-end max-sm:hidden">
                            <img
                              src={"/logo.png"}
                              className="w-[15rem] max-sm:w-[10rem]"
                            />
                          </div>
                          <div className="col-span-2 flex items-start justify-end max-sm:col-span-5 ">
                            <ProfileImage />
                          </div>
                        </div>
                        <Loader />
                      </div>
                    ) : chat.length ? (
                      <div
                        ref={chatWindow}
                        id="chat-window"
                        aria-placeholder="Chat Window"
                        className="relative h-full flex-grow overflow-auto rounded-lg border border-slate-200 bg-white "
                      >
                        {/* <div className="fixed right-12 top-12 max-sm:right-4 max-sm:top-4">
                        <ProfileImage />
                      </div> */}

                        <div className="-my-2.5 flex min-h-full  flex-col justify-end p-4 sm:p-6 overflow-y-auto ">
                          <Chats
                            chat={chat}
                            baseUrl={baseUrl}
                            excelFile={excelFile}
                            setChat={setChat}
                            loadingMessage={
                              sendThreadMessageLoading ||
                              sendFirstMessageLoading
                            }
                            lastMessageIndex={chat.length - 1}
                            // handleTopScreen={() => {
                            //   if (fetchChatData) {
                            //     setLastMessage(fetchChatData.last_messages.last_id);
                            //   }
                            //   if (newData) {
                            //     console.log(newData.last_id);
                            //     setLastMessage(newData.last_id);
                            //   }
                            // }}
                            // lastMessage={lastMessage}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="relative flex h-full flex-col justify-start ">
                        <div className="grid grid-cols-5">
                          <div className="col-span-3 flex items-center justify-end max-sm:hidden">
                            <img
                              src={"/logo.png"}
                              className="w-[15rem] max-sm:w-[10rem]"
                            />
                          </div>
                          <div className="col-span-2 flex items-start justify-end max-sm:col-span-5 ">
                            <ProfileImage />
                          </div>
                        </div>
                        <div className="flex flex-col justify-center relative max-lg:bottom-16 lg:bottom-24  pt-4 max-md:px-[0]  xl:px-[5rem] 2xl:px-[15rem] h-full  ">
                          <div className="pb-7 ">
                            <h2 className=" w-max bg-gradient-to-r from-blue-600 to-pink-500 bg-clip-text pb-2 text-3xl xl:text-5xl font-bold text-transparent ">
                              Hi there, Ryaan
                            </h2>
                            <h4 className="text-md text-slate-600 ">
                              To ensure we process your order quickly, please
                              upload a picture or take a picture of your order
                              sheet. This allows us to process it instantly.
                              Thank you!
                            </h4>
                          </div>
                          <NoChatComp
                            selectedFiles={selectedFiles}
                            setSelectedFiles={setSelectedFiles}
                            fileInputRef={fileInputRef}
                            handleFileChange={handleFileChange}
                            selectedCount={selectedCount}
                            setSelectedCount={setSelectedCount}
                            LanguageOptions={languages}
                          />
                          {selectedFiles.length && !chat.length ? (
                            <div className="flex w-full items-center justify-center pt-4">
                              <Button
                                onClick={() => {
                                  if (
                                    (selectedFiles.length && !id) ||
                                    (selectedFiles.length &&
                                      id === "error_sending_message")
                                  ) {
                                    dispatch(
                                      setChat([
                                        ...chat,
                                        { from: "user", files: selectedFiles },
                                        { from: "assistant", loading: true },
                                      ])
                                    );
                                    setSelectedFiles([]);
                                    handleSend();
                                  }
                                }}
                                className={`${"bg-blue-600 hover:bg-blue-800"} text-white `}
                              >
                                Process Uploaded Files
                              </Button>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    )}
                    {chat.length ? (
                      <div className="pt-3" ref={BottomDiv}>
                        <div className="mt-3 flex items-start gap-4">
                          <input
                            onChange={(e) => {
                              setMessage(e.target.value);
                            }}
                            value={message}
                            placeholder="Send a message"
                            className="z-10 w-full rounded-md border border-slate-200 bg-white px-4 py-2.5 text-sm/[1.125rem] text-slate-600 placeholder:text-slate-400 focus:border-blue-200 focus:shadow-none focus:outline-none disabled:bg-slate-100 disabled:text-slate-400 "
                          />
                          {/* <ButtonIcon className="bg-blue-600 text-white hover:bg-blue-800"> */}
                          <div
                            ref={SendButtonRef}
                            onClick={() => {
                              if (
                                (selectedFiles.length && !id) ||
                                (selectedFiles.length &&
                                  id === "error_sending_message")
                              ) {
                                dispatch(
                                  setChat(
                                    chat.concat([
                                      {
                                        from: "user",
                                        files: selectedFiles,
                                      },
                                    ])
                                  )
                                );
                                setSelectedFiles([]);
                                handleSend();
                              } else if (message && id) {
                                dispatch(
                                  setChat(
                                    chat.concat([
                                      { from: "user", text: message },
                                    ])
                                  )
                                );
                                handleSendMessageThread(id, message);
                                setMessage("");
                              }
                            }}
                          >
                            <Button
                              className={`${"bg-blue-600 hover:bg-blue-800"} text-white`}
                            >
                              send
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </Container>
          </Section>
        )
      )}
    </div>
  );
}

export default ChatBotS2;
