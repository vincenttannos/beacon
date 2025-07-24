import Message from "@/components/Message/Message";
import MessageBar from "@/components/MessageBar/MessageBar";
import { FC } from "react";

type MessagesProps = {
  count: number;
  msg: string;
}

const dummyData = [
    'asdhbfbacnacna',
    'najdnuwuvyuvgyugyugygyukgyuvgyuvyuvyukvyuvyukvgyuvyugyuvgyudnaw',
    'asjdnadnwi',
    'awjdbnacbnaicn',
    'duawbnancakcn',
    'hello'
]

const Messages: FC<MessagesProps> = (props) => {
  return (
    <section className="min-h-[100vh] bg-white text-[#233436] flex items-end">
      <div className="w-1/1 h-1/1">
        {dummyData.map((x) => 
            // make key some string of the metadata
            <Message msg={x} key={x}></Message>
        )}
        <MessageBar
            input="hsagdfhai"
        ></MessageBar>
      </div>
    </section>
  );
}


export default Messages;