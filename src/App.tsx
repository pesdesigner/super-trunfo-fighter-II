import useGame from './hooks/useGame'
import GameHeader from './components/GameHeader'
import StartScreen from './components/StartScreen'
import GameScreen from './components/GameScreen'
import AppFooter from './components/AppFooter'
import './App.css'

function App() {
  const {
    game,
    matchId,
    selectedAttribute,
    totalRounds,
    startMatch,
    returnToStart,
    selectAttribute,
    confirmPlay,
    advanceRound,
  } = useGame()

  return (
    <>
      <main className={`game-page ${game ? 'game-page--playing' : 'game-page--start'}`}>
        <GameHeader />

        {!game ? (
          <StartScreen onStart={startMatch} />
        ) : (
          <GameScreen
            key={matchId}
            game={game}
            selectedAttribute={selectedAttribute}
            totalRounds={totalRounds}
            onSelectAttribute={selectAttribute}
            onConfirmPlay={confirmPlay}
            onAdvanceRound={advanceRound}
            onStartNewGame={startMatch}
            onReturnToStart={returnToStart}
          />
        )}
      </main>
      <AppFooter />
    </>

  )
}

export default App