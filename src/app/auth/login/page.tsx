import { Suspense } from 'react';
import LoginClient from './Login';

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginClient />
    </Suspense>
  );
}
