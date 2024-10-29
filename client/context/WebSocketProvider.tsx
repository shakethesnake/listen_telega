import React, { createContext, useRef } from 'react';
import { WebSocketService } from '../services/WebSocketService';

export type WebSocketType = WebSocket;

export const WebSocketContext = createContext<WebSocketType | undefined>(undefined);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const channel = useRef(new WebSocketService(import.meta.env.VITE_WEBSOCKET_URL));

    return (
        <WebSocketContext.Provider value={{ socket: channel.current }}>
            {children}
        </WebSocketContext.Provider>
    );
};