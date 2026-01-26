'use client'
import BookingStepper from '@/components/booking/BookingStepper';
import { Container } from '@mui/material';

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
        <Container maxWidth={false} sx={{ py: 2}}>
            <BookingStepper />
            {children}
        </Container>
    </div>
  );
}
