import { useSession } from 'next-auth/react';
import Layout from '../components/Layout';

const Dashboard = () => {
    const { data: session } = useSession();

    if (!session) {
        return <p>You need to be authenticated to view this page</p>;
    }

    return (
        <Layout>
            <h1>Dashboard</h1>
            <p>Welcome, {session.user.email}</p>
            {/* Additional dashboard functionality */}
        </Layout>
    );
};

export default Dashboard;
