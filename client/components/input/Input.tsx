import React, { useState, useCallback, useRef, useContext } from 'react';
import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react';
import { Image } from '../../types/ImageType';
import { MessageContextType } from '../../types/MessageContextType';
import { MessageContext } from '../../context/MessageProvider';
import { Modal, ModalState } from '../modal/Modal';
import { Uploader } from '../../components/uploader/Uploader';

import Attach from '../../assets/attach.svg';
import Smile from '../../assets/smile.svg';
import Send from '../../assets/send.svg';

const DEFAULT_INPUT_ICON_STYLES = {
    width: 30,
    height: 30,
    margin: 5,
};

const Input: React.FC = () => {
    const { sendMessage } = useContext<MessageContextType>(MessageContext);
    const [modalState, setModalState] = useState<ModalState>(ModalState.HIDDEN);
    const [previewSrc, setPreviewSrc] = useState<string>('');
    const [opened, setOpened] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [visibleState, setVisibleState] = useState<'none' | 'block'>('none');

    // EVENTS
    const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = (event.target as HTMLTextAreaElement).value;
        setVisibleState(value ? 'block' : 'none');
    };

    const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        console.log(files);
        const reader = new FileReader();

        if (files?.length) {
            reader.readAsDataURL(files[0]);
            reader.onload = () => {
                setPreviewSrc((reader.result) as string);
                setModalState(ModalState.VISIBLE);
            };
        }
    };

    const onSend = () => {
        if (textareaRef.current) {
            sendMessage(textareaRef.current.value);
            textareaRef.current.value = '';
        }
        setVisibleState('none');
    };

    const onEmojiClick = (emojiData: EmojiClickData) => {
        const { emoji } = emojiData;
        if (textareaRef.current) {
            textareaRef.current.value += textareaRef.current.value + emoji;
        }

        if (visibleState === 'none') {
            setVisibleState('block');
        }

        setOpened(false);
    };
    // EVENTS

    const Image: React.FC<Image> = useCallback((props: Image) => {
        const { style, ...otherProps } = props;

        return <img style={{
            ...style,
            ...DEFAULT_INPUT_ICON_STYLES,
        }} {...otherProps} />
    }, []);

    return <div className="senderWrapper">
        <Uploader
            icon={Attach}
            onChange={onUpload}
            iconStyles={{ ...DEFAULT_INPUT_ICON_STYLES }}
        />
        <textarea
            ref={textareaRef}
            placeholder='Write message...'
            onChange={onChange}
        />
        <Image
            src={Send}
            style={{ display: visibleState }}
            onClick={onSend}
        />
        <Image
            src={Smile}
            onClick={(): void => setOpened(!opened)}
        />

        <div
            className="emoji-bar"
            style={{ display: opened ? 'block' : 'none' }}
        >
            <EmojiPicker
                theme={Theme.DARK}
                open={true}
                onEmojiClick={onEmojiClick}
            />
        </div>

        <Modal modalState={modalState}>
            <p>Preview</p>
            <div >
                <img src={previewSrc} style={{
                    width: '100%',
                    height: 200,
                }} />
            </div>
            <button onClick={() => setModalState(ModalState.HIDDEN)}>hide modal</button>
        </Modal>
    </div>;
}

export default Input;