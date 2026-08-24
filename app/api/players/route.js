import { sql } from '../../db';

export async function GET() {
  try {
    const players = await sql`
      SELECT
        id,
        jersey_number,
        name,
        position,
        role,
        photo_url,
        bio
      FROM players
      ORDER BY jersey_number ASC
    `;

    return Response.json(players);
  } catch (error) {
    console.error(error);

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
      jersey_number,
      name,
      position,
      role,
      photo_url,
      bio,
    } = body;

    if (!name || !position) {
      return Response.json(
        { error: 'Player name and position are required' },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO players (
        jersey_number,
        name,
        position,
        role,
        photo_url,
        bio
      )
      VALUES (
        ${jersey_number || ''},
        ${name},
        ${position},
        ${role || ''},
        ${photo_url || ''},
        ${bio || ''}
      )
      RETURNING
        id,
        jersey_number,
        name,
        position,
        role,
        photo_url,
        bio
    `;

    return Response.json(result[0], { status: 201 });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: 'Failed to save player' },
      { status: 500 }
    );
  }
}
