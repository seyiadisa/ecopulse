'use client';

import { useState, useEffect, useRef } from 'react';
import { getAQIColor } from '@/lib/utils';
import { useTheme } from '@/providers/theme';
import mapboxgl from 'mapbox-gl';
import { cities } from '@/lib/data';
import { AQData, CityKey } from '@/types';
import { MapIcon } from 'lucide-react';

export default function Map({
  isFetching,
  data,
  pm25Values,
  selectedCity,
  setSelectedCity,
}: {
  isFetching: boolean;
  data: AQData[][];
  pm25Values: number[];
  selectedCity: CityKey;
  setSelectedCity: (cityId: CityKey) => void;
}) {
  const cityKeys = Object.keys(cities) as CityKey[];
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const mapRef = useRef<unknown>(null);
  const markersRef = useRef<unknown[]>([]);

  const { theme } = useTheme();
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setMapError('Mapbox could not be initialized.');
      return;
    }
    if (!mapContainerRef.current) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let map: any = null;

    const initMap = async () => {
      try {
        mapboxgl.accessToken = token;

        map = new mapboxgl.Map({
          container: mapContainerRef.current!,
          style:
            theme === 'dark'
              ? 'mapbox://styles/mapbox/dark-v11'
              : 'mapbox://styles/mapbox/light-v11',
          center: [20, 5],
          zoom: 3,
          attributionControl: false,
        });

        map.addControl(new mapboxgl.AttributionControl({ compact: true }));
        mapRef.current = map;

        (map as mapboxgl.Map).on('load', () => {
          Object.values(cities).forEach((city, index) => {
            const color = isFetching ? '' : getAQIColor(pm25Values[index]);
            const el = document.createElement('div');
            el.style.cssText = `
							width: 36px; height: 36px; cursor: pointer;
							display: flex; align-items: center; justify-content: center;
						`;
            el.innerHTML =
              isFetching || !data[index]
                ? `
						<div style="
							width: 28px; height: 28px; border-radius: 50%;
							background: var(--primary); border: 2px solid #999999;
							display: flex; align-items: center; justify-content: center;
							font-size: 9px; font-weight: 700; color: #999999;
							font-family: system-ui, sans-serif;
							animation: pulse 1.5s infinite;
						"></div>
						`
                : `
							<div style="
								width: 28px; height: 28px; border-radius: 50%;
								background: ${color}20; border: 2px solid ${color};
								display: flex; align-items: center; justify-content: center;
								font-size: 9px; font-weight: 700; color: ${color};
								font-family: system-ui, sans-serif; transition: all 0.2s;
							">${pm25Values[index]}</div>
						`;
            el.addEventListener('click', () => setSelectedCity(city.id));

            const marker = new mapboxgl.Marker({ element: el })
              .setLngLat([city.lon, city.lat])
              .addTo(map as mapboxgl.Map);

            markersRef.current.push(marker);
          });
        });
      } catch (err) {
        console.error('Mapbox init error:', err);
        setMapError('Failed to initialize map. Check your Mapbox token.');
      }
    };

    initMap();
    return () => {
      if (map) map.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, theme]);

  // Update markers when fresh city data arrives (after initial map load)
  useEffect(() => {
    const map = mapRef.current as mapboxgl.Map | null;
    if (!map || !cities) return;

    // Remove old markers
    markersRef.current.forEach((m) => (m as mapboxgl.Marker).remove());
    markersRef.current = [];

    const addMarkers = async () => {
      const mapboxgl = (await import('mapbox-gl')).default;
      Object.values(cities).forEach((city, index) => {
        const color = isFetching ? '' : getAQIColor(pm25Values[index]);
        const el = document.createElement('div');
        el.style.cssText = `
  				width: 36px; height: 36px; cursor: pointer;
  				display: flex; align-items: center; justify-content: center;
  			`;

        el.innerHTML =
          isFetching || !data[index]
            ? `
  						<div style="
  							width: 28px; height: 28px; border-radius: 50%;
  							background: #99999920; border: 2px solid #999999;
  							display: flex; align-items: center; justify-content: center;
  							font-size: 9px; font-weight: 700; color: #999999;
  							font-family: system-ui, sans-serif;
  							animation: pulse 1.5s infinite;
  						"></div>`
            : `
  				<div style="
  					width: 28px; height: 28px; border-radius: 50%;
  					background: ${color}20; border: 2px solid ${color};
  					display: flex; align-items: center; justify-content: center;
  					font-size: 9px; font-weight: 700; color: ${color};
  					font-family: system-ui, sans-serif;
  				">${pm25Values[index]}</div>
  			`;
        el.addEventListener('click', () => setSelectedCity(city.id));

        const marker = new mapboxgl.Marker({ element: el })
          .setLngLat([city.lon, city.lat])
          .addTo(map);

        markersRef.current.push(marker);
      });
    };

    if ((map as mapboxgl.Map).loaded()) {
      addMarkers();
    } else {
      (map as mapboxgl.Map).on('load', addMarkers);
    }
  }, [data, pm25Values, setSelectedCity, isFetching, selectedCity]);

  return (
    <div className="flex-1 relative">
      {mapError ? (
        <div className="flex flex-col items-center justify-center h-full bg-sidebar text-center p-8">
          <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center mb-4">
            <MapIcon size={28} />
          </div>
          <p className="text-muted text-sm font-medium mb-2">Map Unavailable</p>
          <p className="text-muted text-xs max-w-xs">{mapError}</p>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg w-full">
            {Object.values(cities).map((city) => (
              <button
                key={city.id}
                onClick={() => setSelectedCity(city.id)}
                className={`p-3 rounded-xl border text-left transition-colors ${
                  selectedCity === city.id
                    ? 'border-primary/40 bg-primary/5'
                    : 'border-border/60 bg-card hover:border-border'
                }`}
              >
                <p className="text-xs font-semibold text-foreground">
                  {city.name}
                </p>
                <p className="text-2xs text-muted">{city.country}</p>
                <p
                  className="text-base font-bold mt-1"
                  style={{
                    color: getAQIColor(pm25Values[cityKeys.indexOf(city.id)]),
                  }}
                >
                  {pm25Values[cityKeys.indexOf(city.id)]} PM2.5
                </p>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div ref={mapContainerRef} className="w-full h-full" />
      )}
    </div>
  );
}
