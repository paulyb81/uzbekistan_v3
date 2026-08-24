import React, { useState } from 'react';
import { Lock, ArrowRight, ShieldCheck, KeyRound, Eye, EyeOff } from 'lucide-react';

interface AccessGateProps {
  onUnlock: () => void;
}

// Cryptographic one-way SHA-256 hashes of accepted passcodes
// The plain-text password is NEVER included in client bundle files.
const VALID_HASHES = new Set([
  '66aa0a5003fc25b45f96cf685d55cff3c07662b224a5e8218dd4c254de628ae9',
  'afe31f13f7dd32de65c2e4d12715096ea1835e6da5d15877cc86f38eca40a888',
]);

async function computeSha256(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text.trim().toLowerCase());
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export const AccessGate: React.FC<AccessGateProps> = ({ onUnlock }) => {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setError(false);

    try {
      // 1. Try server-side verification if server is running
      try {
        const response = await fetch('/api/auth/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ passcode: passcode.trim() }),
        });
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            sessionStorage.setItem('portal_auth_token_v1', 'authorized');
            localStorage.setItem('portal_auth_token_v1', 'authorized');
            onUnlock();
            return;
          }
        }
      } catch {
        // Continue to cryptographic hash check
      }

      // 2. Client-side one-way cryptographic SHA-256 check
      const hash = await computeSha256(passcode);
      if (VALID_HASHES.has(hash)) {
        sessionStorage.setItem('portal_auth_token_v1', 'authorized');
        localStorage.setItem('portal_auth_token_v1', 'authorized');
        onUnlock();
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0b0f17] flex items-center justify-center p-4 selection:bg-sky-500 selection:text-white font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Subtle ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 translate-y-1/2 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
          {/* Discrete Lock Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700/80 flex items-center justify-center shadow-lg shadow-black/40">
              <Lock className="w-6 h-6 text-slate-300" />
            </div>
          </div>

          {/* Minimal, un-hinted heading without personal info */}
          <div className="text-center mb-8">
            <h1 className="text-xl font-bold text-white tracking-tight">
              Enter Access Code
            </h1>
            <p className="text-xs text-slate-400 mt-2 font-normal">
              Please enter your passcode to access this application.
            </p>
          </div>

          {/* Passcode Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    if (error) setError(false);
                  }}
                  placeholder="Passcode"
                  autoFocus
                  required
                  className={`w-full pl-10 pr-10 py-3 bg-slate-950/80 border text-sm text-slate-100 placeholder-slate-500 rounded-xl focus:outline-none transition-all ${
                    error
                      ? 'border-red-500/80 focus:border-red-500 ring-2 ring-red-500/20'
                      : 'border-slate-700/80 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {error && (
                <p className="text-xs text-red-400 mt-2 text-center">
                  Incorrect access code. Please try again.
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !passcode.trim()}
              className="w-full py-3 px-4 bg-sky-600 hover:bg-sky-500 active:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-sky-950/50 flex items-center justify-center gap-2"
            >
              <span>{isSubmitting ? 'Verifying...' : 'Unlock'}</span>
              {!isSubmitting && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          {/* Discreet Footer */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
            <span>Private Session Protected</span>
          </div>
        </div>
      </div>
    </div>
  );
};
