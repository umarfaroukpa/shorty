import { useState } from 'react';

const Body = () => {
    const [url, setUrl] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Implement the logic to call the API to shorten the URL
    };

    return (
        <section>
            <h2>Create a Short URL</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="url"
                    placeholder="Enter your URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <button type="submit">Shorten</button>
            </form>
        </section>
    );
};

export default Body;
