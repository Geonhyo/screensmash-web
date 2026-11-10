/**
 * Windows 출시 알림 신청을 받아 Discord 웹훅으로 넘긴다.
 * 웹훅 주소(DISCORD_WEBHOOK_URL)는 서버에만 있고 브라우저로 보내지 않는다(주소가 새면 누구나 채널에 글을 쓸 수 있다).
 */
export const runtime = "nodejs";

const EMAIL = /^[^\s@`]+@[^\s@`]+\.[^\s@`]+$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
  const { email, website } = (body ?? {}) as { email?: unknown; website?: unknown };

  // 숨긴 칸이 채워져 왔으면 로봇: 성공한 척하고 버린다.
  if (typeof website === "string" && website.length > 0) return Response.json({ ok: true });

  if (typeof email !== "string" || email.length > 254 || !EMAIL.test(email.trim())) {
    return Response.json({ ok: false }, { status: 400 });
  }

  const hook = process.env.DISCORD_WEBHOOK_URL;
  if (!hook) {
    // 로컬 개발에서는 보내지 않고 성공 처리, 배포에서 빠져 있으면 신청이 사라지지 않게 실패로 알린다.
    if (process.env.NODE_ENV !== "production") return Response.json({ ok: true, dryRun: true });
    console.error("DISCORD_WEBHOOK_URL is not set");
    return Response.json({ ok: false }, { status: 503 });
  }

  const res = await fetch(hook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: `Windows 출시 알림 신청: \`${email.trim()}\``,
      allowed_mentions: { parse: [] },
    }),
  }).catch(() => null);

  if (!res || !res.ok) return Response.json({ ok: false }, { status: 502 });
  return Response.json({ ok: true });
}
