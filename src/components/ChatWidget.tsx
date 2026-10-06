import { useEffect, useRef, useState } from 'react'
import lion from '../assets/grace-lion.webp'
import { chatIntro, chatQuestions, type ChatQuestion, type ChatTopic } from '../data/chat'
import { company } from '../data/company'
import './ChatWidget.css'

/** How long a visitor stays before the chat offers to help, and the session flag that keeps it to once. */
const TEASE_AFTER_MS = 15000
/** If the teaser is left alone this long, the chat opens on its own to start the conversation. */
const AUTO_OPEN_AFTER_MS = 10000
const TEASED_KEY = 'grace-chat-teased'
/** A short "typing" pause before each answer, so the reply reads as a reply. */
const TYPING_MS = 650

type Message = { from: 'bot' | 'user'; text: string; link?: ChatQuestion['link'] }
type Step = 'topics' | 'questions' | 'answered'

const session = {
  get: (key: string) => {
    try {
      return sessionStorage.getItem(key)
    } catch {
      return null
    }
  },
  set: (key: string) => {
    try {
      sessionStorage.setItem(key, '1')
    } catch {
      // Storage blocked: the teaser may show again on the next page load
    }
  },
}

/** Something else is already open over the page (the form or a project story). */
const overlayOpen = () => document.body.style.overflow === 'hidden'

/**
 * Guided chat: a launcher in the corner that, after a visitor has been on the
 * site for a while, offers "Ask an expert" or "Talk to sales". Visitors pick
 * from common questions; every answer ends with a way to book a free
 * consultation, call or email. No free text and no server: the answers are the
 * site's own content (see data/chat.ts).
 */
