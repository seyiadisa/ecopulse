import Logo from '@/components/layout/Logo';
import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="flex items-center gap-2.5 mb-8">
        <Logo />
        <span className="text-xl font-semibold text-white">EcoPulse</span>
      </div>

      <SignUp
        appearance={{
          elements: {
            rootBox: 'w-full max-w-md',
            card: 'bg-card border border-white/10 shadow-2xl rounded-2xl',
            headerTitle: 'text-white',
            headerSubtitle: 'text-gray-400',
            socialButtonsBlockButton:
              'bg-neutral-900 border border-white/10 text-white hover:bg-neutral-800',
            dividerLine: 'bg-white/10',
            dividerText: 'text-gray-500',
            formFieldLabel: 'text-gray-300',
            formFieldInput:
              'bg-neutral-900 border-white/10 text-white focus:border-primary/50',
            formButtonPrimary:
              'bg-primary hover:bg-primary-dark text-black font-semibold',
            footerActionLink: 'text-primary hover:text-primary-dark',
          },
        }}
      />
    </div>
  );
}

