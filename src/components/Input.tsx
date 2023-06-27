import { useContext, useState } from 'react';
import { IconMoodSmile, IconPaperclip, IconSend } from '@tabler/icons-react';
import { createMessage } from '../api/MessageRequest';

import { AuthContext } from '../contexts/auth/AuthContext';
import { MessageInterface } from '../interfaces/Message';

interface InputProps {
    chatId: string;
    handleAddNewMessage: (message: MessageInterface) => void;
}

export const Input = (props: InputProps) => {
    const auth = useContext(AuthContext);
    const [newMessage, setNewMessage] = useState<string>('');

    async function sendMessage(chatId: string, senderId: string, message: string) {
        if (chatId && senderId && message) {
            const response = await createMessage({
                chatId,
                senderId,
                text: message,
            });
            props.handleAddNewMessage({...response.data});
        }
        setNewMessage('');
    }

    return (
        <div className="flex items-center gap-3 justify-between h-[4.4rem] p-2 bg-slate-800 text-white border-t-slate-700">
            <div className='flex gap-3 px-1'>
                <button className='text-slate-500 bg-slate-800 pl-2'>
                    <IconMoodSmile />
                </button>
                <button className='text-slate-500 bg-slate-800'>
                    <IconPaperclip />
                </button>
            </div>
            <input className={`
                    w-full h-full px-4 rounded-md
                    border-none outline-none
                    bg-slate-700 text-white text-lg
                    placeholder:text-slate-400
                `}
                type="text" placeholder="Type something..."
                value={newMessage}
                onChange={event => setNewMessage(event.target.value)}
                onKeyDown={(event) => event.key === 'Enter' && sendMessage(props.chatId, auth.user._id, newMessage)}
            />
            <div className="flex gap-3 items-center">
                <button className='w-12 pr-4 text-slate-500 bg-slate-800'
                    onClick={() => sendMessage(props.chatId, auth.user._id, newMessage)}
                >
                    <IconSend />
                </button>
            </div>
        </div>
    );
}
