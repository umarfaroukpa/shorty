import { useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const UrlShortener = () => {
    const { data: session } = useSession();
    const [originalUrl, setOriginalUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [qrCode, setQrCode] = useState('');
    const [shortenCount, setShortenCount] = useState(0);
    const MAX_FREE_SHORTENS = 5;

    const handleShorten = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!session && shortenCount >= MAX_FREE_SHORTENS) {
            alert('You have reached the maximum number of free shortens. Please register for unlimited access.');
            return;
        }

        try {
            const response = await axios.post('/api/shorten', { originalUrl });
            console.log('API Response:', response.data);
            setShortUrl(response.data.shortUrl);
            setQrCode(response.data.qrCode);
            setShortenCount(shortenCount + 1);
        } catch (error) {
            console.error('Error shortening URL:', error);
        }
    };

    const handleCopyToClipboard = async () => {
        try {
            if (navigator.permissions) {
                const permission = await navigator.permissions.query({ name: 'clipboard-write' as PermissionName });

                if (permission.state === 'granted' || permission.state === 'prompt') {
                    if (shortUrl) {
                        await navigator.clipboard.writeText(shortUrl);
                        alert('Short URL copied to clipboard!');
                    } else {
                        alert('No URL to copy');
                    }
                } else {
                    alert('Clipboard permission denied');
                }
            } else {
                if (shortUrl) {
                    await navigator.clipboard.writeText(shortUrl);
                    alert('Short URL copied to clipboard!');
                } else {
                    alert('No URL to copy');
                }
            }
        } catch (error) {
            console.error('Error copying URL to clipboard:', error);
        }
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Short URL',
                url: shortUrl,
            }).catch((error) => console.error('Error sharing URL:', error));
        } else {
            alert('Sharing not supported in this browser.');
        }
    };

    return (
        <div className="relative flex flex-col items-center gap-5 pb-20 w-[966px] left-[150px] top-5">
            <div className="flex flex-col items-center w-full h-[81px]">
                <h1 className="text-5xl font-extrabold leading-[80px] flex items-center text-center bg-clip-text text-transparent bg-gradient-to-r from-[#144EE3] via-[#EB568E] to-[#A353AA]">
                    Shorten Your Loooong Links :)
                </h1>
            </div>
            <p className="w-[634px] text-sm font-light leading-6 -mt-9 text-gradient flex items-center text-center text-[#C9CED6]">
                Shorty is an efficient and easy-to-use URL shortening service that streamlines your online experience.
            </p>
            <form onSubmit={handleShorten} className="absolute left-1/2 top-[150px] transform -translate-x-1/2 w-[659px] h-[76px] flex flex-row items-center p-[21px] bg-[#3f4551] shadow-md rounded-[48px]">
                <div className="flex flex-row justify-center items-center gap-[20px] w-[192px] h-[28px]">
                    <div className="flex items-center w-[25px] h-[28px] text-[#C9CED6] text-[20px] leading-[28px]">
                        <i className="fa-solid fa-link text-gradient"></i>
                    </div>
                    <input
                        className="flex items-center w-[136px] h-[28px] text-gradient text-[16px] leading-[28px] font-light shadow-md rounded"
                        type="text"
                        value={originalUrl}
                        onChange={(e) => setOriginalUrl(e.target.value)}
                        placeholder="Enter the link here"
                        required
                    />
                </div>
                <div className="flex flex-row justify-center items-center gap-[10px] w-[6px] h-[23px]">
                    <div className="flex items-center text-[20px] leading-[0px] text-transparent bg-clip-text bg-gradient-to-r from-[#144EE3] via-[#EB568E] to-[#144EE3]">
                        |
                    </div>
                </div>
                <button
                    className="absolute left-[473.5px] top-[8px] w-[178px] h-[60px] flex flex-row justify-center items-center px-[25px] py-[21px] bg-[#144EE3] border border-[#144EE3] shadow-lg rounded-[48px] text-white font-inter font-semibold text-[16px] leading-[18px]"
                    type="submit"
                >
                    Shorten Now!
                </button>
            </form>
            {shortUrl && (
                <div className="mt-4">
                    <p className="text-white">Short URL: <a href={shortUrl} className="text-blue-500 underline">{shortUrl}</a></p>
                    <button onClick={handleCopyToClipboard} className="text-blue-500 underline mr-2">Copy to Clipboard</button>
                    <button onClick={handleShare} className=" text-blue-500 underline">Share</button>
                    {qrCode && <img src={qrCode} alt="QR Code" className="mt-11" />}
                </div>
            )}
            {!session && (
                <div className="text-center text-sm text-gray-600 mt-32">
                    You can create {MAX_FREE_SHORTENS - shortenCount} more links. Register now to enjoy unlimited usage.
                </div>
            )}
        </div>
    );
};

export default UrlShortener;
