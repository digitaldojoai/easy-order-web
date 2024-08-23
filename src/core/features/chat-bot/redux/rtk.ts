import { mainApi } from "@/core/rtk-query";

export const extendedApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    getThreads: build.query<any, void>({
      query: () => `threads`,
    }),
    getLanguages: build.query<any, void>({
      query: () => `threads/languages`,
      transformResponse: (response: string[]) => {
        console.log("response", response);
        return response.map((lang: string) => {
          return {
            label: lang.charAt(0).toUpperCase() + lang.slice(1),
            value: lang,
          };
        });
      },
    }),
    checkAuth: build.query<any, void>({
      query: () => `/users/me`,
    }),
    getThreadMessages: build.query<any, string>({
      query: (threadId) => `/threads/${threadId}`,
      transformResponse: (response: any) => {
        const data = response.messages.map((message: any, index: number) => {
          return {
            from: message.role,
            text: message.content[0].text.value,
            isInitial: index === 0,
            isSummary: index === 1,
            fileId: message.content[0].text?.annotations[0]?.file_path?.file_id,
            filesId: response.uploaded_files_urls,
            messageId: message.id,
            messageNumber: index,
          };
        });
        console.log("this is the data", data);
        return data;
      },
    }),
    sendMessageThread: build.mutation<
      any,
      {
        threadId: string;
        data: any;
      }
    >({
      query: ({ threadId, data }) => ({
        url: `/threads/${threadId}/messages`,
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (
        { threadId, data },
        { dispatch, queryFulfilled }
      ) => {
        console.log("threadId", threadId);
        try {
          const { data: newChat } = await queryFulfilled;

          dispatch(
            extendedApi.util.updateQueryData(
              "getThreadMessages",
              threadId,
              (draft) => {
                draft.push({ from: "user", text: data.content });
                draft.push({
                  from: newChat[1].role,
                  text: newChat[1].content[0].text.value,
                  fileId:
                    newChat[1].content[0].text?.annotations[0]?.file_path
                      ?.file_id,
                  messageId: newChat[1].id,
                });
              }
            )
          );
        } catch (err) {
          console.log("error updating message", err);
        }
      },
    }),
    sendFirstMessage: build.mutation<any, any>({
      query: ({ data, threadId }: { data: FormData; threadId: string }) => ({
        url: `/threads`,
        method: "POST",
        body: data,
      }),
      onQueryStarted: async ({ threadId }, { dispatch, queryFulfilled }) => {
        try {
          const { data: newChat } = await queryFulfilled;

          dispatch(
            extendedApi.util.updateQueryData(
              "getThreadMessages",
              threadId,
              (draft) => {
                const stringified = JSON.stringify(draft);
                console.log("message", JSON.parse(stringified));
              }
            )
          );
        } catch (err) {
          console.log("error updating message", err);
        }
      },
    }),
  }),
});

export const {
  useGetThreadsQuery,
  useGetLanguagesQuery,
  useCheckAuthQuery,
  useSendMessageThreadMutation,
  useGetThreadMessagesQuery,
  useSendFirstMessageMutation,
} = extendedApi;
