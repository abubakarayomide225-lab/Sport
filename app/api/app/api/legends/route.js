import { sql } from '../../../db';

export async function GET() {
  try {
    const legends = await sql`
      SELECT
        id,
        name,
        position,
        bio,
        image_url
      FROM legends
      ORDER BY id DESC
    `;

    return Response.json(legends);
  } catch (error) {
    console.error('GET LEGENDS ERROR:', error);

    return Response.json(
      { error: 'Failed to load legends' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      name,
      position,
      bio,
      image_url,
    } = body;

    if (!name || !position) {
      return Response.json(
        {
          error:
            'Legend name and position are required',
        },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO legends (
        name,
        position,
        bio,
        image_url
      )
      VALUES (
        ${name},
        ${position},
        ${bio || ''},
        ${image_url || ''}
      )
      RETURNING
        id,
        name,
        position,
        bio,
        image_url
    `;

    return Response.json(result[0], {
      status: 201,
    });
  } catch (error) {
    console.error('POST LEGEND ERROR:', error);

    return Response.json(
      { error: 'Failed to save legend' },
      { status: 500 }
    );
  }
}
