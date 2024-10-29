import { Message } from './MessageType';

export type MessageContextType = {
    messages: Message[];
    addMessage: (message: Message) => void;
    sendMessage: (message: string) => void;
}