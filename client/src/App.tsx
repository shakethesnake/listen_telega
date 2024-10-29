import React from 'react';
import './App.css';
import Input from '../components/input/Input';
import Content from '../components/content/Content';
import { MessageProvider } from '../context/MessageProvider';

function App() {
    return (
        <MessageProvider>
            <div className='mainWrapper'>
                <Content />
                <Input />
            </div>
        </MessageProvider>
    );
}

export default App;