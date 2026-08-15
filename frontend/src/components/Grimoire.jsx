import { useState } from 'react'

// SCREEN 4: Favorites / "Grimoire"
// Converted from the Stitch export. Changes made from the raw HTML:
//   - class -> className, style="..." -> style={{ ... }}
//   - the 6 hardcoded example cards are replaced with a .map() over the
//     real `favorites` array (split across the left/right page), each
//     rendering quote.text and a working remove button
//   - added a loading state and an empty-grimoire state, since the
//     original design assumed the book was always full
//   - "My Grimoire" nav link no longer needs href="#" styling tricks —
//     it's already the active page, styling kept as-is
//   - added a search field (not from the Stitch export) to filter saved
//     quotes by text or mood once the list gets long

function Card({ quote, onRemove }) {
  return (
    <article className="relative group mt-8 first:mt-0">
      <button
        onClick={() => onRemove(quote._id)}
        aria-label="Remove from grimoire"
        className="absolute -top-2 -right-2 text-error/60 hover:text-error transition-colors z-10"
      >
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
      </button>
      {quote.mood && (
        <div className="mb-4">
          <span className="font-label-caps text-label-caps text-[#5c6e3b] tracking-widest uppercase">{quote.mood}</span>
        </div>
      )}
      <blockquote
        className={`${quote.lang === 'hi' || quote.lang === 'ur' ? 'font-devanagari' : 'font-quote-main text-quote-main italic'} text-[#2a1e15] mb-6 leading-relaxed text-2xl font-medium`}
      >
        "{quote.text}"
      </blockquote>
      <div className="h-[1px] w-full bg-tertiary/20 mb-4"></div>
    </article>
  )
}

