import { sql } from '../../db';
export async function GET() {
  try {
    const results = await sql`
      SELECT
        id,
        opponent,
        match_date,
        home_score,
        away_score,
        venue,
        status,
        notes
      FROM results
      ORDER BY id DESC
    `;

    return Response.json(results);
  } catch (error) {
    console.error('GET RESULTS ERROR:', error);

    return Response.json(
      { error: 'Failed to load results' },
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
      home_score,
      away_score,
      venue,
      status,
      notes,
    } = body;

    if (!opponent || !match_date) {
      return Response.json(
        {
          error: 'Opponent and match date are required',
        },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO results (
        opponent,
        match_date,
        home_score,
        away_score,
        venue,
        status,
        notes
      )
      VALUES (
        ${opponent},
        ${match_date},
        ${Number(home_score) || 0},
        ${Number(away_score) || 0},
        ${venue || 'Home'},
        ${status || 'Completed'},
        ${notes || ''}
      )
      RETURNING
        id,
        opponent,
        match_date,
        home_score,
        away_score,
        venue,
        status,
        notes
    `;

    return Response.json(result[0], {
      status: 201,
    });
  } catch (error) {
    console.error('POST RESULT ERROR:', error);

    return Response.json(
      { error: 'Failed to save result' },
      { status: 500 }
    );
  }
}
