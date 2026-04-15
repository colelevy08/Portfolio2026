import { motion } from 'framer-motion'
import { useForm, ValidationError } from '@formspree/react'
import { Mail, Phone, CheckCircle2, ArrowRight } from 'lucide-react'
import { profile } from '../data/content'

export default function Contact() {
  const [state, handleSubmit] = useForm(profile.formspreeId)

  return (
    <section id="contact" className="relative px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="card-gradient-border overflow-hidden rounded-3xl p-6 sm:p-8"
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Let's build something.
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Got a project or a role? Drop a line — I reply fast.
              </p>

              <div className="mt-5 space-y-2 text-sm">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-2 text-slate-200 hover:text-white"
                >
                  <Mail size={14} className="text-accent-2" />
                  {profile.email}
                </a>
                <a
                  href={`tel:${profile.phone}`}
                  className="flex items-center gap-2 text-slate-200 hover:text-white"
                >
                  <Phone size={14} className="text-accent-2" />
                  {profile.phoneDisplay}
                </a>
              </div>
            </div>

            <div>
              {state.succeeded ? (
                <div className="flex h-full flex-col items-center justify-center gap-2 rounded-2xl bg-white/5 p-6 text-center">
                  <CheckCircle2 size={32} className="text-accent-2" />
                  <h3 className="text-base font-semibold">Message sent — thanks!</h3>
                  <p className="text-sm text-slate-400">I'll get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    placeholder="your@email.com"
                    aria-label="Email"
                    className="w-full rounded-lg border border-white/10 bg-ink-elevated px-4 py-2.5 text-sm text-slate-100 outline-none transition-colors focus:border-accent-2/70"
                  />
                  <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                    className="text-xs text-red-400"
                  />
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={3}
                    placeholder="What's on your mind?"
                    aria-label="Message"
                    className="w-full resize-none rounded-lg border border-white/10 bg-ink-elevated px-4 py-2.5 text-sm text-slate-100 outline-none transition-colors focus:border-accent-2/70"
                  />
                  <ValidationError
                    prefix="Message"
                    field="message"
                    errors={state.errors}
                    className="text-xs text-red-400"
                  />
                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-5 py-2.5 text-sm font-semibold text-ink shadow-md shadow-accent/30 transition-transform hover:scale-[1.02] disabled:opacity-60"
                  >
                    {state.submitting ? 'Sending…' : 'Send message'}
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
