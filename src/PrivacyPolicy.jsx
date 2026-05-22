export default function PrivacyPolicy({ onClose }) {
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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: "#eef4ff", letterSpacing: "-0.5px" }}>Privacy Policy</h1>
          <button onClick={onClose} style={{ color: "#4a6080", fontSize: 20, cursor: "pointer", background: "none", border: "none", padding: "4px 8px" }}>✕</button>
        </div>
        <p style={{ fontSize: 13, color: "#4a6080", marginBottom: 24 }}>Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>

        {[
          {
            title: "Overview",
            body: "ZoneAtlas is a free world time zone converter and meeting planner. We are committed to protecting your privacy. This policy explains what information we collect, how we use it, and your rights regarding that information."
          },
          {
            title: "Information We Collect",
            body: "ZoneAtlas does not require you to create an account or provide any personal information to use the tool. We do not collect names, email addresses, or any personally identifiable information. Your city selections and preferences are stored locally in your browser only and are never transmitted to our servers."
          },
          {
            title: "Cookies and Local Storage",
            body: "ZoneAtlas uses your browser's local storage to remember your preferred cities and settings between visits. This data never leaves your device. We do not use tracking cookies or third-party cookies for advertising purposes."
          },
          {
            title: "Analytics",
            body: "We may use privacy-respecting analytics to understand how many people visit ZoneAtlas and which features are most used. This data is aggregated and anonymous — it cannot be used to identify individual users."
          },
          {
            title: "Advertising",
            body: "ZoneAtlas displays advertisements served by Google AdSense. Google may use cookies to serve ads based on your prior visits to websites. You can opt out of personalized advertising by visiting Google's Ads Settings at adssettings.google.com."
          },
          {
            title: "Third Party Services",
            body: "ZoneAtlas uses Google Fonts to load typography. Google may collect limited technical information (such as your IP address) when fonts are loaded. Please refer to Google's Privacy Policy for details."
          },
          {
            title: "Data Security",
            body: "Since ZoneAtlas does not collect or store personal data on our servers, there is no personal data at risk. All city preferences are stored locally on your device and can be cleared at any time by clearing your browser's local storage."
          },
          {
            title: "Children's Privacy",
            body: "ZoneAtlas does not knowingly collect any information from children under the age of 13. The tool is a general-purpose utility suitable for all ages."
          },
          {
            title: "Changes to This Policy",
            body: "We may update this privacy policy from time to time. Any changes will be posted on this page with an updated date. Continued use of ZoneAtlas after changes constitutes acceptance of the updated policy."
          },
          {
            title: "Contact",
            body: "If you have any questions about this privacy policy, please contact us at hello@docvaultpro.com"
          },
        ].map(section => (
          <div key={section.title} style={{ marginBottom: 20 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: "#00c8ff", marginBottom: 8 }}>{section.title}</h2>
            <p style={{ fontSize: 14, color: "#8ba4cc", lineHeight: 1.75 }}>{section.body}</p>
          </div>
        ))}

        <div style={{ marginTop: 32, paddingTop: 20, borderTop: "1px solid rgba(0,200,255,0.1)", textAlign: "center" }}>
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
