import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PricingPlanCard = ({ title, price, yearlyPrice, description, features, extraInfo }) => {
    return (
        <div className="border rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow bg-[#3f4551]  duration-300 text-gradient">
            <h3 className="text-xl font-semibold mb-4">{title}</h3>
            <div className="mb-4">
                <span className="text-2xl font-bold">{price}</span>
                <span className="text-gray-600"> / mo</span>
            </div>
            <div className="mb-4">
                <span className="text-gray-600">({yearlyPrice} / yr)</span>
            </div>
            <div className="mb-4">
                <span className="text-lg font-bold">{extraInfo}</span>
            </div>
            <ul className="mb-4">
                {features.map((feature, index) => (
                    <li key={index} className="mb-2 text-gray-700">
                        {feature}
                    </li>
                ))}
            </ul>
            <p className="text-gray-600">{description}</p>
        </div>
    );
};

const Pricing = () => {
    const [billingCycle, setBillingCycle] = useState('monthly');

    const toggleBillingCycle = () => {
        setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly');
    };

    const plans = [
        {
            title: 'Pro',
            price: billingCycle === 'monthly' ? '$9.99' : '$8.99',
            yearlyPrice: '$119.88',
            extraInfo: '500 Links with Unlimited Trackable Clicks',
            features: [
                'Link Analytics',
                'Advanced Link Management',
                'Shorten URLs Using Branded Domains',
                'Link Editing & Deletion',
                'Custom Link Expiration Dates',
            ],
            description: 'Enjoy 500 links with unlimited clicks and track up to 9.5K clicks on 9.5K additional links.',
        },
        {
            title: 'Bulk 100K',
            price: billingCycle === 'monthly' ? '$99.00' : '$89.00',
            yearlyPrice: '$1,188.00',
            extraInfo: '100K Links and Track up to 100K Clicks',
            features: [
                'All Pro features',
                '90-day default link expiration',
                'Track up to 100K clicks across 100K branded short links',
            ],
            description: 'Our bulk plan for users who need to generate a ton of short-term, branded links to support their marketing or operations.',
        },
        {
            title: 'Enterprise',
            price: 'Custom',
            yearlyPrice: '',
            extraInfo: 'Custom Solutions',
            features: [
                'Larger limits',
                'Dedicated customer support',
                'Custom solutions',
                'Specific compliance requirements',
            ],
            description: 'We offer tailor-made plans for enterprises that need more than what our regular plans can offer.',
        },
    ];

    // Define the handler functions for login and signup clicks
    const handleLoginClick = () => {
        // Define what should happen on login click
    };

    const handleSignupClick = () => {
        // Define what should happen on signup click
    };

    return (
        <>
            <Navbar onLoginClick={handleLoginClick} onSignupClick={handleSignupClick} />
            <div className="pricing-plan-card container mx-auto p-8 pt-32">
                <h1 className="text-3xl font-bold text-center mb-8 text-gradient">Find a plan that meets your needs</h1>
                <div className="text-center mb-8">
                    <span>Billing cycle: </span>
                    <button
                        className={`px-4 py-2 ${billingCycle === 'monthly' ? 'bg-[#144EE3] border border-[#144EE3] text-gradient' : 'bg-gray-200'}`}
                        onClick={() => setBillingCycle('monthly')}
                    >
                        Monthly
                    </button>
                    <button
                        className={`px-4 py-2 ${billingCycle === 'annual' ? 'bg-[#144EE3] border border-[#144EE3] text-gradient' : 'bg-gray-200'}`}
                        onClick={() => setBillingCycle('annual')}
                    >
                        Annual
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <PricingPlanCard key={index} {...plan} />
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Pricing;
