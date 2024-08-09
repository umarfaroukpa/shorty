import React from 'react';
import Link from 'next/link';

// Define types for Icon props
interface IconProps {
    name: string;
    className?: string;
}

// Icon Component
const Icon: React.FC<IconProps> = ({ name, className }) => {
    return <i className={`fa ${name} ${className}`}></i>;
};

// Define types for FeatureCard props
interface FeatureCardProps {
    icon: string;
    title: string;
    description: string;
    link: string;
}

// Card Component
const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, link }) => (
    <div className="flex flex-col items-end gap-4 p-4 w-[300px] h-[250px] bg-white shadow-lg rounded-lg">
        <Icon name={icon} className="text-4xl text-blue-500" />
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-gray-600 text-center">{description}</p>
        <Link href={link} className="text-blue-500 underline">
            Read More
        </Link>
    </div>
);

const Features: React.FC = () => (
    <div className="flex flex-wrap justify-center gap-8 p-8">
        <FeatureCard
            icon="fa-chart-line"
            title="Detailed Link Analytics"
            description="Provides comprehensive insights into link performance, including click-through rates, geographic data, and more."
            link="/detailed-analytics"
        />
        <FeatureCard
            icon="fa-globe"
            title="Fully Branded Domains"
            description="Customize your short links with branded domains to maintain brand consistency and trust."
            link="/branded-domains"
        />
        <FeatureCard
            icon="fa-link"
            title="Bulk Short URLs"
            description="Generate multiple short URLs in one go, making it easy to manage large-scale campaigns."
            link="/bulk-short-urls"
        />
        <FeatureCard
            icon="fa-server"
            title="Hosting Services"
            description="Reliable hosting services to keep your short links available and fast."
            link="/hosting-services"
        />
        <FeatureCard
            icon="fa-tools"
            title="Link Management Features"
            description="Advanced tools to manage, edit, and organize your links effectively."
            link="/link-management"
        />
        <FeatureCard
            icon="fa-pencil-alt"
            title="Customize URL"
            description="Easily customize your short URLs to fit your needs and branding."
            link="/customize-url"
        />
    </div>
);

export default Features;
