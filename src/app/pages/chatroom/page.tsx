"use client";
import ChatRoom from "@/app/components/ChatRoom";
import LoggedOut from "@/app/components/LoggedOut";
import LogoutBtn from "@/app/components/LogoutBtn";
import { useEffect, useState } from "react";

export default function Chatroom() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const user = window.sessionStorage.getItem("user");

    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="col-span-4 md:col-span-6 lg:col-span-12">
      {isLoggedIn ? (
        <div className="p-4">
          <LogoutBtn />
          <ChatRoom />
        </div>
      ) : (
        <LoggedOut />
      )}
    </div>
  );
}
