import { company, serviceArea } from './company'

/**
 * The guided chat: visitors pick a question, the answer comes from what the
 * site already says. No invented prices, start dates or warranties; anything
 * that needs a real answer from Grace ends in a way to reach them.
 */

export type ChatTopic = 'expert' | 'sales'

export interface ChatQuestion {
  id: string
  question: string
  answer: string
  /** An in-site page that goes deeper, shown as a link under the answer. */
  link?: { href: string; label: string }
}

export const chatIntro = {
  greeting: `Hi! I'm the ${company.name} assistant. Pick a topic and I'll answer the most common questions.`,
  expert: { label: 'Ask an expert', hint: 'Questions about your project' },
  sales: { label: 'Talk to sales', hint: 'Consultations, quotes and next steps' },
}

export const chatQuestions: Record<ChatTopic, ChatQuestion[]> = {
  expert: [
    {
      id: 'services',
      question: 'What kind of work do you do?',
      answer:
        'Kitchen and bathroom renovations, sunrooms & interiors, interior painting, interior & exterior renovations, remodeling and home improvements, and roofing.',
      link: { href: '#/services', label: 'See all services' },
    },
    {
      id: 'roofing',
      question: 'Do you repair or replace roofs?',
      answer:
        'Both. We look at the roof first and explain plainly whether a repair or a full replacement makes sense, with a clear scope before any work starts.',
      link: { href: '#/roofing', label: 'Our roofing page' },
    },
    {
      id: 'cabinets',
      question: 'Can I keep my kitchen cabinets?',
      answer:
        'Often, yes. Sometimes a refresh with hardware, paint, and new counters delivers a big change without a full replacement.',
    },
    {
      id: 'shower',
      question: 'Can you convert a tub to a shower?',
      answer: 'Yes. We will talk through the options for your bathroom during the free consultation.',
    },
    {
      id: 'small',
      question: 'Do you take on smaller projects?',
      answer: 'Yes. We help with smaller home improvement projects as well as larger renovations.',
    },
    {
      id: 'area',
      question: 'Do you work in my area?',
      answer: `We serve ${serviceArea.slice(0, -1).join(', ')} and the rest of Central Indiana.`,
    },
  ],
  sales: [
    {
      id: 'cost',
      question: 'How much will my project cost?',
      answer:
        'Every home is different, so we do not quote blind. After a free consultation you get a clear scope and estimate for your project, with no obligation.',
    },
    {
      id: 'consultation',
      question: 'Is the consultation really free?',
      answer: 'Yes. The consultation is free and there is no pressure or obligation to go ahead.',
    },
    {
      id: 'start',
      question: 'How do I get started?',
      answer:
        'Send the short form or call us with your project details. We review what you need and walk you through the next steps.',
    },
    {
      id: 'timing',
      question: 'How soon can you start?',
      answer:
        'It depends on the project and our schedule. Tell us when you would like to start in the form, and we will confirm the timing with you.',
    },
    {
      id: 'person',
      question: 'Can I talk to someone directly?',
      answer: `Of course. Call ${company.phone} or email ${company.email}, and you will reach the Grace Renovations team.`,
    },
  ],
}