export default function Grimoire({ favorites, loading, onRemove, onBack, onNavigateSuggestion, onNavigateArchives, onOpenModal }) {
  const [query, setQuery] = useState('')

  const filtered = query.trim()
    ? favorites.filter(
        (q) =>
          q &&
          (q.text.toLowerCase().includes(query.toLowerCase()) ||
            (q.mood && q.mood.toLowerCase().includes(query.toLowerCase())))
      )
    : favorites.filter(Boolean)

  const half = Math.ceil(filtered.length / 2)
  const leftPage = filtered.slice(0, half)
  const rightPage = filtered.slice(half)

  return (
    <div className="wood-bg text-on-background relative min-h-screen flex flex-col font-body-lg">
      <div className="fixed inset-0 z-0 texture-overlay"></div>

      <header className="bg-surface/90 backdrop-blur-sm shadow-md w-full top-0 z-50 relative">
        <div className="max-w-container-max mx-auto flex justify-between items-center px-margin-mobile md:px-margin-desktop py-unit">
          <a
            className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary italic flex items-center"
            href="/"
            onClick={(e) => { e.preventDefault(); onBack() }}
          >
            Life's Potion
          </a>
          <nav className="hidden md:flex gap-gutter items-center">
            <button type="button" className="font-label-caps text-label-caps text-on-surface-variant font-medium hover:text-tertiary transition-colors duration-300 bg-transparent" onClick={onBack}>The Lab</button>
            <span className="font-label-caps text-label-caps text-primary font-bold border-b-2 border-tertiary pb-1">My Grimoire</span>
            <button type="button" className="font-label-caps text-label-caps text-on-surface-variant font-medium hover:text-tertiary transition-colors duration-300 bg-transparent" onClick={onNavigateArchives}>Archives</button>
            <button type="button" className="font-label-caps text-label-caps text-on-surface-variant font-medium hover:text-tertiary transition-colors duration-300 bg-transparent" onClick={onNavigateSuggestion}>Apothecary</button>
          </nav>
        </div>
      </header>

      <main className="flex-grow max-w-[1400px] mx-auto w-full px-4 md:px-margin-desktop py-12 relative z-10">
        <div className="journal-bg w-full relative p-8 md:p-16 flex flex-col md:flex-row gap-12 md:gap-0 overflow-hidden">
          <div className="grimoire-burnt-edges"></div>
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-20 -ml-10 journal-spine z-20"></div>

          {/* Left Page */}
          <div className="flex-1 md:pr-14 relative z-10">
            <div className="text-center mb-12">
              <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-[#35251a] mb-unit drop-shadow-sm">Your Grimoire</h1>
              <div className="flex justify-center items-center gap-4">
                <div className="h-[1px] w-12 bg-tertiary opacity-40"></div>
                <span className="material-symbols-outlined text-tertiary text-sm opacity-80">auto_awesome</span>
                <div className="h-[1px] w-12 bg-tertiary opacity-40"></div>
              </div>
              <p className="font-body-sm text-body-sm text-[#4a3f35] italic opacity-70 mt-3">
                ♥ tap the heart to release a quote back into the ether
              </p>
            </div>

            {favorites.length > 3 && (
              <div className="flex justify-center mb-8">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search your grimoire…"
                  className="input-line font-body-sm text-body-sm text-[#4a3f35] py-1 px-2 w-full max-w-xs text-center"
                />
              </div>
            )}

            {loading && <p className="text-center italic text-[#4a3f35]">opening the journal…</p>}

            {!loading && favorites.length === 0 && (
              <p className="text-center italic text-[#4a3f35]">
                no quotes saved yet — click the potion and save one you like
              </p>
            )}

            {!loading && favorites.length > 0 && filtered.length === 0 && (
              <p className="text-center italic text-[#4a3f35]">
                nothing in your grimoire matches "{query}"
              </p>
            )}

            <div className="flex flex-col gap-10">
              {leftPage.map((quote) => (
                <Card key={quote._id} quote={quote} onRemove={onRemove} />
              ))}
            </div>
          </div>

          {/* Right Page */}
          <div className="flex-1 md:pl-14 relative z-10 page-curl">
            <div className="flex flex-col gap-10 pt-4 md:pt-20">
              {rightPage.map((quote) => (
                <Card key={quote._id} quote={quote} onRemove={onRemove} />
              ))}
            </div>
          </div>

          <div
            className="absolute -left-12 top-1/4 w-48 h-48 bg-no-repeat bg-contain opacity-85 pointer-events-none transform -rotate-12 mix-blend-multiply drop-shadow-md z-30"
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDCU1KH56Tucr2s_LmDtvdGAuMCEx83CBykEVrZEX3x09rdSqKteROV7sEA5_96DoRe8ctUTL_pRU6_eR_U1ga5ZtI_c3l8m6cGggFIw3vT4L1N_E3CntC3_jlF8-Pl4k5CLfRiQQRa6gzLXHZ2fMrofz8zEPom8Xr6LQTrsxDIxeDR2Mlb6-EnMmicrWh4L0-T74Zd6QXQiVUYFvPHr_yEzUHXJ0zc_DyqYV0ScuAfcOmt70cHHgOg7A')" }}
          ></div>
          <div
            className="absolute -right-16 bottom-1/3 w-64 h-64 bg-no-repeat bg-contain opacity-80 pointer-events-none transform rotate-12 mix-blend-multiply drop-shadow-lg z-30"
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDmYQwDfypB5onqlDq4wbpq0Vh2ymKY0e4uHge2aSnieQwTXjyaISbHDXG2huGmxpvfiN91UvHPA9mmPHBj_jEQM7ixwQ1W6kU-a_aTIqA4VaIxvQ-khfi8yTF2T4vRCunvPMdKs3Q9dJvP7nOjqcZm9qpAscc0qMuWWDkSZABZc_P0YeeD8rcvojM9PMZK8XR8cYs09FlV8NNecD6QqbdiYmhC4Lk7mWrtcfRar6A9CagUPW7epSmZnw')" }}
          ></div>
        </div>
      </main>

      <footer className="bg-surface/90 backdrop-blur-sm w-full bottom-0 mt-auto z-50 relative border-t border-tertiary/20">
        <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop py-gutter text-center">
          <div className="font-label-caps text-label-caps text-tertiary mb-4 md:mb-0">Life's Potion</div>
          <div className="font-body-sm text-body-sm text-on-surface-variant mb-4 md:mb-0">
            © 1894 Life's Potion Apothecary. All rights preserved by ink and seal.
          </div>
          <nav className="flex gap-4 font-body-sm text-body-sm">
            <button type="button" className="text-on-surface-variant hover:text-primary underline bg-transparent" onClick={() => onOpenModal('oath')}>The Alchemist's Oath</button>
            <button type="button" className="text-on-surface-variant hover:text-primary underline bg-transparent" onClick={() => onOpenModal('recipes')}>Secret Recipes</button>
            <button type="button" className="text-on-surface-variant hover:text-primary underline bg-transparent" onClick={() => onOpenModal('terms')}>Terms of Service</button>
          </nav>
        </div>
      </footer>
    </div>
  )
}
