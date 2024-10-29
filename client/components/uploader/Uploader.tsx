import React, { useRef } from 'react';

export type UploaderType = {
    [key: string]: unknown;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    icon: string;
    iconStyles: object;
};

export const Uploader: React.FC<UploaderType> = (props) => {
    const uploaderRef = useRef<HTMLInputElement>(null);
    const { onChange, icon, iconStyles } = props;
    return (
        <>
            <img
                src={icon}
                style={iconStyles}
                onClick={() => uploaderRef.current?.click()}
            />

            <input
                type='file'
                ref={uploaderRef}
                style={{
                    display: 'none',
                }}
                onChange={onChange}
            />
        </>
    )
}