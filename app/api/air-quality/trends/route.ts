import { NextRequest, NextResponse } from 'next/server';
import { OPENAQ_BASE } from '@/lib/utils';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

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

    const lastMeasurement = locationData.results[0].datetimeLast.utc as string;
    const lastMeasurementDate = new Date(lastMeasurement);
    const trendStart = new Date(
      lastMeasurementDate.setDate(lastMeasurementDate.getDate() - 30)
    ).toISOString();

    const pm25Res = await fetch(
      `${OPENAQ_BASE}/sensors/${locationData.results[0].sensors[0].id}/days?date_from=${trendStart}&date_to=${lastMeasurement}`,
      {
        headers: {
          'X-API-Key': process.env.OPENAQ_API_KEY || '',
        },
      }
    );

    const pm25Data = await pm25Res.json();
    if (!pm25Res.ok || !pm25Data.results) {
      return NextResponse.json(
        { error: 'Failed to fetch hourly data' },
        { status: 500 }
      );
    }

    return NextResponse.json(pm25Data.results);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch latest data' },
      { status: 500 }
    );
  }
}
