import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSignIn } from '@clerk/nextjs';

interface SSOCallbackProps extends Record<string, never> {
  // Add properties if needed
}

const SsoCallback: React.FC<SSOCallbackProps> = () => {
    const router = useRouter();
    const { isLoaded, setActive } = useSignIn();

    useEffect(() => {
        if (!isLoaded) return;

        const completeSignIn = async (): Promise<void> => {
            try {
                await setActive({ session: window.location.href });
                await router.push('/MainPage');
            } catch (error) {
                console.error('SSO callback error:', error);
                await router.push('/error');
            }
        };

        void completeSignIn();
    }, [isLoaded, setActive, router]);

    return <div className="flex justify-center items-center h-screen">Loading...</div>;
};

export default SsoCallback;
