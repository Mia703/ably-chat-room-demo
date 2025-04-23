"use client";
import * as Ably from "ably";
import { ChatClient, LogLevel, AllFeaturesEnabled } from "@ably/chat";
import { ChatClientProvider, ChatRoomProvider } from "@ably/chat/react";
import { User } from "../utils/interfaces";
import { Chat } from "./Chat";

interface ChatRoomProps {
  user: User;
}

export const ChatRoom: React.FC<ChatRoomProps> = ({ user }) => {

  const realtimeClient = new Ably.Realtime({
    key: process.env.NEXT_PUBLIC_ABLY_API_KEY,
    clientId: user.id,
  });

  const chatClient = new ChatClient(realtimeClient, {
    logLevel: LogLevel.Error,
  });

  /***
   * Users send messages to a room and subscribe to the room in order to receive messages.
   * The ChatRoomProvider provides access to a specific chat room to all child components in the
   * component tree.
   *
   * By default the ChatRoomProvider will automatically call attach() on the room when it first mounts.
   */
  return (
    <div id="chat-room">
      <ChatClientProvider client={chatClient}>
        <ChatRoomProvider id="my-chat-room" options={AllFeaturesEnabled}>
          <Chat user={user} />
        </ChatRoomProvider>
      </ChatClientProvider>
    </div>
  );
}
