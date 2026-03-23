import { NextRequest, NextResponse } from 'next/server';
import { OPENAQ_BASE } from '@/lib/utils';
import { AQData } from '@/types';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const sensorResults: AQData[] = [];

  try {
    const locationRes = await fetch(
      `${OPENAQ_BASE}/locations/${searchParams.get('openaqId')}`,
      {
        headers: {
          'X-API-Key': process.env.OPENAQ_API_KEY || '',
        },
      }
    );

    const locationData = await locationRes.json();

    if (
      !locationRes.ok ||
      !locationData.results ||
      !locationData.results.length
    ) {
      return NextResponse.json(
        { error: 'Failed to fetch latest data' },
        { status: 500 }
      );
    }

    for (const sensor of locationData.results[0].sensors) {
      const sensorRes = await fetch(`${OPENAQ_BASE}/sensors/${sensor.id}`, {
        headers: {
          'X-API-Key': process.env.OPENAQ_API_KEY || '',
        },
      });

      const sensorData = await sensorRes.json();
      if (!sensorRes.ok || !sensorData.results) {
        return NextResponse.json(
          { error: 'Failed to fetch sensor data' },
          { status: 500 }
        );
      }

      sensorResults.push({
        parameter: sensor.parameter.name,
        value: sensorData.results[0].latest.value,
        unit: sensor.parameter.units,
        lastUpdated: sensorData.results[0].latest.datetime.utc,
      });
    }

    return NextResponse.json(sensorResults);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
