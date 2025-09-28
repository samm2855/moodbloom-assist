import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LoginForm } from './LoginForm';
import { SignUpForm } from './SignUpForm';
import { ForgotPasswordForm } from './ForgotPasswordForm';

type AuthMode = 'login' | 'signup' | 'forgot-password';

interface AuthPageProps {
  onBack: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onBack }) => {
  const [mode, setMode] = useState<AuthMode>('login');

  const renderForm = () => {
    switch (mode) {
      case 'login':
        return (
          <LoginForm 
            onSignUpClick={() => setMode('signup')}
            onForgotPasswordClick={() => setMode('forgot-password')}
          />
        );
      case 'signup':
        return (
          <SignUpForm 
            onLoginClick={() => setMode('login')}
          />
        );
      case 'forgot-password':
        return (
          <ForgotPasswordForm 
            onBackClick={() => setMode('login')}
          />
        );
      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (mode) {
      case 'login':
        return 'Welcome Back';
      case 'signup':
        return 'Create Account';
      case 'forgot-password':
        return 'Reset Password';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-calm relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/src/assets/wellness-background.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-foreground hover:bg-card/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <h1 className="text-2xl font-bold text-foreground">MindMate</h1>
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>

        {/* Auth Form Container */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            <div className="wellness-card-floating backdrop-blur-wellness p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  {getTitle()}
                </h2>
                <p className="text-muted-foreground">
                  {mode === 'login' && "Sign in to continue your wellness journey"}
                  {mode === 'signup' && "Start your path to better mental wellness"}
                  {mode === 'forgot-password' && "We'll send you a reset link"}
                </p>
              </div>

              {renderForm()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};