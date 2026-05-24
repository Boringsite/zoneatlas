import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import WorldTimezone from "./WorldTimezone.jsx";

// ── PWA Install Prompt ────────────────────────────────────────────────────────
function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [show, setShow] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [dismissed, setDismissed] = useState(() => localStorage.getItem("got_pwa_dismissed") === "1");

  useEffect(() => {
    // Check if already installed as PWA
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setInstalled(true);
      return;
    }

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Show prompt after 30 seconds or after user adds 2+ cities
      setTimeout(() => {
        if (!dismissed) setShow(true);
      }, 30000);
    };

    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", () => setInstalled(true));

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, [dismissed]);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") setInstalled(true);
    setDeferredPrompt(null);
    setShow(false);
  };

  const handleDismiss = () => {
    setShow(false);
    setDismissed(true);
    localStorage.setItem("got_pwa_dismissed", "1");
  };

  if (!show || installed || dismissed) return null;

  return (
    <div style={{
      position: "fixed", bottom: 90, left: "50%", transform: "translateX(-50%)",
      zIndex: 300, background: "#0c1730", border: "1px solid rgba(0,200,255,0.3)",
      borderRadius: 14, padding: "14px 18px", display: "flex", alignItems: "center",
      gap: 12, boxShadow: "0 8px 32px rgba(0,0,0,0.5)", maxWidth: 360, width: "calc(100% - 32px)",
      animation: "slideUp 0.3s ease",
      fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
    }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: "linear-gradient(135deg,#00c8ff,#0050ff)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>🌐</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#eef4ff", marginBottom: 2 }}>Add GlobeOnTime to your home screen</div>
        <div style={{ fontSize: 11, color: "#8ba4cc" }}>Works offline · Loads instantly · No app store needed</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 5, flexShrink: 0 }}>
        <button onClick={handleInstall} style={{
          padding: "6px 14px", borderRadius: 8, background: "#00c8ff", color: "#060d1f",
          fontSize: 12, fontWeight: 700, border: "none", cursor: "pointer",
        }}>Install</button>
        <button onClick={handleDismiss} style={{
          padding: "4px 10px", borderRadius: 8, background: "transparent", color: "#4a6080",
          fontSize: 11, fontWeight: 500, border: "none", cursor: "pointer",
        }}>Not now</button>
      </div>
    </div>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer({ onPrivacy, onAbout }) {
  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(6,13,31,0.95)", backdropFilter: "blur(12px)",
      borderTop: "1px solid rgba(0,200,255,0.1)",
      padding: "10px 16px",
      display: "flex", justifyContent: "center", gap: 20, alignItems: "center",
      fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
    }}>
      <span style={{ fontSize: 11, color: "#4a6080" }}>© 2025 GlobeOnTime</span>
      <button onClick={onPrivacy} style={{ fontSize: 11, color: "#4a6080", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>Privacy Policy</button>
      <button onClick={onAbout} style={{ fontSize: 11, color: "#4a6080", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>About</button>
      <a href="mailto:hello@docvaultpro.com" style={{ fontSize: 11, color: "#4a6080", textDecoration: "underline" }}>Contact</a>
    </div>
  );
}

// ── Privacy Policy Page ───────────────────────────────────────────────────────
function PrivacyPage({ onBack }) {
  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans','Inter',system-ui,sans-serif", background: "#060d1f", color: "#eef4ff", minHeight: "100vh", padding: "32px 16px 80px", maxWidth: 720, margin: "0 auto" }}>
      <button onClick={onBack} style={{ fontSize: 13, color: "#00c8ff", background: "none", border: "none", cursor: "pointer", marginBottom: 24, display: "flex", alignItems: "center", gap: 6 }}>← Back to GlobeOnTime</button>
      <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 8, letterSpacing: "-0.5px" }}>Privacy Policy</h1>
      <p style={{ fontSize: 13, color: "#4a6080", marginBottom: 32 }}>Last updated: January 2025</p>
      {[
        { h: "What we collect", b: "GlobeOnTime collects no personal information. We do not require registration, email addresses, or any identifying information to use the service." },
        { h: "Local storage", b: "Your saved team profiles and city preferences are stored exclusively in your browser's local storage on your device. This data never leaves your device and is never transmitted to our servers." },
        { h: "Analytics", b: "We use privacy-respecting analytics to understand general usage patterns such as page views and feature usage. No personally identifiable information is collected. IP addresses are anonymised." },
        { h: "Advertising", b: "GlobeOnTime is supported by advertising through Google AdSense. Ads are placed only in content areas — never inside the functional tool. Google may use cookies to serve relevant ads. You can opt out at google.com/settings/ads." },
        { h: "Third-party links", b: "GlobeOnTime contains affiliate links to services including Cal.com, NordVPN, and ExpressVPN. Clicking these links may result in a commission for us at no additional cost to you." },
        { h: "Cookies", b: "We use minimal cookies for advertising purposes only. Your tool preferences (light/dark mode, 24h format, saved cities) are stored in local storage, not cookies." },
        { h: "Children", b: "GlobeOnTime is not directed at children under 13. We do not knowingly collect information from children." },
        { h: "Changes", b: "We may update this policy occasionally. Continued use of GlobeOnTime after changes constitutes acceptance of the updated policy." },
        { h: "Contact", b: "Questions about this policy? Email us at hello@docvaultpro.com" },
      ].map(s => (
        <div key={s.h} style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: "#00c8ff" }}>{s.h}</h2>
          <p style={{ fontSize: 15, color: "#8ba4cc", lineHeight: 1.8 }}>{s.b}</p>
        </div>
      ))}
    </div>
  );
}

