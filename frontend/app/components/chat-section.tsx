"use client";

import { useChat } from "ai/react";
import { useMemo } from "react";
import { insertDataIntoMessages } from "./transform";
import { ChatInput, ChatMessages } from "./ui/chat";
import { ChatRequestOptions } from "ai";

interface ChatSectionProps {
  api: string;
  jurisdiction: string;
  source: string;
  type: string;
}

export default function ChatSection({ api, jurisdiction, source, type }: ChatSectionProps) {
  const {
    messages,
    input,
    isLoading,
    handleSubmit,
    handleInputChange,
    reload,
    stop,
    data,
  } = useChat({
    api: process.env.NEXT_PUBLIC_CHAT_API + api,
    headers: {
      "Content-Type": "application/json", // using JSON because of vercel/ai 2.2.26
    },
    sendExtraMessageFields: true,
  });

  const transformedMessages = useMemo(() => {
    return insertDataIntoMessages(messages, data);
  }, [messages, data]);

  const injectedHandleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions
  ) => {
    // Merge jurisdiction, source, and type with any existing data
    const updatedChatRequestOptions: ChatRequestOptions = {
      ...chatRequestOptions,
      data: {...(chatRequestOptions?.data || {}),
        jurisdiction,
        source,
        type,
      },
    };

    handleSubmit(e, updatedChatRequestOptions);
  }

  return (
    <>
      <ChatMessages
        messages={transformedMessages}
        isLoading={isLoading}
        reload={reload}
        stop={stop}
      />

      <ChatInput
        input={input}
        handleSubmit={injectedHandleSubmit}
        handleInputChange={handleInputChange}
        isLoading={isLoading}
        multiModal={process.env.NEXT_PUBLIC_MODEL === "gpt-4-vision-preview"}
      />
    </>
  );
}
