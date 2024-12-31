import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import * as Showdown from 'showdown';
import axios from 'axios';

// Dynamically import the SimpleMDE editor to only load it on the client
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });

// You can still import the CSS since it is only applied on the client
import 'easymde/dist/easymde.min.css';

const MarkdownEditor = () => {
    const [value, setValue] = useState<string>('');
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
            {SimpleMDE && (
                <SimpleMDE
                    value={value}
                    onChange={setValue}
                    options={{
                        spellChecker: false,
                    }}
                />
            )}

            {message && <p className="mt-2">{message}</p>}
        </div>
    );
};

export default MarkdownEditor;
