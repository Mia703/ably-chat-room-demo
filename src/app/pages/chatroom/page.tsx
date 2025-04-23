"use client";
import { ChatRoom } from "@/app/components/ChatRoom";
import LoggedOut from "@/app/components/LoggedOut";
import LogoutBtn from "@/app/components/LogoutBtn";
import { User } from "@/app/utils/interfaces";
import { useEffect, useState } from "react";

export default function Chatroom() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const user = window.sessionStorage.getItem("user");

    if (user) {
      setUser(JSON.parse(user) as User);
    }
  }, []);

  return (
    <div className="col-span-4 md:col-span-6 lg:col-span-12">
      {user ? (
        <div className="p-4">
          <LogoutBtn />
          <ChatRoom user={user} />
        </div>
      ) : (
        <LoggedOut />
      )}
    </div>
  );
}
