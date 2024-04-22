// pages/page.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the login page immediately when the component mounts
    router.push('/login');
  }, [router]);

  return (
    <div>
      <p>Redirecting to login...</p>
    </div>
  );
}
