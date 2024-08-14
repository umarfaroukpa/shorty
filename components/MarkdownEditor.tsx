import React, { useState } from 'react';
import ReactMde from 'react-mde';
import * as Showdown from 'showdown';
import axios from 'axios';
import 'react-mde/lib/styles/css/react-mde-all.css';

const MarkdownEditor = () => {
    const [value, setValue] = useState<string>('');
    const [selectedTab, setSelectedTab] = useState<'write' | 'preview'>('write');
    const [message, setMessage] = useState<string | null>(null);

    const converter = new Showdown.Converter();

    const handleSend = async () => {
        try {
            const response = await axios.post('/api/submit-markdown', { content: value });
            setMessage('Content sent successfully!');
            // Reset the editor
            setValue('');
        } catch (error) {
            setMessage('Failed to send content.');
            console.error('Error sending markdown content:', error);
        }
    };

    return (
        <div className="relative container">
            <button
                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-700"
                onClick={() => setValue('')} // Function to handle close
            >
                <i className="fa fa-times"></i>
            </button>
            <ReactMde
                value={value}
                onChange={setValue}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={(markdown) =>
                    Promise.resolve(converter.makeHtml(markdown))
                }
            />
            <button
                onClick={handleSend}
                className="mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
            >
                Send
            </button>
            {message && <p className="mt-2">{message}</p>}
        </div>
    );
};

export default MarkdownEditor;
