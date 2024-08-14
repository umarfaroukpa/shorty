import React from 'react';

interface Review {
    name: string;
    text: string;
    avatar: string;
}

const reviews: Review[] = [
    {
        name: 'Cheerful Business Man',
        text: 'This service is amazing! It has helped me a lot in my daily tasks.',
        avatar: '/cheerful-businessman-smiling-removebg-preview.png', // Remove /public prefix
    },
    {
        name: 'Jane Smith',
        text: 'Highly recommend this product. Excellent customer support and features.',
        avatar: '/co-workers-with-blue-file-removebg-preview.png', // Remove /public prefix
    },
    {
        name: 'Elegant Mike Johnson',
        text: 'Great experience! Will definitely use it again.',
        avatar: '/elegant-businessman-with-thumbs-up-removebg-preview.png', // Remove /public prefix
    },
    {
        name: 'Maria',
        text: 'Great experience! Will definitely use it again.',
        avatar: '/happy-young-female-professional-posing-with-arms-folded-removebg-preview.png', // Remove /public prefix
    },
    {
        name: 'Zulai',
        text: 'Great experience! Will definitely use it again.',
        avatar: '/portrait-handsome-young-black-african-smiling-man-removebg-preview.png', // Remove /public prefix
    },
    {
        name: 'Mike Hannan',
        text: 'Great experience! Will definitely use it again.',
        avatar: '/portrait-indigenous-businessman-removebg-preview.png', // Remove /public prefix
    },
    // Add more reviews as needed
];

const CustomerReviews: React.FC = () => {
    return (
        <div className="py-8">
            <h2 className="text-3xl font-bold text-center mb-6 text-gradient">Customer Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {reviews.map((review, index) => (
                    <div
                        key={index}
                        className=" review-card flex flex-col items-center text-gradient p-6 rounded-lg shadow-lg text-center hover:shadow-2xl transition-shadow duration-300"
                    >
                        <img
                            src={review.avatar}
                            alt={review.name}
                            className="w-32 h-32 rounded-full mb-4 object-cover" // Increased size and added object-cover
                        />
                        <p className="text-lg italic mb-2">"{review.text}"</p>
                        <h3 className="text-xl font-semibold">{review.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomerReviews;
