import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Image from 'next/image';

const UrlShortener = () => {
    const { data: session } = useSession();
    const [originalUrl, setOriginalUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [customDomain, setCustomDomain] = useState('');
    const [customUrl, setCustomUrl] = useState('');
    const [qrCode, setQrCode] = useState('');
    const [shortenCount, setShortenCount] = useState(0);
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [showCustomOptions, setShowCustomOptions] = useState(false);
    const MAX_FREE_SHORTENS = 2;

    const handleShorten = async (e) => {
        e.preventDefault();

        if (!session && shortenCount >= MAX_FREE_SHORTENS) {
            alert('Maximum number of free shortens reached, register now');
            return;
        }

        if (customUrl && !/^[a-zA-Z0-9-_]+$/.test(customUrl)) {
            alert('Custom URL can only contain letters, numbers, hyphens, and underscores');
            return;
        }

        try {
            const response = await axios.post('/api/tinyurl', {
                originalUrl,
                customUrl,
                customDomain,
            });

            if (response.data.shortUrl) {
                setShortUrl(response.data.shortUrl);
                setQrCode(response.data.qrCode);
                setShortenCount(shortenCount + 1);
                setIsDialogVisible(true);
            }
        } catch (error) {
            console.error('Error shortening URL:', error);
        }
    };

    const handleCopyToClipboard = async () => {
        try {
            if (shortUrl) {
                await navigator.clipboard.writeText(shortUrl);
                alert('Short URL copied to clipboard!');
            } else {
                alert('No URL to copy');
            }
        } catch (error) {
            console.error('Error copying URL to clipboard:', error);
        }
    };

    const handleShare = (platform) => {
        const urlEncoded = encodeURIComponent(shortUrl);
        const textEncoded = encodeURIComponent('Check out this shortened URL:');
        let shareUrl = '';

        switch (platform) {
            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${textEncoded} ${urlEncoded}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${urlEncoded}&text=${textEncoded}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${urlEncoded}`;
                break;
            case 'gmail':
                shareUrl = `mailto:?subject=${textEncoded}&body=${urlEncoded}`;
                break;
            default:
                break;
        }

        window.open(shareUrl, '_blank');
    };

    const toggleCustomOptions = () => {
        setShowCustomOptions(!showCustomOptions);
    };

    return (
        <div className="relative flex flex-col items-center gap-5 px-4 md:px-0 mt-16 md:mt-0">
            <div className="flex flex-col items-center w-full">
                <h1 className="text-3xl md:text-5xl font-extrabold leading-tight md:leading-[80px] text-center bg-clip-text text-transparent bg-gradient-to-r from-[#144EE3] via-[#EB568E] to-[#A353AA] px-2">
                    Shorten Your Loooong Links :)
                </h1>
            </div>
            <p className="text-sm md:text-base font-light leading-6 -mt-2 md:-mt-9 text-center text-[#C9CED6] max-w-xs md:max-w-[634px]">
                Shorty is an efficient and easy-to-use URL shortening service that streamlines your online experience.
            </p>
            
            <form onSubmit={handleShorten} className="form relative w-full max-w-[659px] flex flex-col md:flex-row items-center p-3 md:p-[21px] bg-[#3f4551] shadow-md rounded-3xl md:rounded-[48px]">
                <div className="flex flex-row justify-center items-center gap-[10px] w-full md:w-auto md:mr-4">
                    <div className="flex items-center w-[25px] h-[28px] text-[#C9CED6] text-lg md:text-[20px] leading-[28px]">
                        <i className="fa-solid fa-link text-gradient"></i>
                    </div>

                    <input
                        className="flex items-center w-full md:w-[136px] h-[28px] text-gradient text-[16px] leading-[28px] font-light text-white font-inter shadow-md rounded focus:outline-none focus:border-none bg-transparent"
                        type="url"
                        value={originalUrl}
                        onChange={(e) => setOriginalUrl(e.target.value)}
                        placeholder="Enter URL"
                        required
                    />
                </div>
                
                <button
                    className="shorten w-full md:w-[178px] h-[50px] md:h-[60px] flex flex-row justify-center items-center px-[25px] py-[18px] md:py-[21px] bg-[#144EE3] border border-[#144EE3] shadow-lg rounded-3xl md:rounded-[48px] text-white font-inter font-semibold text-[16px] leading-[18px] mt-4 md:mt-0 md:absolute md:right-2"
                    type="submit"
                >
                    Shorten Now!
                </button>
            </form>
            
            <button
                onClick={toggleCustomOptions}
                className="text-white text-sm md:text-base underline mt-2 flex items-center"
            >
                {showCustomOptions ? 'Hide Custom Options' : 'Show Custom Options'}
                <i className={`fa-solid fa-chevron-${showCustomOptions ? 'up' : 'down'} ml-2`}></i>
            </button>
            
            {showCustomOptions && (
                <div className="custom-url flex flex-col md:flex-row p-3 mt-2 bg-[#3f4551] rounded-lg w-full max-w-[659px]">
                    <div className="flex flex-col md:flex-row justify-center items-center gap-3 md:gap-5 w-full">
                        <div className="flex flex-col gap-1 w-full md:w-[250px]">
                            <div className="flex flex-row items-center gap-[10px] ml-0 md:ml-4">
                                <div className="flex items-center w-[25px] text-[#C9CED6] text-lg md:text-[20px] leading-[28px]">
                                    <i className="fa-solid fa-globe text-gradient"></i>
                                </div>
                                <input
                                    className="w-full md:w-[150px] p-2 rounded bg-[#144EE3] text-gradient shadow-lg text-white font-inter font-semibold text-[16px] leading-[18px] focus:outline-none focus:border-none"
                                    type="text"
                                    placeholder="Custom Domain"
                                    value={customDomain}
                                    onChange={(e) => setCustomDomain(e.target.value)}
                                />
                            </div>
                        </div>
                        
                        <div className="hidden md:flex items-center text-[15px] text-white font-inter font-semibold leading-[0px] text-transparent bg-clip-text bg-gradient-to-r from-[#144EE3] via-[#EB568E] to-[#144EE3]">
                            |
                        </div>
                        
                        <div className="flex flex-col gap-1 w-full md:w-[150px] md:mr-20">
                            <div className="flex flex-row items-center gap-[10px]">
                                <div className="flex items-center w-[25px] text-[#C9CED6] text-lg md:text-[20px] leading-[28px] justify-center md:justify-end">
                                    <i className="fa-solid fa-link text-gradient"></i>
                                </div>
                                <input
                                    className="w-full md:w-[150px] p-2 text-gradient bg-[#144EE3] text-white font-inter font-semibold text-[16px] leading-[18px] focus:outline-none focus:border-none rounded"
                                    type="text"
                                    placeholder="Custom URL"
                                    value={customUrl}
                                    onChange={(e) => setCustomUrl(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            {shortUrl && isDialogVisible && (
                <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                    <div className="rounded-lg p-4 md:p-6 shadow-lg text-center text-white relative bg-[#3f4551] w-full max-w-md">
                        <button className="absolute top-2 right-2 text-white" onClick={() => setIsDialogVisible(false)}>
                            <i className="fa-solid fa-times"></i>
                        </button>
                        <h2 className="text-xl font-semibold mb-4">
                            <i className="fa-solid fa-ice-cream text-gradient"></i> Your Link Is Ready
                        </h2>
                        <div className="mb-2">
                            <i className="fa-solid fa-share-nodes text-gradient"></i> Copy Shortened Url And Share
                        </div>
                        <p className="mb-2 text-blue-500 underline break-all">
                            <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
                        </p>
                        <div className="flex items-center mb-4 justify-center flex-wrap gap-2">
                            {qrCode && <Image src={qrCode} width={80} height={80} alt="QR Code" className="mr-2" />}
                            <button onClick={handleCopyToClipboard} className="text-blue-500 underline">
                                <i className="fa-solid fa-copy"></i> Copy
                            </button>
                        </div>
                        <h3 className="text-lg font-semibold mb-2 text-gradient">Share Via</h3>
                        <div className="flex flex-wrap gap-2 justify-center">
                            <button className="text-green-500 px-2 py-1" onClick={() => handleShare('whatsapp')}>
                                <i className="fa-brands fa-whatsapp"></i> WhatsApp
                            </button>
                            <button className="text-blue-400 px-2 py-1" onClick={() => handleShare('twitter')}>
                                <i className="fa-brands fa-twitter"></i> Twitter
                            </button>
                            <button className="text-blue-600 px-2 py-1" onClick={() => handleShare('facebook')}>
                                <i className="fa-brands fa-facebook"></i> Facebook
                            </button>
                            <button className="text-red-500 px-2 py-1" onClick={() => handleShare('gmail')}>
                                <i className="fa-solid fa-envelope"></i> Gmail
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UrlShortener;