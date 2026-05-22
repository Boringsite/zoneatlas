export default function AboutPage({ onClose }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 100,
      background: "rgba(0,0,0,0.7)", overflowY: "auto",
      padding: "20px 16px"
    }} onClick={onClose}>
      <div style={{
        maxWidth: 720, margin: "0 auto",
        background: "#0c1730",
        border: "1px solid rgba(0,200,255,0.15)",
        borderRadius: 16, padding: "32px",
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: "linear-gradient(135deg,#00c8ff,#0050ff)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🌐</div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: "#eef4ff", letterSpacing: "-0.5px" }}>About ZoneAtlas</h1>
          </div>
          <button onClick={onClose} style={{ color: "#4a6080", fontSize: 20, cursor: "pointer", background: "none", border: "none", padding: "4px 8px" }}>✕</button>
        </div>

        {/* Mission */}
        <div style={{ background: "rgba(0,200,255,0.06)", border: "1px solid rgba(0,200,255,0.12)", borderRadius: 12, padding: "20px 24px", marginBottom: 24 }}>
          <p style={{ fontSize: 17, color: "#eef4ff", lineHeight: 1.75, fontWeight: 500 }}>
            ZoneAtlas was built to solve one frustrating problem: scheduling meetings across time zones without accidentally waking someone up at 3am.
          </p>
        </div>

        {/* What makes us different */}
        <h2 style={{ fontSize: 18, fontWeight: 800, color: "#00c8ff", marginBottom: 14, letterSpacing: "-0.3px" }}>What makes ZoneAtlas different</h2>
        <div style={{ display: "grid", gap: 10, marginBottom: 24 }}>
          {[
            { icon: "😴", title: "Sleep-aware scheduling", body: "Unlike other timezone tools, ZoneAtlas shows you when people are likely sleeping — so you never accidentally schedule a meeting at 3am for your colleague in Tokyo." },
            { icon: "🎯", title: "Best meeting windows", body: "The Meeting Planner automatically calculates the best overlapping work hours across all your selected cities and highlights them instantly." },
            { icon: "📋", title: "Copy-ready time strings", body: "Generate a paste-ready time string like '10am New York / 3pm London / 11pm Tokyo' that you can drop directly into Slack or a calendar invite." },
            { icon: "🌍", title: "35+ global cities", body: "Coverage across all major regions including North America, Europe, Middle East, Asia Pacific, Africa, and South America." },
            { icon: "🔒", title: "No account required", body: "ZoneAtlas is completely free, requires no signup, and stores your preferences locally on your device. Your data never leaves your browser." },
            { icon: "📱", title: "Works on any device", body: "Fully responsive and installable as a PWA on your phone home screen for instant access anytime." },
          ].map(item => (
            <div key={item.title} style={{ display: "flex", gap: 12, padding: "14px", background: "#111f3d", borderRadius: 10, border: "1px solid rgba(0,200,255,0.08)" }}>
              <span style={{ fontSize: 22, flexShrink: 0 }}>{item.icon}</span>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#eef4ff", marginBottom: 3 }}>{item.title}</p>
                <p style={{ fontSize: 13, color: "#8ba4cc", lineHeight: 1.65 }}>{item.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Who uses it */}
        <h2 style={{ fontSize: 18, fontWeight: 800, color: "#00c8ff", marginBottom: 14, letterSpacing: "-0.3px" }}>Who uses ZoneAtlas</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
          {["Remote teams", "Freelancers", "Digital nomads", "Frequent travelers", "Global businesses", "Expats", "International students", "Online educators", "Podcast hosts", "Game streamers"].map(u => (
            <span key={u} style={{ padding: "6px 14px", borderRadius: 20, background: "rgba(0,200,255,0.08)", border: "1px solid rgba(0,200,255,0.12)", fontSize: 13, color: "#8ba4cc" }}>{u}</span>
          ))}
        </div>

        {/* Free forever */}
        <div style={{ background: "rgba(0,200,100,0.06)", border: "1px solid rgba(0,200,100,0.15)", borderRadius: 12, padding: "16px 20px", marginBottom: 24 }}>
          <p style={{ fontSize: 14, color: "#8ba4cc", lineHeight: 1.75 }}>
            <span style={{ color: "#00c864", fontWeight: 700 }}>ZoneAtlas is free forever.</span> No signup, no subscription, no hidden fees. We keep the lights on through non-intrusive advertising. Your time (pun intended) is valuable — we respect it.
          </p>
        </div>

        {/* Contact */}
        <h2 style={{ fontSize: 18, fontWeight: 800, color: "#00c8ff", marginBottom: 10, letterSpacing: "-0.3px" }}>Contact</h2>
        <p style={{ fontSize: 14, color: "#8ba4cc", lineHeight: 1.75, marginBottom: 24 }}>
          Have a suggestion, found a bug, or want to say hello? We'd love to hear from you. Reach us at <span style={{ color: "#00c8ff" }}>hello@docvaultpro.com</span>
        </p>

        <div style={{ marginTop: 8, paddingTop: 20, borderTop: "1px solid rgba(0,200,255,0.1)", textAlign: "center" }}>
          <button onClick={onClose} style={{
            padding: "10px 28px", borderRadius: 10,
            background: "rgba(0,200,255,0.12)", border: "1px solid rgba(0,200,255,0.18)",
            color: "#00c8ff", fontSize: 14, fontWeight: 600, cursor: "pointer"
          }}>Close</button>
        </div>
      </div>
    </div>
  );
}
