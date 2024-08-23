import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import { Button, ButtonIcon, Tooltip } from "../../../../../components";
import { AxiosGet } from "../../../../../utilities/fetcher";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/core/StoreWrapper";
import { useDispatch } from "react-redux";
import { setChat } from "../../redux/redux";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
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
        <div>
          {" "}
          <div className="flex items-center gap-x-2">
            <div className="inline-flex h-8 w-8 flex-shrink-0 overflow-hidden rounded-full border-2 border-white ">
              <img src="/images/avatar/bots/1.jpg" alt="" />
            </div>
            <h6 className="text-sm font-bold capitalize text-slate-600 ">
              easy order
            </h6>
          </div>
          <iframe
            src="https://lottie.host/embed/b65204e5-fb50-4f78-8429-73c5a3f75521/DmiHyMR5jd.json"
            className="ml-8 h-12 w-12"
            loading="lazy"
          ></iframe>
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
