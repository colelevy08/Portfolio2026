import { motion } from 'framer-motion'
import { useForm, ValidationError } from '@formspree/react'
import { Mail, Phone, CheckCircle2, ArrowRight } from 'lucide-react'
import { profile } from '../data/content'

export default function Contact() {
  const [state, handleSubmit] = useForm(profile.formspreeId)

  return (
    <section id="contact" className="relative px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="card-gradient-border overflow-hidden rounded-3xl p-8 sm:p-10"
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                <span className="font-mono text-accent-2">03.</span> Say hello
              </h2>
              <p className="mt-3 text-slate-400">
                Got a project, a role, or just want to chat? Drop a line — I
                reply fast.
              </p>

              <div className="mt-6 space-y-2 text-sm">
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
                <div className="flex h-full flex-col items-center justify-center gap-3 rounded-2xl bg-white/5 p-8 text-center">
                  <CheckCircle2 size={36} className="text-accent-2" />
                  <h3 className="text-lg font-semibold">Message sent — thanks!</h3>
                  <p className="text-sm text-slate-400">
                    I'll get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="sr-only">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      placeholder="your@email.com"
                      className="w-full rounded-lg border border-white/10 bg-ink-elevated px-4 py-3 text-sm text-slate-100 outline-none transition-colors focus:border-accent-2/70"
                    />
                    <ValidationError
                      prefix="Email"
                      field="email"
                      errors={state.errors}
                      className="mt-1 text-xs text-red-400"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="sr-only">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      placeholder="Tell me what you're thinking about…"
                      className="w-full resize-none rounded-lg border border-white/10 bg-ink-elevated px-4 py-3 text-sm text-slate-100 outline-none transition-colors focus:border-accent-2/70"
                    />
                    <ValidationError
                      prefix="Message"
                      field="message"
                      errors={state.errors}
                      className="mt-1 text-xs text-red-400"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-5 py-3 text-sm font-semibold text-ink shadow-lg shadow-accent/30 transition-transform hover:scale-[1.02] disabled:opacity-60"
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
