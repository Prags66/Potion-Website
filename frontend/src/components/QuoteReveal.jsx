// SCREEN 2: Quote Reveal
// Converted from the Stitch export. Changes made from the raw HTML:
//   - class -> className, viewbox -> viewBox (SVG attr is case-sensitive in JSX)
//   - the hardcoded quote text is replaced with {quote.text} from the backend
//   - "Save to Grimoire" button now calls onFavorite(quote._id), and shows
//     "Saved" once isFavorited is true
//   - "Dip the Quill" (new potion) button now calls onNewPotion, which
//     re-triggers fetching another quote instead of doing nothing
//   - added a "Copy Quote" button (not from the Stitch export) using the
//     clipboard API, with a brief "Copied!" confirmation state

import { useState } from 'react'

export default function QuoteReveal({ quote, loading, error, onFavorite, isFavorited, onNewPotion, onOpenModal }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(quote.text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API can fail on non-HTTPS or unsupported browsers — fail silently
    }
  }

  if (loading) {
    return (
      <main className="flex-grow flex flex-col items-center justify-center py-12 px-margin-mobile md:px-margin-desktop relative z-10 w-full max-w-container-max mx-auto min-h-[80vh]">
        <p className="font-handwritten text-3xl text-tertiary-fixed">summoning wisdom…</p>
      </main>
    )
  }

  if (error) {
    return (
      <main className="flex-grow flex flex-col items-center justify-center py-12 px-margin-mobile md:px-margin-desktop relative z-10 w-full max-w-container-max mx-auto min-h-[80vh]">
        <p className="font-handwritten text-3xl text-tertiary-fixed">the potion fizzled — try again</p>
      </main>
    )
  }

  if (!quote) return null

  return (
    <div className="bg-inverse-surface text-inverse-on-surface antialiased min-h-screen flex flex-col overflow-x-hidden relative">
      <div className="absolute inset-0 bg-texture -z-10 pointer-events-none"></div>

      <header className="w-full top-0 bg-transparent py-unit z-20">
        <div className="max-w-container-max mx-auto flex justify-between items-center px-margin-mobile md:px-margin-desktop">
          <div className="font-display-lg text-display-lg-mobile md:text-display-lg text-tertiary-fixed italic">Life's Potion</div>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center py-12 px-margin-mobile md:px-margin-desktop relative z-10 w-full max-w-container-max mx-auto min-h-[80vh]">
        <img
          alt="Alchemical notes"
          className="absolute top-4 right-4 md:right-12 w-40 md:w-64 h-auto transform rotate-6 opacity-70 mix-blend-multiply z-0 hidden md:block"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmYQwDfypB5onqlDq4wbpq0Vh2ymKY0e4uHge2aSnieQwTXjyaISbHDXG2huGmxpvfiN91UvHPA9mmPHBj_jEQM7ixwQ1W6kU-a_aTIqA4VaIxvQ-khfi8yTF2T4vRCunvPMdKs3Q9dJvP7nOjqcZm9qpAscc0qMuWWDkSZABZc_P0YeeD8rcvojM9PMZK8XR8cYs09FlV8NNecD6QqbdiYmhC4Lk7mWrtcfRar6A9CagUPW7epSmZnw"
        />
        <img
          alt="Botanical sage branch"
          className="absolute bottom-10 left-4 md:left-16 w-32 md:w-56 h-auto transform -rotate-12 opacity-60 mix-blend-multiply z-0 hidden md:block"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFqZsdp_zMBWJczvwLGfCJzzObIHKCFI18Eeikc5rLDu2ruEwE56sNp7R790aawkaw3n8PoM6GSdbWs_PPwZJCTgHrAeW71PauqRzcEA_vQ5W8gOaaVYRJ5SL76VvzSLB7PPvYxHUguYfu9ilasZV43EjhqKxIWOQ2xzds3U7Z2Qcw_bxNO3QAavoWJWgQEuGnj5FMEBTsmqYfZNl1t6ErVQK35nVz9UoF2u1yRFqUycwQWbqd0c-XZA"
        />

        <div className="relative w-full max-w-2xl mt-12 md:mt-16 mx-auto parchment-burnt p-8 md:p-16 flex flex-col items-center justify-center text-center overflow-hidden z-20">
          <div className="coffee-stain-1"></div>
          <div className="coffee-stain-2"></div>

          <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-tertiary opacity-40 rounded-tl-lg z-10"></div>
          <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-tertiary opacity-40 rounded-tr-lg z-10"></div>
          <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-tertiary opacity-40 rounded-bl-lg z-10"></div>
          <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-tertiary opacity-40 rounded-br-lg z-10"></div>

          <div className="relative z-20 w-full">
            <p
              className={`${quote.lang === 'hi' || quote.lang === 'ur' ? 'font-devanagari text-3xl md:text-4xl lg:text-5xl' : 'font-handwritten text-4xl md:text-5xl lg:text-6xl'} text-on-surface leading-tight mb-12 tracking-wide text-balance font-bold drop-shadow-sm`}
            >
              "{quote.text}"
            </p>

            <div className="flex justify-center mb-12">
              <svg className="w-32 h-8 text-tertiary" fill="currentColor" viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 10 C 20 -5, 10 25, 0 10 C 10 -5, 20 25, 50 10 Z" opacity="0.9"></path>
                <path d="M50 10 C 80 -5, 90 25, 100 10 C 90 -5, 80 25, 50 10 Z" opacity="0.9"></path>
                <circle cx="50" cy="10" r="3"></circle>
              </svg>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
              <button
                onClick={() => onFavorite(quote._id)}
                disabled={isFavorited}
                className="group flex items-center justify-center gap-2 bg-tertiary text-on-tertiary font-label-caps text-label-caps px-8 py-4 rounded-full hover:bg-tertiary-container hover:text-on-tertiary-container transition-all duration-300 ambient-shadow transform hover:-translate-y-1 w-full sm:w-auto border border-tertiary disabled:opacity-60"
              >
                <span className="material-symbols-outlined text-[18px]">verified</span>
                {isFavorited ? 'Saved to Grimoire' : 'Save to Grimoire'}
              </button>

              <button
                onClick={onNewPotion}
                className="group flex items-center justify-center gap-2 bg-transparent text-tertiary border-2 border-tertiary font-label-caps text-label-caps px-8 py-4 rounded-full hover:bg-tertiary/10 transition-all duration-300 w-full sm:w-auto"
              >
                <span className="material-symbols-outlined text-[18px]">edit</span>
                Dip the Quill
              </button>

              <button
                onClick={handleCopy}
                className="group flex items-center justify-center gap-2 bg-transparent text-on-surface-variant border-2 border-on-surface-variant/40 font-label-caps text-label-caps px-8 py-4 rounded-full hover:bg-on-surface-variant/10 transition-all duration-300 w-full sm:w-auto"
              >
                <span className="material-symbols-outlined text-[18px]">{copied ? 'check' : 'content_copy'}</span>
                {copied ? 'Copied!' : 'Copy Quote'}
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full bottom-0 bg-transparent py-gutter mt-auto z-20">
        <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop text-center">
          <div className="font-body-sm text-body-sm text-tertiary-fixed opacity-70 mb-4 md:mb-0">
            © 1894 Life's Potion Apothecary. All rights preserved by ink and seal.
          </div>
          <div className="flex gap-4">
            <button type="button" className="font-body-sm text-body-sm text-tertiary-fixed opacity-70 hover:opacity-100 hover:text-white underline bg-transparent" onClick={() => onOpenModal('oath')}>The Alchemist's Oath</button>
            <button type="button" className="font-body-sm text-body-sm text-tertiary-fixed opacity-70 hover:opacity-100 hover:text-white underline bg-transparent" onClick={() => onOpenModal('recipes')}>Secret Recipes</button>
            <button type="button" className="font-body-sm text-body-sm text-tertiary-fixed opacity-70 hover:opacity-100 hover:text-white underline bg-transparent" onClick={() => onOpenModal('terms')}>Terms of Service</button>
          </div>
        </div>
      </footer>
    </div>
  )
}
