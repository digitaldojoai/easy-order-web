import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import { Button, ButtonIcon, Tooltip } from "../../../../../components";
import { AxiosGet } from "../../../../../utilities/fetcher";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/core/StoreWrapper";
import { useDispatch } from "react-redux";
import { setChat } from "../../redux/redux";

function Index({ baseUrl, excelFile, loadingMessage, lastMessageIndex }: any) {
  const BottomDiv = useRef<HTMLDivElement>(null);
  const [lastLocalMessage, seLastLocalMessage] = useState("");
  const firstLoad = useRef(true);
  let searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { chat } = useAppSelector((state) => state.BotSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    if (BottomDiv.current) {
      BottomDiv.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat]);
  const [
    {
      data: fetchAudio,
      isLoading: isFetchAudioLoading,
      error: fetchAudioError,
      messageId,
    },
    setFetchAudio,
  ] = useState({
    data: null,
    isLoading: false,
    error: null,
    messageId: null,
  });
  const playAudio = (message: any) => {
    // if this audio was playing, just pause it
    if (message.audio?.paused === false) {
      message.audio?.pause();
      return;
    }
    pauseAllAudioAndVideo();
    const audio = message.audio;

    if (audio) {
      audio.play();
    }
  };

  useEffect(() => {
    if (messageId) {
      getAudio(messageId, id);
    }
  }, [messageId]);

  const getAudio = (messageId: any, id: any) => {
    AxiosGet(
      `/threads/${id}/messages/${messageId}/voice`,
      null,
      setFetchAudio
    ).then((res) => {
      const audio = new Audio(res.url);
      audio.id = `audio-${id}`;
      audio.preload = "auto";
      audio.load();
      const message = chat
        .map((message: any) => {
          if (message.messageId === messageId) {
            return {
              ...message,
              audio,
            };
          }
          return message;
        })
        .find((message: any) => message.messageId === messageId);
      const prev = chat.map((message: any) => {
        if (message.messageId === messageId) {
          return {
            ...message,
            audio,
          };
        }
        return message;
      });
      dispatch(setChat(prev));

      playAudio(message);
      setFetchAudio((prev) => ({
        ...prev,
        messageId: null,
      }));
    });
  };
  const pauseAllAudioAndVideo = () => {
    const audios = chat.map((message: any) => message.audio);

    // Pause and reset audios from the chat
    audios.forEach((audio: any) => {
      if (audio && !audio.paused) {
        // Check if the audio is currently playing
        audio.currentTime = 0;
        audio.pause();
      }
    });

    // Pause all other audio elements in the DOM
    const audioElements = document.querySelectorAll("audio");
    audioElements.forEach((audio) => {
      if (!audio.paused) {
        // Check if the audio is currently playing
        audio.currentTime = 0;
        audio.pause();
      }
    });
  };
  console.log("loadingMessage", loadingMessage);
  return (
    <>
      {/* <div ref={TopDiv}></div> */}
      {chat.map((item: any, index: any) => {
        return (
          <div key={index} className="flex flex-col py-2.5">
            <div className="flex items-center gap-x-2">
              <div className="inline-flex h-8 w-8 flex-shrink-0 overflow-hidden rounded-full border-2 border-white ">
                {item.from === "user" && (
                  <img src="/images/avatar/a.jpg" alt="" />
                )}
                {item.from === "assistant" && (
                  <img src="/images/avatar/bots/1.jpg" alt="" />
                )}
              </div>
              <h6 className="text-sm font-bold capitalize text-slate-600 ">
                {item.from === "user" ? "you" : "easy order"}
              </h6>
            </div>

            {item.text && (
              <div className="w-full ps-10">
                <div className=" prose max-w-full text-sm text-slate-500 *:max-w-xl prose-code:![text-shadow:none] prose-pre:!w-full prose-pre:!max-w-full prose-pre:p-0  ">
                  {!item.isInitial ? (
                    <Markdown>
                      {item.text.replace(
                        /\[([^\]]+)\]\(sandbox:[^\)]+\)/g, // Capture any link text inside [ ]
                        (match: any, linkText: any) => {
                          return `[${linkText}](${baseUrl}/files/${item.fileId})`; // Replace with the custom URL
                        }
                      )}
                    </Markdown>
                  ) : (
                    <div className="flex flex-wrap items-center gap-2">
                      {item?.filesId?.length &&
                        item.filesId.map((file: any, index: any) => {
                          return (
                            <div
                              key={index}
                              className="h-44 w-32 rounded-md"
                              style={{
                                backgroundImage: `url(${file})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                              }}
                            ></div>
                          );
                        })}
                    </div>
                  )}
                </div>
                {item.from === "assistant" && !item.isSummary && (
                  <ul className="flex gap-x-2 pt-4">
                    <li>
                      <Tooltip
                        content={
                          isFetchAudioLoading && messageId === item.messageId
                            ? "Generate audio"
                            : "Generating an audio"
                        }
                      >
                        <ButtonIcon
                          size="xs"
                          className="border border-slate-200 bg-white text-slate-600 hover:border-blue-500 hover:bg-blue-500 hover:text-white "
                        >
                          {isFetchAudioLoading &&
                          messageId === item.messageId ? (
                            "loading"
                          ) : (
                            <svg
                              onClick={() => {
                                if (item.audio) {
                                  playAudio(item);
                                } else {
                                  setFetchAudio({
                                    data: null,
                                    isLoading: true,
                                    error: null,
                                    messageId: item.messageId,
                                  });
                                }
                              }}
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                              />
                            </svg>
                          )}
                        </ButtonIcon>
                      </Tooltip>
                    </li>
                  </ul>
                )}
              </div>
            )}
            {item.files && (
              <div className="w-full ps-10">
                <div className="mt-2 max-w-sm rounded-lg border border-l-slate-200 p-3 ">
                  <div className="">
                    {item.files.map((file: any, index: any) => {
                      return (
                        <div
                          key={index}
                          className=" flex items-center  gap-2 rounded-md "
                        >
                          <div className="flex w-full items-center justify-between gap-2 ">
                            <h6 className="text-sm font-bold text-slate-600">
                              {file.name}
                            </h6>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {/* <ul className="flex gap-x-2 pt-3">
                    <li>
                      <Tooltip content="Regenerate">
                        <ButtonIcon
                          size="xs"
                          className="border border-slate-200 bg-white text-slate-600 hover:border-blue-500 hover:bg-blue-500 hover:text-white dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 hover:dark:border-blue-500 hover:dark:bg-blue-500 hover:dark:text-white"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                            />
                          </svg>
                        </ButtonIcon>
                      </Tooltip>
                    </li>
                  </ul> */}
                </div>
              </div>
            )}
          </div>
        );
      })}
      {loadingMessage && (
        <div role="status" className="p-4 pl-[2.4rem]">
          <svg
            aria-hidden="true"
            className="h-8 w-8 animate-spin fill-blue-600 text-gray-200 "
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
      <div ref={BottomDiv} className="w-full text-right">
        {excelFile && (
          <Button
            size="md"
            className="border border-slate-300 bg-white text-slate-600   "
            onClick={() => {
              //download the excel sheet from the s3 bucket to the local machine
              window.open(excelFile);
            }}
          >
            Download excel sheet
          </Button>
        )}
      </div>
    </>
  );
}

export default Index;
