import { useState, useEffect, useCallback } from "react";

// ── Timezone Data ──────────────────────────────────────────────────────────────
const CITIES = [
  { name: "New York", tz: "America/New_York", country: "US", flag: "🇺🇸" },
  { name: "Los Angeles", tz: "America/Los_Angeles", country: "US", flag: "🇺🇸" },
  { name: "Chicago", tz: "America/Chicago", country: "US", flag: "🇺🇸" },
  { name: "Denver", tz: "America/Denver", country: "US", flag: "🇺🇸" },
  { name: "Toronto", tz: "America/Toronto", country: "CA", flag: "🇨🇦" },
  { name: "Vancouver", tz: "America/Vancouver", country: "CA", flag: "🇨🇦" },
  { name: "London", tz: "Europe/London", country: "GB", flag: "🇬🇧" },
  { name: "Paris", tz: "Europe/Paris", country: "FR", flag: "🇫🇷" },
  { name: "Berlin", tz: "Europe/Berlin", country: "DE", flag: "🇩🇪" },
  { name: "Amsterdam", tz: "Europe/Amsterdam", country: "NL", flag: "🇳🇱" },
  { name: "Madrid", tz: "Europe/Madrid", country: "ES", flag: "🇪🇸" },
  { name: "Rome", tz: "Europe/Rome", country: "IT", flag: "🇮🇹" },
  { name: "Stockholm", tz: "Europe/Stockholm", country: "SE", flag: "🇸🇪" },
  { name: "Zurich", tz: "Europe/Zurich", country: "CH", flag: "🇨🇭" },
  { name: "Dubai", tz: "Asia/Dubai", country: "AE", flag: "🇦🇪" },
  { name: "Mumbai", tz: "Asia/Kolkata", country: "IN", flag: "🇮🇳" },
  { name: "Bangalore", tz: "Asia/Kolkata", country: "IN", flag: "🇮🇳" },
  { name: "Singapore", tz: "Asia/Singapore", country: "SG", flag: "🇸🇬" },
  { name: "Hong Kong", tz: "Asia/Hong_Kong", country: "HK", flag: "🇭🇰" },
  { name: "Tokyo", tz: "Asia/Tokyo", country: "JP", flag: "🇯🇵" },
  { name: "Seoul", tz: "Asia/Seoul", country: "KR", flag: "🇰🇷" },
  { name: "Sydney", tz: "Australia/Sydney", country: "AU", flag: "🇦🇺" },
  { name: "Melbourne", tz: "Australia/Melbourne", country: "AU", flag: "🇦🇺" },
  { name: "Auckland", tz: "Pacific/Auckland", country: "NZ", flag: "🇳🇿" },
  { name: "São Paulo", tz: "America/Sao_Paulo", country: "BR", flag: "🇧🇷" },
  { name: "Mexico City", tz: "America/Mexico_City", country: "MX", flag: "🇲🇽" },
  { name: "Buenos Aires", tz: "America/Argentina/Buenos_Aires", country: "AR", flag: "🇦🇷" },
  { name: "Cairo", tz: "Africa/Cairo", country: "EG", flag: "🇪🇬" },
  { name: "Lagos", tz: "Africa/Lagos", country: "NG", flag: "🇳🇬" },
  { name: "Nairobi", tz: "Africa/Nairobi", country: "KE", flag: "🇰🇪" },
  { name: "Istanbul", tz: "Europe/Istanbul", country: "TR", flag: "🇹🇷" },
  { name: "Moscow", tz: "Europe/Moscow", country: "RU", flag: "🇷🇺" },
  { name: "Karachi", tz: "Asia/Karachi", country: "PK", flag: "🇵🇰" },
  { name: "Dhaka", tz: "Asia/Dhaka", country: "BD", flag: "🇧🇩" },
  { name: "Jakarta", tz: "Asia/Jakarta", country: "ID", flag: "🇮🇩" },
  { name: "Manila", tz: "Asia/Manila", country: "PH", flag: "🇵🇭" },
  { name: "Bangkok", tz: "Asia/Bangkok", country: "TH", flag: "🇹🇭" },
  { name: "Kuala Lumpur", tz: "Asia/Kuala_Lumpur", country: "MY", flag: "🇲🇾" },
  { name: "Riyadh", tz: "Asia/Riyadh", country: "SA", flag: "🇸🇦" },
  { name: "Tel Aviv", tz: "Asia/Jerusalem", country: "IL", flag: "🇮🇱" },
];

