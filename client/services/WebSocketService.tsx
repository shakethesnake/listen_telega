import { Message } from '../types/MessageType';
import { MessageChannel } from '../types/MessageChannelType';

export class WebSocketService implements MessageChannel {
    private url: string;
    private ws: WebSocket;

    constructor(url: string) {
        this.url = url;

        this.ws = new WebSocket(this.url);
        console.log('-- create connection --');

        this.ws.onmessage = (event: MessageEvent) => {
            const message: Message = JSON.parse(event.data);
            this.onMessage(message);
        };
    }

    sendMessage(message: string) {
        this.ws.send(message);
    }

    onMessage: ((message: Message) => void);

    dispose() {
        this.ws.close();
    };
}