import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { SignUpButton } from '@clerk/nextjs';
import Link from 'next/link';

const capabilities = [
  {
    icon: '🎯',
    title: 'Precision Monitoring',
    description:
      'Access precise air quality metrics down to a 500m radius, synthesized from over 40,000 global sensor nodes.',
  },
  {
    icon: '🗺️',
    title: 'Interactive Map',
    description:
      'View air quality data across major African cities with interactive visualization and real-time updates.',
  },
  {
    icon: '📈',
    title: '24-Hour AQI Trends',
    description:
      'Track pollution changes over time with hourly readings and detailed trend analysis.',
  },
  {
    icon: '📱',
    title: 'Mobile-First Design',
    description:
      'Optimized for speed, clarity, and accessibility to ensure environmental data is always at your fingertips.',
  },
];

const stats = [
  { value: '40K+', label: 'Global Sensors' },
  { value: '500m', label: 'Spatial Resolution' },
  { value: 'Real-time', label: 'Update Frequency' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 md:pt-32 md:pb-20">
        <div className="mx-auto max-w-7xl">
          {/* Mobile Hero */}
          <div className="md:hidden mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight mb-4">
              Real-Time Environmental Insights for{' '}
              <span className="text-primary">African Cities</span>
            </h1>
            <p className="text-base text-muted mb-6 leading-relaxed">
              Harnessing open-source data to monitor air quality, climate
              trends, and environmental health across the continent.
            </p>
            <div className="flex flex-col gap-3">
              <SignUpButton mode="redirect">
              <button className="w-full px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary-dark transition-colors text-sm">
                Launch Dashboard
              </button>
            </SignUpButton>
              <button className="w-full px-6 py-3 border border-border text-foreground font-medium rounded-lg hover:bg-foreground/5 transition-colors text-sm">
                Explore Features
              </button>
            </div>
          </div>

          {/* Desktop Hero */}
          <div className="hidden md:flex items-center gap-12 mb-20">
            <div className="flex-1">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
                Real-time <span className="text-primary">Planetary</span>{' '}
                Vital Signs.
              </h1>
              <p className="text-lg text-muted mb-8 leading-relaxed max-w-2xl">
                Access a unified dashboard to monitor global air quality, carbon
                metrics, and ecological shifts in one living dashboard.
              </p>
              <div className="flex gap-4">
                <SignUpButton mode="redirect">
                  <button className="px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary-dark transition-colors text-sm">
                    Explore Live Map
                  </button>
                </SignUpButton>
                <button className="px-8 py-3.5 border border-border text-foreground font-medium rounded-full hover:bg-foreground/5 transition-colors text-sm">
                  View Analytics
                </button>
              </div>
            </div>
            {/* Globe placeholder - simulating the globe visual */}
            <div className="flex-1 hidden lg:flex items-center justify-center">
              <div className="relative w-80 h-80 rounded-2xl border border-border bg-gradient-to-br from-blue-500/20 to-cyan-500/10 flex items-center justify-center overflow-hidden">
                <div className="text-6xl">🌍</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section - Desktop */}
      <section className="hidden md:block py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Left Card - Hyper-Local Intelligence */}
            <div className="border border-border rounded-2xl p-8 bg-card/50">
              <div className="text-2xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-foreground mb-4">
                Hyper-Local Intelligence
              </h3>
              <p className="text-muted text-sm mb-6">
                Access precise air quality metrics down to a 500m radius,
                synthesized from over 40,000 global sensor nodes.
              </p>
              {/* Bar chart visualization */}
              <div className="flex items-end gap-1 h-20">
                {[35, 50, 45, 65, 70].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-primary"
                    style={{ height: `${height}%`, opacity: 0.4 + i * 0.15 }}
                  />
                ))}
              </div>
            </div>

            {/* Right Card - Global Coverage */}
            <div className="border border-border rounded-2xl p-8 bg-card/50">
              <div className="text-2xl mb-4">🌐</div>
              <h3 className="text-xl font-bold text-foreground mb-4">
                Global Coverage
              </h3>
              <p className="text-muted text-sm">
                Real-time monitoring across 10+ countries and thousands of urban
                ecosystems.
              </p>
            </div>
          </div>

          {/* Predictive Alerts */}
          <div className="border border-border rounded-2xl p-8 bg-card/50">
            <div className="flex items-start gap-4">
              <div className="text-2xl">⚠️</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground mb-3">
                  Predictive Alerts
                </h3>
                <p className="text-muted text-sm mb-4">
                  AI-driven forecasts for environmental volatility and health
                  risks.
                </p>
                <div className="flex items-center gap-8">
                  <div>
                    <div className="text-xs text-muted mb-1">ALERT RISK</div>
                    <div className="h-2 w-32 bg-foreground/10 rounded overflow-hidden">
                      <div className="h-full w-1/3 bg-warning"></div>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted mb-1">HIGH</div>
                    <div className="text-sm font-mono text-foreground">▓▓▓▓▓</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Command Center Section - Desktop */}
      <section className="hidden md:block py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              The Command Center
            </h2>
            <p className="text-muted mt-4">
              A professional-grade interface designed for environmental
              scientists, urban planners, and the data-curious.
            </p>
          </div>

          {/* Dashboard mockup */}
          <div className="border border-border rounded-2xl p-8 bg-card/50">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-border/60">
              <div className="w-40 h-3 bg-foreground/10 rounded"></div>
              <div className="flex gap-2">
                <div className="w-20 h-8 bg-foreground/5 rounded"></div>
                <div className="w-20 h-8 bg-primary/20 rounded"></div>
              </div>
            </div>

            {/* Main content grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 h-32 bg-foreground/5 rounded border border-border/60"></div>
              <div className="h-32 bg-foreground/5 rounded border border-border/60"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section - Mobile */}
      <section className="md:hidden py-12 px-4 sm:px-6">
        <div className="mb-8">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-4">
            Our Capabilities
          </p>
          <h2 className="text-2xl font-bold text-foreground">
            Precision Monitoring
          </h2>
        </div>

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
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 border-y border-border/60">
        <div className="mx-auto max-w-7xl">
          {/* Desktop stats layout */}
          <div className="hidden md:grid grid-cols-3 gap-12">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-muted">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Mobile stats layout */}
          <div className="md:hidden">
            <div className="grid grid-cols-3 gap-4 mb-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-bold text-primary mb-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Additional mobile stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-border rounded-xl p-4 bg-card/50">
                <p className="text-3xl font-bold text-primary mb-1">42</p>
                <p className="text-xs text-muted">Current AQI Index</p>
              </div>
              <div className="border border-border rounded-xl p-4 bg-card/50">
                <p className="text-3xl font-bold text-primary mb-1">84%</p>
                <p className="text-xs text-muted">Wind Speed</p>
              </div>
              <div className="border border-border rounded-xl p-4 bg-card/50 col-span-2">
                <p className="text-3xl font-bold text-primary mb-1">
                  12 km/h
                </p>
                <p className="text-xs text-muted">Nearby Distance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section - Mobile */}
      <section className="md:hidden py-12 px-4 sm:px-6">
        <div className="border border-border rounded-2xl p-6 bg-card/50">
          <p className="text-sm text-foreground/80 italic mb-4 leading-relaxed">
            &ldquo;A lightweight dashboard built for clarity and environmental
            analytics.&rdquo;
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
              AJ
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground">Ahmed Johnson</p>
              <p className="text-2xs text-muted">Climate Tech Expert</p>
            </div>
          </div>
        </div>
      </section>

      {/* Data Integrity Section - Mobile */}
      <section className="md:hidden py-12 px-4 sm:px-6 border-y border-border/60">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Bridging the data gap to empower citizens and policymakers with
          actionable environmental intelligence.
        </h2>
        <p className="text-muted text-sm leading-relaxed">
          EcoPulse was founded on the belief that environmental transparency is
          a fundamental right. We aggregate, synthesize, and visualize climate
          and air quality data across African cities, bringing visibility to
          communities that need it most.
        </p>
      </section>

      {/* Methodology Section - Desktop */}
      <section className="hidden md:block py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-4">
            Our Methodology
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Data Integrity is Our DNA
          </h2>
          <p className="text-muted text-base max-w-2xl mx-auto mb-12 leading-relaxed">
            EcoPulse isn&apos;t just a visualization tool. We leverage
            OpenAQ&apos;s expansive open-source datasets and apply proprietary
            atmospheric modeling to deliver insights that matter. We believe
            transparency is the first step toward planetary healing.
          </p>

          {/* Stats highlight */}
          <div className="flex justify-center gap-8 flex-wrap">
            <div>
              <p className="text-3xl font-bold text-primary">40K+</p>
              <p className="text-sm text-muted mt-1">Global Sensors</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">500m</p>
              <p className="text-sm text-muted mt-1">Spatial Resolution</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">Real-time</p>
              <p className="text-sm text-muted mt-1">Update Frequency</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