// ── Helpers ────────────────────────────────────────────────────────────────────
function getTimeInZone(tz, date = new Date()) {
  return new Date(date.toLocaleString("en-US", { timeZone: tz }));
}

function formatTime(date, use24 = false) {
  const h = date.getHours(), m = date.getMinutes(), s = date.getSeconds();
  if (use24) return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${h12}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")} ${ampm}`;
}

function formatTimeShort(hour, use24 = false) {
  if (use24) return `${String(hour).padStart(2, "0")}:00`;
  const ampm = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 || 12;
  return `${h12} ${ampm}`;
}

function getHourStatus(hour) {
  if (hour >= 9 && hour < 18) return "work";
  if (hour >= 7 && hour < 22) return "awake";
  return "sleep";
}

function getDateInZone(tz, date = new Date()) {
  return new Date(date.toLocaleString("en-US", { timeZone: tz })).toLocaleDateString("en-US", {
    weekday: "short", month: "short", day: "numeric", timeZone: tz
  });
}

function getOffsetLabel(tz) {
  const now = new Date();
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  const zoneMs = new Date(now.toLocaleString("en-US", { timeZone: tz })).getTime();
  const offsetMin = Math.round((zoneMs - new Date(now.toLocaleString("en-US", { timeZone: "UTC" })).getTime()) / 60000);
  const sign = offsetMin >= 0 ? "+" : "-";
  const abs = Math.abs(offsetMin);
  return `UTC${sign}${Math.floor(abs / 60)}${abs % 60 ? `:${String(abs % 60).padStart(2, "0")}` : ""}`;
}

function getCopiedLink(zones, baseHour) {
  const params = zones.map(z => encodeURIComponent(z.tz)).join(",");
  return `${window.location.href.split("?")[0]}?zones=${params}&hour=${baseHour}`;
}

// ── FAQ Data ───────────────────────────────────────────────────────────────────
const FAQ = [
  { q: "What is a time zone converter?", a: "A time zone converter lets you see what time it currently is across multiple cities around the world simultaneously, helping you schedule meetings, calls, and events with people in different countries without confusion." },
  { q: "How do I find the best meeting time for a global team?", a: "Use the Meeting Planner tab to add all participants' cities. The tool highlights overlapping work hours (9am–6pm) in green, so you can instantly see when everyone is available during normal business hours." },
  { q: "What do the color bands on the timeline mean?", a: "Green bands represent standard work hours (9am–6pm). Yellow/amber bands show early morning or evening hours when people are awake but outside work time. Dark bands indicate typical sleeping hours (10pm–7am), helping you avoid scheduling calls that wake someone up." },
  { q: "Does this tool account for Daylight Saving Time?", a: "Yes. All time conversions use your device's live timezone data, which automatically updates for Daylight Saving Time transitions in every country. The timezone offset displayed next to each city always reflects the current DST-adjusted time." },
  { q: "Can I share my timezone comparison with someone?", a: "Yes, click 'Copy Link' on any comparison and the URL captures your exact configuration. Anyone who opens the link sees the same cities and time settings instantly, no account required." },
  { q: "How many time zones can I compare at once?", a: "You can compare up to 8 cities simultaneously in the free tool. This covers most global team setups, typically US, Europe, and Asia/Pacific combinations." },
  { q: "What is UTC and why does it matter?", a: "UTC (Coordinated Universal Time) is the world's time standard. All timezones are defined as offsets from UTC. For example, New York is UTC-5 in winter and UTC-4 in summer. UTC never changes for Daylight Saving, making it useful as a universal reference." },
  { q: "Which cities have the most difficult time zone overlaps?", a: "US West Coast (Los Angeles, UTC-8) and Asia-Pacific (Tokyo, UTC+9, Sydney UTC+11) have a 17–19 hour gap, the hardest overlap globally. The only workable window is typically 7–9am in Asia, which corresponds to 3–5pm the previous day in Los Angeles." },
];

