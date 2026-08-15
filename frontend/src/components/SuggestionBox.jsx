// SCREEN 5: Suggestion Box
// Converted from the Stitch export. Changes made from the raw HTML:
//   - class -> className, style="..." -> style={{ ... }}
//   - the vanilla JS sendLetter() (DOM class toggling + setTimeout) is
//     replaced with React state driving the same "letter flies away, then
//     success card fades in" animation via the .letter-animation/.sent-state
//     classes already defined in index.css
//   - form actually submits to the backend via onSubmit(text)
//   - the old anonymous "moniker" field is replaced with the logged-in
//     user's real username, shown as a signature instead of an input
//   - "Draft Another" resets component state instead of reloading the page

import { useState } from 'react'

export default function SuggestionBox({ onSubmit, onBack, username, onNavigateGrimoire, onNavigateArchives }) {
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  async function handleSubmit(e) {
    e.preventDefault()
    if (!message.trim()) return
    setStatus('sending')
    try {
      await onSubmit(message.trim())
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  function handleDraftAnother() {
    setMessage('')
    setStatus('idle')
  }

  return (
    <div className="bg-background text-on-background min-h-[100vh] h-full flex flex-col relative overflow-hidden font-body-lg">
      <div className="absolute inset-0 z-0 h-full w-full bg-[#f4ecd8]"></div>
      <div className="suggestion-texture-overlay z-0"></div>

      <header className="relative z-10 w-full px-margin-mobile md:px-margin-desktop py-6 flex items-center gap-8">
        <button
          type="button"
          onClick={onBack}
          className="font-label-caps text-label-caps text-tertiary hover:opacity-80 transition-opacity bg-transparent"
        >
          ← The Lab
        </button>
        <button type="button" onClick={onNavigateGrimoire} className="font-label-caps text-label-caps text-on-surface-variant hover:text-tertiary transition-colors bg-transparent">
          My Grimoire
        </button>
        <button type="button" onClick={onNavigateArchives} className="font-label-caps text-label-caps text-on-surface-variant hover:text-tertiary transition-colors bg-transparent">
          Archives
        </button>
      </header>

      <main className="flex-grow flex items-center justify-center relative z-10 px-margin-mobile md:px-margin-desktop py-gutter min-h-full w-full">
        <div
          className={`journal-card suggestion-ambient-shadow max-w-2xl w-full p-8 md:p-12 relative letter-animation flex flex-col ${status === 'sent' ? 'sent-state' : ''}`}
        >
          <div className="absolute -top-12 -left-12 w-48 h-48 opacity-20 pointer-events-none transform rotate-[-15deg] mix-blend-multiply z-0">
            <img
              alt="Vintage botanical branch"
              className="w-full h-full object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFqZsdp_zMBWJczvwLGfCJzzObIHKCFI18Eeikc5rLDu2ruEwE56sNp7R790aawkaw3n8PoM6GSdbWs_PPwZJCTgHrAeW71PauqRzcEA_vQ5W8gOaaVYRJ5SL76VvzSLB7PPvYxHUguYfu9ilasZV43EjhqKxIWOQ2xzds3U7Z2Qcw_bxNO3QAavoWJWgQEuGnj5FMEBTsmqYfZNl1t6ErVQK35nVz9UoF2u1yRFqUycwQWbqd0c-XZA"
            />
          </div>

          <div className="text-center mb-10 pt-4">
            <h1 className="font-display-lg-mobile md:font-display-lg text-primary italic mb-2">Message in a Bottle</h1>
            <p className="font-body-sm text-on-surface-variant max-w-md mx-auto">
              Share your thoughts, discovered recipes, or whispered secrets with the apothecary.
            </p>
          </div>

          <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
            <p className="font-body-sm text-on-surface-variant italic">
              Sealed under the moniker, <span className="text-tertiary font-bold not-italic">{username}</span>
            </p>

            <div className="flex flex-col gap-1 flex-grow">
              <label className="font-label-caps text-label-caps text-on-surface-variant mb-1" htmlFor="message">
                The Missive
              </label>
              <textarea
                className="input-line font-handwritten text-3xl text-on-background py-1 resize-none leading-relaxed"
                id="message"
                placeholder="Transcribe your message here..."
                required
                rows={4}
                style={{ lineHeight: '2.5rem', background: 'transparent' }}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <div className="mt-4 flex justify-center pb-4">
              <button className="relative group focus:outline-none" type="submit" disabled={status === 'sending'}>
                <div className="wax-seal w-28 h-28 text-[#f0e6d2]">
                  <div className="wax-seal-inner">
                    <span className="font-label-caps text-[11px] leading-tight text-center font-bold tracking-wider opacity-90 drop-shadow-md">
                      {status === 'sending' ? 'SEALING…' : (
                        <>SEAL<br /><span className="text-[14px] font-normal font-quote-main italic">&amp;</span><br />SEND</>
                      )}
                    </span>
                  </div>
                </div>
              </button>
            </div>
          </form>

          {status === 'error' && (
            <p className="text-center text-error font-body-sm">the bottle didn't seal — try again</p>
          )}

          <div className="absolute -bottom-12 right-12 transform rotate-[-8deg] font-handwritten text-2xl text-tertiary opacity-80 pointer-events-none select-none drop-shadow-sm">
            ~ Handle with care ~
          </div>
          <div className="absolute -bottom-16 -right-16 w-56 h-56 opacity-20 pointer-events-none transform rotate-[165deg] mix-blend-multiply z-0">
            <img
              alt="Vintage botanical branch"
              className="w-full h-full object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFqZsdp_zMBWJczvwLGfCJzzObIHKCFI18Eeikc5rLDu2ruEwE56sNp7R790aawkaw3n8PoM6GSdbWs_PPwZJCTgHrAeW71PauqRzcEA_vQ5W8gOaaVYRJ5SL76VvzSLB7PPvYxHUguYfu9ilasZV43EjhqKxIWOQ2xzds3U7Z2Qcw_bxNO3QAavoWJWgQEuGnj5FMEBTsmqYfZNl1t6ErVQK35nVz9UoF2u1yRFqUycwQWbqd0c-XZA"
            />
          </div>
        </div>

        {status === 'sent' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
            <div className="journal-card suggestion-ambient-shadow p-8 text-center max-w-md bg-[#f9f6ef]">
              <span className="material-symbols-outlined text-4xl text-tertiary mb-4" style={{ fontVariationSettings: "'FILL' 0" }}>
                history_edu
              </span>
              <h2 className="font-headline-md text-headline-md text-primary mb-2">Safely Stowed</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Your message has been sealed and sent to the archives. Return to your journey.
              </p>
              <div className="flex gap-3 justify-center mt-6">
                <button
                  className="font-label-caps text-label-caps text-tertiary border border-tertiary px-6 py-2 rounded hover:bg-[#e8dec7] transition-colors"
                  onClick={handleDraftAnother}
                >
                  Draft Another
                </button>
                <button
                  className="font-label-caps text-label-caps text-on-surface-variant px-6 py-2 rounded hover:bg-[#e8dec7] transition-colors"
                  onClick={onBack}
                >
                  Back to the Potion
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
