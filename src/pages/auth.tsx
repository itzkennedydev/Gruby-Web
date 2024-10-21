import { useState } from 'react';
import { useSignIn, useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { RoleSelectionModal } from '~/components/RoleSelectionModal';
import { handleAuthError } from '~/utils/auth-error-handling';

interface AuthFormState {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  verificationCode?: string;
}

export default function Auth() {
  const [formState, setFormState] = useState<AuthFormState>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    verificationCode: '',
  });
  const [isSignUp, setIsSignUp] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const { isLoaded: signInLoaded, signIn, setActive } = useSignIn();
  const { isLoaded: signUpLoaded, signUp } = useSignUp();
  const router = useRouter();

  if (!signInLoaded || !signUpLoaded) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await handleSignUp();
      } else {
        await handleSignIn();
      }
    } catch (err) {
      handleAuthError(err);
    }
  };

  const handleSignUp = async () => {
    try {
      const result = await signUp.create({
        firstName: formState.firstName!,
        lastName: formState.lastName!,
        emailAddress: formState.email,
        password: formState.password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        setShowRoleModal(true);
      } else {
        setPendingVerification(true);
      }
    } catch (err) {
      handleAuthError(err);
    }
  };

  const handleSignIn = async () => {
    try {
      const result = await signIn.create({
        identifier: formState.email,
        password: formState.password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/");
      } else {
        setPendingVerification(true);
      }
    } catch (err) {
      handleAuthError(err);
    }
  };

  const handleVerification = async () => {
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: formState.verificationCode!,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/");
      }
    } catch (err) {
      handleAuthError(err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md aspect-[4/3] rounded-xl bg-white p-8 shadow-md">
        <h2 className="text-center text-2xl font-extrabold text-gray-900 mb-6">
          {isSignUp ? "Create your account" : "Sign in to your account"}
        </h2>
        {!pendingVerification ? (
          <form className="space-y-4" onSubmit={handleSubmit}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  value={formState.firstName}
                  onChange={handleChange}
                  required
                />
                <Input
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={formState.lastName}
                  onChange={handleChange}
                  required
                />
              </>
            )}
            <Input
              name="email"
              type="email"
              placeholder="Email address"
              value={formState.email}
              onChange={handleChange}
              required
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={formState.password}
              onChange={handleChange}
              required
            />
            <Button type="submit" className="w-full">
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
          </form>
        ) : (
          <div className="space-y-4">
            <Input
              name="verificationCode"
              type="text"
              placeholder="Verification Code"
              value={formState.verificationCode}
              onChange={handleChange}
              required
            />
            <Button onClick={handleVerification} className="w-full">
              Verify Email
            </Button>
          </div>
        )}
        <div className="text-center mt-4">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            {isSignUp
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
      <RoleSelectionModal isOpen={showRoleModal} onClose={() => setShowRoleModal(false)} />
    </div>
  );
}
