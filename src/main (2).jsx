import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './WorldTimezone.jsx'
import InstallPrompt from './InstallPrompt.jsx'
import PrivacyPolicy from './PrivacyPolicy.jsx'
import AboutPage from './AboutPage.jsx'

function Root() {
  const [page, setPage] = useState(null);

  return (
    <>
      <App onPrivacy={() => setPage('privacy')} onAbout={() => setPage('about')} />
      <InstallPrompt />

      {/* Footer */}
      <div style={{
        borderTop: "1px solid rgba(0,200,255,0.08)",
        padding: "20px 16px",
        textAlign: "center",
        background: "#060d1f",
      }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap", marginBottom: 8 }}>
          <button onClick={() => setPage('about')} style={{ fontSize: 13, color: "#4a6080", background: "none", border: "none", cursor: "pointer", fontFamily: "'Plus Jakarta Sans', system-ui" }}>About</button>
          <button onClick={() => setPage('privacy')} style={{ fontSize: 13, color: "#4a6080", background: "none", border: "none", cursor: "pointer", fontFamily: "'Plus Jakarta Sans', system-ui" }}>Privacy Policy</button>
          <a href="mailto:hello@docvaultpro.com" style={{ fontSize: 13, color: "#4a6080", textDecoration: "none" }}>Contact</a>
        </div>
        <p style={{ fontSize: 12, color: "#2a3f60", margin: 0 }}>
          © {new Date().getFullYear()} ZoneAtlas · Free World Time Zone Converter · No signup required
        </p>
      </div>

      {page === 'privacy' && <PrivacyPolicy onClose={() => setPage(null)} />}
      {page === 'about' && <AboutPage onClose={() => setPage(null)} />}
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)
