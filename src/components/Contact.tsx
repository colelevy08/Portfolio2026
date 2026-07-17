import { motion } from 'framer-motion'
import { useForm, ValidationError } from '@formspree/react'
import type { SubmissionError, FieldValues } from '@formspree/core'
import { ArrowUpRight } from 'lucide-react'
import { contactSuccess, profile, sections } from '../data/content'
import SectionHead from './SectionHead'

type FormErrors = SubmissionError<FieldValues> | null

export default function Contact() {
  const [state, handleSubmit] = useForm(profile.formspreeId)

  return (
    // Extra bottom padding on mobile keeps the floating Portmint widget from
    // covering the submit button.
    <section id="contact" className="relative px-4 pt-20 pb-36 sm:px-6 sm:py-28">
      <div>
        <SectionHead h={sections.contact} />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="overflow-hidden rounded-lg border border-line bg-bg-2"
        >
          {/* Awning-canvas piping across the card's top edge. */}
          <div className="piping" aria-hidden="true" />
          <div className="grid grid-cols-12 gap-y-12 gap-x-6 p-7 sm:p-10">
          {/* Direct channels */}
          <div className="col-span-12 sm:col-span-5 lg:col-span-4">
            <p className="eyebrow mb-6">Direct</p>
            <dl className="space-y-5">
              <Channel
                label="Email"
                value={profile.email}
                href={`mailto:${profile.email}`}
              />
              <Channel
                label="Phone"
                value={profile.phoneDisplay}
                href={`tel:${profile.phone}`}
              />
              <Channel
                label="LinkedIn"
                value="in/colelevy"
                href={profile.socials.linkedin}
                external
              />
              <Channel
                label="GitHub"
                value="@colelevy08"
                href={profile.socials.github}
                external
              />
              <Channel
                label="Telegram"
                value="@colelevy"
                href={profile.socials.telegram}
                external
              />
              <Channel
                label="WhatsApp"
                value={profile.phoneDisplay}
                href={profile.socials.whatsapp}
                external
              />
            </dl>
          </div>

          {/* Form */}
          <div className="col-span-12 sm:col-span-7 lg:col-span-7 lg:col-start-6">
            <p className="eyebrow mb-6">Or write here</p>
            {state.succeeded ? (
              // The win ticket — punched the moment the message lands.
              <motion.div
                initial={{ opacity: 0, scale: 0.92, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: -1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                className="relative max-w-md rounded-lg border-2 border-dashed border-line-2 bg-bg px-6 py-5"
              >
                {/* the punch — a hole clipped through the ticket */}
                <span
                  aria-hidden="true"
                  className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border-2 border-dashed border-line-2 bg-bg-2"
                />
                <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-muted">
                  {contactSuccess.header}
                </p>
                <h3 className="font-display mt-3 text-3xl text-accent">
                  {contactSuccess.headline}
                </h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-ink-2">
                  {contactSuccess.body}
                </p>
                <div className="mt-4 border-t border-line pt-3 font-mono text-[9px] uppercase tracking-[0.24em] text-muted">
                  {contactSuccess.footer}
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <Field
                  id="email"
                  label="Your email"
                  type="email"
                  name="email"
                  required
                  placeholder="you@domain.com"
                  errors={state.errors}
                />
                <Field
                  id="message"
                  label="Message"
                  textarea
                  name="message"
                  required
                  placeholder="Project, role, idea — whatever it is."
                  errors={state.errors}
                />
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="group inline-flex items-center gap-3 rounded-md bg-awning px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-bg-2 transition-colors hover:bg-[#a92c22] disabled:opacity-50"
                >
                  {state.submitting ? 'Sending…' : 'Send message'}
                  <ArrowUpRight
                    size={14}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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

function Channel({
  label,
  value,
  href,
  external,
}: {
  label: string
  value: string
  href: string
  external?: boolean
}) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
        {label}
      </dt>
      <dd className="mt-1">
        <a
          href={href}
          {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
          className="group inline-flex items-center gap-1.5 font-serif text-lg tracking-tight text-ink hover:text-accent transition-colors sm:text-xl"
        >
          {value}
          {external && (
            <ArrowUpRight
              size={13}
              className="text-muted transition-colors group-hover:text-accent"
            />
          )}
        </a>
      </dd>
    </div>
  )
}

type FieldProps = {
  id: string
  label: string
  name: string
  required?: boolean
  placeholder?: string
  type?: string
  textarea?: boolean
  errors?: FormErrors
}

function Field({
  id,
  label,
  name,
  required,
  placeholder,
  type = 'text',
  textarea,
  errors,
}: FieldProps) {
  const fieldClasses =
    'w-full bg-transparent border-b border-line-2 py-3 text-[15px] text-ink placeholder:text-muted outline-none transition-colors focus:border-accent'
  return (
    <div>
      <label
        htmlFor={id}
        className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted mb-1"
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          name={name}
          required={required}
          placeholder={placeholder}
          rows={4}
          className={`${fieldClasses} resize-none`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className={fieldClasses}
        />
      )}
      <ValidationError
        prefix={label}
        field={name}
        errors={errors ?? null}
        className="mt-1 block font-mono text-[10px] uppercase tracking-[0.18em] text-awning"
      />
    </div>
  )
}
