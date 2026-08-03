import { useEffect, useRef, useState } from 'react';
import './ResumeGate.css';

export default function ResumeGate() {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'checking' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
    }
    function onClickOutside(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) close();
    }

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function close() {
    setOpen(false);
    setPassword('');
    setStatus('idle');
    setErrorMessage('');
    triggerRef.current?.focus();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('checking');
    setErrorMessage('');

    try {
      const res = await fetch('/api/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: 'Something went wrong' }));
        setStatus('error');
        setErrorMessage((data as { error?: string }).error ?? 'Incorrect password');
        inputRef.current?.focus();
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank', 'noopener,noreferrer');
      setTimeout(() => URL.revokeObjectURL(url), 60_000);
      close();
    } catch {
      setStatus('error');
      setErrorMessage('Network error — try again');
      inputRef.current?.focus();
    }
  }

  return (
    <div className="resume-gate">
      <button
        type="button"
        ref={triggerRef}
        className="resume-gate__trigger"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        Resume
      </button>

      {open && (
        <div className="resume-gate__popover" ref={popoverRef} role="dialog" aria-label="Resume password">
          <form onSubmit={handleSubmit}>
            <label htmlFor="resume-password" className="resume-gate__label">
              Password required
            </label>
            <input
              ref={inputRef}
              id="resume-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-describedby={status === 'error' ? 'resume-gate-error' : undefined}
              autoComplete="off"
            />
            {status === 'error' && (
              <p id="resume-gate-error" className="resume-gate__error" role="alert">
                {errorMessage}
              </p>
            )}
            <button type="submit" className="resume-gate__submit" disabled={status === 'checking'}>
              {status === 'checking' ? 'Checking…' : 'View resume'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
