"use client"

import Message from "@/components/Message/Message";
import { FC } from "react";
import { useParams } from "next/navigation";

type MessagesProps = {
  chats;
  username: string;
}

const Messages: FC<MessagesProps> = (props) => {
    const params = useParams();
    const partner = params.partner as string;

  return (
      <>
        {props.chats[partner].messages.map((x) => 
            // make key some string of the metadata
            <Message msg={x.message} sender={x.sender} user={props.username} key={x.index}></Message>
        )}
      </>
  );
}

export default Messages;