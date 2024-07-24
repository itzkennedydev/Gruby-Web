import React, { useState, useEffect } from 'react';
import { useSignUp, useSignIn, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthPage: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isSignUp, setIsSignUp] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const { isSignedIn, isLoaded: userIsLoaded } = useUser();
  const { isLoaded: signUpIsLoaded, signUp, setActive: setActiveSignUp } = useSignUp();
  const { isLoaded: signInIsLoaded, signIn, setActive: setActiveSignIn } = useSignIn();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push('/DashboardPage');
    }
  }, [isSignedIn, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpIsLoaded || !signInIsLoaded) return;

    setIsLoading(true);

    try {
      if (isSignUp) {
        if (password !== confirmPassword) {
          toast.error("Passwords don't match.");
          setIsLoading(false);
          return;
        }

        const result = await signUp.create({
          emailAddress: email,
          password,
          firstName,
          lastName,
        });

        if (result.status === 'missing_requirements') {
          setIsVerifying(true);
          await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
          toast.info("Please check your email for a verification code.");
        } else if (result.status === 'complete') {
          await setActiveSignUp({ session: result.createdSessionId });
          router.push('/DashboardPage');
        } else {
          console.log('Sign up failed', result);
          toast.error('Sign up failed. Please try again.');
        }
      } else {
        const result = await signIn.create({
          identifier: email,
          password,
        });

        if (result.status === 'complete') {
          await setActiveSignIn({ session: result.createdSessionId });
          router.push('/DashboardPage');
        } else {
          console.log('Sign in failed', result);
          toast.error('Sign in failed. Please check your credentials and try again.');
        }
      }
    } catch (err: unknown) {
      console.error('Error during auth', err);
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });

      if (result.status === 'complete') {
        await setActiveSignUp({ session: result.createdSessionId });
        router.push('/DashboardPage');
      } else {
        console.log('Verification failed', result);
        toast.error('Verification failed. Please try again.');
      }
    } catch (err: unknown) {
      console.error('Error during verification', err);
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setIsVerifying(false);
  };

  if (!userIsLoaded || !signUpIsLoaded || !signInIsLoaded) {
    return <div>Loading...</div>;
  }

  if (isSignedIn) {
    return <div>Redirecting to dashboard...</div>;
  }

  return (
      <div className="flex h-screen bg-white">
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          <div className="max-w-md w-full">
            <img src="https://utfs.io/f/a133243c-ddb7-4801-9240-f95b779dcf8e-wcqpa5.png" alt="Logo" className="h-8 mb-16" />
            <h1 className="text-3xl font-bold mb-2 text-black">
              {isSignUp ? (isVerifying ? 'Verify your email' : 'Create an account') : 'Sign in to your account'}
            </h1>
            <p className="text-gray-600 mb-8">
              {isSignUp ? (isVerifying ? 'Enter the verification code sent to your email.' : 'Describe yourself as clearly so that there are no mistakes.') : 'Welcome back! Please enter your details.'}
            </p>

            {isVerifying ? (
                <form onSubmit={handleVerification}>
                  <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Enter verification code"
                        className="w-full p-3 border border-gray-300 rounded-lg text-black"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        required
                    />
                  </div>
                  <button
                      type="submit"
                      className="w-full bg-gray-950 text-white p-3 rounded-lg font-medium"
                      disabled={isLoading}
                  >
                    {isLoading ? 'Verifying...' : 'Verify Email'}
                  </button>
                </form>
            ) : (
                <form onSubmit={handleSubmit}>
                  {isSignUp && (
                      <div className="flex space-x-4 mb-4">
                        <input
                            type="text"
                            placeholder="First Name"
                            className="w-1/2 p-3 border border-gray-300 rounded-lg text-black"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            className="w-1/2 p-3 border border-gray-300 rounded-lg text-black"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                      </div>
                  )}
                  <div className="mb-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full p-3 border border-gray-300 rounded-lg text-black"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                  </div>
                  {isSignUp && (
                      <div className="mb-4">
                        <input
                            type="password"
                            placeholder={isSignUp ? 'Create a password' : 'Enter your password'}
                            className="w-full p-3 border border-gray-300 rounded-lg text-black"
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value);
                              if (isSignUp) checkPasswordStrength(e.target.value);
                            }}
                            required
                        />
                      </div>
                  )}
                  <div className="mb-4">
                    <div>
                      <input
                          type="password"
                          placeholder="Confirm password"
                          className="w-full p-3 border border-gray-300 rounded-lg text-black"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                      />
                    </div>
                    {isSignUp && (
                        <div className="flex items-center mt-6">
                          {[1, 2, 3, 4].map((level) => (
                              <div
                                  key={level}
                                  className={`h-1 w-1/4 mr-1 rounded ${
                                      passwordStrength >= level ? 'bg-blue-500' : 'bg-gray-300'
                                  }`}
                              />
                          ))}
                          <div className="ml-2 text-sm text-gray-600">
                            {passwordStrength === 1 && 'Weak'}
                            {passwordStrength === 2 && 'Fair'}
                            {passwordStrength === 3 && 'Good'}
                            {passwordStrength === 4 && 'Strong'}
                          </div>
                        </div>
                    )}
                  </div>
                  {isSignUp && (
                      <div className="mb-6 mt-6">
                        <label className="flex items-center">
                          <input
                              type="checkbox"
                              className="mr-2"
                              checked={agreedToTerms}
                              onChange={(e) => setAgreedToTerms(e.target.checked)}
                              required
                          />
                          <span className="text-sm text-gray-600">
                      Yes, I understand and agree to the Terms of Service
                    </span>
                        </label>
                      </div>
                  )}
                  <button
                      type="submit"
                      className="w-full bg-gray-950 text-white p-3 rounded-lg font-medium"
                      disabled={!signUpIsLoaded || !signInIsLoaded || isLoading || (isSignUp && !agreedToTerms)}
                  >
                    {isLoading ? 'Processing...' : (isSignUp ? 'Create account' : 'Sign In')}
                  </button>
                </form>
            )}

            {!isVerifying && (
                <p className="mt-6 text-center text-sm text-gray-600">
                  {isSignUp ? 'Already have an account?' : 'Don\'t have an account?'}
                  {' '}
                  <button onClick={toggleAuthMode} className="text-gray-950">
                    {isSignUp ? 'Login' : 'Create account'}
                  </button>
                </p>
            )}
          </div>
        </div>
        <div className="hidden md:block md:w-1/2 p-4">
          <div className="h-full rounded-lg overflow-hidden">
            <img
                src="https://images.pexels.com/photos/4473501/pexels-photo-4473501.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Login background"
                className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
  );
};

export default AuthPage;