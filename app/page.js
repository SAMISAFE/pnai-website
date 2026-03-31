'use client'

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { Check, ArrowLeft, ChevronDown, Send, Sparkles, Search, Settings, Clock } from "lucide-react"
import * as Accordion from "@radix-ui/react-accordion"

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
}
// ============================================

const waLink = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`

// --- Brand SVGs (keep custom) ---
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

function Logo({ size = "md" }) {
  const sizes = { sm: { font: 24, icon: 20 }, md: { font: 32, icon: 26 }, lg: { font: 48, icon: 38 } }
  const s = sizes[size] || sizes.md
  return (
    <div dir="ltr" style={{ display: "inline-flex", alignItems: "center", gap: s.font * 0.05, userSelect: "none" }}>
      <span style={{ fontFamily: "'Heebo', 'Helvetica Neue', Arial, sans-serif", fontSize: s.font, fontWeight: 700, color: "#E4F4EE", letterSpacing: 1, lineHeight: 1 }}>PN</span>
      <HourglassSvg size={s.icon} color="#0FB88E" />
      <span style={{ fontFamily: "'Heebo', 'Helvetica Neue', Arial, sans-serif", fontSize: s.font, fontWeight: 700, color: "#0FB88E", letterSpacing: 1, lineHeight: 1 }}>AI</span>
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

// --- Mouse-reactive Particle Field ---
function ParticleField() {
  const canvasRef = useRef(null)
  const mouse = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    let animId
    let particles = []
    const PARTICLE_COUNT = 80
    const MOUSE_RADIUS = 150

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const onMouse = (e) => { mouse.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener("mousemove", onMouse, { passive: true })

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        baseR: Math.random() * 2.5 + 0.5,
        r: Math.random() * 2.5 + 0.5,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.2 - 0.1,
        opacity: Math.random() * 0.5 + 0.1,
        pulse: Math.random() * Math.PI * 2,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const mx = mouse.current.x
      const my = mouse.current.y

      for (const p of particles) {
        // mouse repulsion
        const distX = p.x - mx
        const distY = p.y - my
        const dist = Math.sqrt(distX * distX + distY * distY)
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS * 0.8
          p.x += (distX / dist) * force
          p.y += (distY / dist) * force
          p.r = p.baseR * (1 + force * 2)
        } else {
          p.r += (p.baseR - p.r) * 0.05
        }

        p.x += p.dx
        p.y += p.dy
        p.pulse += 0.015

        if (p.x < -10) p.x = canvas.width + 10
        if (p.x > canvas.width + 10) p.x = -10
        if (p.y < -10) p.y = canvas.height + 10
        if (p.y > canvas.height + 10) p.y = -10

        const alpha = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse))

        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 8)
        glow.addColorStop(0, `rgba(15,184,142,${alpha * 0.3})`)
        glow.addColorStop(1, "transparent")
        ctx.fillStyle = glow
        ctx.fillRect(p.x - p.r * 8, p.y - p.r * 8, p.r * 16, p.r * 16)

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(15,184,142,${alpha})`
        ctx.fill()
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(15,184,142,${0.08 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMouse)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}
    />
  )
}

// --- Magnetic Button ---
function MagneticButton({ children, href, onClick, style, className = "" }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 20 })
  const springY = useSpring(y, { stiffness: 300, damping: 20 })

  const handleMouse = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left - rect.width / 2) * 0.15)
    y.set((e.clientY - rect.top - rect.height / 2) * 0.15)
  }
  const reset = () => { x.set(0); y.set(0) }

  const props = {
    ref,
    className,
    style: { ...style, x: springX, y: springY },
    onMouseMove: handleMouse,
    onMouseLeave: reset,
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.97 },
    transition: { type: "spring", stiffness: 400, damping: 17 },
  }

  if (href) return <motion.a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</motion.a>
  return <motion.button onClick={onClick} {...props}>{children}</motion.button>
}

