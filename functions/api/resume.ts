interface Env {
  RESUME_BUCKET: R2Bucket;
  RESUME_PASSWORD: string;
}

const RESUME_KEY = 'Robyn-Stokes-Resume-2026.pdf';

// constant-time string comparison — avoids leaking password length/content via timing
function safeEqual(a: string, b: string): boolean {
  const encoder = new TextEncoder();
  const bytesA = encoder.encode(a);
  const bytesB = encoder.encode(b);
  if (bytesA.length !== bytesB.length) return false;
  let diff = 0;
  for (let i = 0; i < bytesA.length; i++) {
    diff |= bytesA[i] ^ bytesB[i];
  }
  return diff === 0;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  let body: { password?: string };
  try {
    body = await context.request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const submitted = body.password ?? '';
  const expected = context.env.RESUME_PASSWORD ?? '';

  if (!expected || !safeEqual(submitted, expected)) {
    return new Response(JSON.stringify({ error: 'Incorrect password' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const object = await context.env.RESUME_BUCKET.get(RESUME_KEY);
  if (!object) {
    return new Response(JSON.stringify({ error: 'Resume not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(object.body, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${RESUME_KEY}"`,
      'Cache-Control': 'no-store',
    },
  });
};
