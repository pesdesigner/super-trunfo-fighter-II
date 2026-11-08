import useGame from './hooks/useGame'
import GameHeader from './components/GameHeader'
import StartScreen from './components/StartScreen'
import GameScreen from './components/GameScreen'
import AppFooter from './components/AppFooter'
import './App.css'

function App() {
  const {
    game,
    selectedAttribute,
    totalRounds,
    startMatch,
    selectAttribute,
    confirmPlay,
    advanceRound,
  } = useGame()

  return (
    <>
      <main className="game-page">
        <GameHeader />

        {!game ? (
          <StartScreen onStart={startMatch} />
        ) : (
          <GameScreen
            game={game}
            selectedAttribute={selectedAttribute}
            totalRounds={totalRounds}
            onSelectAttribute={selectAttribute}
            onConfirmPlay={confirmPlay}
            onAdvanceRound={advanceRound}
            onRestart={startMatch}
          />
        )}
      </main>
      <AppFooter />
    </>

  )
}

export default App