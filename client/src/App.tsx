import { useEffect, useState } from 'react';
import './App.css';
import Sender from '../components/Sender';
import Content from '../components/Content';

function App() {
    const [websoket, setWebsocket] = useState<WebSocket | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);

    const sendMessage = (msg: string) => {
        const { from: { first_name } } = messages.find(msg => msg.from.is_bot);
        setMessages(prevMessages => [...prevMessages, {
            from: {
                first_name,
                is_bot: true,
            },
            date: Date.now(),
            message_id: crypto.randomUUID(),
            text: msg,
        }]);
        websoket.send(msg);
    };

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080');

        ws.onmessage = (event: MessageEvent) => {
            const newMessage: Message = JSON.parse(event.data);
            console.log(JSON.parse(event.data));
            setMessages(prevMessages => [...prevMessages, newMessage]);
        };

        setWebsocket(ws);

        return () => ws.close();
    }, []);

    return (
        <div className='mainWrapper'>
            <Content messages={messages} />
            <Sender sendMessage={sendMessage} />
        </div>
    );
}

export default App;