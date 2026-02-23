import { useState, useCallback, useMemo, createContext, useContext, lazy, Suspense } from 'react'
import './App.css'

/* -------------------- CONTEXT -------------------- */
const ThemeContext = createContext()

function useTheme() {
  return useContext(ThemeContext)
}

/* -------------------- CUSTOM HOOK -------------------- */
function useCounter(initial = 0) {
  const [count, setCount] = useState(initial)

  const increment = useCallback(() => setCount(c => c + 1), [])
  const decrement = useCallback(() => setCount(c => c - 1), [])
  const reset = useCallback(() => setCount(initial), [initial])

  return { count, increment, decrement, reset }
}

/* -------------------- LAZY COMPONENT -------------------- */
const Stats = lazy(() => import('./State.jsx'))

/* -------------------- MEMOIZED COMPONENT -------------------- */
const Display = ({ value }) => {
  return <h2>Count: {value}</h2>
}

/* -------------------- MAIN APP -------------------- */
function App() {
  const [dark, setDark] = useState(true)
  const counter = useCounter(0)

  const theme = useMemo(
    () => ({
      mode: dark ? 'dark' : 'light',
      toggle: () => setDark(d => !d)
    }),
    [dark]
  )

  return (
    <ThemeContext.Provider value={theme}>
      <div className={`app ${dark ? 'dark' : 'light'}`}>
        <h1>Advanced React App</h1>

        <button onClick={theme.toggle}>
          Switch to {dark ? 'Light' : 'Dark'} Mode
        </button>

        <Display value={counter.count} />

        <div className="card">
          <button onClick={counter.increment}>+</button>
          <button onClick={counter.decrement}>-</button>
          <button onClick={counter.reset}>Reset</button>
        </div>

        <Suspense fallback={<p>Loading stats...</p>}>
          <Stats value={counter.count} />
        </Suspense>
      </div>
    </ThemeContext.Provider>
  )
}

export default App