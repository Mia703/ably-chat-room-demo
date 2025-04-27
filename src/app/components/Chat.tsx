import { Message, OrderBy } from "@ably/chat";
import { useChatConnection, useMessages } from "@ably/chat/react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { User } from "../utils/interfaces";

interface ChatProps {
  user: User;
}

// TODO: How do I get updates from others to display

export const Chat: React.FC<ChatProps> = ({ user }) => {
  // const [loading, setLoading] = useState(true);
  const [messageHistory, setMessageHistory] = useState<Message[]>([]);

  const { currentStatus } = useChatConnection({
    onStatusChange: (statusChange) => {
      console.log("Connection status changed to:", statusChange.current);
    },
  });

  const { roomStatus, roomError, send, get } = useMessages();

  // on page load get previous message history
  useEffect(() => {
    get({
      limit: 100,
      orderBy: OrderBy.OldestFirst,
    }).then((result) => {
      setMessageHistory(result.items);
    });
  }, [get, messageHistory]);

  const formik = useFormik({
    initialValues: {
      message: "",
    },
    onSubmit: async (values) => {
      // send message
      send({
        text: values.message,
      });

      // get new message from history
      get({
        limit: 100,
        orderBy: OrderBy.OldestFirst,
      }).then((result) => {
        setMessageHistory(result.items);
      });

      formik.resetForm();
    },
  });

  return (
    <div>
      <p>Connection status is: {currentStatus}</p>
      <p>Room status is: {roomStatus}</p>
      {roomError ? <p>Room error is: {roomError.message}</p> : <p>No error</p>}

      <h2>Message History from Alby</h2>
      {messageHistory.map((msg, index) => (
        <p key={index} className="message">
          {index}: {msg.text}, written by:{" "}
          {msg.clientId === user.id
            ? `${user.firstName} ${user.lastName}`
            : "Other"}
        </p>
      ))}

      <form action="" method="post" onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="message"
          id="message"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.message}
          placeholder="Type message..."
        />

        {currentStatus === "connected" && roomStatus === "attached" ? (
          <button type="submit">Send Message</button>
        ) : (
          <button type="submit" disabled>
            Send Message
          </button>
        )}
      </form>
    </div>
  );
};
