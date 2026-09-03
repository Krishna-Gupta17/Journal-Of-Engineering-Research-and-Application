'use client'
import { useState } from 'react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { Mail, Globe, Clock, CheckCircle, Send, MapPin } from 'lucide-react'

const contactTypes = ['General Inquiry', 'Manuscript Submission Help', 'Editorial Decision Query', 'Reviewer / Board Member Application', 'Technical Issue', 'Ethics Concern (Confidential)', 'Indexing / Metadata Query', 'Other']

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', institution: '', subject: '', type: '', message: '' })
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSent(true) }

  if (sent) {
    return (
      <PageWrapper title="Message Sent" breadcrumbs={[{ label: 'Contact Us' }]}>
        <div className="max-w-md mx-auto text-center py-16">
          <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-navy-700 dark:text-white mb-3">Message Received</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Thank you for contacting JERA. The editorial office will respond within <strong>2–3 working days</strong>.</p>
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper title="Contact Us" subtitle="Reach the JERA editorial office" breadcrumbs={[{ label: 'Contact Us' }]}>
      <div className="max-w-5xl">
        <div className="grid lg:grid-cols-3 gap-8">

          <aside className="lg:col-span-1 space-y-5">
            {/* Editor contact */}
            <div className="card p-5">
              <h2 className="font-semibold text-sm text-navy-700 dark:text-white mb-4">Editorial Office</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-ocean-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-0.5">General Inquiries</p>
                    <a href="mailto:editor@jera-journal.org" className="text-xs text-ocean-500 hover:underline">editor@jera-journal.org</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-0.5">Ethics Concerns (Confidential)</p>
                    <a href="mailto:ethics@jera-journal.org" className="text-xs text-ocean-500 hover:underline">ethics@jera-journal.org</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-0.5">Response Time</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">2–3 working days (Mon–Fri)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Editors in chief */}
            <div className="card p-5">
              <h3 className="font-semibold text-sm text-navy-700 dark:text-white mb-3">Editors-in-Chief</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">Prof. S. Anbukumar</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Hydraulic & Fluid Engineering</p>
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5"><MapPin className="w-2.5 h-2.5" />DTU, Delhi</p>
                  <a href="mailto:sanbukumar@dce.ac.in" className="text-xs text-ocean-500 hover:underline">sanbukumar@dce.ac.in</a>
                </div>
                <div className="pt-3 border-t border-gray-100 dark:border-navy-800">
                  <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">Dr. Ritu Raj</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Structural & Wind Engineering</p>
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5"><MapPin className="w-2.5 h-2.5" />DTU, Delhi</p>
                  <a href="mailto:rituraj@dtu.ac.in" className="text-xs text-ocean-500 hover:underline">rituraj@dtu.ac.in</a>
                </div>
              </div>
            </div>

            {/* Key editors */}
            <div className="card p-5">
              <h3 className="font-semibold text-sm text-navy-700 dark:text-white mb-3">Editors</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">Dr. Abhishek Prakash Paswan</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Geotechnical Engineering · MMMUT Gorakhpur</p>
                  <a href="mailto:appce@mmmut.ac.in" className="text-xs text-ocean-500 hover:underline">appce@mmmut.ac.in</a>
                </div>
                <div className="pt-2 border-t border-gray-100 dark:border-navy-800">
                  <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">Dr. Rahul Kumar Meena</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Structural & Wind Engineering · NIT Delhi</p>
                  <a href="mailto:rahulmeena@nitdelhi.ac.in" className="text-xs text-ocean-500 hover:underline">rahulmeena@nitdelhi.ac.in</a>
                </div>
              </div>
            </div>

            <div className="card p-4 text-xs text-gray-500 dark:text-gray-400 space-y-1.5">
              <p className="font-semibold text-gray-700 dark:text-gray-300">Before contacting us:</p>
              <p>→ Check <a href="/faqs" className="text-ocean-500 hover:underline">FAQs</a> for quick answers</p>
              <p>→ Allow 7 days before querying submission status</p>
              <p>→ Include your manuscript tracking number</p>
            </div>
          </aside>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="card p-6">
              <h2 className="font-serif text-lg font-bold text-navy-700 dark:text-white mb-5">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Full Name *</label>
                    <input type="text" required value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))} placeholder="Dr. / Prof. Your Name" className="w-full px-3 py-2.5 text-sm border border-gray-300 dark:border-navy-600 rounded-md bg-white dark:bg-navy-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ocean-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Email Address *</label>
                    <input type="email" required value={form.email} onChange={e => setForm(p => ({...p, email: e.target.value}))} placeholder="name@institution.edu" className="w-full px-3 py-2.5 text-sm border border-gray-300 dark:border-navy-600 rounded-md bg-white dark:bg-navy-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ocean-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Institution / Organisation</label>
                  <input type="text" value={form.institution} onChange={e => setForm(p => ({...p, institution: e.target.value}))} placeholder="University or Organisation" className="w-full px-3 py-2.5 text-sm border border-gray-300 dark:border-navy-600 rounded-md bg-white dark:bg-navy-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ocean-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Inquiry Type *</label>
                  <select required value={form.type} onChange={e => setForm(p => ({...p, type: e.target.value}))} className="w-full px-3 py-2.5 text-sm border border-gray-300 dark:border-navy-600 rounded-md bg-white dark:bg-navy-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ocean-500">
                    <option value="">Select inquiry type...</option>
                    {contactTypes.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Subject *</label>
                  <input type="text" required value={form.subject} onChange={e => setForm(p => ({...p, subject: e.target.value}))} placeholder="Brief subject" className="w-full px-3 py-2.5 text-sm border border-gray-300 dark:border-navy-600 rounded-md bg-white dark:bg-navy-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ocean-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Message *</label>
                  <textarea required rows={6} value={form.message} onChange={e => setForm(p => ({...p, message: e.target.value}))} placeholder="Please include your manuscript tracking number if enquiring about a submission..." className="w-full px-3 py-2.5 text-sm border border-gray-300 dark:border-navy-600 rounded-md bg-white dark:bg-navy-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ocean-500 resize-none" />
                </div>
                <button type="submit" className="btn-primary w-full justify-center text-sm py-3">
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
