import { useEffect, useState } from 'react';

import { Messages } from './Messages';
import { Input } from './Input';

import Camera from '../assets/cam.png';
import AddFriend from '../assets/add.png';
import More from '../assets/more.png';
import Computer from '../assets/computer.svg';

import { ChatInterface } from '../interfaces/Chat';
import { getUserById } from '../api/UserRequest';
import { UserInterface } from '../interfaces/User';
import { MessageInterface } from '../interfaces/Message';
import { getMessagesByChat } from '../api/MessageRequest';

interface ChatProps {
    currentUserId: string;
    currentChat?: ChatInterface;
    handleNofityMessage?: () => void;
    className?: string;
}

export const ChatContent = (props: ChatProps) => {
    const [userData, setUserData] = useState<UserInterface>();
    const [messages, setMessages] = useState<MessageInterface[]>([]);

    async function getMessages() {
        if (props.currentChat) {
            const response = await getMessagesByChat(props.currentChat._id);
            setMessages(response.data);
        }
    }

    function addNewMessage(message: MessageInterface) {
        setMessages([
            ...messages,
            message
        ]);
    }

    useEffect(() => {
        const userId = props.currentChat?.members.find((id: string) => id !== props.currentUserId) || '';
        const getUserData = async (id: string) => {
            const { data: user } = await getUserById(id);
            setUserData(user);
        }
        getUserData(userId);
        getMessages();
    }, [props.currentChat]);


    return (
        props.currentChat ? (
            <div className={`flex flex-col justify-between ${props.className}`}>
                <div className={`
                    flex min-h-[4rem] h-16 p-3
                    items-center justify-between
                    bg-slate-800 text-white
                `}>
                    <div className='flex items-center gap-4'>
                        <img className="w-12 h-12 rounded-[50%] object-cover select-none" src="https://pa1.narvii.com/7656/51ad6b5726a006dde9a1dbc0e0d3e50bd325b94fr1-768-768_hq.gif" alt="perfil" />
                        <span className='font-semibold'>{userData?.username}</span>
                    </div>
                    <div className="flex gap-3">
                        <img className='w-6 h-6 cursor-pointer' src={Camera} alt="" />
                        <img className='w-6 h-6 cursor-pointer' src={AddFriend} alt="" />
                        <img className='w-6 h-6 cursor-pointer' src={More} alt="" />
                    </div>
                </div>
                <Messages
                    // chatId={props.currentChat._id}
                    messages={messages}
                    className={`
                        h-full overflow-y-scroll scroll-smooth
                        scrollbar scrollbar-w-[6px]
                        scrollbar-thumb-slate-300/25 scrollbar-track-transparent
                    `}
                />
                <Input
                    chatId={props.currentChat._id}
                    handleAddNewMessage={addNewMessage}
                />
            </div>
        ) : (
            <div className={`flex flex-col justify-between border-b-[6px] border-b-cyan-800 ${props.className}`}>
                <div className={`flex gap-3 flex-col items-center justify-center w-full h-full bg-slate-800 overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent select-none`}>
                    <img className={`select-none`} src={`${Computer}`} alt="computer" width={400} />
                    <div>
                        <p className={`text-[40px]`}>MyChat Web</p>
                    </div>
                    <div className='flex flex-col text-slate-500 items-center justify-center'>
                        <p className={`text-sm`}>Send and receive messages without having to keep your phone connected to the internet.</p>
                        <p className={`text-sm`}>Use MyChat on up to three connected devices and one mobile phone at the same time.</p>
                    </div>
                </div>
                <footer className='flex bg-slate-800 p-6 items-center justify-center text-slate-500 select-none'>Protected by peer-to-peer</footer>
            </div>
        )
    );
}