// --- Animated counter with spring ---
function AnimatedCounter({ value, suffix = "" }) {
  const [display, setDisplay] = useState("0")
  const ref = useRef(null)
  const [triggered, setTriggered] = useState(false)
  const numeric = parseFloat(value.replace(/[^0-9.]/g, ""))
  const prefix = value.match(/^[^0-9]*/)?.[0] || ""

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTriggered(true); obs.disconnect() } }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!triggered || isNaN(numeric)) { if (triggered) setDisplay(value); return }
    const start = performance.now()
    const step = (now) => {
      const progress = Math.min((now - start) / 2000, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(`${prefix}${Math.round(eased * numeric)}${suffix}`)
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [triggered, numeric, prefix, suffix, value])

  return <span ref={ref}>{display}</span>
}

// --- Framer Motion variants ---
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.25, 0.4, 0.25, 1] },
  }),
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] } },
}

// --- Data ---
const services = [
  {
    tier: "Tier 1", title: "אבחון AI + המלצות", subtitle: "ייעוץ",
    highlighted: false, cta: "בואו נדבר",
    features: [
      "שיחת גילוי מעמיקה על העסק שלך",
      "זיהוי נקודות כאב ובזבוז זמן",
      "דוח מפורט עם המלצות AI ספציפיות",
      "תוכנית יישום מעשית צעד אחר צעד",
    ],
  },
  {
    tier: "Tier 2", title: "אבחון + יישום מלא", subtitle: "הכל כלול",
    highlighted: true, cta: "בואו נתחיל",
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
  { num: "01", title: "שיחת היכרות", desc: "נבין את העסק שלך, את האתגרים, ואיפה הזמן שלך הולך לאיבוד", icon: Search },
  { num: "02", title: "אבחון ותוכנית", desc: "נמפה את התהליכים ונבנה תוכנית AI מותאמת אישית לעסק שלך", icon: Settings },
  { num: "03", title: "יישום והטמעה", desc: "נבנה, נחבר ונפעיל את הפתרונות — אתה ממשיך לעבוד כרגיל", icon: Sparkles },
  { num: "04", title: "פנאי", desc: "העסק עובד חכם יותר. יש לך זמן לצמוח, או פשוט לנשום", icon: Clock },
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

const caseStudies = [
  {
    initials: "SH",
    name: "SH-Fragrances",
    industry: "הפצת בשמים · WhatsApp, Instagram, TikTok",
    problem: "מאות פניות ביום דרך וואטסאפ, אינסטגרם וטיקטוק — בלי יכולת לענות לכולם. לידים הלכו לאיבוד, מכירות נפלו בין הכיסאות.",
    solution: "צ'אטבוט AI שעונה אוטומטית ב-WhatsApp ובאינסטגרם, מסנן לידים, עונה על שאלות נפוצות, ומעביר רק לידים חמים לבעל העסק.",
    metrics: [
      { val: "90%", label: "פחות לידים שנפלו" },
      { val: "< 30 שנ׳", label: "זמן תגובה ממוצע" },
      { val: "5+ שעות", label: "חיסכון יומי" },
    ],
  },
  {
    initials: "JC",
    name: "Jatt Center",
    industry: "מרכז מסחרי · WhatsApp, Instagram",
    problem: "עשרות פניות חוזרות כל יום עם אותן שאלות — שעות עבודה, מיקום חנויות, מבצעים. הצוות בילה שעות על תשובות ידניות במקום לטפל בלקוחות במקום.",
    solution: "צ'אטבוט AI שעונה מיידית על כל השאלות הנפוצות, מפנה לידים חמים לצוות, ועובד 24/7 — גם כשהמרכז סגור.",
    metrics: [
      { val: "80%", label: "פחות פניות חוזרות" },
      { val: "24/7", label: "מענה אוטומטי" },
      { val: "4+ שעות", label: "חיסכון יומי לצוות" },
    ],
  },
]

function CaseStudyCard({ study, isActive }) {
  return (
    <motion.div
      animate={{
        scale: isActive ? 1 : 0.93,
        opacity: isActive ? 1 : 0.5,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{
        padding: 32, borderRadius: 16,
        background: isActive ? "rgba(14,24,22,0.9)" : "rgba(14,24,22,0.5)",
        border: isActive ? "1.5px solid rgba(15,184,142,0.2)" : "1px solid rgba(15,184,142,0.06)",
        backdropFilter: "blur(4px)",
        width: "100%",
        cursor: "pointer",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
        <div style={{
          width: 48, height: 48, borderRadius: "50%", background: "rgba(15,184,142,0.13)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18, fontWeight: 700, color: "#0FB88E", flexShrink: 0,
        }}>
          {study.initials}
        </div>
        <div>
          <div style={{ fontSize: 17, fontWeight: 700, color: "#E4F4EE" }}>{study.name}</div>
          <div style={{ fontSize: 12, color: "rgba(192,216,208,0.4)" }}>{study.industry}</div>
        </div>
      </div>

      <p style={{ fontSize: 14, color: "rgba(192,216,208,0.5)", lineHeight: 1.65, marginBottom: 14 }}>
        <strong style={{ color: "#E4F4EE" }}>הבעיה:</strong> {study.problem}
      </p>
      <p style={{ fontSize: 14, color: "rgba(192,216,208,0.5)", lineHeight: 1.65, marginBottom: 20 }}>
        <strong style={{ color: "#E4F4EE" }}>הפתרון:</strong> {study.solution}
      </p>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {study.metrics.map((m, i) => (
          <div key={i} style={{ textAlign: "center", flex: "1 1 80px" }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: "#0FB88E" }}>{m.val}</div>
            <div style={{ fontSize: 11, color: "rgba(192,216,208,0.4)", marginTop: 2 }}>{m.label}</div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function CaseStudyCarousel() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const trackRef = useRef(null)

  // Auto-advance every 3s
  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => {
      setActive(prev => (prev + 1) % caseStudies.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [paused])

  // Pause on user interaction, resume after 5s
  const handleUserInteract = (index) => {
    setActive(index)
    setPaused(true)
    setTimeout(() => setPaused(false), 5000)
  }

  return (
    <section style={{ padding: "100px 0", overflow: "hidden" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ display: "inline-block", padding: "6px 16px", borderRadius: 20, fontSize: 13, fontWeight: 500, color: "#0FB88E", background: "rgba(15,184,142,0.08)", border: "1px solid rgba(15,184,142,0.13)", marginBottom: 16 }}>לקוחות שלנו</div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, color: "#E4F4EE" }}>תוצאות אמיתיות מעסקים אמיתיים</h2>
        </motion.div>
      </div>

      {/* Sliding track */}
      <div
        ref={trackRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{ position: "relative", overflow: "hidden", padding: "20px 0" }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <motion.div
            animate={{ x: -(active * (440 + 24)) }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
            style={{
              display: "flex", gap: 24, width: "max-content",
            }}
          >
            {caseStudies.map((study, i) => (
              <div key={i} onClick={() => handleUserInteract(i)} style={{ width: 440, flexShrink: 0 }}>
                <CaseStudyCard study={study} isActive={i === active} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Dots + progress */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, marginTop: 36 }}>
        {caseStudies.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => handleUserInteract(i)}
            style={{
              height: 4, borderRadius: 2, border: "none", cursor: "pointer", padding: 0,
              background: "rgba(15,184,142,0.15)", position: "relative", overflow: "hidden",
              width: 48,
            }}
          >
            {i === active && (
              <motion.div
                key={`progress-${active}`}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: paused ? 99 : 3, ease: "linear" }}
                style={{
                  position: "absolute", top: 0, right: 0, bottom: 0,
                  background: "#0FB88E", borderRadius: 2,
                }}
              />
            )}
            {i !== active && (
              <div style={{
                position: "absolute", inset: 0,
                background: "rgba(15,184,142,0.15)", borderRadius: 2,
              }} />
            )}
          </motion.button>
        ))}
      </div>
    </section>
  )
}

// --- Main Component ---
export default function Home() {
  const [mobileMenu, setMobileMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" })
  const [formSent, setFormSent] = useState(false)
  const [formLoading, setFormLoading] = useState(false)

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

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
      {/* SCROLL PROGRESS BAR */}
      <motion.div style={{
        position: "fixed", top: 0, left: 0, right: 0, height: 3,
        background: "linear-gradient(90deg, #0FB88E, #0AD6A8)",
        transformOrigin: "0%", scaleX, zIndex: 100,
      }} />

      {/* PARTICLE BACKGROUND */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <ParticleField />
      </div>

      {/* NAV */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
        style={{
          position: "fixed", top: 0, right: 0, left: 0, zIndex: 50,
          padding: "12px 24px",
          background: scrolled ? "rgba(10,15,14,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(15,184,142,0.1)" : "1px solid transparent",
          transition: "background 0.3s, backdrop-filter 0.3s, border 0.3s",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}
      >
        <div style={{ cursor: "pointer" }} onClick={() => scrollTo("hero")}>
          <Logo size="sm" />
        </div>
        <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {[["services","שירותים"],["process","איך זה עובד"],["about","אודות"],["faq","שאלות נפוצות"]].map(([id,label]) => (
            <motion.button
              key={id}
              onClick={() => scrollTo(id)}
              whileHover={{ color: "#E4F4EE", y: -1 }}
              style={{
                color: "rgba(192,216,208,0.5)", fontSize: 14, background: "none", border: "none",
                cursor: "pointer", fontFamily: "inherit", padding: "8px 14px", borderRadius: 8,
              }}
            >
              {label}
            </motion.button>
          ))}
          <MagneticButton href={waLink} style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 20px",
            background: "#0FB88E", color: "#0A0F0E", borderRadius: 10, fontSize: 14,
            fontWeight: 500, fontFamily: "inherit", marginRight: 8, border: "none", cursor: "pointer",
          }}>
            <WhatsAppIcon /> דברו איתנו
          </MagneticButton>
        </div>
        <button className="mobile-menu-btn" onClick={() => setMobileMenu(!mobileMenu)} style={{
          background: "none", border: "none", cursor: "pointer", padding: 8,
          display: "none", flexDirection: "column", gap: 5,
        }}>
          <motion.span animate={{ rotate: mobileMenu ? 45 : 0, y: mobileMenu ? 7 : 0 }} style={{ width: 22, height: 2, background: "#0FB88E", borderRadius: 2, display: "block" }}/>
          <motion.span animate={{ opacity: mobileMenu ? 0 : 1 }} style={{ width: 22, height: 2, background: "#0FB88E", borderRadius: 2, display: "block" }}/>
          <motion.span animate={{ rotate: mobileMenu ? -45 : 0, y: mobileMenu ? -7 : 0 }} style={{ width: 22, height: 2, background: "#0FB88E", borderRadius: 2, display: "block" }}/>
        </button>
      </motion.nav>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed", inset: 0, zIndex: 45,
              background: "rgba(10,15,14,0.96)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8,
            }}
          >
            {[["services","שירותים"],["process","איך זה עובד"],["about","אודות"],["faq","שאלות נפוצות"]].map(([id,label], i) => (
              <motion.button
                key={id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 200 }}
                onClick={() => scrollTo(id)}
                style={{
                  background: "none", border: "none", color: "#C0D8D0", fontFamily: "inherit",
                  fontSize: 22, fontWeight: 300, cursor: "pointer", padding: "12px 24px",
                }}
              >
                {label}
              </motion.button>
            ))}
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              href={waLink} target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px",
                background: "#0FB88E", color: "#0A0F0E", borderRadius: 10, fontSize: 16,
                fontWeight: 500, fontFamily: "inherit", marginTop: 16, textDecoration: "none",
              }}
            >
              <WhatsAppIcon /> דברו איתנו
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section id="hero" style={{
        minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", padding: "120px 24px 80px", textAlign: "center", position: "relative",
        overflow: "hidden",
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.3 }}
          style={{ marginBottom: 32 }}
        >
          <Logo size="lg" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
          style={{
            fontSize: "clamp(32px, 6vw, 56px)", fontWeight: 700, color: "#E4F4EE",
            lineHeight: 1.2, maxWidth: 700, marginBottom: 20,
          }}
        >
          הזמן שלך יקר לנו
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          style={{
            fontSize: "clamp(16px, 2.5vw, 20px)", fontWeight: 300, color: "rgba(192,216,208,0.5)",
            maxWidth: 520, lineHeight: 1.7, marginBottom: 40,
          }}
        >
          אנחנו עוזרים לעסקים קטנים ובינוניים בישראל לחסוך זמן, לאטמט תהליכים, ולתת ל-AI לעבוד בשבילם
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}
        >
          <MagneticButton href={waLink} style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px",
            background: "#0FB88E", color: "#0A0F0E", borderRadius: 10, fontSize: 16, fontWeight: 500,
            border: "none", cursor: "pointer", fontFamily: "inherit", textDecoration: "none",
          }}>
            <WhatsAppIcon /> בואו נדבר
          </MagneticButton>
          <MagneticButton onClick={() => scrollTo("services")} style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px",
            background: "transparent", color: "#0FB88E", border: "1.5px solid rgba(15,184,142,0.2)",
            borderRadius: 10, fontSize: 16, fontWeight: 500, cursor: "pointer", fontFamily: "inherit",
          }}>
            <ArrowLeft size={16} /> מה אנחנו עושים
          </MagneticButton>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          style={{
            display: "flex", gap: 40, marginTop: 72, flexWrap: "wrap", justifyContent: "center",
          }}
        >
          {stats.map((s, i) => (
            <motion.div key={i} variants={fadeUp} custom={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 36, fontWeight: 700, color: "#0FB88E" }}>
                <AnimatedCounter value={s.value} suffix={s.value.includes("%") ? "%" : s.value.includes("x") ? "x" : ""} />
              </div>
              <div style={{ fontSize: 13, color: "rgba(192,216,208,0.4)", maxWidth: 180, marginTop: 4 }}>{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: "100px 24px", background: "rgba(10,15,14,0.7)", backdropFilter: "blur(1px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ display: "inline-block", padding: "6px 16px", borderRadius: 20, fontSize: 13, fontWeight: 500, color: "#0FB88E", background: "rgba(15,184,142,0.08)", border: "1px solid rgba(15,184,142,0.13)", marginBottom: 16 }}>שירותים</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, color: "#E4F4EE", marginBottom: 12 }}>בחרו את המסלול שמתאים לכם</h2>
            <p style={{ fontSize: 16, color: "rgba(192,216,208,0.4)", maxWidth: 480, margin: "0 auto" }}>בין אם אתם צריכים כיוון או פתרון מלא — יש לנו מסלול בשבילכם</p>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))", gap: 24 }}>
            {services.map((svc, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -8, boxShadow: "0 16px 48px rgba(15,184,142,0.15)", borderColor: "rgba(15,184,142,0.35)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{
                  padding: 32, borderRadius: 16, position: "relative",
                  background: svc.highlighted ? "linear-gradient(135deg, #0E1816 0%, #0A1412 100%)" : "#0E1816",
                  border: svc.highlighted ? "1.5px solid rgba(15,184,142,0.25)" : "1px solid rgba(15,184,142,0.08)",
                }}
              >
                {svc.highlighted && (
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 300, delay: 0.3 }}
                    style={{
                      position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                      background: "#0FB88E", color: "#0A0F0E", padding: "4px 16px", borderRadius: 20, fontSize: 12, fontWeight: 500,
                    }}
                  >
                    <Sparkles size={12} style={{ display: "inline", verticalAlign: -1, marginLeft: 4 }} /> הכי פופולרי
                  </motion.div>
                )}
                <div style={{ fontSize: 12, color: "#0FB88E", fontWeight: 500, marginBottom: 8, letterSpacing: 1 }}>{svc.tier}</div>
                <h3 style={{ fontSize: 24, fontWeight: 700, color: "#E4F4EE", marginBottom: 4 }}>{svc.title}</h3>
                <p style={{ fontSize: 14, color: "rgba(192,216,208,0.4)", marginBottom: 20 }}>{svc.subtitle}</p>
                <div style={{ fontSize: 16, fontWeight: 500, color: "#0FB88E", marginBottom: 24 }}>מחיר מותאם אישית</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                  {svc.features.map((f, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + j * 0.06 }}
                      style={{ display: "flex", alignItems: "flex-start", gap: 10 }}
                    >
                      <div style={{ flexShrink: 0, marginTop: 2 }}><Check size={18} color="#0FB88E" strokeWidth={2.5} /></div>
                      <span style={{ fontSize: 14, color: "#C0D8D0", lineHeight: 1.5 }}>{f}</span>
                    </motion.div>
                  ))}
                </div>
                <MagneticButton href={waLink} style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  width: "100%", padding: "14px 32px", borderRadius: 10, fontSize: 16, fontWeight: 500,
                  fontFamily: "inherit", cursor: "pointer", textDecoration: "none",
                  ...(svc.highlighted
                    ? { background: "#0FB88E", color: "#0A0F0E", border: "none" }
                    : { background: "transparent", color: "#0FB88E", border: "1.5px solid rgba(15,184,142,0.2)" }),
                }}>
                  <WhatsAppIcon /> {svc.cta}
                </MagneticButton>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" style={{ padding: "100px 24px", background: "rgba(10,15,14,0.92)", backdropFilter: "blur(2px)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ display: "inline-block", padding: "6px 16px", borderRadius: 20, fontSize: 13, fontWeight: 500, color: "#0FB88E", background: "rgba(15,184,142,0.08)", border: "1px solid rgba(15,184,142,0.13)", marginBottom: 16 }}>איך זה עובד</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, color: "#E4F4EE" }}>מעסק עמוס לעסק חכם — ב-4 צעדים</h2>
          </motion.div>
          <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "calc(100% - 56px)" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              style={{
                position: "absolute", top: 28, right: 27, width: 2, overflow: "hidden",
                background: "linear-gradient(to bottom, rgba(15,184,142,0.25), rgba(15,184,142,0.06))", borderRadius: 2,
              }}
            />
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.15, ease: [0.25, 0.4, 0.25, 1] }}
                  whileHover={{ x: -8 }}
                  style={{ display: "flex", gap: 24, alignItems: "flex-start", padding: "24px 0", position: "relative", cursor: "default" }}
                >
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    style={{
                      width: 56, height: 56, borderRadius: "50%", flexShrink: 0,
                      background: i === 3 ? "#0FB88E" : "#0E1816",
                      border: `2px solid ${i === 3 ? "#0FB88E" : "rgba(15,184,142,0.2)"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 16, fontWeight: 700, color: i === 3 ? "#0A0F0E" : "#0FB88E", zIndex: 2,
                    }}
                  >
                    {i === 3
                      ? <HourglassIcon size={28} color="#0A0F0E"/>
                      : <Icon size={22} strokeWidth={2} />
                    }
                  </motion.div>
                  <div style={{ paddingTop: 8 }}>
                    <h3 style={{ fontSize: 20, fontWeight: 700, color: "#E4F4EE", marginBottom: 6 }}>{step.title}</h3>
                    <p style={{ fontSize: 15, color: "rgba(192,216,208,0.45)", lineHeight: 1.6 }}>{step.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CASE STUDIES CAROUSEL */}
      <CaseStudyCarousel />

      {/* ABOUT */}
      <section id="about" style={{ padding: "100px 24px", background: "rgba(10,15,14,0.92)", backdropFilter: "blur(2px)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
            <div style={{ display: "inline-block", padding: "6px 16px", borderRadius: 20, fontSize: 13, fontWeight: 500, color: "#0FB88E", background: "rgba(15,184,142,0.08)", border: "1px solid rgba(15,184,142,0.13)", marginBottom: 16 }}>אודות</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, color: "#E4F4EE", marginBottom: 20 }}>הסיפור שלנו</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 12, delay: 0.2 }}
            style={{
              width: 80, height: 80, borderRadius: "50%", background: "rgba(15,184,142,0.13)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 24px",
            }}
          >
            <HourglassIcon size={36} color="#0FB88E"/>
          </motion.div>
          {[
            "ב-PNAI אנחנו עוזרים לבעלי עסקים קטנים ובינוניים בישראל להפסיק לבזבז זמן על דברים שמכונה יכולה לעשות טוב יותר.",
            "אנחנו מאמינים שטכנולוגיה צריכה לעבוד בשבילך — לא להפך. לכן כל פתרון שאנחנו מטמיעים נבנה סביב העסק שלך, הצוות שלך, והשפה שלך.",
            "לא מדובר בטכנולוגיה מסובכת. מדובר בפנאי — הזמן שאתה מרוויח בחזרה כשה-AI עובד במקומך.",
          ].map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.12 }}
              style={{ fontSize: 17, color: "rgba(192,216,208,0.65)", lineHeight: 1.8, marginBottom: 20 }}
            >
              {text}
            </motion.p>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            style={{ marginTop: 12 }}
          >
            <MagneticButton href={waLink} style={{
              display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px",
              background: "#0FB88E", color: "#0A0F0E", borderRadius: 10, fontSize: 16, fontWeight: 500,
              border: "none", cursor: "pointer", fontFamily: "inherit", textDecoration: "none",
            }}>
              <WhatsAppIcon /> בואו נכיר
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* FAQ — Radix Accordion */}
      <section id="faq" style={{ padding: "100px 24px", background: "rgba(10,15,14,0.7)", backdropFilter: "blur(1px)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ display: "inline-block", padding: "6px 16px", borderRadius: 20, fontSize: 13, fontWeight: 500, color: "#0FB88E", background: "rgba(15,184,142,0.08)", border: "1px solid rgba(15,184,142,0.13)", marginBottom: 16 }}>שאלות נפוצות</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, color: "#E4F4EE" }}>יש שאלות? יש לנו תשובות</h2>
          </motion.div>

          <Accordion.Root type="single" collapsible style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <Accordion.Item value={`faq-${i}`} style={{ borderRadius: 12, overflow: "hidden", background: "#0E1816", border: "1px solid rgba(15,184,142,0.08)" }}>
                  <Accordion.Trigger asChild>
                    <motion.button
                      whileHover={{ x: -4, borderColor: "rgba(15,184,142,0.2)" }}
                      style={{
                        width: "100%", padding: "18px 24px", display: "flex", justifyContent: "space-between", alignItems: "center",
                        background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", textAlign: "right",
                      }}
                    >
                      <span style={{ fontSize: 16, fontWeight: 500, color: "#E4F4EE" }}>{faq.q}</span>
                      <ChevronDown size={20} color="#0FB88E" style={{ flexShrink: 0, marginRight: 8, transition: "transform 0.3s" }} className="accordion-chevron" />
                    </motion.button>
                  </Accordion.Trigger>
                  <Accordion.Content className="accordion-content">
                    <div style={{ padding: "0 24px 18px", fontSize: 15, color: "rgba(192,216,208,0.5)", lineHeight: 1.7 }}>
                      {faq.a}
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              </motion.div>
            ))}
          </Accordion.Root>
        </div>
      </section>

      <style>{`
        .accordion-content {
          overflow: hidden;
        }
        .accordion-content[data-state="open"] {
          animation: slideDown 0.3s ease-out;
        }
        .accordion-content[data-state="closed"] {
          animation: slideUp 0.3s ease-out;
        }
        [data-state="open"] > .accordion-chevron {
          transform: rotate(180deg);
        }
        @keyframes slideDown {
          from { height: 0; opacity: 0; }
          to { height: var(--radix-accordion-content-height); opacity: 1; }
        }
        @keyframes slideUp {
          from { height: var(--radix-accordion-content-height); opacity: 1; }
          to { height: 0; opacity: 0; }
        }
      `}</style>

      {/* CTA */}
      <section style={{
        padding: "80px 24px", textAlign: "center",
        background: "linear-gradient(to bottom, rgba(10,15,14,0.95), rgba(14,24,22,0.98))",
      }}>
        <div style={{ maxWidth: 500, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <HourglassIcon size={48} />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 700, color: "#E4F4EE", margin: "20px 0 12px" }}
          >
            מוכנים לקבל את הזמן שלכם בחזרה?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            style={{ fontSize: 16, color: "rgba(192,216,208,0.4)", marginBottom: 32 }}
          >
            שיחה קצרה. בלי התחייבות. בואו נבדוק מה AI יכול לעשות לעסק שלכם.
          </motion.p>

          <AnimatePresence mode="wait">
            {formSent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                style={{ padding: 24, borderRadius: 12, background: "rgba(15,184,142,0.08)", border: "1px solid rgba(15,184,142,0.2)", marginBottom: 28 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                >
                  <Check size={32} color="#0FB88E" strokeWidth={2.5} />
                </motion.div>
                <p style={{ fontSize: 18, fontWeight: 600, color: "#E4F4EE", marginTop: 8 }}>תודה! קיבלנו את הפרטים</p>
                <p style={{ fontSize: 14, color: "rgba(192,216,208,0.5)", marginTop: 4 }}>ניצור איתך קשר בהקדם</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                onSubmit={async (e) => {
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
                }}
                style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28, textAlign: "start" }}
              >
                {[
                  { type: "text", placeholder: "שם מלא", key: "name" },
                  { type: "tel", placeholder: "מספר טלפון", key: "phone" },
                  { type: "email", placeholder: "אימייל", key: "email" },
                ].map((field, i) => (
                  <motion.input
                    key={field.key}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.35 + i * 0.08 }}
                    whileFocus={{ borderColor: "rgba(15,184,142,0.4)", boxShadow: "0 0 0 3px rgba(15,184,142,0.08)" }}
                    type={field.type}
                    required
                    placeholder={field.placeholder}
                    value={formData[field.key]}
                    onChange={e => setFormData({ ...formData, [field.key]: e.target.value })}
                    style={{
                      padding: "14px 18px", borderRadius: 10, border: "1px solid rgba(15,184,142,0.15)",
                      background: "#0A0F0E", color: "#E4F4EE", fontSize: 15, fontFamily: "inherit", outline: "none",
                      transition: "border-color 0.2s, box-shadow 0.2s",
                    }}
                  />
                ))}
                <MagneticButton
                  onClick={null}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px 32px",
                    background: formLoading ? "rgba(15,184,142,0.5)" : "#0FB88E", color: "#0A0F0E", borderRadius: 10,
                    fontSize: 16, fontWeight: 600, border: "none",
                    cursor: formLoading ? "wait" : "pointer", fontFamily: "inherit", marginTop: 4, width: "100%",
                  }}
                >
                  {formLoading ? "שולח..." : <><Send size={16} /> שלחו פרטים</>}
                </MagneticButton>
              </motion.form>
            )}
          </AnimatePresence>

          <p style={{ fontSize: 13, color: "rgba(192,216,208,0.3)", marginBottom: 16 }}>או דברו איתנו ישירות</p>
          <MagneticButton href={waLink} style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 40px",
            background: "transparent", color: "#0FB88E", border: "1.5px solid rgba(15,184,142,0.25)",
            borderRadius: 10, fontSize: 18, fontWeight: 500, textDecoration: "none", cursor: "pointer",
          }}>
            <WhatsAppIcon /> דברו איתנו בוואטסאפ
          </MagneticButton>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: "40px 24px", borderTop: "1px solid rgba(15,184,142,0.08)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
        background: "rgba(10,15,14,0.95)",
      }}>
        <Logo size="sm" />
        <p style={{ fontSize: 13, color: "rgba(192,216,208,0.25)" }}>הזמן שלך יקר לנו</p>
        <div style={{ display: "flex", gap: 24 }}>
          {[["services","שירותים"],["about","אודות"],["faq","שאלות"]].map(([id,label]) => (
            <motion.button
              key={id}
              onClick={() => scrollTo(id)}
              whileHover={{ color: "#C0D8D0", y: -2 }}
              style={{
                color: "rgba(192,216,208,0.35)", fontSize: 13, background: "none", border: "none",
                cursor: "pointer", fontFamily: "inherit", padding: "8px 14px", borderRadius: 8,
              }}
            >
              {label}
            </motion.button>
          ))}
        </div>
        <p style={{ fontSize: 12, color: "rgba(192,216,208,0.2)", marginTop: 12 }}>© 2026 PNAI · כל הזכויות שמורות</p>
      </footer>

      {/* FLOATING WHATSAPP */}
      <motion.a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 1.5 }}
        whileHover={{ scale: 1.15, boxShadow: "0 6px 28px rgba(37,211,102,0.4)" }}
        whileTap={{ scale: 0.9 }}
        style={{
          position: "fixed", bottom: 24, left: 24, zIndex: 100,
          width: 56, height: 56, borderRadius: "50%", background: "#25D366",
          display: "flex", alignItems: "center", justifyContent: "center", color: "white",
          boxShadow: "0 4px 20px rgba(37,211,102,0.25)",
        }}
      >
        <WhatsAppIcon />
      </motion.a>
    </>
  )
}
