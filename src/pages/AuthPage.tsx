import React, { useState, useEffect } from 'react';
import { useSignUp, useSignIn, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

// Define strong types for our form data and errors
interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

type FormErrors = Partial<Record<keyof FormData | 'terms', string>>;

type ResetPasswordStep = 'email' | 'code' | 'newPassword';

interface AuthPageProps {
    initialIsSignUp?: boolean;
}

// Separate components into their own interfaces
interface VerificationFormProps {
    verificationCode: string;
    setVerificationCode: (code: string) => void;
    handleVerification: (e: React.FormEvent) => Promise<void>;
    handleBackToRoot: () => void;
    isLoading: boolean;
}

interface AuthFormProps {
    isSignUp: boolean;
    formData: FormData;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    passwordStrength: number;
    getPasswordStrengthColor: (strength: number) => string;
    getPasswordStrengthLabel: (strength: number) => string;
    agreedToTerms: boolean;
    setAgreedToTerms: (agreed: boolean) => void;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
    isLoading: boolean;
    signUpIsLoaded: boolean;
    signInIsLoaded: boolean;
    formErrors: FormErrors;
    setIsResettingPassword: (isResetting: boolean) => void;
}

interface ResetPasswordFormProps {
    formData: FormData;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleResetPassword: (e: React.FormEvent) => Promise<void>;
    isLoading: boolean;
    handleBackToRoot: () => void;
    resetPasswordStep: ResetPasswordStep;
    resetPasswordCode: string;
    setResetPasswordCode: (code: string) => void;
    passwordStrength: number;
    getPasswordStrengthColor: (strength: number) => string;
    getPasswordStrengthLabel: (strength: number) => string;
}

const AuthPage: React.FC<AuthPageProps> = ({ initialIsSignUp = true }) => {
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [isSignUp, setIsSignUp] = useState(initialIsSignUp);
    const [isLoading, setIsLoading] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [isResettingPassword, setIsResettingPassword] = useState(false);
    const [resetPasswordStep, setResetPasswordStep] = useState<ResetPasswordStep>('email');
    const [resetPasswordCode, setResetPasswordCode] = useState('');

    const { isSignedIn, isLoaded: userIsLoaded } = useUser();
    const { isLoaded: signUpIsLoaded, signUp, setActive: setActiveSignUp } = useSignUp();
    const { isLoaded: signInIsLoaded, signIn, setActive: setActiveSignIn } = useSignIn();
    const router = useRouter();

    useEffect(() => {
        if (isSignedIn) {
            router.push('/DashboardPage');
        }
    }, [isSignedIn, router]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        if (name === 'password') {
            checkPasswordStrength(value);
        }
        validateField(name as keyof FormData, value);
    };

    const validateField = (name: keyof FormData, value: string): void => {
        let error = '';
        switch (name) {
            case 'firstName':
            case 'lastName':
                if (!value.trim()) {
                    error = `${name === 'firstName' ? 'First' : 'Last'} name is required`;
                }
                break;
            case 'email':
                if (!value.trim()) {
                    error = 'Email is required';
                } else if (!/\S+@\S+\.\S+/.test(value)) {
                    error = 'Email is invalid';
                }
                break;
            case 'password':
                if (!value) {
                    error = 'Password is required';
                } else if (value.length < 8) {
                    error = 'Password must be at least 8 characters long';
                }
                break;
            case 'confirmPassword':
                if (value !== formData.password) {
                    error = 'Passwords do not match';
                }
                break;
        }
        setFormErrors((prev) => ({ ...prev, [name]: error }));
    };

    const validateForm = (): boolean => {
        let isValid = true;
        (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
            validateField(key, formData[key]);
            if (formErrors[key]) isValid = false;
        });
        if (isSignUp && !agreedToTerms) {
            setFormErrors((prev) => ({ ...prev, terms: 'You must agree to the terms of service' }));
            isValid = false;
        }
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        if (!signUpIsLoaded || !signInIsLoaded) return;

        if (!validateForm()) {
            toast.error('Please correct the errors in the form before submitting.');
            return;
        }

        setIsLoading(true);

        try {
            if (isSignUp) {
                await handleSignUp();
            } else {
                await handleSignIn();
            }
        } catch (err: unknown) {
            handleAuthError(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignUp = async (): Promise<void> => {
        if (passwordStrength < 3) {
            toast.warn("Your password is relatively weak. Consider using a stronger password with a mix of uppercase and lowercase letters, numbers, and special characters for better security.");
        }

        if (!signUp) {
            toast.error('Sign up functionality is not initialized. Please refresh the page or try again later.');
            return;
        }

        try {
            const result = await signUp.create({
                emailAddress: formData.email,
                password: formData.password,
                firstName: formData.firstName,
                lastName: formData.lastName,
            });

            await handleSignUpResult(result);
        } catch (error: any) {
            if (error.errors && error.errors[0].code === 'form_identifier_exists') {
                toast.error('This email is already registered. Please use a different email or try logging in.');
            } else {
                throw error;
            }
        }
    };

    const handleSignUpResult = async (result: any): Promise<void> => {
        if (result.status === 'missing_requirements') {
            setIsVerifying(true);
            await signUp?.prepareEmailAddressVerification({ strategy: "email_code" });
            toast.info("A verification code has been sent to your email. Please check your inbox (and spam folder) and enter the code to complete your registration.");
        } else if (result.status === 'complete') {
            await setActiveSignUp({ session: result.createdSessionId });
            toast.success("Your account has been created successfully! You're being redirected to the dashboard. Welcome aboard!");
            router.push('/DashboardPage');
        } else {
            toast.error('Account creation failed. Please verify your information and try again. If the issue persists, contact our support team.');
        }
    };

    const handleSignIn = async (): Promise<void> => {
        if (!signIn) {
            toast.error('Sign in functionality is not initialized. Please refresh the page or try again later.');
            return;
        }
        try {
            const result = await signIn.create({
                identifier: formData.email,
                password: formData.password,
            });

            if (result.status === 'complete') {
                await setActiveSignIn({ session: result.createdSessionId });
                toast.success("You've successfully signed in! Redirecting you to your dashboard. Welcome back!");
                router.push('/DashboardPage');
            } else {
                toast.error('Sign in failed. Please check your email and password and try again.');
            }
        } catch (error: any) {
            if (error.errors) {
                toast.error('Invalid email or password. Please try again.');
            } else {
                throw error;
            }
        }
    };

    const handleVerification = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        if (!signUp) {
            toast.error('Sign up functionality is not initialized. Please refresh the page or try again later.');
            return;
        }
        setIsLoading(true);

        try {
            const result = await signUp.attemptEmailAddressVerification({
                code: verificationCode,
            });

            if (result.status === 'complete') {
                await setActiveSignUp({ session: result.createdSessionId });
                toast.success("Your email has been successfully verified! You're now being redirected to your dashboard. Welcome to our community!");
                router.push('/DashboardPage');
            } else {
                toast.error('Email verification failed. Please double-check the code and try again. If you need a new code, you can request one from the verification page.');
            }
        } catch (err: unknown) {
            handleAuthError(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAuthError = (err: unknown): void => {
        console.error('Detailed error during auth:', err);
        if (err instanceof Error) {
            toast.error(`Authentication error: ${err.message}. Please try again or contact our support team if the issue persists.`);
        } else {
            toast.error('An unexpected error occurred during authentication. Please try again or contact our support team if the issue persists.');
        }
    };

    const checkPasswordStrength = (password: string): void => {
        let strength = 0;
        if (password.length >= 8) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        setPasswordStrength(strength);
    };

    const getPasswordStrengthColor = (strength: number): string => {
        switch (strength) {
            case 0: return 'bg-gray-300';
            case 1: return 'bg-red-500';
            case 2: return 'bg-orange-500';
            case 3: return 'bg-yellow-500';
            case 4: return 'bg-green-500';
            default: return 'bg-gray-300';
        }
    };

    const getPasswordStrengthLabel = (strength: number): string => {
        switch (strength) {
            case 0: return 'Begin typing';
            case 1: return 'Weak';
            case 2: return 'Fair';
            case 3: return 'Good';
            case 4: return 'Strong';
            default: return 'Begin typing';
        }
    };

    const toggleAuthMode = (): void => {
        setIsSignUp(!isSignUp);
        setIsVerifying(false);
        setIsResettingPassword(false);
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        });
        setPasswordStrength(0);
        setFormErrors({});
        setAgreedToTerms(false);
        toast.info(isSignUp ? "Please enter your credentials to access your account." : "Let's get you set up with a new account!");
    };

    const handleBackToRoot = (): void => {
        setIsVerifying(false);
        setIsSignUp(true);
        setIsResettingPassword(false);
        setResetPasswordStep('email');
        toast.info("Returning to the main authentication page. You can choose to sign up or sign in from here.");
    };

    const handleResetPassword = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (resetPasswordStep === 'email') {
                await signIn?.create({
                    strategy: "reset_password_email_code",
                    identifier: formData.email,
                });
                toast.success('If an account exists for this email, you will receive a password reset code shortly.');
                setResetPasswordStep('code');
            } else if (resetPasswordStep === 'code') {
                const result = await signIn?.attemptFirstFactor({
                    strategy: "reset_password_email_code",
                    code: resetPasswordCode,
                });
                if (result?.status === 'needs_new_password') {
                    setResetPasswordStep('newPassword');
                } else {
                    throw new Error('Invalid reset code');
                }
            } else if (resetPasswordStep === 'newPassword') {
                await signIn?.resetPassword({
                    password: formData.password,
                });
                toast.success('Your password has been successfully reset. You can now sign in with your new password.');
                setIsResettingPassword(false);
                setResetPasswordStep('email');
            }
        } catch (error) {
            console.error('Reset password error:', error);
            toast.error('An error occurred while attempting to reset your password. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!userIsLoaded || !signUpIsLoaded || !signInIsLoaded) {
        return <div>Loading...</div>;
    }

    if (isSignedIn) {
        return <div>Redirecting to dashboard...</div>;
    }

    return (
        <div className="flex h-screen bg-white">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="w-full md:w-1/2 flex items-center justify-center p-8">
                <div className="max-w-md w-full">
                    <Link href="/">
                        <img
                            src="https://utfs.io/f/a133243c-ddb7-4801-9240-f95b779dcf8e-wcqpa5.png"
                            alt="Logo"
                            className="h-8 mb-16 cursor-pointer"
                        />
                    </Link>
                    <h1 className="text-3xl font-bold mb-2 text-black">
                        {isResettingPassword
                            ? resetPasswordStep === 'email'
                                ? 'Reset Password'
                                : resetPasswordStep === 'code'
                                    ? 'Enter Reset Code'
                                    : 'Set New Password'
                            : isSignUp
                                ? isVerifying
                                    ? 'Verify your email'
                                    : 'Create an account'
                                : 'Sign in to your account'}
                    </h1>
                    <p className="text-gray-600 mb-8">
                        {isResettingPassword
                            ? resetPasswordStep === 'email'
                                ? 'Enter your email to receive instructions.'
                                : resetPasswordStep === 'code'
                                    ? 'Enter the reset code sent to your email.'
                                    : 'Enter your new password.'
                            : isSignUp
                                ? isVerifying
                                    ? 'Enter the verification code sent to your email.'
                                    : 'Please provide your details to create an account.'
                                : 'Welcome back! Please enter your details.'}
                    </p>

                    {isVerifying ? (
                        <VerificationForm
                            verificationCode={verificationCode}
                            setVerificationCode={setVerificationCode}
                            handleVerification={handleVerification}
                            handleBackToRoot={handleBackToRoot}
                            isLoading={isLoading}
                        />
                    ) : isResettingPassword ? (
                        <ResetPasswordForm
                            formData={formData}
                            handleInputChange={handleInputChange}
                            handleResetPassword={handleResetPassword}
                            isLoading={isLoading}
                            handleBackToRoot={handleBackToRoot}
                            resetPasswordStep={resetPasswordStep}
                            resetPasswordCode={resetPasswordCode}
                            setResetPasswordCode={setResetPasswordCode}
                            passwordStrength={passwordStrength}
                            getPasswordStrengthColor={getPasswordStrengthColor}
                            getPasswordStrengthLabel={getPasswordStrengthLabel}
                        />
                    ) : (
                        <AuthForm
                            isSignUp={isSignUp}
                            formData={formData}
                            handleInputChange={handleInputChange}
                            passwordStrength={passwordStrength}
                            getPasswordStrengthColor={getPasswordStrengthColor}
                            getPasswordStrengthLabel={getPasswordStrengthLabel}
                            agreedToTerms={agreedToTerms}
                            setAgreedToTerms={setAgreedToTerms}
                            handleSubmit={handleSubmit}
                            isLoading={isLoading}
                            signUpIsLoaded={signUpIsLoaded}
                            signInIsLoaded={signInIsLoaded}
                            formErrors={formErrors}
                            setIsResettingPassword={setIsResettingPassword}
                        />
                    )}

                    {!isVerifying && !isResettingPassword && (
                        <p className="mt-6 text-center text-sm text-gray-600">
                            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                            {' '}
                            <button
                                type="button"
                                onClick={toggleAuthMode}
                                className="text-gray-950 font-semibold"
                            >
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

const VerificationForm: React.FC<VerificationFormProps> = ({
                                                               verificationCode,
                                                               setVerificationCode,
                                                               handleVerification,
                                                               handleBackToRoot,
                                                               isLoading,
                                                           }) => (
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
            className="w-full bg-gray-950 text-white p-3 rounded-lg font-medium mb-4"
            disabled={isLoading}
        >
            {isLoading ? 'Verifying...' : 'Verify Email'}
        </button>
        <button
            type="button"
            onClick={handleBackToRoot}
            className="w-full bg-gray-200 text-gray-800 p-3 rounded-lg font-medium"
        >
            Back to Sign Up
        </button>
    </form>
);

const AuthForm: React.FC<AuthFormProps> = ({
                                               isSignUp,
                                               formData,
                                               handleInputChange,
                                               passwordStrength,
                                               getPasswordStrengthColor,
                                               getPasswordStrengthLabel,
                                               agreedToTerms,
                                               setAgreedToTerms,
                                               handleSubmit,
                                               isLoading,
                                               signUpIsLoaded,
                                               signInIsLoaded,
                                               formErrors,
                                               setIsResettingPassword,
                                           }) => (
    <form onSubmit={handleSubmit} className="space-y-6">
        {isSignUp && (
            <div className="flex space-x-4">
                <div className="w-1/2">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        className={`w-full p-3 border ${
                            formErrors.firstName ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg text-black`}
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                    />
                    {formErrors.firstName && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.firstName}</p>
                    )}
                </div>
                <div className="w-1/2">
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        className={`w-full p-3 border ${
                            formErrors.lastName ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg text-black`}
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                    />
                    {formErrors.lastName && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.lastName}</p>
                    )}
                </div>
            </div>
        )}
        <div>
            <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className={`w-full p-3 border ${
                    formErrors.email ? 'border-red-500' : 'border-gray-300'
                } rounded-lg text-black`}
                value={formData.email}
                onChange={handleInputChange}
                required
            />
            {formErrors.email && (
                <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
            )}
        </div>
        <div>
            <input
                type="password"
                name="password"
                placeholder={isSignUp ? 'Create a password' : 'Enter your password'}
                className={`w-full p-3 border ${
                    formErrors.password ? 'border-red-500' : 'border-gray-300'
                } rounded-lg text-black`}
                value={formData.password}
                onChange={handleInputChange}
                required
            />
            {formErrors.password && (
                <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
            )}
        </div>
        {isSignUp && (
            <>
                <div>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        className={`w-full p-3 border ${
                            formErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg text-black`}
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                    />
                    {formErrors.confirmPassword && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.confirmPassword}</p>
                    )}
                </div>
                <div>
                    <div
                        className={`h-2 w-full rounded-full ${getPasswordStrengthColor(
                            passwordStrength
                        )}`}
                    />
                    <div className="flex justify-between items-center mt-1">
                        <p className="text-sm text-gray-600">
                            {getPasswordStrengthLabel(passwordStrength)}
                        </p>
                        <p className="text-sm text-gray-600">Min 8 characters</p>
                    </div>
                </div>
                <div>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            className="mr-2"
                            checked={agreedToTerms}
                            onChange={(e) => setAgreedToTerms(e.target.checked)}
                            required
                        />
                        <span className="text-sm text-gray-600">
                            I agree to the Terms of Service
                        </span>
                    </label>
                    {formErrors.terms && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.terms}</p>
                    )}
                </div>
            </>
        )}
        <button
            type="submit"
            className={`w-full bg-gray-950 text-white p-3 rounded-lg font-medium ${
                !signUpIsLoaded || !signInIsLoaded || isLoading || (isSignUp && !agreedToTerms)
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
            }`}
            disabled={!signUpIsLoaded || !signInIsLoaded || isLoading || (isSignUp && !agreedToTerms)}
        >
            {isLoading ? 'Processing...' : isSignUp ? 'Create account' : 'Sign In'}
        </button>
        {!isSignUp && (
            <button
                type="button"
                onClick={() => setIsResettingPassword(true)}
                className="w-full text-gray-600 text-sm mt-2"
            >
                Reset password
            </button>
        )}
    </form>
);

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
                                                                 formData,
                                                                 handleInputChange,
                                                                 handleResetPassword,
                                                                 isLoading,
                                                                 handleBackToRoot,
                                                                 resetPasswordStep,
                                                                 resetPasswordCode,
                                                                 setResetPasswordCode,
                                                                 passwordStrength,
                                                                 getPasswordStrengthColor,
                                                                 getPasswordStrengthLabel,
                                                             }) => (
    <form onSubmit={handleResetPassword} className="space-y-6">
        {resetPasswordStep === 'email' && (
            <div>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full p-3 border border-gray-300 rounded-lg text-black"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
            </div>
        )}
        {resetPasswordStep === 'code' && (
            <div>
                <input
                    type="text"
                    placeholder="Enter reset code"
                    className="w-full p-3 border border-gray-300 rounded-lg text-black"
                    value={resetPasswordCode}
                    onChange={(e) => setResetPasswordCode(e.target.value)}
                    required
                />
            </div>
        )}
        {resetPasswordStep === 'newPassword' && (
            <>
                <div>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter new password"
                        className="w-full p-3 border border-gray-300 rounded-lg text-black"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm new password"
                        className="w-full p-3 border border-gray-300 rounded-lg text-black"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <div
                        className={`h-2 w-full rounded-full ${getPasswordStrengthColor(
                            passwordStrength
                        )}`}
                    />
                    <div className="flex justify-between items-center mt-1">
                        <p className="text-sm text-gray-600">
                            {getPasswordStrengthLabel(passwordStrength)}
                        </p>
                        <p className="text-sm text-gray-600">Min 8 characters</p>
                    </div>
                </div>
            </>
        )}
        <button
            type="submit"
            className="w-full bg-gray-950 text-white p-3 rounded-lg font-medium mb-4"
            disabled={isLoading}
        >
            {isLoading ? 'Processing...' : 'Reset Password'}
        </button>
        <button
            type="button"
            onClick={handleBackToRoot}
            className="w-full bg-gray-200 text-gray-800 p-3 rounded-lg font-medium"
        >
            Back to Sign In
        </button>
    </form>
);

export default AuthPage;