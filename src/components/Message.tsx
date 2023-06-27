import { format } from "timeago.js";
import { MessageInterface } from "../interfaces/Message";

interface MessageProps {
    owner?: boolean;
    message: MessageInterface;
}

export const Message = (props: MessageProps) => {
    return (
        <div className={`flex p-[2px] px-16 max-lg:py-1 max-md:text-xs ${props.owner ? 'flex-row-reverse' : ''}`}>
            <div className={`flex gap-2 max-w-[60%] ${props.owner ? 'items-end' : ''}`}>
                <div className={`flex flex-col w-full text-white break-words py-3 px-4 rounded-br-lg rounded-bl-lg ${props.owner ? 'rounded-tl-lg bg-cyan-950' : 'rounded-tr-lg bg-slate-800'}`}>
                    <p className="pr-12">{props.message.text}</p>
                    <span className="w-full m-0 p-0 text-[9px] text-slate-300 text-end select-none">{format(props.message.createdAt, 'en_US')}</span>
                </div>
            </div>
        </div>
    );
}
