import { sql } from '../../db';
export async function GET() {
  try {
    const announcements = await sql`
      SELECT
        id,
        title,
        announcement_date,
        announcement_type,
        message,
        image_url,
        created_at
      FROM announcements
      ORDER BY id DESC
    `;

    return Response.json(announcements);
  } catch (error) {
    console.error('GET ANNOUNCEMENTS ERROR:', error);

    return Response.json(
      { error: 'Failed to load announcements' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      title,
      announcement_date,
      announcement_type,
      message,
      image_url,
    } = body;

    if (!title || !message) {
      return Response.json(
        {
          error:
            'Announcement title and message are required',
        },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO announcements (
        title,
        announcement_date,
        announcement_type,
        message,
        image_url
      )
      VALUES (
        ${title},
        ${announcement_date || new Date().toLocaleDateString('en-GB')},
        ${announcement_type || 'General'},
        ${message},
        ${image_url || ''}
      )
      RETURNING
        id,
        title,
        announcement_date,
        announcement_type,
        message,
        image_url,
        created_at
    `;

    return Response.json(result[0], {
      status: 201,
    });
  } catch (error) {
    console.error('POST ANNOUNCEMENT ERROR:', error);

    return Response.json(
      {
        error: 'Failed to save announcement',
      },
      { status: 500 }
    );
  }
}
