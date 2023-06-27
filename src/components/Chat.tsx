import { useEffect, useState } from "react";

import { getUserById } from "../api/UserRequest";

import { UserInterface } from "../interfaces/User";
import { ChatInterface } from "../interfaces/Chat";

interface ChatProps {
    chat: ChatInterface;
    currentUserId: string;
    onClick?: any;
    className?: string;
    online?: boolean;
}

export const Chat = (props: ChatProps) => {
    const [userData, setUserData] = useState<UserInterface>();

    useEffect(() => {
        const userId = props.chat.members.find((id: string) => id !== props.currentUserId) || '';
        const getUserData = async (id: string) => {
            const { data: user } = await getUserById(id);
            setUserData(user);
        }
        getUserData(userId);
    }, [props.chat]);

    console.log({ online: props.online });
    return (
        <div
            className={`
                flex px-4 items-center gap-3 text-white cursor-pointer
                ${props.className?.includes('bg-slate-700') ? '' : 'hover:bg-slate-800'}
                ${props.className}`
            }
            onClick={props.onClick}
        >
            <img className={`w-14 h-14 rounded-[50%] object-cover select-none border-2 ${props.online ? 'border-green-600' : 'border-transparent'}`}
                src="https://pa1.narvii.com/7656/51ad6b5726a006dde9a1dbc0e0d3e50bd325b94fr1-768-768_hq.gif"
                alt="profile"
            />
            <div className={`flex flex-col p-3 w-full border-b-[1px] ${props.className?.includes('bg-slate-700') ? 'border-b-slate-700' : 'border-b-slate-800'}`}>
                <span className="flex items-center justify-between text-base font-semibold select-none">
                    <p>{userData?.username}</p>
                    <span className="text-xs text-slate-400">10:20</span>
                </span>
                <p className="text-sm text-slate-400 select-none">Hello</p>
            </div>
        </div>
    );
}
