import ChatTab from "@/components/ChatTab/ChatTab";
import { FC } from "react";

type ChatProps = {
  count: number;
  msg: string;
}

const dummyData = [
  {
    name: 'birdfish',
    time: '3:03am',
    count: 96,
    msg: 'weve been trying to reach you about your'
  },
  {
    name: 'elf',
    time: '3:03am',
    count: 0,
    msg: 'cba'
  },
  {
    name: 'sagdn',
    time: '12:00pm',
    count: 800,
    msg: 'hop on lol'
  },
  {
    name: 'mr simson',
    time: '7:03am',
    count: 4,
    msg: 'yum'
  },
  {
    name: 'cod',
    time: '3:09am',
    count: 0,
    msg: 'ily'
  },
]

const ChatsPage: FC<ChatProps> = (props) => {
  return (
    <section>
      {
        dummyData.map((x) => <ChatTab
          name={x.name}
          time={x.time}
          msg={x.msg}
          count={x.count}
          // add group to this so key is unique
          key={x.name}
        ></ChatTab>)
      }
    </section>
  );
}


export default ChatsPage;