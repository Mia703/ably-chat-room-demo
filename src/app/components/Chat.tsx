import { Message, OrderBy } from "@ably/chat";
import { useChatConnection, useMessages } from "@ably/chat/react";
import { useFormik } from "formik";
import { useState } from "react";

export default function Chat() {
  const [receivedMessages, setMessages] = useState<Message[]>([]);
  const [messageList, setMessageList] = useState<string[]>([]);

  const { currentStatus } = useChatConnection({
    onStatusChange: (statusChange) => {
      console.log("Connection status changed to: ", statusChange.current);
    },
  });

  const { roomStatus, roomError, send, get } = useMessages();

  // listen for messages
  // useMessages({
  //   listener: (event) => {
  //     console.log("Received message: ", event.message);
  //   },
  // });

  // send messages

  const formik = useFormik({
    initialValues: {
      message: "",
    },
    onSubmit: (values) => {
      send({
        text: values.message,
      });
      // TODO: idk if this works if another person is in the chat room
      setMessageList([...messageList, values.message]);
      formik.resetForm();
    },
  });

  // message history
  // useEffect(() => {
  // 	get({
  //     limit: 100, // max is 1,000
  //     orderBy: OrderBy.OldestFirst,
  //   }).then((result) => {
  //     console.log("Previous messages: ", result);
  //     setMessages(result.items);
  //   });
  // }, []);

  // TODO: useState of send message input, on input change rerender message history?
  const handleGetMessages = () => {
    get({
      limit: 100, // max is 1,000
      orderBy: OrderBy.OldestFirst,
    }).then((result) => {
      console.log("Previous messages: ", result.items);
      setMessages(result.items);
    });
  };

  return (
    <div>
      <p>Connection status is: {currentStatus}</p>
      <p>Room status is: {roomStatus}</p>
      {roomError ? <p>Room error is: {roomError.message}</p> : <p>No error</p>}

      <form action="" method="post" onSubmit={formik.handleSubmit}>
        <textarea
          name="message"
          id="message"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.message}
          placeholder="Type message..."
        ></textarea>
        <button type="submit">Send Message</button>
      </form>
      <button type="button" onClick={handleGetMessages}>
        Get Prev Messages
      </button>

      <h2>Static Message List</h2>
      {messageList.map((message, index) => (
        <p key={index}>{message}</p>
      ))}

      {/* TODO: currently only loads after selected "get prev messages" */}
      <h2>(Dynamic) Received Messages Ably</h2>
      {receivedMessages.map((message, index) => (
        <p key={index}>
          {index}: {message.text}
        </p>
      ))}
    </div>
  );
}
