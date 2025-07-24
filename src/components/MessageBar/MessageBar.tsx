"use client"

import { useState } from "react";

type MessageBarProps = {
  input: string;
}

function MessageBar(props: MessageBarProps) {

  const [message, setMessage] = useState('');

  const sendMessage = () => {
    console.log("message sent!");
    setMessage('');
  }

  const sendFailed = () => {
    console.log("boo");
  }

  const send = () => {
    if (message) {
        sendMessage();
    } else {
        sendFailed();
    }
  } 

  return (
    <div className="flex bg-[#E0E0E0]">
      <div className="grow-1 p-2 pr-8 text-[1.4rem] rounded-full bg-white m-3 align-baseline">
        <input className="outline-none text-[1.4rem] rounded-full ml-3 align-baseline"
            placeholder="message"
            // on change, set the message to the new one
            onChange={(newMsg) => setMessage(newMsg.target.value)}
            onKeyDown={(e) => {
              e.key == 'Enter' && send();
            }}
            value={message}>
        </input>
      </div>
      <div 
        id="send"
        className="w-13 h-13 p-2 rounded-full bg-[#233436] m-3 
        hover:bg-[#FF5A5F]"
        style={{}}
        onClick={() => {
            send();
        }}>
        <img src='https://uxwing.com/wp-content/themes/uxwing/download/communication-chat-call/send-white-icon.png'
        className="w-8 h-8 mt-1 mr-1"></img>
      </div>
      
    </div>
  );
}


export default MessageBar;