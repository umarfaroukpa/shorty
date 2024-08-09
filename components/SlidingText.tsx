import { useEffect, useState } from 'react';

const slidingTexts = [
    'Test The Best URL Shortening Services',
    'Have Full Control Over Your Links',
    'Give Your Links Superpower',
    'Find Out When Your Links Get Clicked',
];

const SlidingText = () => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTextIndex((prevIndex) => (prevIndex + 1) % slidingTexts.length);
        }, 3000); // Change text every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <h1 className=" flex justify-center text-4xl text-gradient p-8 ">
            {slidingTexts[currentTextIndex]}
        </h1>
    );
};

export default SlidingText;
