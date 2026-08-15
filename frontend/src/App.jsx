import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Potion from './components/Potion.jsx'
import QuoteReveal from './components/QuoteReveal.jsx'
import MoodLanguageTabs from './components/MoodLanguageTabs.jsx'
import Grimoire from './components/Grimoire.jsx'
import SuggestionBox from './components/SuggestionBox.jsx'
import Archives from './components/Archives.jsx'
import Auth from './components/Auth.jsx'
import ResetPassword from './components/ResetPassword.jsx'
import InfoModal from './components/InfoModal.jsx'
import {
  fetchQuote,
  fetchFavorites,
  addFavorite,
  removeFavorite,
  submitSuggestion,
  fetchMySuggestions,
  recordVisit,
  fetchStreak,
  login,
  register,
  getToken,
  getStoredUsername,
  clearSession,
} from './api/client.js'

export default function App() {
  const navigate = useNavigate()

  const [username, setUsername] = useState(getStoredUsername())
  const isLoggedIn = Boolean(getToken())

  const [mood, setMood] = useState('calm')
  const [lang, setLang] = useState('en')

  const [quote, setQuote] = useState(null)
  const [quoteLoading, setQuoteLoading] = useState(false)
  const [quoteError, setQuoteError] = useState(false)

  const [favorites, setFavorites] = useState([])
  const [favoritesLoading, setFavoritesLoading] = useState(false)

  const [mySuggestions, setMySuggestions] = useState([])
  const [archivesLoading, setArchivesLoading] = useState(false)

  const [streak, setStreak] = useState(0)
  const [modalType, setModalType] = useState(null)

  useEffect(() => {
    recordVisit()
      .then(() => fetchStreak())
      .then((data) => setStreak(data.streak))
      .catch(() => {})
  }, [])

  function handleSummon() {
    navigate('/select')
  }

  async function handleBrew() {
    navigate('/quote')
    setQuoteLoading(true)
    setQuoteError(false)
    try {
      const data = await fetchQuote({ mood, lang, excludeId: quote?._id })
      setQuote(data)
    } catch {
      setQuoteError(true)
    } finally {
      setQuoteLoading(false)
    }
  }

  async function handleFavorite(quoteId) {
    await addFavorite(quoteId)
    setFavorites((prev) => (quote ? [...prev, quote] : prev))
  }

  // These three screens require login — each redirects to /login if not authenticated
  function goToGrimoire() {
    if (!isLoggedIn) return navigate('/login')
    navigate('/grimoire')
  }
  function goToSuggestion() {
    if (!isLoggedIn) return navigate('/login')
    navigate('/suggestion')
  }
  function goToArchives() {
    if (!isLoggedIn) return navigate('/login')
    navigate('/archives')
  }

  async function loadFavorites() {
    setFavoritesLoading(true)
    try {
      const data = await fetchFavorites()
      setFavorites(data)
    } finally {
      setFavoritesLoading(false)
    }
  }

  async function loadMySuggestions() {
    setArchivesLoading(true)
    try {
      const data = await fetchMySuggestions()
      setMySuggestions(data)
    } finally {
      setArchivesLoading(false)
    }
  }

  async function handleRemoveFavorite(quoteId) {
    await removeFavorite(quoteId)
    setFavorites((prev) => prev.filter((q) => q._id !== quoteId))
  }

  async function handleSubmitSuggestion(text) {
    const result = await submitSuggestion(text)
    setMySuggestions((prev) => [result, ...prev])
    return result
  }

  async function handleLogin(u, p) {
    const data = await login(u, p)
    setUsername(data.username)
    navigate('/')
  }

  async function handleRegister(u, e, p) {
    const data = await register(u, e, p)
    setUsername(data.username)
    navigate('/')
  }

  function handleLogout() {
    clearSession()
    setUsername(null)
    setFavorites([])
    setMySuggestions([])
    navigate('/')
  }

  function handleNavigate(destination) {
    if (destination === 'grimoire') return goToGrimoire()
    if (destination === 'suggestion') return goToSuggestion()
    if (destination === 'archives') return goToArchives()
    if (destination === 'home') return navigate('/')
  }

  const isFavorited = quote ? favorites.some((f) => f._id === quote._id) : false

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Potion
              onSummon={handleSummon}
              onNavigate={handleNavigate}
              streak={streak}
              onOpenModal={setModalType}
              username={username}
              onLogout={handleLogout}
              onGoToLogin={() => navigate('/login')}
            />
          }
        />
        <Route
          path="/select"
          element={
            <MoodLanguageTabs
              mood={mood}
              lang={lang}
              onMoodChange={setMood}
              onLangChange={setLang}
              onBrew={handleBrew}
              onBack={() => navigate('/')}
            />
          }
        />
        <Route
          path="/quote"
          element={
            <QuoteReveal
              quote={quote}
              loading={quoteLoading}
              error={quoteError}
              onFavorite={isLoggedIn ? handleFavorite : () => navigate('/login')}
              isFavorited={isFavorited}
              onNewPotion={() => navigate('/select')}
              onOpenModal={setModalType}
            />
          }
        />
        <Route
          path="/grimoire"
          element={
            isLoggedIn ? (
              <GrimoireLoader
                favorites={favorites}
                loading={favoritesLoading}
                onRemove={handleRemoveFavorite}
                onBack={() => navigate('/')}
                onNavigateSuggestion={goToSuggestion}
                onNavigateArchives={goToArchives}
                onOpenModal={setModalType}
                loadFavorites={loadFavorites}
              />
            ) : (
              <RedirectToLogin navigate={navigate} />
            )
          }
        />
        <Route
          path="/archives"
          element={
            isLoggedIn ? (
              <ArchivesLoader
                suggestions={mySuggestions}
                loading={archivesLoading}
                onBack={() => navigate('/')}
                onNavigateGrimoire={goToGrimoire}
                onNavigateSuggestion={goToSuggestion}
                onOpenModal={setModalType}
                loadMySuggestions={loadMySuggestions}
              />
            ) : (
              <RedirectToLogin navigate={navigate} />
            )
          }
        />
        <Route
          path="/suggestion"
          element={
            isLoggedIn ? (
              <SuggestionBox
                onSubmit={handleSubmitSuggestion}
                onBack={() => navigate('/')}
                username={username}
                onNavigateGrimoire={goToGrimoire}
                onNavigateArchives={goToArchives}
              />
            ) : (
              <RedirectToLogin navigate={navigate} />
            )
          }
        />
        <Route
          path="/login"
          element={<Auth onLogin={handleLogin} onRegister={handleRegister} onBack={() => navigate('/')} />}
        />
        <Route
          path="/reset-password"
          element={<ResetPassword onDone={() => navigate('/login')} />}
        />
      </Routes>

      <InfoModal type={modalType} onClose={() => setModalType(null)} />
    </>
  )
}

function GrimoireLoader({ loadFavorites, ...props }) {
  useEffect(() => {
    loadFavorites()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <Grimoire {...props} />
}

function ArchivesLoader({ loadMySuggestions, ...props }) {
  useEffect(() => {
    loadMySuggestions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <Archives {...props} />
}

function RedirectToLogin({ navigate }) {
  useEffect(() => {
    navigate('/login')
  }, [navigate])
  return null
}
