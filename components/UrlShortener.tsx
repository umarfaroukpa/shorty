import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Image from 'next/image';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Load Stripe outside of components render to avoid recreating Stripe object on every render
const stripePromise = loadStripe('your-publishable-key-here');

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: {
                name,
                email,
            },
        });

        if (error) {
            setMessage(error.message);
        } else {
            const response = await fetch('/api/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ paymentMethodId: paymentMethod.id, email }),
            });

            const result = await response.json();

            if (result.error) {
                setMessage(result.error);
            } else {
                setMessage('Payment successful!');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="payment-form">
            <h2 className='text-white'>Make a Payment</h2>
            <input
                className='bg-[#144EE3] border border-[#144EE3] text-gradient'
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                className='bg-[#144EE3] border border-[#144EE3] text-gradient'
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
            />
            <CardElement />
            <button type="submit" className='bg-[#144EE3] border border-[#144EE3]' disabled={!stripe}>Pay</button>
            {message && <p>{message}</p>}
        </form>
    );
};

const UrlShortener = () => {
    const { data: session } = useSession();
    const [originalUrl, setOriginalUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [customDomain, setCustomDomain] = useState('');
    const [customUrl, setCustomUrl] = useState('');
    const [qrCode, setQrCode] = useState('');
    const [shortenCount, setShortenCount] = useState(0);
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const MAX_FREE_SHORTENS = 5;

    const handleShorten = async (e) => {
        e.preventDefault();

        if (!session && shortenCount >= MAX_FREE_SHORTENS) {
            alert('You have reached the maximum number of free shortens. Please register for unlimited access.');
            return;
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session?.accessToken}`,
                },
            };

            const response = await axios.post('/api/shorten', { originalUrl, customDomain, customUrl }, config);
            setShortUrl(response.data.shortUrl);
            setQrCode(response.data.qrCode);
            setShortenCount(shortenCount + 1);
            setIsDialogVisible(true);
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

    return (
        <div className="url-shortener-form relative flex flex-col items-center gap-5 pb-20 w-[966px] left-[150px] top-5">
            <div className="flex flex-col items-center w-full h-[81px]">
                <h1 className="text text-5xl font-extrabold leading-[80px] flex items-center text-center bg-clip-text text-transparent bg-gradient-to-r from-[#144EE3] via-[#EB568E] to-[#A353AA]">
                    Shorten Your Loooong Links :)
                </h1>
            </div>
            <p className="w-[634px] text-sm font-light leading-6 -mt-9 text-gradient flex items-center text-center text-[#C9CED6]">
                Shorty is an efficient and easy-to-use URL shortening service that streamlines your online experience.
            </p>
            <form onSubmit={handleShorten} className="form relative w-[659px] h-[76px] flex flex-row items-center p-[21px] bg-[#3f4551] shadow-md rounded-[48px]">
                <div className="flex flex-row justify-center items-center gap-[20px] w-[192px] h-[28px]">
                    <div className="flex items-center w-[25px] h-[28px] text-[#C9CED6] text-[20px] leading-[28px]">
                        <i className="fa-solid fa-link text-gradient"></i>
                    </div>
                    <input
                        className="flex items-center w-[136px] h-[28px] text-gradient text-[16px] leading-[28px] font-light shadow-md rounded"
                        type="url"
                        value={originalUrl}
                        onChange={(e) => setOriginalUrl(e.target.value)}
                        placeholder="Enter URL"
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
            <div className="custom relative flex flex-row items-start gap-[20px] p-6 mt-5 w-[659px] bg-[#3f4551] rounded-custom">
                <form className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1 mt-4 w-[320px]">
                        <label className="text-[#C9CED6] pl-8 pb-4 text-[16px] leading-[18px]">Customize Your Domain</label>
                        <div className="flex flex-row items-center gap-[10px]">
                            <div className="flex items-center w-[25px] text-[#C9CED6] text-[20px] leading-[28px]">
                                <i className="fa-solid fa-globe text-gradient"></i>
                            </div>
                            <input
                                className="w-[220px] p-2 rounded bg-[#144EE3] text-gradient border border-[#144EE3] shadow-lg text-white font-inter font-semibold text-[16px] leading-[18px] cursor-pointer"
                                type="text"
                                placeholder="Custom Domain (optional)"
                                value={customDomain}
                                onChange={(e) => setCustomDomain(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 mt-4 w-[320px]">
                        <label className="text-[#C9CED6] pl-8 pb-4 text-[16px] leading-[18px]">Customize Your Link</label>
                        <div className="flex flex-row items-center gap-[10px]">
                            <div className="flex items-center w-[25px] text-[#C9CED6] text-[20px] leading-[28px]">
                                <i className="fa-solid fa-wand-magic-sparkles text-gradient"></i>
                            </div>
                            <input
                                className="w-[220px] p-2 rounded bg-[#144EE3] text-gradient border border-[#144EE3] shadow-lg text-white font-inter font-semibold text-[16px] leading-[18px] cursor-pointer"
                                type="text"
                                placeholder="Custom URL (optional)"
                                value={customUrl}
                                onChange={(e) => setCustomUrl(e.target.value)}
                            />
                        </div>
                    </div>
                </form>
                <Elements stripe={stripePromise}>
                    <PaymentForm />
                </Elements>
            </div>
            {shortUrl && (
                <div className="dialog absolute left-[0px] top-[20px] w-full h-full bg-[#000000b5] flex justify-center items-center">
                    <div className="relative w-[480px] h-[600px] flex flex-col items-center gap-[50px] p-[50px] bg-white rounded-[24px]">
                        <button className="absolute right-[15px] top-[15px]" onClick={() => setIsDialogVisible(false)}>
                            <Image src="/close.svg" width={40} height={40} alt="Close" />
                        </button>
                        <div className="flex flex-col items-center gap-[10px]">
                            <Image src={qrCode} width={100} height={100} alt="QR Code" />
                            <span className="text-2xl font-bold">Shortened URL:</span>
                            <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                {shortUrl}
                            </a>
                        </div>
                        <button onClick={handleCopyToClipboard} className="bg-blue-500 text-white p-2 rounded">
                            Copy to Clipboard
                        </button>
                        <div className="flex gap-2 mt-4">
                            <button onClick={() => handleShare('whatsapp')} className="bg-green-500 text-white p-2 rounded">
                                Share on WhatsApp
                            </button>
                            <button onClick={() => handleShare('twitter')} className="bg-blue-400 text-white p-2 rounded">
                                Share on Twitter
                            </button>
                            <button onClick={() => handleShare('facebook')} className="bg-blue-600 text-white p-2 rounded">
                                Share on Facebook
                            </button>
                            <button onClick={() => handleShare('gmail')} className="bg-red-500 text-white p-2 rounded">
                                Share via Email
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UrlShortener;
