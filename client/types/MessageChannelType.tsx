import { Message } from "./MessageType";
export interface MessageChannel {
    sendMessage: (message: string) => void;
    onMessage: (message: Message) => void;
    dispose: () => void;
}