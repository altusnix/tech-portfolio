export interface Env {
  ASSETS: Fetcher;
  RESUME_PASSWORD: string;
  RESUME_KV: KVNamespace;
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

function jsonError(message: string, status: number): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

async function getResumeBytes(env: Env): Promise<ArrayBuffer | null> {
  return env.RESUME_KV.get(RESUME_KEY, 'arrayBuffer');
}

async function handleResumeRequest(request: Request, env: Env): Promise<Response> {
  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return jsonError('Invalid request', 400);
  }

  const submitted = body.password ?? '';
  const expected = env.RESUME_PASSWORD ?? '';

  if (!expected || !safeEqual(submitted, expected)) {
    return jsonError('Incorrect password', 401);
  }

  const resumeBytes = await getResumeBytes(env);
  if (!resumeBytes) {
    return jsonError('Resume storage not configured yet', 501);
  }

  return new Response(resumeBytes, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${RESUME_KEY}"`,
      'Cache-Control': 'no-store',
    },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/resume' && request.method === 'POST') {
      return handleResumeRequest(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};
