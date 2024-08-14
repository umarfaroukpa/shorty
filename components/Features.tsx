import React from 'react';
import Link from 'next/link';

interface IconProps {
    name: string;
    className?: string;
    style?: React.CSSProperties; // Add style prop for custom sizing
}

const Icon: React.FC<IconProps> = ({ name, className, style }) => {
    return <i className={`fa ${name} ${className}`} style={style}></i>;
};

interface FeatureCardProps {
    icon: string;
    title: string;
    description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
    <div className="feature-card flex flex-col items-center justify-center gap-4 p-4 w-[300px] h-[250px] bg-[#3f4551] shadow-lg rounded-lg transform transition-transform hover:scale-105 hover:shadow-xl">
        <Icon name={icon} className="text-gradient" style={{ fontSize: '2rem' }} /> {/* Adjusted size */}
        <h2 className="text-5xl font-bold text-center text-gradient">{title}</h2>
        <p className="text-white text-center">{description}</p>
    </div>
);

const Features: React.FC = () => (
    <div className="flex flex-wrap justify-center gap-8 p-8">
        {[
            { icon: "fa-chart-line", title: "Detailed Link Analytics", description: "Provides comprehensive insights into link performance, including click-through rates, geographic data, and more." },
            { icon: "fa-globe", title: "Fully Branded Domains", description: "Customize your short links with branded domains to maintain brand consistency and trust." },
            { icon: "fa-link", title: "Bulk Short URLs", description: "Generate multiple short URLs in one go, making it easy to manage large-scale campaigns." },
            { icon: "fa-server", title: "Hosting Services", description: "Reliable hosting services to keep your short links available and fast." },
            { icon: "fa-tools", title: "Link Management Features", description: "Advanced tools to manage, edit, and organize your links effectively." },
            { icon: "fa-pencil-alt", title: "Customize URL", description: "Easily customize your short URLs to fit your needs and branding." }
        ].map((feature, index) => (
            <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
            />
        ))}
    </div>
);

export default Features;
