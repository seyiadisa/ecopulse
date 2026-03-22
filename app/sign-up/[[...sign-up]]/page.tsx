import Logo from '@/components/layout/Logo';
import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="flex items-center gap-2.5 mb-8">
        <Logo />
        <span className="text-xl font-semibold text-foreground">EcoPulse</span>
      </div>

      <SignUp
        appearance={{
          elements: {
            rootBox: 'w-full max-w-md',
            card: 'bg-card border border-border shadow-2xl rounded-2xl',
            headerTitle: 'text-foreground',
            headerSubtitle: 'text-muted',
            socialButtonsBlockButton:
              'bg-card border border-border text-foreground hover:bg-foreground/5',
            dividerLine: 'bg-border/60',
            dividerText: 'text-muted',
            formFieldLabel: 'text-muted',
            formFieldInput:
              'bg-card border border-border text-foreground focus:border-primary/50',
            formButtonPrimary:
              'bg-primary hover:bg-primary-dark text-primary-foreground font-semibold',
            footerActionLink: 'text-primary hover:text-primary-dark',
          },
        }}
      />
    </div>
  );
}

