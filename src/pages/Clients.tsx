import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import Layout from '../components/Layout';  // Adjust the import path as necessary

interface User {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
}

export default function ClientsPage() {
    const [clients, setClients] = useState<User[]>([]);
    const { isLoaded, isSignedIn } = useUser();

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            fetchClients();
        }
    }, [isLoaded, isSignedIn]);

    const fetchClients = async () => {
        try {
            const response = await fetch('/api/users');
            if (!response.ok) {
                throw new Error('Failed to fetch clients');
            }
            const data = await response.json();
            setClients(data);
        } catch (error) {
            console.error('Error fetching clients:', error);
        }
    };

    if (!isLoaded || !isSignedIn) {
        return <div>Loading...</div>;
    }

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-4">Clients</h1>
                <ul className="space-y-4">
                    {clients.map((client) => (
                        <li key={client.id} className="bg-white shadow rounded-lg p-4">
                            <h2 className="font-semibold">{client.firstName} {client.lastName}</h2>
                            <p className="text-gray-600">{client.email}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    );
}