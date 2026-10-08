// "My Archives" — a log of the notes/suggestions this user has submitted
// through the Apothecary (Suggestion Box). Not from a Stitch export —
// styled by hand to match the journal-card look used elsewhere.
import { useState } from 'react'

export default function Archives({ suggestions, loading, onBack, onNavigateGrimoire, onNavigateSuggestion, onOpenModal }) {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <div className="wood-bg text-on-background relative min-h-screen flex flex-col font-body-lg">
      <div className="fixed inset-0 z-0 texture-overlay"></div>

      <header className="bg-surface/90 backdrop-blur-sm shadow-md w-full top-0 z-50 relative">
        <div className="max-w-container-max mx-auto flex justify-between items-center px-margin-mobile md:px-margin-desktop py-unit">
          <button
            type="button"
            className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary italic flex items-center bg-transparent"
            onClick={onBack}
          >
            Life's Potion
          </button>
          <nav className="hidden md:flex gap-gutter items-center">
            <button type="button" className="font-label-caps text-label-caps text-on-surface-variant font-medium hover:text-tertiary transition-colors duration-300 bg-transparent" onClick={onBack}>The Lab</button>
            <button type="button" className="font-label-caps text-label-caps text-on-surface-variant font-medium hover:text-tertiary transition-colors duration-300 bg-transparent" onClick={onNavigateGrimoire}>My Grimoire</button>
            <span className="font-label-caps text-label-caps text-primary font-bold border-b-2 border-tertiary pb-1">Archives</span>
            <button type="button" className="font-label-caps text-label-caps text-on-surface-variant font-medium hover:text-tertiary transition-colors duration-300 bg-transparent" onClick={onNavigateSuggestion}>Apothecary</button>
          </nav>
          <button type="button" className="md:hidden p-2 text-primary bg-transparent" onClick={() => setMenuOpen(!menuOpen)}> <span className="material-symbols-outlined">{menuOpen ? 'close' : 'menu'}</span> </button>
        </div>
      </header>
      {menuOpen && ( <div className="md:hidden w-full bg-surface border-b border-tertiary/20 flex flex-col items-center gap-4 py-6 relative z-40"> <button type="button" className="font-label-caps text-label-caps text-on-surface-variant bg-transparent" onClick={() => { onBack(); setMenuOpen(false) }}>The Lab</button> <button type="button" className="font-label-caps text-label-caps text-on-surface-variant bg-transparent" onClick={() => { onNavigateGrimoire(); setMenuOpen(false) }}>My Grimoire</button> <span className="font-label-caps text-label-caps text-primary font-bold">Archives</span> <button type="button" className="font-label-caps text-label-caps text-on-surface-variant bg-transparent" onClick={() => { onNavigateSuggestion(); setMenuOpen(false) }}>Apothecary</button> </div> )}

      <main className="flex-grow max-w-4xl mx-auto w-full px-4 md:px-margin-desktop py-12 relative z-10">
        <div className="journal-bg w-full relative p-8 md:p-16 overflow-hidden">
          <div className="grimoire-burnt-edges"></div>

          <div className="text-center mb-12 relative z-10">
            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-[#35251a] mb-unit drop-shadow-sm">
              Your Archives
            </h1>
            <p className="font-body-sm text-[#4a3f35] italic max-w-md mx-auto">
              Every note you've slipped into a bottle at the Apothecary, kept for your own record.
            </p>
            <div className="flex justify-center items-center gap-4 mt-4">
              <div className="h-[1px] w-12 bg-tertiary opacity-40"></div>
              <span className="material-symbols-outlined text-tertiary text-sm opacity-80">history_edu</span>
              <div className="h-[1px] w-12 bg-tertiary opacity-40"></div>
            </div>
          </div>

          {loading && <p className="text-center italic text-[#4a3f35] relative z-10">unrolling the archives…</p>}

          {!loading && suggestions.length === 0 && (
            <p className="text-center italic text-[#4a3f35] relative z-10">
              Nothing archived yet — visit the Apothecary and slip a note into a bottle.
            </p>
          )}

          <div className="flex flex-col gap-8 relative z-10 max-w-2xl mx-auto">
            {suggestions.map((s) => (
              <article key={s._id} className="relative">
                <p className="font-quote-main text-quote-main text-[#2a1e15] italic leading-relaxed">
                  "{s.text}"
                </p>
                <div className="h-[1px] w-full bg-tertiary/20 my-3"></div>
                <div className="font-body-sm text-body-sm text-[#4a3f35] italic">
                  {new Date(s.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
              </article>
            ))}
          </div>
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
