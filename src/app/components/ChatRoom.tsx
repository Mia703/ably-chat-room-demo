"use client";
import * as Ably from "ably";
import { ChatClient, LogLevel, AllFeaturesEnabled } from "@ably/chat";
import { ChatClientProvider, ChatRoomProvider } from "@ably/chat/react";
import Chat from "./Chat";
import { useEffect, useState } from "react";
import { User } from "../utils/interfaces";

export default function ChatRoom() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const user_data = window.sessionStorage.getItem("user");
    if (user_data) {
      setUser(JSON.parse(user_data));
    }
  }, []);

  const realtimeClient = new Ably.Realtime({
    key: process.env.NEXT_PUBLIC_ABLY_API_KEY,
    clientId: user ? user.id : "no-client-id", // client id is xata user's table id
    // clientId: 'no-client-id'
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
          <Chat />
        </ChatRoomProvider>
      </ChatClientProvider>
    </div>
  );
}
