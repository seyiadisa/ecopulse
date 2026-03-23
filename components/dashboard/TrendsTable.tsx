export default function TrendsTable() {
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-border/60">
        <h3 className="text-sm font-semibold text-foreground">
          Hourly Readings
        </h3>
        <span className="text-xs text-muted">Last 24 hours</span>
      </div>

      <div className="overflow-x-auto scrollbar-hide">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border/60">
              {['Time', 'AQI', 'PM2.5', 'PM10', 'Category'].map((header) => (
                <th
                  key={header}
                  className="text-left px-4 sm:px-6 py-3 text-2xs font-semibold text-muted uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* {hourlyReadings.map((reading, index) => (
              <tr
                key={reading.time}
                className={`border-b border-border/60 hover:bg-foreground/5 transition-colors ${
                  index === 0 ? 'bg-primary/5' : ''
                }`}
              >
                <td className="px-4 sm:px-6 py-3 text-muted font-mono">
                  {reading.time}
                </td>
                <td
                  className="px-4 sm:px-6 py-3 font-bold"
                  style={{ color: getAQIColor(reading.aqi) }}
                >
                  {reading.aqi}
                </td>
                <td className="px-4 sm:px-6 py-3 text-foreground/80">
                  {reading.pm25}
                </td>
                <td className="px-4 sm:px-6 py-3 text-foreground/80">
                  {reading.pm10}
                </td>
                <td className="px-4 sm:px-6 py-3">
                  <span
                    className="px-2 py-0.5 rounded-full text-3xs font-semibold"
                    style={{
                      backgroundColor: `${getAQIColor(reading.aqi)}15`,
                      color: getAQIColor(reading.aqi),
                    }}
                  >
                    {reading.category}
                  </span>
                </td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
