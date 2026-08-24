import { sql } from '../../../db';

export async function GET() {
  try {
    const players = await sql`
      SELECT
        id,
        name,
        number,
        position,
        image_url
      FROM players
      ORDER BY number ASC, id DESC
    `;

    return Response.json(players);
  } catch (error) {
    console.error('GET PLAYERS ERROR:', error);

    return Response.json(
      { error: 'Failed to load players' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      name,
      number,
      position,
      image_url,
    } = body;

    if (!name || number === undefined || !position) {
      return Response.json(
        {
          error:
            'Player name, jersey number and position are required',
        },
        { status: 400 }
      );
    }

    const playerNumber = Number(number);

    if (!Number.isInteger(playerNumber) || playerNumber < 0) {
      return Response.json(
        {
          error: 'Jersey number must be a valid number',
        },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO players (
        name,
        number,
        position,
        image_url
      )
      VALUES (
        ${name},
        ${playerNumber},
        ${position},
        ${image_url || ''}
      )
      RETURNING
        id,
        name,
        number,
        position,
        image_url
    `;

    return Response.json(result[0], {
      status: 201,
    });
  } catch (error) {
    console.error('POST PLAYER ERROR:', error);

    return Response.json(
      { error: 'Failed to save player' },
      { status: 500 }
    );
  }
}
