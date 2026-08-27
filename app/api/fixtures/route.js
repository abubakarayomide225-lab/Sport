import { sql } from '../../db';

export async function GET() {
  try {
    const fixtures = await sql`
      SELECT
        id,
        opponent,
        match_date,
        match_time,
        venue
      FROM fixtures
      ORDER BY id DESC
    `;

    return Response.json(fixtures);
  } catch (error) {
    console.error('GET FIXTURES ERROR:', error);

    return Response.json(
      { error: 'Failed to load fixtures' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      opponent,
      match_date,
      match_time,
      venue,
    } = body;

    if (!opponent || !match_date || !match_time) {
      return Response.json(
        {
          error:
            'Opponent, match date and match time are required',
        },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO fixtures (
        opponent,
        match_date,
        match_time,
        venue
      )
      VALUES (
        ${opponent},
        ${match_date},
        ${match_time},
        ${venue || 'Home'}
      )
      RETURNING
        id,
        opponent,
        match_date,
        match_time,
        venue
    `;

    return Response.json(result[0], {
      status: 201,
    });
  } catch (error) {
    console.error('POST FIXTURE ERROR:', error);

    return Response.json(
      { error: 'Failed to save fixture' },
      { status: 500 }
    );
  }
}
