'use client'
import { Container } from '@mui/material';
import AdminPage from './page';
import { useAuth } from '@/contexts';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && (!user || user.role !== 'admin')) {
            router.replace('/auth/login?message=admin-required');
        }
    }, [user, loading]);

    if (loading) return null;

    return (
        <div>
            <Container maxWidth={false} sx={{ py: 2 }}>
                <AdminPage>
                    {children}
                </AdminPage>
            </Container>
        </div>
    );
}
