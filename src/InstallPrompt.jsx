import { useState, useEffect } from "react";

export default function InstallPrompt() {
  const [prompt, setPrompt] = useState(null);
  const [show, setShow] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setInstalled(true);
      return;
    }

    const handler = (e) => {
      e.preventDefault();
      setPrompt(e);
      // Show after 30 seconds or on second visit
      const visits = parseInt(localStorage.getItem('visits') || '0') + 1;
      localStorage.setItem('visits', visits);
      if (visits >= 2) setShow(true);
      else setTimeout(() => setShow(true), 30000);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const install = async () => {
    if (!prompt) return;
    prompt.prompt();
    const { outcome } = await prompt.userChoice;
    if (outcome === 'accepted') setInstalled(true);
    setShow(false);
  };

  if (!show || installed) return null;

  return (
    <div style={{
      position: "fixed", bottom: 16, left: 16, right: 16, zIndex: 999,
      background: "var(--bg2, #0c1730)",
      border: "1px solid var(--border, rgba(0,200,255,0.18))",
      borderRadius: 16, padding: "14px 16px",
      display: "flex", alignItems: "center", gap: 12,
      boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
      maxWidth: 480, margin: "0 auto",
      animation: "slideUp 0.3s ease"
    }}>
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
      <div style={{ fontSize: 28, flexShrink: 0 }}>📱</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: "var(--text, #eef4ff)", margin: "0 0 2px" }}>
          Add to Home Screen
        </p>
        <p style={{ fontSize: 12, color: "var(--text2, #8ba4cc)", margin: 0 }}>
          Install for faster access and offline use
        </p>
      </div>
      <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
        <button
          onClick={() => setShow(false)}
          style={{ padding: "6px 12px", borderRadius: 8, border: "1px solid var(--border, rgba(0,200,255,0.18))", background: "transparent", color: "var(--text2, #8ba4cc)", fontSize: 12, cursor: "pointer" }}
        >
          Later
        </button>
        <button
          onClick={install}
          style={{ padding: "6px 14px", borderRadius: 8, border: "none", background: "var(--cyan, #00c8ff)", color: "#060d1f", fontSize: 12, fontWeight: 700, cursor: "pointer" }}
        >
          Install
        </button>
      </div>
    </div>
  );
}