// ── About Page ────────────────────────────────────────────────────────────────
function AboutPage({ onBack }) {
  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans','Inter',system-ui,sans-serif", background: "#060d1f", color: "#eef4ff", minHeight: "100vh", padding: "32px 16px 80px", maxWidth: 720, margin: "0 auto" }}>
      <button onClick={onBack} style={{ fontSize: 13, color: "#00c8ff", background: "none", border: "none", cursor: "pointer", marginBottom: 24, display: "flex", alignItems: "center", gap: 6 }}>← Back to GlobeOnTime</button>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: "linear-gradient(135deg,#00c8ff,#0050ff)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>🌐</div>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-0.5px" }}>GlobeOnTime</h1>
          <p style={{ fontSize: 14, color: "#4a6080" }}>The world's most complete free timezone tool</p>
        </div>
      </div>
      {[
        { h: "What is GlobeOnTime?", b: "GlobeOnTime is a free timezone and meeting planning tool built for remote teams, digital nomads, gamers, streamers, and global professionals. Add up to 8 cities and instantly see who is working, awake, or sleeping — so you never schedule a 3am call again." },
        { h: "Features", b: "Live world clocks with sleep overlay · Meeting Planner with conflict detection · Team Availability Heatmap · Discord Timestamp Generator (all 7 formats) · Recurring Meeting DST Checker · Time Converter · Saved team profiles · Google Calendar and Outlook export · Embeddable widget · Public holiday awareness for 10+ countries · 40,000+ cities via global search." },
        { h: "Why free?", b: "GlobeOnTime is supported by non-intrusive advertising placed only in content areas — never inside the tool itself. We also partner with services we recommend, including Cal.com for scheduling and VPN providers for remote workers." },
        { h: "Privacy first", b: "No account required. No personal information collected. Your saved teams are stored only on your device. There is nothing to steal because we store nothing." },
        { h: "Built for everyone", b: "Whether you're a developer coordinating across continents, a gamer scheduling raids across time zones, a streamer announcing events globally, or a remote worker who just needs to know if their London colleague is awake — GlobeOnTime was built for you." },
        { h: "Contact", b: "Questions, feedback, or partnership enquiries: hello@docvaultpro.com" },
      ].map(s => (
        <div key={s.h} style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: "#00c8ff" }}>{s.h}</h2>
          <p style={{ fontSize: 15, color: "#8ba4cc", lineHeight: 1.8 }}>{s.b}</p>
        </div>
      ))}
      <div style={{ marginTop: 32, padding: "16px", background: "#0c1730", borderRadius: 12, border: "1px solid rgba(0,200,255,0.12)" }}>
        <p style={{ fontSize: 13, color: "#4a6080", textAlign: "center" }}>
          GlobeOnTime is free forever · No signup · No personal data collected
        </p>
      </div>
    </div>
  );
}

// ── Service Worker Registration ───────────────────────────────────────────────
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js")
      .then(reg => console.log("SW registered:", reg.scope))
      .catch(err => console.log("SW failed:", err));
  });
}

// ── App Shell ────────────────────────────────────────────────────────────────
function App() {
  const [page, setPage] = useState("main"); // main | privacy | about

  if (page === "privacy") return <PrivacyPage onBack={() => setPage("main")} />;
  if (page === "about") return <AboutPage onBack={() => setPage("main")} />;

  return (
    <>
      <WorldTimezone
        onPrivacy={() => setPage("privacy")}
        onAbout={() => setPage("about")}
      />
      <Footer
        onPrivacy={() => setPage("privacy")}
        onAbout={() => setPage("about")}
      />
      <InstallPrompt />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
