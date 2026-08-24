const fixtures = [
  {
    id: 1,
    opponent: 'Abubakar fc',
    match_date: '25 Aug 2026',
    match_time: '12:00 PM',
    venue: 'Home',
  },
  {
    id: 2,
    opponent: 'Dominator fc',
    match_date: '30 Aug 2026',
    match_time: '4:00 PM',
    venue: 'Away',
  },
];

export async function GET() {
  return Response.json(fixtures);
}

export async function POST(request) {
  try {
    const body = await request.json();

    const { opponent, match_date, match_time, venue } = body;

    if (!opponent || !match_date || !match_time || !venue) {
      return Response.json(
        { error: 'All fixture fields are required' },
        { status: 400 }
      );
    }

    const newFixture = {
      id: Date.now(),
      opponent,
      match_date,
      match_time,
      venue,
    };

    fixtures.unshift(newFixture);

    return Response.json(newFixture, { status: 201 });
  } catch {
    return Response.json(
      { error: 'Failed to save fixture' },
      { status: 500 }
    );
  }
}
