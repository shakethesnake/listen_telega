import { useCallback, useRef } from 'react';

export const useWebSocket = (url: string) => {
    const socket = useRef<WebSocket | null>(null);

    const initWebSocket =  useCallback(() => {
        socket.current = new WebSocket(url);
    }, [url]);

    initWebSocket();

    return { socket: socket.current };
};