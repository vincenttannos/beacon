"use client"

import { useRouter } from "next/navigation";
import { FC } from "react";

type ChatTabProps = {
  count: number;
  msg: string;
  name: string;
  time: string;
}

const ChatTab: FC<ChatTabProps> = (props) => {

  const truncate = (string: string) => {
    if (string.length > 25) {
      return string.slice(0, 21) + '...';
    } else {
      return string;
    }
  }

  const capCount = (num: number) => {
    if (num > 99) {
      return '99+';
    } else {
      return num;
    }
  }
  
  const router = useRouter();

  const onClick = () => {
    router.push(`/messages/${props.name}`);
  }

  return (
    <div className="border-1 border-[#233436] h-30 bg-[#F5F5F5] flex items-center max-w-1/1"
      onClick={onClick}>
      <img 
        // image is placeholder empty icon   
        src="https://braverplayers.org/wp-content/uploads/2022/09/braver-blank-pfp.jpg"
        className="h-4/5 m-2.5  rounded-full"
      ></img>
      <section className="w-1/1">
        <section className="flex h-3/5 text-[2.5rem] justify-between items-center">
          <div className="flex items-center">
            {props.count != 0 &&
                <b className="text-[1rem] bg-[#FF5A5F] h-10 min-w-10 text-center ml-4 p-2 rounded-full">
                    {capCount(props.count)}
                </b> 
                // <div className="bg-[#165961] h-10 min-w-10 text-center ml-4 p-2 rounded-full">
                //   0
                // </div>
            }
            <b className="pl-5 pr-2 text-[#233436]">
                {truncate(props.name)}
            </b>
          </div>
          <p className="pl-2 pr-5 text-[1.5rem] text-gray-400">
            {props.time}
          </p>
        </section>
        <section className="flex h-2/5">
          <p className="pl-10 text-[1.5rem] text-gray-400">
            {truncate(props.msg)}
          </p>
        </section>
      </section>
    </div>
  );
}


export default ChatTab;