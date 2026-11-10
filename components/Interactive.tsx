"use client";

import { useState, type FormEvent } from "react";

/** 휴대폰: 이 페이지 링크를 공유(없으면 복사)해서 Mac에서 열게 한다. */
export function ShareButton({ className = "btn" }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Screen Smash", text: "Mac에서 열어서 받기", url });
        return;
      }
    } catch {
      return; // 사용자가 공유 창을 닫음
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* 복사도 안 되면 아무것도 하지 않는다 */
    }
  }

  return (
    <button type="button" className={className} onClick={share}>
      <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 15V3M7 8l5-5 5 5M5 13v7h14v-7" />
      </svg>
      <span aria-live="polite">{copied ? "링크를 복사했어요" : "링크 공유"}</span>
    </button>
  );
}

type Status = "idle" | "sending" | "done" | "error";

/** Windows 등: 출시 알림 이메일 신청. 서버(/api/notify)가 Discord 웹훅으로 넘긴다. */
export function NotifyForm({ id }: { id: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setStatus("error");
      setError("메일 주소를 다시 확인해 주세요.");
      return;
    }
    const website = (new FormData(e.currentTarget).get("website") as string) || "";
    setStatus("sending");
    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value, website }),
      });
      if (res.ok) {
        setStatus("done");
      } else {
        setStatus("error");
        setError("잠시 후 다시 시도해 주세요.");
      }
    } catch {
      setStatus("error");
      setError("잠시 후 다시 시도해 주세요.");
    }
  }

  if (status === "done") {
    return (
      <div role="status" className="done">
        <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12l5 5 9-10" />
        </svg>
        신청됐어요. Windows 버전이 나오면 가장 먼저 알려 드릴게요.
      </div>
    );
  }

  return (
    <form className="notify" onSubmit={submit} noValidate>
      <div className="notify-row">
        <label htmlFor={id} className="sr-only">메일 주소</label>
        <input
          id={id}
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
        />
        {/* 사람에게는 보이지 않는 칸: 채워져 오면 스팸 로봇으로 보고 버린다 */}
        <div className="notify-hp" aria-hidden="true">
          <label htmlFor={`${id}-website`}>웹사이트</label>
          <input id={`${id}-website`} type="text" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <button type="submit" className="btn" disabled={status === "sending"}>
          {status === "sending" ? "보내는 중…" : "알림 받기"}
        </button>
      </div>
      {status === "error" && <div role="alert" className="alert">{error}</div>}
    </form>
  );
}
