import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { SignUpButton } from '@clerk/nextjs';
import { MapIcon, Smartphone, Target, TrendingUp } from 'lucide-react';

const capabilities = [
  {
    icon: <Target size={24} />,
    title: 'Precision Monitoring',
    description:
      'Access precise air quality metrics down to a 500m radius, synthesized from over 40,000 global sensor nodes.',
  },
  {
    icon: <MapIcon size={24} />,
    title: 'Interactive Map',
    description:
      'View air quality data across major African cities with interactive visualization and real-time updates.',
  },
  {
    icon: <TrendingUp size={24} />,
    title: '24-Hour AQI Trends',
    description:
      'Track pollution changes over time with hourly readings and detailed trend analysis.',
  },
  {
    icon: <Smartphone size={24} />,
    title: 'Mobile-First Design',
    description:
      'Optimized for speed, clarity, and accessibility to ensure environmental data is always at your fingertips.',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 md:pt-44 md:pb-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center text-center gap-12 my-20">
            <div className="flex-1 max-w-6xl mx-auto">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
                Real-Time Environmental Insights for African Cities
              </h1>
              <p className="text-lg text-center mx-auto text-muted mb-8 leading-relaxed max-w-2xl">
                Empowering communities with high-resolution air quality data and
                climate analytics across the continent.
              </p>
              <div className="flex gap-4 text-center justify-center">
                <SignUpButton mode="redirect">
                  <button className="px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary-dark transition-colors text-sm">
                    Launch Dashboard
                  </button>
                </SignUpButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6">
        <div className="mb-8">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-4">
            Our Capabilities
          </p>
          <h2 className="text-2xl font-bold text-foreground">
            Precision Monitoring
          </h2>
        </div>

        <div className="md:grid md:grid-cols-2 gap-8">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="border border-border rounded-xl p-4 mb-4 bg-card/50"
            >
              <div className="text-xl mb-3">{cap.icon}</div>
              <h3 className="font-semibold text-foreground mb-2 text-sm">
                {cap.title}
              </h3>
              <p className="text-muted text-xs leading-relaxed">
                {cap.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 border-y border-border/60 lg:px-8">
        <div className="bg-primary w-16 mb-8 h-1 mx-auto" />
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mx-auto text-center max-w-5xl">
          We&apos;re on a mission to accelerate the transition to a sustainable
          economy.
        </h2>
        <p className="text-muted leading-relaxed max-w-2xl mx-auto mt-6 text-center">
          EcoPulse was founded with a singular vision: to make environmental
          impact as measurable as financial performance. We believe that
          transparency is the first step toward significant ecological change.
          We aggregate, synthesize, and visualize climate and air quality data
          across African cities, bringing visibility to communities that need it
          most.
        </p>
      </section>

      <section className="block py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-4">
            Our Methodology
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Data Integrity is Our DNA
          </h2>
          <p className="text-muted text-base max-w-2xl mx-auto mb-12 leading-relaxed">
            EcoPulse isn&apos;t just a visualization tool. We leverage
            OpenAQ&apos;s expansive open-source datasets to deliver insights
            that matter. We believe transparency is the first step toward
            planetary healing.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
