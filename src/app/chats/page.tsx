import ChatTab from "@/components/ChatTab/ChatTab";
import { FC } from "react";

type ChatProps = {
  count: number;
  msg: string;
}

const ChatsPage: FC<ChatProps> = (props) => {
  return (
    <section>
      <ChatTab 
        count={10}
        msg='ily'
        name='hello'
        time='11:59pm'
      ></ChatTab>
      <ChatTab 
        count={0}
        msg='supercalifragilisticexpialadocious'
        name='birdfish'
        time='3:03am'
      ></ChatTab>
    </section>
  );
}


export default ChatsPage;