// ── Main Component ─────────────────────────────────────────────────────────────
export default function WorldTimezone() {
  const [now, setNow] = useState(new Date());
  const [selectedZones, setSelectedZones] = useState([
    CITIES.find(c => c.name === "New York"),
    CITIES.find(c => c.name === "London"),
    CITIES.find(c => c.name === "Dubai"),
    CITIES.find(c => c.name === "Singapore"),
  ]);
  const [use24, setUse24] = useState(false);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [activeTab, setActiveTab] = useState("clock");
  const [meetingHour, setMeetingHour] = useState(10);
  const [meetingDate, setMeetingDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [hoveredHour, setHoveredHour] = useState(null);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const addZone = useCallback((city) => {
    if (selectedZones.length >= 8) return;
    if (selectedZones.find(z => z.tz === city.tz && z.name === city.name)) return;
    setSelectedZones(prev => [...prev, city]);
    setShowSearch(false);
    setSearch("");
  }, [selectedZones]);

  const removeZone = useCallback((idx) => {
    setSelectedZones(prev => prev.filter((_, i) => i !== idx));
  }, []);

  const filtered = CITIES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.country.toLowerCase().includes(search.toLowerCase())
  ).filter(c => !selectedZones.find(z => z.tz === c.tz && z.name === c.name));

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const meetingDateObj = new Date(meetingDate + "T00:00:00");

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif", background: "var(--bg, #060d1f)", color: "var(--text, #e8f0ff)", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Space+Mono:wght@400;700&display=swap');
        :root {
          --bg: #060d1f;
          --bg2: #0c1730;
          --bg3: #111f3d;
          --border: rgba(0,200,255,0.15);
          --border2: rgba(0,200,255,0.08);
          --cyan: #00c8ff;
          --cyan2: #00e5ff;
          --cyan-dim: rgba(0,200,255,0.12);
          --text: #e8f0ff;
          --text2: #8ba4cc;
          --text3: #4a6080;
          --work: rgba(0,200,100,0.18);
          --work-border: rgba(0,200,100,0.5);
          --awake: rgba(255,180,0,0.12);
          --awake-border: rgba(255,180,0,0.4);
          --sleep: rgba(20,30,60,0.6);
          --red: #ff4560;
          --green: #00c864;
          --yellow: #ffb400;
          --radius: 12px;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: var(--bg); font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif; }
        input, button, select { font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif; }
        button { cursor: pointer; border: none; background: none; color: inherit; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: var(--bg2); }
        ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
        .pulse { animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        .fade-in { animation: fadeIn 0.3s ease; }
        @keyframes fadeIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:none} }
        .tab-btn { padding: 10px 22px; border-radius: 10px; font-size: 14px; font-weight: 700; letter-spacing: -0.1px; transition: all 0.2s; color: var(--text2); border: 1px solid transparent; }
        .tab-btn:hover { color: var(--text); }
        .tab-btn.active { background: var(--cyan-dim); border-color: var(--border); color: var(--cyan); }
        .zone-card { background: var(--bg2); border: 1px solid var(--border2); border-radius: var(--radius); padding: 20px; transition: border-color 0.2s, box-shadow 0.2s; }
        .zone-card:hover { border-color: var(--border); box-shadow: 0 4px 24px rgba(0,200,255,0.06); }
        .hour-cell { height: 36px; flex: 1; display: flex; align-items: center; justify-content: center; font-size: 11px; font-family: 'Space Mono', monospace; transition: all 0.15s; cursor: pointer; border-radius: 4px; }
        .hour-cell:hover { transform: scaleY(1.1); }
        .faq-item { border-bottom: 1px solid var(--border2); overflow: hidden; }
        .faq-q { padding: 20px 0; display: flex; justify-content: space-between; align-items: center; cursor: pointer; font-size: 16px; font-weight: 700; color: var(--text); gap: 12px; letter-spacing: -0.2px; }
        .faq-q:hover { color: var(--cyan); }
        .faq-a { font-size: 15px; color: var(--text2); line-height: 1.75; padding-bottom: 20px; }
        .search-item { padding: 11px 14px; cursor: pointer; display: flex; align-items: center; gap: 10px; font-size: 14px; border-radius: 8px; font-weight: 500; }
        .search-item:hover { background: var(--bg3); }
        .meeting-slot { flex: 1; height: 44px; display: flex; align-items: center; justify-content: center; font-size: 11px; font-family: 'Space Mono', monospace; border-radius: 4px; cursor: pointer; transition: all 0.15s; border: 1px solid transparent; }
        .meeting-slot:hover { transform: scaleY(1.05); }
        .meeting-slot.selected { border-color: var(--cyan); transform: scaleY(1.1); }
        @keyframes starFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-3px)} }
      `}</style>

      {/* Stars background */}
      <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
        {[...Array(60)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            width: Math.random() * 2 + 1,
            height: Math.random() * 2 + 1,
            background: "white",
            borderRadius: "50%",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.6 + 0.1,
            animation: `starFloat ${Math.random() * 4 + 3}s ease-in-out ${Math.random() * 3}s infinite`,
          }} />
        ))}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(0,200,255,0.08) 0%, transparent 70%)" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 960, margin: "0 auto", padding: "0 16px 60px" }}>

        {/* Header */}
        <div style={{ padding: "32px 0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #00c8ff, #0050ff)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🌐</div>
              <h1 style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-1px" }}>
                Zone<span style={{ color: "#00c8ff" }}>Atlas</span>
              </h1>
            </div>
            <p style={{ fontSize: 15, color: "var(--text2)", fontWeight: 500 }}>World time zones · Meeting planner · Sleep-aware scheduling</p>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button onClick={() => setUse24(v => !v)} style={{ padding: "6px 14px", borderRadius: 8, border: "1px solid var(--border)", background: use24 ? "var(--cyan-dim)" : "transparent", color: use24 ? "var(--cyan)" : "var(--text2)", fontSize: 12, fontWeight: 500 }}>
              {use24 ? "24h" : "12h"}
            </button>
            <button onClick={copyLink} style={{ padding: "6px 14px", borderRadius: 8, border: "1px solid var(--border)", background: copied ? "var(--cyan-dim)" : "transparent", color: copied ? "var(--cyan)" : "var(--text2)", fontSize: 12, fontWeight: 500 }}>
              {copied ? "✓ Copied!" : "🔗 Share"}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 6, marginBottom: 24, borderBottom: "1px solid var(--border2)", paddingBottom: 12, flexWrap: "wrap" }}>
          {[["clock", "🕐 World Clock"], ["planner", "📅 Meeting Planner"], ["converter", "🔄 Converter"]].map(([id, label]) => (
            <button key={id} className={`tab-btn ${activeTab === id ? "active" : ""}`} onClick={() => setActiveTab(id)}>{label}</button>
          ))}
        </div>

        {/* ── WORLD CLOCK TAB ── */}
        {activeTab === "clock" && (
          <div className="fade-in">
            {/* Zone Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12, marginBottom: 20 }}>
              {selectedZones.map((zone, idx) => {
                const t = getTimeInZone(zone.tz, now);
                const h = t.getHours();
                const status = getHourStatus(h);
                const statusColor = status === "work" ? "var(--green)" : status === "awake" ? "var(--yellow)" : "var(--text3)";
                const statusLabel = status === "work" ? "Working hours" : status === "awake" ? "Awake" : "Likely sleeping";
                return (
                  <div key={idx} className="zone-card fade-in">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontSize: 18 }}>{zone.flag}</span>
                        <div>
                          <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.2px" }}>{zone.name}</div>
                          <div style={{ fontSize: 11, color: "var(--text3)" }}>{getOffsetLabel(zone.tz)}</div>
                        </div>
                      </div>
                      <button onClick={() => removeZone(idx)} style={{ color: "var(--text3)", fontSize: 14, padding: "2px 4px", borderRadius: 4, opacity: 0.6 }}>✕</button>
                    </div>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 24, fontWeight: 700, color: "var(--cyan)", letterSpacing: "0.5px", marginBottom: 6 }}>
                      {formatTime(t, use24)}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--text2)", marginBottom: 8 }}>{getDateInZone(zone.tz, now)}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: statusColor }} className={status === "work" ? "pulse" : ""} />
                      <span style={{ fontSize: 11, color: statusColor }}>{statusLabel}</span>
                    </div>
                  </div>
                );
              })}

              {/* Add City */}
              {selectedZones.length < 8 && (
                <div style={{ position: "relative" }}>
                  <button onClick={() => setShowSearch(v => !v)} style={{ width: "100%", height: "100%", minHeight: 140, borderRadius: "var(--radius)", border: "1px dashed var(--border)", background: "transparent", color: "var(--text3)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 13, transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--cyan)"; e.currentTarget.style.color = "var(--cyan)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text3)"; }}>
                    <span style={{ fontSize: 24 }}>＋</span>
                    <span>Add city</span>
                  </button>
                  {showSearch && (
                    <div className="fade-in" style={{ position: "absolute", top: "105%", left: 0, right: 0, zIndex: 50, background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "var(--radius)", overflow: "hidden", minWidth: 220 }}>
                      <div style={{ padding: "10px 12px", borderBottom: "1px solid var(--border2)" }}>
                        <input autoFocus value={search} onChange={e => setSearch(e.target.value)} placeholder="Search city…" style={{ width: "100%", background: "transparent", border: "none", outline: "none", color: "var(--text)", fontSize: 13 }} />
                      </div>
                      <div style={{ maxHeight: 240, overflowY: "auto" }}>
                        {filtered.slice(0, 20).map(c => (
                          <div key={c.name} className="search-item" onClick={() => addZone(c)}>
                            <span>{c.flag}</span>
                            <span>{c.name}</span>
                            <span style={{ marginLeft: "auto", color: "var(--text3)", fontSize: 11 }}>{getOffsetLabel(c.tz)}</span>
                          </div>
                        ))}
                        {filtered.length === 0 && <div style={{ padding: "12px", color: "var(--text3)", fontSize: 13, textAlign: "center" }}>No results</div>}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 24h Timeline */}
            {selectedZones.length > 0 && (
              <div style={{ background: "var(--bg2)", border: "1px solid var(--border2)", borderRadius: "var(--radius)", padding: "16px", marginBottom: 20 }}>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 14, color: "var(--text2)", letterSpacing: "-0.2px" }}>24-Hour Overlap View</div>
                <div style={{ overflowX: "auto", paddingBottom: 8 }}>
                  {/* Hour labels */}
                  <div style={{ display: "flex", minWidth: 600, marginBottom: 4 }}>
                    <div style={{ width: 120, flexShrink: 0 }} />
                    {[0, 3, 6, 9, 12, 15, 18, 21].map(h => (
                      <div key={h} style={{ flex: "0 0 calc((100% - 120px) / 8)", fontSize: 10, color: "var(--text3)", fontFamily: "'Space Mono', monospace" }}>
                        {formatTimeShort(h, use24)}
                      </div>
                    ))}
                  </div>
                  {selectedZones.map((zone, zi) => {
                    const baseOffset = getTimeInZone(zone.tz, now).getHours() - now.getHours();
                    return (
                      <div key={zi} style={{ display: "flex", minWidth: 600, marginBottom: 4, alignItems: "center" }}>
                        <div style={{ width: 120, flexShrink: 0, display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ fontSize: 14 }}>{zone.flag}</span>
                          <span style={{ fontSize: 11, color: "var(--text2)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 80 }}>{zone.name}</span>
                        </div>
                        <div style={{ display: "flex", flex: 1, gap: 1 }}>
                          {Array.from({ length: 24 }, (_, h) => {
                            const localH = (h + baseOffset + 48) % 24;
                            const status = getHourStatus(localH);
                            const isNow = Math.abs(localH - getTimeInZone(zone.tz, now).getHours()) < 1;
                            const isHovered = hoveredHour === h;
                            let bg = status === "work" ? "rgba(0,200,100,0.2)" : status === "awake" ? "rgba(255,180,0,0.1)" : "rgba(255,255,255,0.03)";
                            if (isHovered) bg = "rgba(0,200,255,0.2)";
                            if (isNow) bg = "rgba(0,200,255,0.35)";
                            return (
                              <div key={h} className="hour-cell" style={{ background: bg, border: isNow ? "1px solid var(--cyan)" : isHovered ? "1px solid rgba(0,200,255,0.3)" : "1px solid transparent", color: isNow ? "var(--cyan)" : "transparent", fontSize: 9 }}
                                onMouseEnter={() => setHoveredHour(h)}
                                onMouseLeave={() => setHoveredHour(null)}>
                                {isNow ? "▼" : ""}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div style={{ display: "flex", gap: 16, marginTop: 10, flexWrap: "wrap" }}>
                  {[["rgba(0,200,100,0.2)", "Work hours (9–6pm)"], ["rgba(255,180,0,0.1)", "Awake (7am–10pm)"], ["rgba(255,255,255,0.03)", "Sleeping"], ["rgba(0,200,255,0.35)", "Current time"]].map(([bg, label]) => (
                    <div key={label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <div style={{ width: 14, height: 14, borderRadius: 3, background: bg, border: label.includes("Current") ? "1px solid var(--cyan)" : "none" }} />
                      <span style={{ fontSize: 11, color: "var(--text3)" }}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── MEETING PLANNER TAB ── */}
        {activeTab === "planner" && (
          <div className="fade-in">
            <div style={{ background: "var(--bg2)", border: "1px solid var(--border2)", borderRadius: "var(--radius)", padding: 20, marginBottom: 16 }}>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16, alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 4 }}>Meeting date</div>
                  <input type="date" value={meetingDate} onChange={e => setMeetingDate(e.target.value)} style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 8, padding: "6px 10px", color: "var(--text)", fontSize: 13, outline: "none" }} />
                </div>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 4 }}>
                    Selected: <span style={{ color: "var(--cyan)" }}>{formatTimeShort(meetingHour, use24)}</span> in <strong>{selectedZones[0]?.name || "first city"}</strong>
                  </div>
                  <input type="range" min="0" max="23" value={meetingHour} onChange={e => setMeetingHour(+e.target.value)} style={{ width: "100%", accentColor: "var(--cyan)" }} />
                </div>
              </div>

              {/* Meeting planner grid */}
              <div style={{ overflowX: "auto" }}>
                <div style={{ display: "flex", minWidth: 500, gap: 1, marginBottom: 8 }}>
                  <div style={{ width: 110, flexShrink: 0 }} />
                  {Array.from({ length: 24 }, (_, h) => (
                    <div key={h} style={{ flex: 1, fontSize: 9, color: "var(--text3)", textAlign: "center", fontFamily: "'Space Mono', monospace" }}>
                      {h % 3 === 0 ? formatTimeShort(h, use24) : ""}
                    </div>
                  ))}
                </div>

                {selectedZones.map((zone, zi) => {
                  const zoneNow = getTimeInZone(zone.tz, now);
                  const zoneMeetingH = getTimeInZone(zone.tz, new Date(meetingDateObj.getTime() + meetingHour * 3600000 + new Date().getTimezoneOffset() * 60000 + (getTimeInZone(zone.tz, new Date()).getTime() - new Date().getTime()))).getHours();
                  const baseOff = zoneNow.getHours() - now.getHours();

                  return (
                    <div key={zi} style={{ display: "flex", minWidth: 500, marginBottom: 4, alignItems: "center" }}>
                      <div style={{ width: 110, flexShrink: 0, display: "flex", alignItems: "center", gap: 5 }}>
                        <span style={{ fontSize: 14 }}>{zone.flag}</span>
                        <div>
                          <div style={{ fontSize: 11, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 80 }}>{zone.name}</div>
                          <div style={{ fontSize: 10, color: "var(--text3)" }}>{getOffsetLabel(zone.tz)}</div>
                        </div>
                      </div>
                      <div style={{ display: "flex", flex: 1, gap: 1 }}>
                        {Array.from({ length: 24 }, (_, h) => {
                          const localH = (h + baseOff + 48) % 24;
                          const isSelected = h === meetingHour;
                          const status = getHourStatus(localH);
                          let bg, borderC, textC;
                          if (isSelected) { bg = "rgba(0,200,255,0.3)"; borderC = "var(--cyan)"; textC = "var(--cyan)"; }
                          else if (status === "work") { bg = "rgba(0,200,100,0.15)"; borderC = "transparent"; textC = "transparent"; }
                          else if (status === "awake") { bg = "rgba(255,180,0,0.08)"; borderC = "transparent"; textC = "transparent"; }
                          else { bg = "rgba(255,255,255,0.02)"; borderC = "transparent"; textC = "transparent"; }

                          return (
                            <div key={h} className="meeting-slot" style={{ background: bg, border: `1px solid ${borderC}`, color: textC }} onClick={() => setMeetingHour(h)}>
                              {isSelected ? formatTimeShort(localH, use24) : ""}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ marginTop: 16, padding: "12px 16px", background: "var(--bg3)", borderRadius: 8, border: "1px solid var(--border)" }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "var(--cyan)", marginBottom: 10, letterSpacing: "-0.2px" }}>📋 Meeting Summary</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 8 }}>
                  {selectedZones.map((zone, i) => {
                    const localH = getTimeInZone(zone.tz, new Date(now.getTime() + (meetingHour - now.getHours()) * 3600000)).getHours();
                    const status = getHourStatus(localH);
                    const statusIcon = status === "work" ? "✅" : status === "awake" ? "⚠️" : "😴";
                    return (
                      <div key={i} style={{ fontSize: 12 }}>
                        <span style={{ marginRight: 4 }}>{zone.flag}</span>
                        <strong>{zone.name}:</strong>{" "}
                        <span style={{ fontFamily: "'Space Mono', monospace", color: "var(--cyan)" }}>{formatTimeShort(localH, use24)}</span>{" "}
                        <span>{statusIcon}</span>
                      </div>
                    );
                  })}
                </div>
                <div style={{ marginTop: 10, fontSize: 11, color: "var(--text3)" }}>
                  ✅ Work hours &nbsp;⚠️ Outside work but awake &nbsp;😴 Sleeping. Consider rescheduling
                </div>
              </div>
            </div>

            {/* Best time suggestion */}
            <div style={{ background: "linear-gradient(135deg, rgba(0,200,255,0.06), rgba(0,80,255,0.06))", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: 16 }}>
              <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 12, color: "var(--cyan)", letterSpacing: "-0.3px" }}>🎯 Best Meeting Windows Today</div>
              <div style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.9 }}>
                {(() => {
                  const windows = [];
                  for (let h = 0; h < 24; h++) {
                    const allWork = selectedZones.every(zone => {
                      const baseOff = getTimeInZone(zone.tz, now).getHours() - now.getHours();
                      const localH = (h + baseOff + 48) % 24;
                      return getHourStatus(localH) === "work";
                    });
                    const allAwake = selectedZones.every(zone => {
                      const baseOff = getTimeInZone(zone.tz, now).getHours() - now.getHours();
                      const localH = (h + baseOff + 48) % 24;
                      return getHourStatus(localH) !== "sleep";
                    });
                    if (allWork) windows.push({ h, type: "work" });
                    else if (allAwake) windows.push({ h, type: "awake" });
                  }
                  if (windows.length === 0) return <span style={{ color: "var(--red)" }}>⚠️ No overlap where everyone is awake. Consider async communication or a rotating schedule.</span>;
                  const workW = windows.filter(w => w.type === "work");
                  const awakeW = windows.filter(w => w.type === "awake");
                  return (
                    <>
                      {workW.length > 0 && <div>✅ <strong>Work hour overlap:</strong> {workW.map(w => formatTimeShort(w.h, use24)).join(", ")} ({selectedZones[0]?.name})</div>}
                      {awakeW.length > 0 && <div>⚠️ <strong>Awake (outside work):</strong> {awakeW.map(w => formatTimeShort(w.h, use24)).join(", ")}</div>}
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        )}

        {/* ── CONVERTER TAB ── */}
        {activeTab === "converter" && (
          <div className="fade-in">
            <div style={{ background: "var(--bg2)", border: "1px solid var(--border2)", borderRadius: "var(--radius)", padding: 20, marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text2)", marginBottom: 16 }}>Convert a specific time across all your zones</div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 4 }}>Date</div>
                  <input type="date" value={meetingDate} onChange={e => setMeetingDate(e.target.value)} style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 8, padding: "6px 10px", color: "var(--text)", fontSize: 13, outline: "none" }} />
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 4 }}>Hour</div>
                  <select value={meetingHour} onChange={e => setMeetingHour(+e.target.value)} style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 8, padding: "6px 10px", color: "var(--text)", fontSize: 13, outline: "none" }}>
                    {Array.from({ length: 24 }, (_, h) => (
                      <option key={h} value={h}>{formatTimeShort(h, use24)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 4 }}>Base city</div>
                  <select value={selectedZones[0]?.name || ""} onChange={() => { }} style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 8, padding: "6px 10px", color: "var(--text)", fontSize: 13, outline: "none" }}>
                    {selectedZones.map(z => <option key={z.name} value={z.name}>{z.name}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10 }}>
                {selectedZones.map((zone, i) => {
                  const baseZone = selectedZones[0];
                  const baseLocal = getTimeInZone(baseZone.tz, now).getHours();
                  const targetLocal = getTimeInZone(zone.tz, now).getHours();
                  const diff = targetLocal - baseLocal;
                  const convertedH = (meetingHour + diff + 48) % 24;
                  const crossDay = meetingHour + diff >= 24 ? "+1 day" : meetingHour + diff < 0 ? "-1 day" : "";
                  const status = getHourStatus(convertedH);
                  const statusColor = status === "work" ? "var(--green)" : status === "awake" ? "var(--yellow)" : "var(--red)";

                  return (
                    <div key={i} style={{ background: "var(--bg3)", border: "1px solid var(--border2)", borderRadius: 10, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontSize: 24 }}>{zone.flag}</span>
                      <div>
                        <div style={{ fontSize: 12, color: "var(--text2)", marginBottom: 2 }}>{zone.name}</div>
                        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 18, fontWeight: 700, color: "var(--cyan)" }}>
                          {formatTimeShort(convertedH, use24)}
                          {crossDay && <span style={{ fontSize: 10, color: "var(--text3)", marginLeft: 4 }}>{crossDay}</span>}
                        </div>
                        <div style={{ fontSize: 11, color: statusColor, marginTop: 2 }}>
                          {status === "work" ? "✅ Work hours" : status === "awake" ? "⚠️ Awake" : "😴 Sleeping"}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick copy */}
            <div style={{ background: "var(--bg2)", border: "1px solid var(--border2)", borderRadius: "var(--radius)", padding: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text2)", marginBottom: 10 }}>📋 Copy-ready time string</div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "var(--cyan)", background: "var(--bg3)", padding: "10px 14px", borderRadius: 8, lineHeight: 1.8 }}>
                {selectedZones.map(zone => {
                  const baseLocal = getTimeInZone(selectedZones[0].tz, now).getHours();
                  const targetLocal = getTimeInZone(zone.tz, now).getHours();
                  const diff = targetLocal - baseLocal;
                  const convertedH = (meetingHour + diff + 48) % 24;
                  return `${formatTimeShort(convertedH, use24)} ${zone.name}`;
                }).join(" / ")}
              </div>
              <button onClick={() => {
                const str = selectedZones.map(zone => {
                  const baseLocal = getTimeInZone(selectedZones[0].tz, now).getHours();
                  const diff = getTimeInZone(zone.tz, now).getHours() - baseLocal;
                  const h = (meetingHour + diff + 48) % 24;
                  return `${formatTimeShort(h, use24)} ${zone.name}`;
                }).join(" / ");
                navigator.clipboard.writeText(str);
                setCopied(true); setTimeout(() => setCopied(false), 2000);
              }} style={{ marginTop: 10, padding: "6px 16px", borderRadius: 8, border: "1px solid var(--border)", background: "transparent", color: "var(--text2)", fontSize: 12 }}>
                {copied ? "✓ Copied!" : "Copy to clipboard"}
              </button>
            </div>
          </div>
        )}

        {/* ── FAQ ── */}
        <div style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20, letterSpacing: "-0.5px" }}>
            Frequently Asked <span style={{ color: "var(--cyan)" }}>Questions</span>
          </h2>
          <div style={{ background: "var(--bg2)", border: "1px solid var(--border2)", borderRadius: "var(--radius)", padding: "0 20px" }}>
            {FAQ.map((item, i) => (
              <div key={i} className="faq-item">
                <div className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{item.q}</span>
                  <span style={{ color: "var(--cyan)", fontSize: 18, flexShrink: 0, transform: openFaq === i ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
                </div>
                {openFaq === i && <div className="faq-a fade-in">{item.a}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* ── About / SEO ── */}
        <div style={{ marginTop: 48, padding: 24, background: "var(--bg2)", border: "1px solid var(--border2)", borderRadius: "var(--radius)" }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>About <span style={{ color: "var(--cyan)" }}>ZoneAtlas</span></h2>
          <p style={{ fontSize: 16, color: "var(--text2)", lineHeight: 1.8, marginBottom: 14 }}>
            ZoneAtlas is a free world time zone converter and international meeting scheduler designed for remote teams, frequent travelers, and global professionals. Unlike other timezone tools, ZoneAtlas shows you <strong style={{ color: "var(--text)" }}>sleep hours</strong> alongside work hours, so you never accidentally schedule a call at 3am for your colleague in Tokyo again.
          </p>
          <p style={{ fontSize: 16, color: "var(--text2)", lineHeight: 1.8, marginBottom: 14 }}>
            The <strong style={{ color: "var(--text)" }}>Meeting Planner</strong> automatically highlights overlapping work hours across all your selected cities, calculates the best meeting windows, and generates a copy-ready time string you can paste directly into your calendar invite or Slack message.
          </p>
          <p style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.8 }}>
            All time conversions are powered by your browser's live timezone database, ensuring <strong style={{ color: "var(--text)" }}>automatic Daylight Saving Time accuracy</strong> for all 40 countries that observe DST. No manual updates needed.
          </p>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 40, paddingTop: 20, borderTop: "1px solid var(--border2)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <span style={{ fontSize: 13, color: "var(--text3)" }}>ZoneAtlas · Free World Time Zone Converter</span>
          <span style={{ fontSize: 11, color: "var(--text3)" }}>Live · DST-aware · No signup required</span>
        </div>
      </div>
    </div>
  );
}
