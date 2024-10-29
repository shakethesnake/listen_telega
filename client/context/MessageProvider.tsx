import React, { createContext, useCallback, useState, useRef, useEffect } from 'react';
import { Message } from '../types/MessageType';
import { MessageContextType } from '../types/MessageContextType';
import { WebSocketService } from '../services/WebSocketService';
// import { WebSocketContext, WebSocketType } from './WebSocketProvider';

// declare const messageType: MessageContextType;

export const MessageContext = createContext<MessageContextType>({} as MessageContextType);

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const socket = useRef<WebSocketService | undefined>(undefined);
    const [messages, setMessages] = useState<Message[]>([]);

    const addMessage = useCallback((message: Message): void => {
        setMessages(prevMessages => [...prevMessages, message]);
    }, []);

    const sendMessage = useCallback((msg: string) => {
        socket.current?.sendMessage(msg);
    }, []);

    useEffect(() => {
        console.log('--init WebSocket--')
        socket.current = new WebSocketService(import.meta.env.VITE_WEBSOCKET_URL);

        socket.current.onMessage = (message: Message) => addMessage(message);

        return () => socket?.current?.dispose();
    }, []);

    return (
        <MessageContext.Provider value={{ messages, addMessage, sendMessage }}>
            {children}
        </MessageContext.Provider>
    )
}