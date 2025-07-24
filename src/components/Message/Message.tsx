import { FC } from "react";

type MessageProps = {
  msg: string;
}

const Message: FC<MessageProps> = (props) => {

//   const truncate = (string: string) => {
//     if (string.length > 25) {
//       return string.slice(0, 21) + '...';
//     } else {
//       return string;
//     }
//   }

  const isMe = props.msg[0] == 'a' ? true : false;
  let textboxStyle = 'rounded-[10px] mr-5 m-1 min-h-10 max-w-[75vw] w-fit align-middle text-wrap wrap-anywhere';
  textboxStyle += isMe ? ' bg-[#E0E0E0] text-[#233436] ml-auto' : ' bg-[#087E8B] text-[#F5F5F5] ml-5';

  return (
    <div className={textboxStyle}>
        {/* <section className="flex h-3/5 text-[1.5rem] justify-between items-center">
          <div className="flex items-center"> */}
            <p className="pl-3 pr-3 text-[2rem]">
                {props.msg}
            </p>
          {/* </div>
        </section> */}
    </div>
  );
}


export default Message;