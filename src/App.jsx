import {
  useState,
  useCallback,
  useMemo,
  createContext,
  useContext,
  lazy,
  Suspense
} from 'react'
import './App.css'

/* ==================== THEME CONTEXT ==================== */
const ThemeContext = createContext(null)

const useTheme = () => useContext(ThemeContext)

/* ==================== SETTINGS CONTEXT ==================== */
const SettingsContext = createContext(null)

const useSettings = () => useContext(SettingsContext)

/* ==================== COUNTER CONTEXT ==================== */
const CounterContext = createContext(null)

const useCounterContext = () => useContext(CounterContext)

/* ==================== CUSTOM COUNTER HOOK ==================== */
function useCounter(initial = 0, step = 1) {
  const [count, setCount] = useState(initial)

  const increment = useCallback(() => {
    setCount(c => c + step)
  }, [step])

  const decrement = useCallback(() => {
    setCount(c => c - step)
  }, [step])

  const reset = useCallback(() => {
    setCount(initial)
  }, [initial])

  return { count, increment, decrement, reset }
}

/* ==================== LAZY COMPONENT ==================== */
const Stats = lazy(() =>
  Promise.resolve({
    default: ({ value }) => (
      <div className="stats">
        <h3>Statistics</h3>
        <p>Value: {value}</p>
        <p>Status: {value >= 0 ? 'Positive' : 'Negative'}</p>
      </div>
    )
  })
)

/* ==================== UI COMPONENTS ==================== */
const Display = () => {
  const { count } = useCounterContext()
  return <h2>Count: {count}</h2>
}

const Controls = () => {
  const { increment, decrement, reset } = useCounterContext()
  const { step, setStep } = useSettings()

  return (
    <>
      <div className="card">
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
        <button onClick={reset}>Reset</button>
      </div>

      <div className="step-control">
        <label>Step:</label>
        <input
          type="number"
          value={step}
          min="1"
          onChange={e => setStep(Number(e.target.value))}
        />
      </div>
    </>
  )
}

/* ==================== MAIN CONTENT ==================== */
const AppContent = () => {
  const { mode, toggleTheme } = useTheme()
  const { count } = useCounterContext()

  return (
    <div className={`app ${mode}`}>
      <h1>Advanced React Single-File App</h1>

      <button onClick={toggleTheme}>
        Switch to {mode === 'dark' ? 'Light' : 'Dark'} Mode
      </button>

      <Display />
      <Controls />

      <Suspense fallback={<p>Loading stats...</p>}>
        <Stats value={count} />
      </Suspense>
    </div>
  )
}

/* ==================== ROOT APP ==================== */
export default function App() {
  const [dark, setDark] = useState(true)
  const [step, setStep] = useState(1)

  const themeValue = useMemo(
    () => ({
      mode: dark ? 'dark' : 'light',
      toggleTheme: () => setDark(d => !d)
    }),
    [dark]
  )

  const counterValue = useCounter(0, step)

  return (
    <ThemeContext.Provider value={themeValue}>
      <SettingsContext.Provider value={{ step, setStep }}>
        <CounterContext.Provider value={counterValue}>
          <AppContent />
        </CounterContext.Provider>
      </SettingsContext.Provider>
    </ThemeContext.Provider>
  )
}