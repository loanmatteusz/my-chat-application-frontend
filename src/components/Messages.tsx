import { useContext } from "react";
import { AuthContext } from "../contexts/auth/AuthContext";

import { MessageInterface } from "../interfaces/Message";
import { Message } from "./Message";

interface MessagesProps {
    chatId?: string;
    className?: string;
    messages: MessageInterface[];
}

export const Messages = (props: MessagesProps) => {
    const auth = useContext(AuthContext);

    return (
        <div className={`
            flex flex-col
            ${/*justify-end*/''}
            py-4 bg-slate-950
            ${props.className}
        `}>
            {
                props.messages.map(message => message.senderId === auth.user._id ? (
                    <Message key={message._id} message={message} owner />
                ) : (
                    <Message key={message._id} message={message} />
                ))
            }
        </div>
    );
}
