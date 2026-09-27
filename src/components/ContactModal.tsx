import React, { useState } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledDiscipline?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  prefilledDiscipline,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [discipline, setDiscipline] = useState(prefilledDiscipline || 'Full Stack Development');
  const [budget, setBudget] = useState('$10k - $25k');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    try {
      setSubmitting(true);
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          company,
          discipline,
          budget,
          message,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          onClose();
        }, 2500);
      }
    } catch (err) {
      console.error('Error submitting inquiry:', err);
      // Fallback
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 2500);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#151c27]/70 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white dark:bg-[#111722] rounded-2xl shadow-2xl border border-[#e5e7eb] dark:border-[#1f2937] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#e5e7eb] dark:border-[#1f2937] flex items-center justify-between">
          <div className="flex flex-col">
            <h3 className="font-['Manrope'] text-lg font-bold text-[#151c27] dark:text-white">
              Initiate Collaboration
            </h3>
            <p className="text-xs text-[#6b7280] dark:text-[#94a3b8]">
              Direct channel to Shafee Alam / MSDev Studio
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        {submitted ? (
          <div className="p-8 text-center flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">check_circle</span>
            </div>
            <h4 className="font-['Manrope'] text-lg font-bold text-[#151c27] dark:text-white">
              Inquiry Dispatched!
            </h4>
            <p className="text-xs text-slate-500 max-w-xs">
              Thank you for reaching out. Shafee will review your architecture brief and reply
              within 24 business hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-4 no-scrollbar">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Lin"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-10 px-3 text-xs rounded-xl bg-[#f8fafc] dark:bg-[#161f2e] border border-[#e5e7eb] dark:border-[#222d3d] text-[#151c27] dark:text-white focus:outline-hidden focus:border-[#2563eb]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. sarah@digibazar.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-10 px-3 text-xs rounded-xl bg-[#f8fafc] dark:bg-[#161f2e] border border-[#e5e7eb] dark:border-[#222d3d] text-[#151c27] dark:text-white focus:outline-hidden focus:border-[#2563eb]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Company / Organization
                </label>
                <input
                  type="text"
                  placeholder="e.g. Horizon Labs"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full h-10 px-3 text-xs rounded-xl bg-[#f8fafc] dark:bg-[#161f2e] border border-[#e5e7eb] dark:border-[#222d3d] text-[#151c27] dark:text-white focus:outline-hidden focus:border-[#2563eb]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Discipline of Interest
                </label>
                <select
                  value={discipline}
                  onChange={(e) => setDiscipline(e.target.value)}
                  className="w-full h-10 px-2 text-xs rounded-xl bg-[#f8fafc] dark:bg-[#161f2e] border border-[#e5e7eb] dark:border-[#222d3d] text-[#151c27] dark:text-white focus:outline-hidden focus:border-[#2563eb]"
                >
                  <option value="Full Stack Development">Full Stack Development</option>
                  <option value="Web Design">Web Design & Systems</option>
                  <option value="Poster Design">Poster Design</option>
                  <option value="Product Ad Design">Product Ad Design</option>
                  <option value="PPT Design">PPT & Pitch Decks</option>
                  <option value="Infographics">Infographics & Data Vis</option>
                  <option value="Technical Architecture Review">
                    Technical Architecture Review
                  </option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Estimated Budget Bracket
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['$5k - $10k', '$10k - $25k', '$25k+'].map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBudget(b)}
                    className={`py-2 text-xs rounded-lg border font-semibold transition-all ${
                      budget === b
                        ? 'bg-[#2563eb] text-white border-[#2563eb]'
                        : 'bg-[#f8fafc] dark:bg-[#161f2e] text-slate-600 dark:text-slate-300 border-[#e5e7eb] dark:border-[#222d3d]'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Project Overview & Challenge *
              </label>
              <textarea
                rows={3}
                required
                placeholder="Describe your timeline, targets, and key challenges..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 text-xs rounded-xl bg-[#f8fafc] dark:bg-[#161f2e] border border-[#e5e7eb] dark:border-[#222d3d] text-[#151c27] dark:text-white focus:outline-hidden focus:border-[#2563eb] leading-relaxed"
              />
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-[#f1f5f9] dark:border-[#1e293b]">
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-teal-600 dark:text-teal-400 font-semibold"
              >
                <span className="material-symbols-outlined text-[17px]">chat</span>
                <span>WhatsApp instead</span>
              </a>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="h-10 px-5 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold transition-all shadow-xs disabled:opacity-50"
                >
                  {submitting ? 'Dispatching...' : 'Send Inquiry'}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
