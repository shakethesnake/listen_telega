import React, { useState, useCallback, useRef } from 'react';
import Attach from '../assets/attach.svg';
import Smile from '../assets/smile.svg';
import Send from '../assets/send.svg';

interface Image {
    src: string,
    style: object,
    click: VoidFunction,
};

const getEmojiList: React.FC = () => {
    const list: string[] = [];
    const emojRange: Array[] = [
        [128513, 128591], [9986, 10160], [128640, 128704]
    ];

    for (let i = 0; i < emojRange.length; i++) {
        const range = emojRange[i];
        for (let x = range[0]; x < range[1]; x++) {
            list.push(x);
        }
    }

    return list;
}

const EmojiList: React.FC<string[]> = ({array}): JSX.Element => {
    console.log(array)
    return (
        <div className='emoji-list'>
            {
                array.map((str, i) => (<span key={`${str}-${i}`} className='emoji-text'>{`&#${str};`}</span>))
            }
        </div>
    )
}

const Sender: React.FC<{ sendMessage: VoidFunction }> = ({ sendMessage }) => {
    const textareaRef = useRef();
    const [visibleState, setVisibleState] = useState('none');
    const onChange: React.FC<{ event: React.ChangeEvent<HTMLInputElement> }> = (event) => setVisibleState(event.target.value ? 'block' : 'none');
    const Image: React.FC<Image> = useCallback(({ src, style, click }) => {
        return <img src={src} style={{
            ...style,
            width: 30,
            margin: 5,
        }} onClick={click} />
    }, []);

    return <div className="senderWrapper">
        <EmojiList array={getEmojiList()} />
        <Image src={Attach} style={{
            display: 'none',
        }} />
        <textarea ref={textareaRef} placeholder='Write message...' onChange={onChange} />
        <Image src={Smile} />
        <Image src={Send} style={{
            display: visibleState
        }} click={() => {
            sendMessage(textareaRef.current.value);
            textareaRef.current.value = '';
            setVisibleState('none');
        }} />
    </div>;
}

export default Sender;