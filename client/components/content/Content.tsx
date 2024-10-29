import React, { useContext } from 'react';
import { Message } from '../../types/MessageType';
import { MessageContent } from '../../types/MessageContentType';
import { MessageContext } from '../../context/MessageProvider';
import { MessageContextType } from '../../types/MessageContextType';

const Content: React.FC<{ messages?: Message[] }> = () => {
    const { messages } = useContext<MessageContextType>(MessageContext);

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
        return messages.map((msg: Message) => {
            const {
                message_id,
                text,
                from: { first_name, last_name = '', is_bot },
            } = msg;

            return <Message
                key={message_id}
                text={text}
                username={`${first_name} ${last_name}`}
                type={is_bot ? 'left' : 'right'}
            />
        });
    }

    return <div className='content'>{getMessages()}</div>
};

export default Content;