export function ChatWidget({ onConsult }: { onConsult: () => void }) {
  const [open, setOpen] = useState(false)
  const [teaser, setTeaser] = useState(false)
  const [topic, setTopic] = useState<ChatTopic | null>(null)
  const [step, setStep] = useState<Step>('topics')
  const [typing, setTyping] = useState(false)
  const [messages, setMessages] = useState<Message[]>([{ from: 'bot', text: chatIntro.greeting }])
  const logRef = useRef<HTMLDivElement>(null)
  const timers = useRef<number[]>([])

  // Offer help once per visit, after the visitor has stayed a while and nothing else is open
  useEffect(() => {
    if (session.get(TEASED_KEY)) return
    let id = window.setTimeout(function tryTease() {
      if (overlayOpen() || document.hidden) {
        id = window.setTimeout(tryTease, 3000)
        return
      }
      session.set(TEASED_KEY)
      setTeaser(true)
    }, TEASE_AFTER_MS)
    return () => window.clearTimeout(id)
  }, [])

  // Teaser ignored for a while: open the chat at the topic choice (not if dismissed, or under another overlay)
  useEffect(() => {
    if (!teaser || open) return
    const id = window.setTimeout(() => {
      if (overlayOpen() || document.hidden) return
      setTeaser(false)
      setOpen(true)
    }, AUTO_OPEN_AFTER_MS)
    return () => window.clearTimeout(id)
  }, [teaser, open])

  // Newest message in view
  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing, step])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), [])

  /** Adds the visitor's choice, then the bot's reply after a short typing pause. */
  const say = (userText: string, reply: Omit<Message, 'from'>, next: Step) => {
    setMessages((m) => [...m, { from: 'user', text: userText }])
    setTyping(true)
    timers.current.push(
      window.setTimeout(() => {
        setTyping(false)
        setMessages((m) => [...m, { from: 'bot', ...reply }])
        setStep(next)
      }, TYPING_MS),
    )
  }

  const openChat = (startTopic?: ChatTopic) => {
    session.set(TEASED_KEY)
    setTeaser(false)
    setOpen(true)
    if (startTopic) chooseTopic(startTopic)
  }

  const chooseTopic = (t: ChatTopic) => {
    setTopic(t)
    setStep('questions')
    say(
      chatIntro[t].label,
      { text: t === 'expert' ? 'Sure. What would you like to know?' : 'Happy to help. What can I answer for you?' },
      'questions',
    )
  }

  const chooseQuestion = (q: ChatQuestion) => {
    setStep('answered')
    say(q.question, { text: q.answer, link: q.link }, 'answered')
  }

  const consult = () => {
    setOpen(false)
    onConsult()
  }

  const otherTopic: ChatTopic = topic === 'expert' ? 'sales' : 'expert'

  return (
    <div className="chat">
      {teaser && !open && (
        <div className="chat-teaser" role="dialog" aria-label="Need help?">
          <button type="button" className="chat-teaser-close" aria-label="Dismiss" onClick={() => setTeaser(false)}>
            ×
          </button>
          <p className="chat-teaser-title">Have a question about your project?</p>
          <p className="chat-teaser-sub">Quick answers, or a free consultation.</p>
          <div className="chat-teaser-actions">
            <button type="button" className="chat-pick chat-pick-primary" onClick={() => openChat('expert')}>
              {chatIntro.expert.label}
            </button>
            <button type="button" className="chat-pick" onClick={() => openChat('sales')}>
              {chatIntro.sales.label}
            </button>
          </div>
        </div>
      )}

      {open && (
        <section className="chat-panel" role="dialog" aria-label="Grace Renovations assistant">
          <header className="chat-head">
            <img src={lion} alt="" className="chat-avatar" />
            <div>
              <p className="chat-head-title">{company.name}</p>
              <p className="chat-head-sub">Quick answers · Central Indiana</p>
            </div>
            <button type="button" className="chat-close" aria-label="Close chat" onClick={() => setOpen(false)}>
              ×
            </button>
          </header>

          <div className="chat-log" ref={logRef} aria-live="polite">
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg chat-msg-${m.from}`}>
                <p>{m.text}</p>
                {m.link && (
                  <a href={m.link.href} className="chat-msg-link" onClick={() => setOpen(false)}>
                    {m.link.label} →
                  </a>
                )}
              </div>
            ))}
            {typing && (
              <div className="chat-msg chat-msg-bot chat-typing" aria-label="Typing">
                <span />
                <span />
                <span />
              </div>
            )}

            {!typing && (
              <div className="chat-options">
                {step === 'topics' &&
                  (['expert', 'sales'] as const).map((t) => (
                    <button key={t} type="button" className="chat-pick chat-pick-topic" onClick={() => chooseTopic(t)}>
                      <strong>{chatIntro[t].label}</strong>
                      <span>{chatIntro[t].hint}</span>
                    </button>
                  ))}

                {step === 'questions' &&
                  topic &&
                  chatQuestions[topic].map((q) => (
                    <button key={q.id} type="button" className="chat-pick" onClick={() => chooseQuestion(q)}>
                      {q.question}
                    </button>
                  ))}

                {step === 'answered' && topic && (
                  <>
                    <button type="button" className="chat-pick chat-pick-primary" onClick={consult}>
                      Schedule a free consultation
                    </button>
                    <a className="chat-pick" href={company.phoneHref}>
                      Call {company.phone}
                    </a>
                    <a className="chat-pick" href={company.emailHref}>
                      Email us
                    </a>
                    <button type="button" className="chat-pick chat-pick-quiet" onClick={() => setStep('questions')}>
                      Ask another question
                    </button>
                    <button type="button" className="chat-pick chat-pick-quiet" onClick={() => chooseTopic(otherTopic)}>
                      {chatIntro[otherTopic].label} instead
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      <button
        type="button"
        className={`chat-launcher ${open ? 'is-open' : ''}`}
        aria-expanded={open}
        aria-label={open ? 'Close chat' : 'Questions? Chat with us'}
        onClick={() => (open ? setOpen(false) : openChat())}
      >
        {open ? (
          <span className="chat-launcher-x" aria-hidden="true">
            ×
          </span>
        ) : (
          <>
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path
                fill="currentColor"
                d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 4v-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"
              />
              <circle cx="8" cy="11" r="1.3" className="chat-launcher-dot" />
              <circle cx="12" cy="11" r="1.3" className="chat-launcher-dot" />
              <circle cx="16" cy="11" r="1.3" className="chat-launcher-dot" />
            </svg>
            <span className="chat-launcher-label">Questions?</span>
          </>
        )}
      </button>
    </div>
  )
}
