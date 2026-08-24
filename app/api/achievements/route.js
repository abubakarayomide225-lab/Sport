import { sql } from '../../../db';

export async function GET() {
  try {
    const achievements = await sql`
      SELECT
        id,
        title,
        year,
        description,
        image_url
      FROM achievements
      ORDER BY year DESC, id DESC
    `;

    return Response.json(achievements);
  } catch (error) {
    console.error('GET ACHIEVEMENTS ERROR:', error);

    return Response.json(
      { error: 'Failed to load achievements' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      title,
      year,
      description,
      image_url,
    } = body;

    if (!title || !year) {
      return Response.json(
        {
          error:
            'Achievement title and year are required',
        },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO achievements (
        title,
        year,
        description,
        image_url
      )
      VALUES (
        ${title},
        ${year},
        ${description || ''},
        ${image_url || ''}
      )
      RETURNING
        id,
        title,
        year,
        description,
        image_url
    `;

    return Response.json(result[0], {
      status: 201,
    });
  } catch (error) {
    console.error('POST ACHIEVEMENT ERROR:', error);

    return Response.json(
      { error: 'Failed to save achievement' },
      { status: 500 }
    );
  }
}
