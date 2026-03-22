import Link from 'next/link';
import Logo from '../layout/Logo';

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <Logo />
              <span className="text-base font-semibold text-foreground">
                EcoPulse
              </span>
            </Link>
            <p className="text-sm text-muted leading-relaxed mb-6 max-w-xs">
              Real-time environmental monitoring for a sustainable future.
            </p>
          </div>
        </div>

        <div className="border-t border-border/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} EcoPulse. All rights reserved.
          </p>
          <p className="text-sm text-muted">Built for a greener tomorrow.</p>
        </div>
      </div>
    </footer>
  );
}

