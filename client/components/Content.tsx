interface Message {
    message_id: number | string;
    text: string;
    from: MessageFrom;
    messageId: number;
}

interface MessageFrom {
    first_name: string;
    last_name: string;
    id: number;
    is_bot: boolean;
}

interface MessageContent {
    username: string;
    text: string;
    type: 'left' | 'right';
}

const Content: React.FC<{ messages: Message[] }> = ({ messages }) => {
    const Message: React.FC<MessageContent> = ({ username, text, type }) => {
        return (
            <div className='messageWrapper'>
                <div className={`message ${type}-side`}>
                    <p>{username}</p>
                    <span>{text}</span>
                </div>
            </div>
        );
    }

    const getMessages = (): JSX.Element[] => {
        return messages.map((msg) => {
            const {
                message_id,
                text,
                from: { first_name, last_name = '', id, is_bot },
            } = msg;

            return <Message
                key={message_id}
                text={text}
                username={`${first_name} ${last_name}`}
                id={id}
                type={is_bot ? 'left' : 'right'}
            />
        });
    }

    return <div className='content'>{getMessages()}</div>
};

export default Content;

