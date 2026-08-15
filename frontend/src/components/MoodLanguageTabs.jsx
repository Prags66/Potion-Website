// SCREEN 3: Mood & Language Selection
// Converted from the Stitch export. Changes made from the raw HTML:
//   - class -> className, style="..." -> style={{ ... }}
//   - the vanilla JS selectMood()/toggleLanguage() functions are replaced
//     with React state, driven by the `mood`/`lang` props from App.jsx
//   - "Brew Potion" now calls onBrew (which fetches the quote and moves
//     to the Quote Reveal screen), instead of doing nothing
//
// NOTE: the design's language toggle is labeled "English" / "Latina".
// Your backend/seed data currently uses 'en' and 'hi' (Hindi) as language
// codes. Decide which second language you actually want and either:
//   (a) relabel "Latina" -> your real language here, or
//   (b) reseed your quotes with 'la' quotes to match this design.
// For now this component uses lang codes 'en' and 'la' to match what
// Stitch generated — swap to 'hi' (and the label) if you want Hindi instead.

const MOODS = [
  { key: 'calm', label: 'Calm', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAu_Ozl690xDvauEo6WlIGDKQ3r2rDGl-dtijGEYL7b2bHpoAVh5MxOzxyIuopBktVcdntTMZL4H4A9X3H68_1jKqTaJw7RueSAxvROKzTdm9JWfIP-X_-_K7usoOSSb4D9S1PRQqFR9etVg31lwpOMaVvmkohyNeAyKYfV1MzHR2Df-3xgbEev3zAuE48kmcE3cS2DkYdDROLswSGv8FznxAkbBLxE6Fz491sYHb20yTldN3T6xm1Tcw' },
  { key: 'energized', label: 'Energized', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLzxUYiDLWVIWIx4fV4nWmApx2ahOv0byR5AHbyiwzTnbUi_9yAfzzbuZRCII5DGBNrerz7eKfLT0sBYT2kT8-KRq8fC--Zt-tCISOFYfRSSuavIQHgqvn8prBZv8ybDJ3xxY7RNbyNAIViMeYBIum_k8-yEg4ESMXMXOlysO4PQ1LM8t11IqI1TZ6cUoV8k-nMugrDHdWUnkAqxS9oQriPqP4BVGZc-lh1Po5Ve5zmVsKDw1smyH0qw' },
  { key: 'hopeful', label: 'Hopeful', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOTvQKIaFuKf6P9uUZe2NB-rcBA-H6aLnLWiR73iTYBdbFlfA59e0mxGZE3R9HlhgAylhm8muxJxzYXoSNtDVei_hI-f6IxxjNu1uoydc6RHOKQ43e6av05TOVkTHtndXyVeZuIo_uTrnUneZod9ZciSa7bAQ4zRBJzLoyH-Q2fB1-W4_P6OLyPIEmp0mdv_YSmvOne2U0nVzSC1wUPMGH59rPI11dD3bYt5MYiNu0GS_lAFzAXd-Inw' },
  { key: 'courageous', label: 'Courageous', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpNunU3VaumayTc9luj9TW_z2z92QWolUCjEt1GDfyhXqh6kAqy9p5HrlJD9PUWzjQ6YgFivwev4tTqfMQem6AgKOWNv-35BigsE963z2uOLVDCm0dxkXOSYldT6azTieYwKrfgbJMiYA0X6DR8BECE_koMgfiEhZAeZLFU_CMxbXMoo5azM6g11gA1_2eRoe4aIb-_dd9j4rK9DX0tuF7JSaXRAbflDlwduBGa3SqV1ybBN8mYU-_Sw' },
  { key: 'inspired', label: 'Inspired', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAu_Ozl690xDvauEo6WlIGDKQ3r2rDGl-dtijGEYL7b2bHpoAVh5MxOzxyIuopBktVcdntTMZL4H4A9X3H68_1jKqTaJw7RueSAxvROKzTdm9JWfIP-X_-_K7usoOSSb4D9S1PRQqFR9etVg31lwpOMaVvmkohyNeAyKYfV1MzHR2Df-3xgbEev3zAuE48kmcE3cS2DkYdDROLswSGv8FznxAkbBLxE6Fz491sYHb20yTldN3T6xm1Tcw' },
  { key: 'melancholic', label: 'Melancholic', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOTvQKIaFuKf6P9uUZe2NB-rcBA-H6aLnLWiR73iTYBdbFlfA59e0mxGZE3R9HlhgAylhm8muxJxzYXoSNtDVei_hI-f6IxxjNu1uoydc6RHOKQ43e6av05TOVkTHtndXyVeZuIo_uTrnUneZod9ZciSa7bAQ4zRBJzLoyH-Q2fB1-W4_P6OLyPIEmp0mdv_YSmvOne2U0nVzSC1wUPMGH59rPI11dD3bYt5MYiNu0GS_lAFzAXd-Inw' },
]

// Compass rotation angle for each language — top/right/bottom/left
const LANG_ANGLES = { en: 0, hi: 90, la: 180, ur: 270 }

export default function MoodLanguageTabs({ mood, lang, onMoodChange, onLangChange, onBrew, onBack }) {

  return (
    <div className="bg-background text-on-background min-h-screen relative overflow-hidden flex flex-col font-body-sm">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-surface-container-low opacity-90"></div>
        <div className="absolute inset-0 mood-burnt-edges z-20 pointer-events-none"></div>
      </div>

      <header className="relative z-30 w-full px-margin-mobile md:px-margin-desktop py-6">
        <button
          type="button"
          onClick={onBack}
          className="font-label-caps text-label-caps text-tertiary hover:opacity-80 transition-opacity bg-transparent"
        >
          ← The Lab
        </button>
      </header>

      <main className="relative z-30 flex-grow flex flex-col items-center justify-center px-margin-mobile md:px-margin-desktop py-gutter max-w-container-max mx-auto w-full">
        <header className="text-center mb-12 space-y-4">
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-tertiary italic drop-shadow-sm">
            Select Your Essence
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Consult the apothecary's table to find the tincture that aligns with your spirit's current disposition.
          </p>
          <div className="flex justify-center items-center py-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-tertiary to-transparent opacity-50"></div>
            <span className="material-symbols-outlined text-tertiary mx-2" style={{ fontSize: '16px' }}>spa</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent via-tertiary to-transparent opacity-50"></div>
          </div>
        </header>

        <section className="w-full max-w-6xl mb-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-gutter">
            {MOODS.map((m) => {
              const selected = mood === m.key
              return (
                <button
                  key={m.key}
                  onClick={() => onMoodChange(m.key)}
                  className={`glass-vial group relative flex flex-col items-center justify-center p-6 bg-surface-container mood-ambient-shadow rounded-xl gold-border-subtle ${selected ? 'glass-vial-selected' : ''}`}
                >
                  <div className="w-20 h-28 mb-4 relative">
                    <img
                      className="object-cover w-full h-full rounded-full opacity-80 mix-blend-multiply filter contrast-125 sepia-[.2]"
                      alt={m.label}
                      src={m.img}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-surface-container opacity-50"></div>
                  </div>
                  <span className="font-label-caps text-label-caps text-on-surface tracking-widest uppercase relative z-10 group-hover:text-tertiary transition-colors text-center">
                    {m.label}
                  </span>
                  {selected && (
                    <div className="absolute top-2 right-2 text-tertiary material-symbols-outlined">check_circle</div>
                  )}
                </button>
              )
            })}
          </div>
        </section>

        <section className="mt-auto flex flex-col items-center pb-8 z-40 relative">
          <h3 className="font-label-caps text-label-caps text-outline mb-14 tracking-widest">Tongue of the Ancients</h3>
          <div className="relative w-56 h-56 flex items-center justify-center">
            <div
              className="compass-rose absolute inset-0 rounded-full border border-tertiary border-opacity-30 mood-ambient-shadow bg-transparent flex items-center justify-center backdrop-blur-[2px]"
              style={{ transform: `rotate(${LANG_ANGLES[lang] ?? 0}deg)` }}
            >
              <div className="w-4 h-4 rounded-full bg-tertiary z-20"></div>
              <div className="absolute inset-2 rounded-full border border-dashed border-outline-variant opacity-50"></div>
              <div className="absolute inset-6 rounded-full border border-secondary-fixed-dim opacity-30"></div>
              <span className="absolute top-2 material-symbols-outlined text-tertiary opacity-70" style={{ fontSize: '16px' }}>local_florist</span>
              <span className="absolute bottom-2 material-symbols-outlined text-tertiary opacity-70" style={{ fontSize: '16px', transform: 'rotate(180deg)' }}>local_florist</span>
              <span className="absolute left-2 material-symbols-outlined text-tertiary opacity-70" style={{ fontSize: '16px', transform: 'rotate(-90deg)' }}>local_florist</span>
              <span className="absolute right-2 material-symbols-outlined text-tertiary opacity-70" style={{ fontSize: '16px', transform: 'rotate(90deg)' }}>local_florist</span>
            </div>

            {/* Four clickable labels at the cardinal points — each picks that language */}
            <button
              type="button"
              onClick={() => onLangChange('en')}
              className={`absolute -top-8 w-full text-center font-label-caps text-label-caps transition-colors duration-300 drop-shadow-sm bg-transparent ${lang === 'en' ? 'lang-active' : 'lang-inactive'}`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => onLangChange('hi')}
              className={`absolute top-1/2 -right-14 -translate-y-1/2 font-devanagari text-label-caps transition-colors duration-300 drop-shadow-sm bg-transparent ${lang === 'hi' ? 'lang-active' : 'lang-inactive'}`}
            >
              हिंदी
            </button>
            <button
              type="button"
              onClick={() => onLangChange('la')}
              className={`absolute -bottom-8 w-full text-center font-label-caps text-label-caps transition-colors duration-300 drop-shadow-sm bg-transparent ${lang === 'la' ? 'lang-active' : 'lang-inactive'}`}
            >
              Latina
            </button>
            <button
              type="button"
              onClick={() => onLangChange('ur')}
              className={`absolute top-1/2 -left-14 -translate-y-1/2 font-devanagari text-label-caps transition-colors duration-300 drop-shadow-sm bg-transparent ${lang === 'ur' ? 'lang-active' : 'lang-inactive'}`}
            >
              उर्दू
            </button>
          </div>

          <button
            onClick={onBrew}
            className="mt-16 px-8 py-4 bg-primary text-on-primary font-label-caps text-label-caps rounded uppercase tracking-widest hover:bg-primary-container transition-colors mood-ambient-shadow"
          >
            Brew Potion
          </button>
        </section>
      </main>
    </div>
  )
}
