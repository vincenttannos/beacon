import Messages from "@/components/Messages/Messages";
import MessageBar from "@/components/MessageBar/MessageBar";
import { FC } from "react";
import { retrieveData, getUser } from "../../../../functions/functions";

type MessagesPageProps = {
  count: number;
  msg: string;
}

// const dummyData = [
//     'asdhbfbacnacna',
//     'najdnuwuvyuvgyugyugygyukgyuvgyuvyuvyukvyuvyukvgyuvyugyuvgyudnaw',
//     'asjdnadnwi',
//     'awjdbnacbnaicn',
//     'duawbnancakcn',
//     'hello',
//     'g',
//     'asdadwhaoidhia',
//     'as',
//     'adadinaidnasdnasnjvnjvbsjkvbjksvbnsvbnklnvaklvnaklnvklanvklan',
//     'cocomelonese',
//     'abracadabra',
//     'm',
//     'dsja',
// ]

const chats = retrieveData();
const username = getUser();

const MessagesPage: FC<MessagesPageProps> = (props) => {

  return (
    <section className="min-h-[90vh] bg-white text-[#233436] flex items-end">
      <div className="w-1/1 h-1/1">
        {/* {chats.birdfish.messages.map((x) => 
            // make key some string of the metadata
            <Message msg={x.message} sender={x.sender} user={username} key={x.index}></Message>
        )} */}
        <Messages chats={chats} username={username}></Messages>
        <MessageBar
            // input="hsagdfhai"
        ></MessageBar>
      </div>
    </section>
  );
}


export default MessagesPage;