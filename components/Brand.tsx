import React from 'react';

const Companies = () => {
    const companies = [
        'Twitter', 'Indeed', 'LinkedIn', 'Multichoice', 'Facebook',
        'CocaCola', 'Mikano', 'Startimes', 'Instagram', 'Signal',
        'TheCable', 'Amazon', 'Magazine', 'Times', 'Proper'
    ];

    return (
        <div className="brand p-4 rounded-lg shadow-md mt-8 text-white mx-auto ">
            <h2 className="text-2xl font-bold text-center mb-4 text-gradient">
                Discover Some of Brands That Have Been Using Shorty For Longer Period Of Time
            </h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-center ">
                {companies.map((company, index) => (
                    <li key={index} className="bg-[#144EE3] p-2 rounded-lg shadow-sm text-center flex flex-col items-center">
                        <span className="text-lg font-semibold">{company}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Companies;
