import { useContext, useEffect, useRef, useState } from "react";
import { Socket, io } from 'socket.io-client';

import { AuthContext } from "../contexts/auth/AuthContext";

import { Chat, ChatContent, Navbar, Search } from "../components";

import { getUserChats } from "../api/ChatRequest";
import { ChatInterface } from "../interfaces/Chat";
import { OnlineUserInterface } from "../interfaces/OnlineUser";
import { MessageInterface } from "../interfaces/Message";

export const Home = () => {
    const auth = useContext(AuthContext);
    const { user } = auth;

    const socket = useRef<Socket>();

    const [chats, setChats] = useState<ChatInterface[]>([]);
    const [currentChat, setCurrentChat] = useState<ChatInterface>();
    const [onlinUsers, setOnlineUsers] = useState<OnlineUserInterface[]>([]);


    function handleChat(chat: ChatInterface) {
        setCurrentChat(chat);
    }

    function findUserOnlineInChat(onlineUsers: OnlineUserInterface[], chat: ChatInterface) {
        return onlineUsers.find(user => chat.members.includes(user.userId) && user.userId !== auth.user._id);
    }

    function nofityMessage(message: MessageInterface) {
        
    }

    useEffect(() => {
        socket.current = io(`http://localhost:8000`);
        socket.current.emit('add-new-user', user._id);
        socket.current.on('get-users', users => {
            setOnlineUsers(users);
            console.log({ onlinUsers });
        });
    }, [auth]);

    useEffect(() => {
        const handleChats = async () => {
            if (user) {
                const response = await getUserChats(user._id);
                setChats(response.data);
            }
        }
        handleChats();
    }, []);


    return (
        <div className="flex w-full h-[100vh] items-center justify-center bg-slate-900">
            <div className="flex w-[1600px] h-[96%] overflow-hidden max-xl:h-full shadow-2xl">
                <div id="Sidebar" className={`flex-auto border-r-[.1px] border-r-slate-700 bg-slate-900`}>
                    <Navbar username={user.username} />
                    <Search />
                    <div id="Chats" className="flex flex-col overflow-y-scroll scroll-smooth scrollbar scrollbar-w-[6px] scrollbar-thumb-slate-300/25 scrollbar-track-transparent">
                        {
                            chats?.map(chat => {
                                return (
                                    <Chat
                                        className={`${currentChat?._id === chat._id ? 'bg-slate-700' : ''}`}
                                        key={chat._id}
                                        chat={chat}
                                        currentUserId={user._id}
                                        onClick={() => handleChat(chat)}
                                        online={findUserOnlineInChat(onlinUsers, chat) ? true : false}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
                <ChatContent className={`flex-auto w-7/12 max-md:w-10/12`}
                    currentUserId={user._id}
                    currentChat={currentChat}
                />
            </div>
        </div>
    );
}
