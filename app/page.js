'use client'

import { useState, useEffect } from "react"

// ============================================
// EDIT THESE VALUES FOR YOUR BUSINESS
// ============================================
const CONFIG = {
  whatsappNumber: "972509976635",
  whatsappMessage: "היי! אני מעוניין לשמוע עוד על שירותי AI לעסק שלי",
  ownerName: "Sami Safe",
  email: "sami@pnai.co.il",
  phone: "054-XXX-XXXX",
  domain: "pnai.co.il",
  tier1Price: "החל מ-₪2,500",
  tier2Price: "החל מ-₪7,500",
}
// ============================================

const waLink = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`

function HourglassSvg({ size = 28, color = "#0FB88E" }) {
  return (
    <svg width={size} height={size * 1.1} viewBox="0 0 28 32" fill="none" style={{ display: "block" }}>
      <path d="M4,2 L24,2 L14,16 L24,30 L4,30 L14,16 Z" fill="none" stroke={color} strokeWidth="2.2" strokeLinejoin="round"/>
      <circle cx="14" cy="23" r="1.8" fill={color} opacity="0.9"/>
      <circle cx="11" cy="25.5" r="1.1" fill={color} opacity="0.5"/>
      <circle cx="17" cy="25.5" r="1.1" fill={color} opacity="0.5"/>
      <circle cx="14" cy="9" r="1.2" fill={color} opacity="0.35"/>
    </svg>
  )
}

function Logo({ size = "md", light = false }) {
  const sizes = { sm: { font: 24, icon: 20 }, md: { font: 32, icon: 26 }, lg: { font: 48, icon: 38 } }
  const s = sizes[size] || sizes.md
  const textColor = light ? "#0E2820" : "#E4F4EE"
  const accent = light ? "#0A8560" : "#0FB88E"
  return (
    <div dir="ltr" style={{ display: "inline-flex", alignItems: "center", gap: s.font * 0.05, userSelect: "none" }}>
      <span style={{ fontFamily: "'Heebo', 'Helvetica Neue', Arial, sans-serif", fontSize: s.font, fontWeight: 700, color: textColor, letterSpacing: 1, lineHeight: 1 }}>PN</span>
      <HourglassSvg size={s.icon} color={accent} />
      <span style={{ fontFamily: "'Heebo', 'Helvetica Neue', Arial, sans-serif", fontSize: s.font, fontWeight: 700, color: accent, letterSpacing: 1, lineHeight: 1 }}>AI</span>
    </div>
  )
}

function HourglassIcon({ size = 40, color = "#0FB88E" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M8,4 L32,4 L20,20 L32,36 L8,36 L20,20 Z" fill="none" stroke={color} strokeWidth="2.2" strokeLinejoin="round"/>
      <circle cx="20" cy="28" r="2.2" fill={color} opacity="0.9"/>
      <circle cx="16.5" cy="31.5" r="1.4" fill={color} opacity="0.5"/>
      <circle cx="23.5" cy="31.5" r="1.4" fill={color} opacity="0.5"/>
      <circle cx="20" cy="11" r="1.5" fill={color} opacity="0.35"/>
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0FB88E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}

function ArrowLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
    </svg>
  )
}

const services = [
  {
    tier: "Tier 1", title: "אבחון AI + המלצות", subtitle: "ייעוץ",
    price: CONFIG.tier1Price, highlighted: false, cta: "בואו נדבר",
    features: [
      "שיחת גילוי מעמיקה על העסק שלך",
      "זיהוי נקודות כאב ובזבוז זמן",
      "דוח מפורט עם המלצות AI ספציפיות",
      "תוכנית יישום מעשית צעד אחר צעד",
    ],
  },
  {
    tier: "Tier 2", title: "אבחון + יישום מלא", subtitle: "הכל כלול",
    price: CONFIG.tier2Price, highlighted: true, cta: "בואו נתחיל",
    features: [
      "הכל מ-Tier 1",
      "בנייה והטמעה של הפתרונות",
      "הדרכת צוות על הכלים החדשים",
      "תמיכה שוטפת לאחר ההשקה",
      "אופטימיזציה ושיפור מתמשך",
    ],
  },
]

const steps = [
  { num: "01", title: "שיחת היכרות", desc: "נבין את העסק שלך, את האתגרים, ואיפה הזמן שלך הולך לאיבוד" },
  { num: "02", title: "אבחון ותוכנית", desc: "נמפה את התהליכים ונבנה תוכנית AI מותאמת אישית לעסק שלך" },
  { num: "03", title: "יישום והטמעה", desc: "נבנה, נחבר ונפעיל את הפתרונות — אתה ממשיך לעבוד כרגיל" },
  { num: "04", title: "פנאי", desc: "העסק עובד חכם יותר. יש לך זמן לצמוח, או פשוט לנשום" },
]

const stats = [
  { value: "85%", label: "מהעסקים מבזבזים 10+ שעות בשבוע על משימות שניתן לאטמט" },
  { value: "3x", label: "מהירות תגובה ללידים עם צ'אטבוט AI" },
  { value: "60%", label: "חיסכון בזמן תפעולי בממוצע לאחר הטמעת AI" },
]

const faqs = [
  { q: "אני לא מבין בטכנולוגיה. זה מתאים לי?", a: "בהחלט. אנחנו מטפלים בכל החלק הטכני. אתה רק צריך להסביר לנו איך העסק שלך עובד — ואנחנו נעשה את השאר." },
  { q: "כמה זמן לוקח להטמיע פתרון AI?", a: "תלוי במורכבות, אבל רוב הפתרונות שלנו עובדים תוך 1-3 שבועות. פתרונות פשוטים כמו צ'אטבוט יכולים לעבוד תוך ימים." },
  { q: "מה קורה אם זה לא עובד?", a: "אנחנו לא נעלמים אחרי ההטמעה. יש תמיכה שוטפת, ואם משהו לא עובד — מתקנים עד שזה מושלם." },
  { q: "אתם עובדים עם כל סוגי העסקים?", a: "אנחנו מתמחים בעסקים קטנים ובינוניים בישראל — חנויות, נותני שירות, סוכנויות, קליניקות, ועוד. אם יש לך עסק ואתה מרגיש שאתה טובע בעבודה ידנית — אנחנו בשבילך." },
]

export default function Home() {
  const [mobileMenu, setMobileMenu] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" })
  const [formSent, setFormSent] = useState(false)
  const [formLoading, setFormLoading] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setMobileMenu(false)
  }

  return (
    <>
      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, right: 0, left: 0, zIndex: 50,
        padding: "12px 24px",
        background: scrolled ? "#0A0F0EEE" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(15,184,142,0.1)" : "1px solid transparent",
        transition: "all 0.3s",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div style={{ cursor: "pointer" }} onClick={() => scrollTo("hero")}>
          <Logo size="sm" />
        </div>
        <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {[["services","שירותים"],["process","איך זה עובד"],["about","אודות"],["faq","שאלות נפוצות"]].map(([id,label]) => (
            <button key={id} onClick={() => scrollTo(id)} style={{
              color: "rgba(192,216,208,0.5)", fontSize: 14, background: "none", border: "none",
              cursor: "pointer", fontFamily: "inherit", padding: "8px 14px", borderRadius: 8,
              transition: "all 0.15s",
            }} onMouseOver={e=>e.target.style.color="#C0D8D0"} onMouseOut={e=>e.target.style.color="rgba(192,216,208,0.5)"}>
              {label}
            </button>
          ))}
          <a href={waLink} target="_blank" rel="noopener noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 20px",
            background: "#0FB88E", color: "#0A0F0E", borderRadius: 10, fontSize: 14,
            fontWeight: 500, fontFamily: "inherit", marginRight: 8, transition: "all 0.2s",
          }}>
            <WhatsAppIcon /> דברו איתנו
          </a>
        </div>
        <button className="mobile-menu-btn" onClick={() => setMobileMenu(!mobileMenu)} style={{
          background: "none", border: "none", cursor: "pointer", padding: 8,
          display: "none", flexDirection: "column", gap: 5,
        }}>
          <span style={{ width: 22, height: 2, background: "#0FB88E", borderRadius: 2, transition: "all 0.2s", transform: mobileMenu ? "rotate(45deg) translateY(7px)" : "none" }}/>
          <span style={{ width: 22, height: 2, background: "#0FB88E", borderRadius: 2, transition: "all 0.2s", opacity: mobileMenu ? 0 : 1 }}/>
          <span style={{ width: 22, height: 2, background: "#0FB88E", borderRadius: 2, transition: "all 0.2s", transform: mobileMenu ? "rotate(-45deg) translateY(-7px)" : "none" }}/>
        </button>
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div style={{
          position: "fixed", top: 0, right: 0, left: 0, bottom: 0, zIndex: 45,
          background: "rgba(10,15,14,0.96)", backdropFilter: "blur(20px)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24,
        }}>
          {[["services","שירותים"],["process","איך זה עובד"],["about","אודות"],["faq","שאלות נפוצות"]].map(([id,label]) => (
            <button key={id} onClick={() => scrollTo(id)} style={{
              background: "none", border: "none", color: "#C0D8D0", fontFamily: "inherit",
              fontSize: 22, fontWeight: 300, cursor: "pointer", padding: "8px 24px",
            }}>{label}</button>
          ))}
          <a href={waLink} target="_blank" rel="noopener noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px",
            background: "#0FB88E", color: "#0A0F0E", borderRadius: 10, fontSize: 16,
            fontWeight: 500, fontFamily: "inherit", marginTop: 16,
          }}>
            <WhatsAppIcon /> דברו איתנו
          </a>
        </div>
      )}

      {/* HERO */}
      <section id="hero" style={{
        minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", padding: "120px 24px 80px", textAlign: "center", position: "relative",
        backgroundImage: "radial-gradient(circle at 1px 1px, rgba(15,184,142,0.07) 1px, transparent 0)",
        backgroundSize: "40px 40px",
      }}>
        <div style={{
          position: "absolute", top: "20%", left: "50%", width: 700, height: 700,
          background: "radial-gradient(circle, rgba(15,184,142,0.18) 0%, rgba(15,184,142,0.06) 40%, transparent 70%)",
          transform: "translate(-50%, -50%)", borderRadius: "50%", pointerEvents: "none",
        }}/>
        <div style={{ marginBottom: 32, animation: "fadeUp 0.7s ease-out both" }}><Logo size="lg" /></div>
        <h1 style={{
          fontSize: "clamp(32px, 6vw, 56px)", fontWeight: 700, color: "#E4F4EE",
          lineHeight: 1.2, maxWidth: 700, marginBottom: 20,
          animation: "fadeUp 0.7s ease-out 0.1s both",
        }}>הזמן שלך יקר לנו</h1>
        <p style={{
          fontSize: "clamp(16px, 2.5vw, 20px)", fontWeight: 300, color: "rgba(192,216,208,0.5)",
          maxWidth: 520, lineHeight: 1.7, marginBottom: 40,
          animation: "fadeUp 0.7s ease-out 0.2s both",
        }}>
          אנחנו עוזרים לעסקים קטנים ובינוניים בישראל לחסוך זמן, לאטמט תהליכים, ולתת ל-AI לעבוד בשבילם
        </p>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", animation: "fadeUp 0.7s ease-out 0.3s both" }}>
          <a href={waLink} target="_blank" rel="noopener noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px",
            background: "#0FB88E", color: "#0A0F0E", borderRadius: 10, fontSize: 16, fontWeight: 500,
          }}>
            <WhatsAppIcon /> בואו נדבר
          </a>
          <button onClick={() => scrollTo("services")} style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px",
            background: "transparent", color: "#0FB88E", border: "1.5px solid rgba(15,184,142,0.2)",
            borderRadius: 10, fontSize: 16, fontWeight: 500, cursor: "pointer", fontFamily: "inherit",
          }}>
            <ArrowLeft /> מה אנחנו עושים
          </button>
        </div>
        <div style={{
          display: "flex", gap: 40, marginTop: 72, flexWrap: "wrap", justifyContent: "center",
          animation: "fadeUp 0.7s ease-out 0.4s both",
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 36, fontWeight: 700, color: "#0FB88E" }}>{s.value}</div>
              <div style={{ fontSize: 13, color: "rgba(192,216,208,0.4)", maxWidth: 180, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: "100px 24px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ display: "inline-block", padding: "6px 16px", borderRadius: 20, fontSize: 13, fontWeight: 500, color: "#0FB88E", background: "rgba(15,184,142,0.08)", border: "1px solid rgba(15,184,142,0.13)", marginBottom: 16 }}>שירותים</div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, color: "#E4F4EE", marginBottom: 12 }}>בחרו את המסלול שמתאים לכם</h2>
          <p style={{ fontSize: 16, color: "rgba(192,216,208,0.4)", maxWidth: 480, margin: "0 auto" }}>בין אם אתם צריכים כיוון או פתרון מלא — יש לנו מסלול בשבילכם</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))", gap: 24 }}>
          {services.map((svc, i) => (
            <div key={i} style={{
              padding: 32, borderRadius: 16, position: "relative",
              background: svc.highlighted ? "linear-gradient(135deg, #0E1816 0%, #0A1412 100%)" : "#0E1816",
              border: svc.highlighted ? "1.5px solid rgba(15,184,142,0.25)" : "1px solid rgba(15,184,142,0.08)",
              transition: "all 0.3s",
            }}>
              {svc.highlighted && (
                <div style={{
                  position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                  background: "#0FB88E", color: "#0A0F0E", padding: "4px 16px", borderRadius: 20, fontSize: 12, fontWeight: 500,
                }}>הכי פופולרי</div>
              )}
              <div style={{ fontSize: 12, color: "#0FB88E", fontWeight: 500, marginBottom: 8, letterSpacing: 1 }}>{svc.tier}</div>
              <h3 style={{ fontSize: 24, fontWeight: 700, color: "#E4F4EE", marginBottom: 4 }}>{svc.title}</h3>
              <p style={{ fontSize: 14, color: "rgba(192,216,208,0.4)", marginBottom: 20 }}>{svc.subtitle}</p>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#0FB88E", marginBottom: 24 }}>{svc.price}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                {svc.features.map((f, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <div style={{ flexShrink: 0, marginTop: 2 }}><CheckIcon /></div>
                    <span style={{ fontSize: 14, color: "#C0D8D0", lineHeight: 1.5 }}>{f}</span>
                  </div>
                ))}
              </div>
              <a href={waLink} target="_blank" rel="noopener noreferrer" style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                width: "100%", padding: "14px 32px", borderRadius: 10, fontSize: 16, fontWeight: 500,
                fontFamily: "inherit", cursor: "pointer", transition: "all 0.2s",
                ...(svc.highlighted
                  ? { background: "#0FB88E", color: "#0A0F0E", border: "none" }
                  : { background: "transparent", color: "#0FB88E", border: "1.5px solid rgba(15,184,142,0.2)" }),
              }}>
                <WhatsAppIcon /> {svc.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" style={{
        padding: "100px 24px",
        backgroundImage: "radial-gradient(circle at 1px 1px, rgba(15,184,142,0.03) 1px, transparent 0)",
        backgroundSize: "40px 40px",
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ display: "inline-block", padding: "6px 16px", borderRadius: 20, fontSize: 13, fontWeight: 500, color: "#0FB88E", background: "rgba(15,184,142,0.08)", border: "1px solid rgba(15,184,142,0.13)", marginBottom: 16 }}>איך זה עובד</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, color: "#E4F4EE" }}>מעסק עמוס לעסק חכם — ב-4 צעדים</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
            <div style={{
              position: "absolute", top: 28, bottom: 28, right: 27, width: 2,
              background: "linear-gradient(to bottom, rgba(15,184,142,0.25), rgba(15,184,142,0.06))", borderRadius: 2,
            }}/>
            {steps.map((step, i) => (
              <div key={i} style={{ display: "flex", gap: 24, alignItems: "flex-start", padding: "24px 0", position: "relative" }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%", flexShrink: 0,
                  background: i === 3 ? "#0FB88E" : "#0E1816",
                  border: `2px solid ${i === 3 ? "#0FB88E" : "rgba(15,184,142,0.2)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16, fontWeight: 700, color: i === 3 ? "#0A0F0E" : "#0FB88E", zIndex: 2,
                }}>
                  {i === 3 ? <HourglassIcon size={28} color="#0A0F0E"/> : step.num}
                </div>
                <div style={{ paddingTop: 8 }}>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: "#E4F4EE", marginBottom: 6 }}>{step.title}</h3>
                  <p style={{ fontSize: 15, color: "rgba(192,216,208,0.45)", lineHeight: 1.6 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDY */}
      <section style={{ padding: "100px 24px", maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ display: "inline-block", padding: "6px 16px", borderRadius: 20, fontSize: 13, fontWeight: 500, color: "#0FB88E", background: "rgba(15,184,142,0.08)", border: "1px solid rgba(15,184,142,0.13)", marginBottom: 16 }}>מקרה לקוח</div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, color: "#E4F4EE" }}>תוצאות אמיתיות מעסקים אמיתיים</h2>
        </div>
        <div style={{ padding: 32, borderRadius: 16, background: "#0E1816", border: "1px solid rgba(15,184,142,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
            <div style={{
              width: 52, height: 52, borderRadius: "50%", background: "rgba(15,184,142,0.13)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700, color: "#0FB88E",
            }}>SH</div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#E4F4EE" }}>SH-Fragrances</div>
              <div style={{ fontSize: 13, color: "rgba(192,216,208,0.4)" }}>הפצת בשמים · WhatsApp, Instagram, TikTok</div>
            </div>
          </div>
          <p style={{ fontSize: 15, color: "rgba(192,216,208,0.5)", lineHeight: 1.7, marginBottom: 20 }}>
            <strong style={{ color: "#E4F4EE" }}>הבעיה:</strong> מאות פניות ביום דרך וואטסאפ, אינסטגרם וטיקטוק — בלי יכולת לענות לכולם. לידים הלכו לאיבוד, מכירות נפלו בין הכיסאות.
          </p>
          <p style={{ fontSize: 15, color: "rgba(192,216,208,0.5)", lineHeight: 1.7, marginBottom: 24 }}>
            <strong style={{ color: "#E4F4EE" }}>הפתרון:</strong> צ'אטבוט AI שעונה אוטומטית ב-WhatsApp ובאינסטגרם, מסנן לידים, עונה על שאלות נפוצות, ומעביר רק לידים חמים לבעל העסק.
          </p>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {[{ val: "90%", label: "פחות לידים שנפלו" }, { val: "< 30 שנ׳", label: "זמן תגובה ממוצע" }, { val: "5+ שעות", label: "חיסכון יומי" }].map((m, i) => (
              <div key={i} style={{ textAlign: "center", flex: "1 1 100px" }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: "#0FB88E" }}>{m.val}</div>
                <div style={{ fontSize: 12, color: "rgba(192,216,208,0.4)", marginTop: 2 }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{
        padding: "100px 24px",
        backgroundImage: "radial-gradient(circle at 1px 1px, rgba(15,184,142,0.03) 1px, transparent 0)",
        backgroundSize: "40px 40px",
      }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-block", padding: "6px 16px", borderRadius: 20, fontSize: 13, fontWeight: 500, color: "#0FB88E", background: "rgba(15,184,142,0.08)", border: "1px solid rgba(15,184,142,0.13)", marginBottom: 16 }}>אודות</div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, color: "#E4F4EE", marginBottom: 20 }}>הסיפור שלנו</h2>
          <div style={{
            width: 80, height: 80, borderRadius: "50%", background: "rgba(15,184,142,0.13)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 24px", fontSize: 28, fontWeight: 700, color: "#0FB88E",
          }}><HourglassIcon size={36} color="#0FB88E"/></div>
          <p style={{ fontSize: 17, color: "rgba(192,216,208,0.65)", lineHeight: 1.8, marginBottom: 20 }}>
            שמי סמי סייף, ואני עוזר לבעלי עסקים קטנים ובינוניים בישראל להפסיק לבזבז זמן על דברים שמכונה יכולה לעשות טוב יותר.
          </p>
          <p style={{ fontSize: 17, color: "rgba(192,216,208,0.65)", lineHeight: 1.8, marginBottom: 20 }}>
            אני מאמין שטכנולוגיה צריכה לעבוד בשבילך — לא להפך. לכן כל פתרון שאני מטמיע נבנה סביב העסק שלך, הצוות שלך, והשפה שלך.
          </p>
          <p style={{ fontSize: 17, color: "rgba(192,216,208,0.65)", lineHeight: 1.8, marginBottom: 32 }}>
            לא מדובר בטכנולוגיה מסובכת. מדובר בפנאי — הזמן שאתה מרוויח בחזרה כשה-AI עובד במקומך.
          </p>
          <a href={waLink} target="_blank" rel="noopener noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px",
            background: "#0FB88E", color: "#0A0F0E", borderRadius: 10, fontSize: 16, fontWeight: 500,
          }}>
            <WhatsAppIcon /> בואו נכיר
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: "100px 24px", maxWidth: 700, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ display: "inline-block", padding: "6px 16px", borderRadius: 20, fontSize: 13, fontWeight: 500, color: "#0FB88E", background: "rgba(15,184,142,0.08)", border: "1px solid rgba(15,184,142,0.13)", marginBottom: 16 }}>שאלות נפוצות</div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, color: "#E4F4EE" }}>יש שאלות? יש לנו תשובות</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {faqs.map((faq, i) => (
            <div key={i} onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
              borderRadius: 12, overflow: "hidden", cursor: "pointer",
              background: "#0E1816", border: "1px solid rgba(15,184,142,0.08)", transition: "all 0.3s",
            }}>
              <div style={{ padding: "18px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 16, fontWeight: 500, color: "#E4F4EE" }}>{faq.q}</span>
                <span style={{
                  fontSize: 22, color: "#0FB88E", fontWeight: 300, flexShrink: 0, marginRight: 12,
                  transform: openFaq === i ? "rotate(45deg)" : "none", transition: "transform 0.2s",
                }}>+</span>
              </div>
              {openFaq === i && (
                <div style={{ padding: "0 24px 18px", fontSize: 15, color: "rgba(192,216,208,0.5)", lineHeight: 1.7 }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: "80px 24px", textAlign: "center",
        background: "linear-gradient(to bottom, #0A0F0E, #0E1816)",
      }}>
        <div style={{ maxWidth: 500, margin: "0 auto" }}>
          <HourglassIcon size={48} />
          <h2 style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 700, color: "#E4F4EE", margin: "20px 0 12px" }}>
            מוכנים לקבל את הזמן שלכם בחזרה?
          </h2>
          <p style={{ fontSize: 16, color: "rgba(192,216,208,0.4)", marginBottom: 32 }}>
            שיחה קצרה. בלי התחייבות. בואו נבדוק מה AI יכול לעשות לעסק שלכם.
          </p>

          {/* Contact Form */}
          {formSent ? (
            <div style={{ padding: 24, borderRadius: 12, background: "rgba(15,184,142,0.08)", border: "1px solid rgba(15,184,142,0.2)", marginBottom: 28 }}>
              <CheckIcon />
              <p style={{ fontSize: 18, fontWeight: 600, color: "#E4F4EE", marginTop: 8 }}>תודה! קיבלנו את הפרטים</p>
              <p style={{ fontSize: 14, color: "rgba(192,216,208,0.5)", marginTop: 4 }}>ניצור איתך קשר בהקדם</p>
            </div>
          ) : (
            <form onSubmit={async (e) => {
              e.preventDefault()
              setFormLoading(true)
              try {
                await fetch("https://api.web3forms.com/submit", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    access_key: "ce9887df-1c1c-4a6e-80e0-b7f02b29e52c",
                    subject: `ליד חדש מהאתר — ${formData.name}`,
                    from_name: "PNAI Website",
                    name: formData.name,
                    phone: formData.phone,
                    email: formData.email,
                  }),
                })
                setFormSent(true)
              } catch { setFormSent(true) }
              setFormLoading(false)
            }} style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28, textAlign: "start" }}>
              <input
                type="text" required placeholder="שם מלא"
                value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                style={{ padding: "14px 18px", borderRadius: 10, border: "1px solid rgba(15,184,142,0.15)", background: "#0A0F0E", color: "#E4F4EE", fontSize: 15, fontFamily: "inherit", outline: "none" }}
              />
              <input
                type="tel" required placeholder="מספר טלפון"
                value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
                style={{ padding: "14px 18px", borderRadius: 10, border: "1px solid rgba(15,184,142,0.15)", background: "#0A0F0E", color: "#E4F4EE", fontSize: 15, fontFamily: "inherit", outline: "none" }}
              />
              <input
                type="email" required placeholder="אימייל"
                value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                style={{ padding: "14px 18px", borderRadius: 10, border: "1px solid rgba(15,184,142,0.15)", background: "#0A0F0E", color: "#E4F4EE", fontSize: 15, fontFamily: "inherit", outline: "none" }}
              />
              <button type="submit" disabled={formLoading} style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px 32px",
                background: formLoading ? "rgba(15,184,142,0.5)" : "#0FB88E", color: "#0A0F0E", borderRadius: 10, fontSize: 16, fontWeight: 600,
                border: "none", cursor: formLoading ? "wait" : "pointer", fontFamily: "inherit", marginTop: 4,
              }}>
                {formLoading ? "שולח..." : "שלחו פרטים"}
              </button>
            </form>
          )}

          <p style={{ fontSize: 13, color: "rgba(192,216,208,0.3)", marginBottom: 16 }}>או דברו איתנו ישירות</p>
          <a href={waLink} target="_blank" rel="noopener noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 40px",
            background: "transparent", color: "#0FB88E", border: "1.5px solid rgba(15,184,142,0.25)", borderRadius: 10, fontSize: 18, fontWeight: 500,
          }}>
            <WhatsAppIcon /> דברו איתנו בוואטסאפ
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: "40px 24px", borderTop: "1px solid rgba(15,184,142,0.08)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
      }}>
        <Logo size="sm" />
        <p style={{ fontSize: 13, color: "rgba(192,216,208,0.25)" }}>הזמן שלך יקר לנו</p>
        <div style={{ display: "flex", gap: 24 }}>
          {[["services","שירותים"],["about","אודות"],["faq","שאלות"]].map(([id,label]) => (
            <button key={id} onClick={() => scrollTo(id)} style={{
              color: "rgba(192,216,208,0.35)", fontSize: 13, background: "none", border: "none",
              cursor: "pointer", fontFamily: "inherit", padding: "8px 14px", borderRadius: 8,
            }}>{label}</button>
          ))}
        </div>
        <p style={{ fontSize: 12, color: "rgba(192,216,208,0.2)", marginTop: 12 }}>© 2026 PNAI · כל הזכויות שמורות</p>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a href={waLink} target="_blank" rel="noopener noreferrer" style={{
        position: "fixed", bottom: 24, left: 24, zIndex: 100,
        width: 56, height: 56, borderRadius: "50%", background: "#25D366",
        display: "flex", alignItems: "center", justifyContent: "center", color: "white",
        boxShadow: "0 4px 20px rgba(37,211,102,0.25)", animation: "float 3s ease-in-out infinite",
      }}>
        <WhatsAppIcon />
      </a>
    </>
  )
}
