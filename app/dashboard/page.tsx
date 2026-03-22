import MapWidget from '@/components/dashboard/MapWidgetDynamic';
import AQITrendChart from '@/components/dashboard/AQITrendChart';
import { systemStatus, recentAlerts } from '@/lib/mockData';
import { AlertTriangle, Clock, Download, Sun } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="p-4 sm:p-6 space-y-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-foreground">
            Environmental Monitoring
          </h1>
          <p className="text-sm text-muted mt-0.5">
            Real-time biosphere metrics and quality indices.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button className="flex items-center gap-2 px-4 py-2 bg-card border border-border text-sm text-muted rounded-lg hover:text-foreground hover:bg-foreground/5 transition-colors">
            <Download size={15} />
            Export Report
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-semibold text-sm rounded-lg hover:bg-primary-dark transition-colors">
            <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground animate-pulse" />
            Live View
          </button>
        </div>
      </div>

      {/* Main Grid: Map + Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Map Widget (2/3) */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl overflow-hidden">
          {/* Card Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/60">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-xs font-semibold text-primary">
                Regional Density
              </span>
              <span className="text-xs text-muted">Optimal (82%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-2xs text-muted bg-sidebar px-2 py-1 rounded-md border border-border/60">
                Africa Region
              </span>
            </div>
          </div>

          {/* Map */}
          <div className="h-72 sm:h-80 lg:h-96">
            <MapWidget height="100%" centerLng={20} centerLat={5} zoom={2.8} />
          </div>

          {/* Map Footer */}
          <div className="flex items-center justify-center px-4 py-2.5 border-t border-border/60 bg-sidebar/50">
            <div className="flex items-center gap-2">
              <Sun size={13} className="text-primary" />
              <span className="text-2xs text-muted">
                Tracking{' '}
                <span className="text-foreground font-medium">
                  1,402 Sensors
                </span>{' '}
                globally
              </span>
            </div>
          </div>
        </div>

        {/* AQI Trend Chart (1/3) */}
        <div
          className="bg-card border border-border rounded-2xl p-4 flex flex-col"
          style={{ minHeight: '400px' }}
        >
          <AQITrendChart />
        </div>
      </div>

      {/* Bottom Row: 3 cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Recent Alerts */}
        <div className="bg-card border border-border rounded-2xl p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-attention" />
              <h3 className="text-sm font-semibold text-foreground">
                Recent Alerts
              </h3>
            </div>
            <span className="text-2xs text-attention bg-attention/10 px-2 py-0.5 rounded-full">
              {recentAlerts.length} new
            </span>
          </div>

          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start gap-3 p-3 bg-sidebar rounded-xl border border-border/60"
              >
                <div
                  className={`mt-0.5 shrink-0 w-7 h-7 rounded-lg flex items-center justify-center ${
                    alert.type === 'error'
                      ? 'bg-danger/10 border border-danger/20'
                      : 'bg-warning/10 border border-warning/20'
                  }`}
                >
                  {alert.type === 'error' ? (
                    <AlertTriangle size={13} className="text-danger" />
                  ) : (
                    <Clock size={13} className="text-warning" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground truncate">
                    {alert.title}
                  </p>
                  <p className="text-2xs text-muted leading-tight mt-0.5 truncate">
                    {alert.description}
                  </p>
                  <p className="text-3xs text-muted mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-3 w-full text-xs text-primary hover:text-primary-dark transition-colors font-medium py-1">
            View All Alerts
          </button>
        </div>

        {/* System Status */}
        <div className="bg-card border border-border rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <h3 className="text-sm font-semibold text-foreground">
              System Status
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-sidebar rounded-xl border border-border/60 p-3">
              <p className="text-2xs text-muted mb-1">CPU Load</p>
              <p className="text-xl font-bold text-primary">
                {systemStatus.cpuLoad}%
              </p>
              <div className="mt-2 h-1 bg-foreground/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${systemStatus.cpuLoad}%` }}
                />
              </div>
            </div>
            <div className="bg-sidebar rounded-xl border border-border/60 p-3">
              <p className="text-2xs text-muted mb-1">Latency</p>
              <p className="text-xl font-bold text-primary">
                {systemStatus.latency}ms
              </p>
              <div className="mt-2 h-1 bg-foreground/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: '12%' }}
                />
              </div>
            </div>
            <div className="bg-sidebar rounded-xl border border-border/60 p-3">
              <p className="text-2xs text-muted mb-1">Uptime</p>
              <p className="text-xl font-bold text-primary">
                {systemStatus.uptime}%
              </p>
              <div className="mt-2 h-1 bg-foreground/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: '99.9%' }}
                />
              </div>
            </div>
            <div className="bg-sidebar rounded-xl border border-border/60 p-3">
              <p className="text-2xs text-muted mb-1">Storage</p>
              <p className="text-xl font-bold text-primary">
                {systemStatus.storage}
              </p>
              <div className="mt-2 h-1 bg-foreground/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: '48%' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Air Quality Insights */}
        <div className="bg-card border border-border rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <h3 className="text-sm font-semibold text-foreground">
              Air Quality Insights
            </h3>
          </div>

          <p className="text-xs text-muted mb-4 leading-relaxed">
            Recorded a{' '}
            <span className="text-primary font-medium">12% decrease</span> in
            particulate matter across monitored regions over the last 24 hours.
          </p>

          <div className="space-y-2.5">
            {[
              { name: 'Ozone (O₃)', value: 38, status: 'Good' as const },
              {
                name: 'Nitrogen Dioxide (NO₂)',
                value: 52,
                status: 'Moderate' as const,
              },
              {
                name: 'Sulfur Dioxide (SO₂)',
                value: 28,
                status: 'Good' as const,
              },
            ].map((pollutant) => (
              <div
                key={pollutant.name}
                className="flex items-center justify-between py-2 border-b border-border/60 last:border-0"
              >
                <div>
                  <p className="text-xs font-medium text-foreground">
                    {pollutant.name}
                  </p>
                  <p className="text-2xs text-muted mt-0.5">
                    {pollutant.value} µg/m³
                  </p>
                </div>
                <span
                  className={`text-2xs font-semibold px-2.5 py-1 rounded-full ${
                    pollutant.status === 'Good'
                      ? 'bg-primary/10 text-primary'
                      : 'bg-warning/10 text-warning'
                  }`}
                >
                  {pollutant.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
