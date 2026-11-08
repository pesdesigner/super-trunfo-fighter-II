import { useCallback, useEffect, useState } from 'react'
import type { CardAttribute } from '../types/card'
import type { GameState } from '../game/game'
import CharacterCard from './CharacterCard'
import GameButton from './GameButton'
import GamePopup from './GamePopup'
import type { GamePopupVariant } from './GamePopup'
import './GameScreen.css'

interface PopupMessage {
  title: string
  message: string
  autoCloseMs: number
  variant?: GamePopupVariant
  beforeMachineReveal?: boolean
}

function hasCardRevealAnnouncement(game: GameState): boolean {
  return (
    game.playerCard.kind === 'wild' ||
    game.machineCard.kind === 'wild' ||
    game.playerCard.kind === 'special' ||
    game.machineCard.kind === 'special'
  )
}

function createPopupSequence(game: GameState): PopupMessage[] {
  if (game.phase === 'choosing' && game.lastResult === null) {
    return [
      {
        title: `Round ${game.roundNumber} — Fight!`,
        message: 'Prepare-se para a próxima batalha.',
        autoCloseMs: 1400,
      },
      {
        title: 'Sua vez!',
        message: 'Escolha um atributo da sua carta.',
        autoCloseMs: 1800,
      },
    ]
  }

  if (!game.lastResult) {
    return []
  }

  const messages: PopupMessage[] = []

  if (game.playerCard.kind === 'wild' || game.machineCard.kind === 'wild') {
    messages.push({
      title: 'Carta coringa!',
      message:
        game.playerCard.kind === 'wild'
          ? 'Você recebeu a carta coringa Akuma!'
          : 'A máquina recebeu a carta coringa Akuma!',
      autoCloseMs: 1800,
      variant: 'wild',
      beforeMachineReveal: true,
    })
  }

  if (
    game.playerCard.kind === 'special' ||
    game.machineCard.kind === 'special'
  ) {
    messages.push({
      title: 'Kage entrou na arena!',
      message:
        game.playerCard.kind === 'special' &&
        game.machineCard.kind === 'special'
          ? 'Você e a máquina receberam Kage após três vitórias seguidas.'
          : game.playerCard.kind === 'special'
            ? 'Você recebeu Kage após vencer três rodadas seguidas.'
            : 'A máquina recebeu Kage após vencer três rodadas seguidas.',
      autoCloseMs: 2000,
      variant: 'special',
      beforeMachineReveal: true,
    })
  }

  if (game.lastResult.outcome === 'tie') {
    messages.push({
      title: 'Empate!',
      message: 'Cada participante ganhou 1 ponto.',
      autoCloseMs: 1800,
    })
  } else {
    const playerWon = game.lastResult.outcome === 'player'
    const winnerCard = playerWon ? game.playerCard : game.machineCard
    const points = playerWon
      ? game.lastResult.playerPoints
      : game.lastResult.machinePoints
    const isMachineWildWin = !playerWon && winnerCard.kind === 'wild'

    messages.push({
      title: playerWon ? 'Você venceu!' : 'Vitória da máquina!',
      message: isMachineWildWin
        ? 'A máquina liberou o poder de Akuma e conquistou 4 pontos!'
        : playerWon && winnerCard.kind === 'wild'
          ? 'Akuma dominou a rodada! Você ganhou 4 pontos!'
          : `${playerWon ? 'Você venceu' : 'A máquina venceu'} a rodada e ganhou ${points} pontos.`,
      autoCloseMs: 2000,
      variant: isMachineWildWin ? 'machine-wild' : undefined,
    })
  }

  if (game.playerKagePending || game.machineKagePending) {
    messages.push({
      title: 'Kage conquistado!',
      message:
        game.playerKagePending && game.machineKagePending
          ? 'Você e a máquina ganharam Kage para a próxima rodada!'
          : game.playerKagePending
            ? 'Você venceu três rodadas seguidas e ganhou Kage para a próxima rodada!'
            : 'A máquina venceu três rodadas seguidas e ganhou Kage para a próxima rodada!',
      autoCloseMs: 2200,
      variant: 'special',
    })
  }

  if (game.phase === 'finished') {
    const outcome =
      game.playerScore === game.machineScore
        ? 'tie'
        : game.playerScore > game.machineScore
          ? 'victory'
          : 'defeat'

    messages.push({
      title:
        outcome === 'victory'
          ? 'Você venceu a partida!'
          : outcome === 'defeat'
            ? 'Você perdeu!'
            : 'Partida empatada!',
      message:
        `${outcome === 'victory'
          ? 'Parabéns, campeão! A arena é sua.'
          : outcome === 'defeat'
            ? 'A máquina venceu desta vez. Tente novamente!'
            : 'Os dois lutadores terminaram com a mesma pontuação.'} Placar final — Jogador ${game.playerScore} X ${game.machineScore} CPU`,
      autoCloseMs: 4000,
      variant: outcome,
    })
  }

  return messages
}

interface PopupSequenceProps {
  game: GameState
  suspended: boolean
  onComplete?: () => void
  onBeforeMachineReveal?: () => void
}

function PopupSequence({
  game,
  suspended,
  onComplete,
  onBeforeMachineReveal,
}: PopupSequenceProps) {
  const popupSequence = createPopupSequence(game)
  const [popupIndex, setPopupIndex] = useState(0)
  const [waitingForMachineReveal, setWaitingForMachineReveal] = useState(false)
  const activePopup = popupSequence[popupIndex]

  useEffect(() => {
    if (!waitingForMachineReveal) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setWaitingForMachineReveal(false)
      setPopupIndex((current) => current + 1)
    }, 650)

    return () => window.clearTimeout(timeoutId)
  }, [waitingForMachineReveal])

  const closeActivePopup = useCallback(() => {
    const nextPopup = popupSequence[popupIndex + 1]
    const shouldRevealMachine =
      activePopup?.beforeMachineReveal && !nextPopup?.beforeMachineReveal

    if (shouldRevealMachine) {
      onBeforeMachineReveal?.()
      if (nextPopup) {
        setWaitingForMachineReveal(true)
        return
      }
    }

    if (popupIndex === popupSequence.length - 1 && onComplete) {
      onComplete()
      return
    }

    setPopupIndex((current) => current + 1)
  }, [
    activePopup?.beforeMachineReveal,
    onBeforeMachineReveal,
    onComplete,
    popupIndex,
    popupSequence,
  ])

  if (!activePopup || suspended || waitingForMachineReveal) {
    return null
  }

  return (
    <GamePopup
      title={activePopup.title}
      message={activePopup.message}
      variant={activePopup.variant}
      autoCloseMs={activePopup.autoCloseMs}
      onClose={closeActivePopup}
    />
  )
}

interface ContinueCountdownPopupProps {
  onContinue: () => void
  onTimeout: () => void
}

function ContinueCountdownPopup({
  onContinue,
  onTimeout,
}: ContinueCountdownPopupProps) {
  const [secondsRemaining, setSecondsRemaining] = useState(10)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setSecondsRemaining((seconds) => Math.max(0, seconds - 1))
    }, 1000)
    const timeoutId = window.setTimeout(onTimeout, 10000)

    return () => {
      window.clearInterval(intervalId)
      window.clearTimeout(timeoutId)
    }
  }, [onTimeout])

  return (
    <GamePopup
      title="Continuar?"
      message={`Nova partida em ${secondsRemaining} segundos...`}
      actionLabel="Continuar"
      onAction={onContinue}
      onClose={onTimeout}
    />
  )
}

interface FinishedGameFlowProps {
  game: GameState
  onStartNewGame: () => void
  onReturnToStart: () => void
  onBeforeMachineReveal: () => void
}

function FinishedGameFlow({
  game,
  onStartNewGame,
  onReturnToStart,
  onBeforeMachineReveal,
}: FinishedGameFlowProps) {
  const [stage, setStage] = useState<'result' | 'continue' | 'game-over'>(
    'result',
  )
  const showContinuePrompt = useCallback(() => {
    setStage('continue')
  }, [])
  const showGameOver = useCallback(() => {
    setStage('game-over')
  }, [])

  if (stage === 'result') {
    return (
      <PopupSequence
        game={game}
        suspended={false}
        onComplete={showContinuePrompt}
        onBeforeMachineReveal={onBeforeMachineReveal}
      />
    )
  }

  if (stage === 'continue') {
    return (
      <ContinueCountdownPopup
        onContinue={onStartNewGame}
        onTimeout={showGameOver}
      />
    )
  }

  return (
    <GamePopup
      title="GAME OVER"
      message="Voltando para a tela inicial..."
      autoCloseMs={2200}
      onClose={onReturnToStart}
    />
  )
}

interface GameScreenProps {
  game: GameState
  selectedAttribute: CardAttribute | null
  totalRounds: number
  onSelectAttribute: (attribute: CardAttribute) => void
  onConfirmPlay: () => void
  onAdvanceRound: () => void
  onStartNewGame: () => void
  onReturnToStart: () => void
}

function GameScreen({
  game,
  selectedAttribute,
  totalRounds,
  onSelectAttribute,
  onConfirmPlay,
  onAdvanceRound,
  onStartNewGame,
  onReturnToStart,
}: GameScreenProps) {
  const [showMachineTurnPopup, setShowMachineTurnPopup] = useState(false)
  const [machineRevealed, setMachineRevealed] = useState(false)
  const [revealedPlayerRound, setRevealedPlayerRound] = useState<number | null>(
    null,
  )

  const startMachineTurn = useCallback(() => {
    setMachineRevealed(false)
    setShowMachineTurnPopup(true)
  }, [])

  const finishMachineTurn = useCallback(() => {
    setShowMachineTurnPopup(false)
    if (!hasCardRevealAnnouncement(game)) {
      setMachineRevealed(true)
    }
    onConfirmPlay()
  }, [game, onConfirmPlay])

  const revealMachineCard = useCallback(() => {
    setMachineRevealed(true)
  }, [])

  const advanceToNextRound = useCallback(() => {
    setMachineRevealed(false)
    onAdvanceRound()
  }, [onAdvanceRound])

  return (
    <>
      <section className="scoreboard" aria-label="Placar da partida">
        <div className="scoreboard__player">
          <span>Jogador</span>
          <strong>{game.playerScore}</strong>
        </div>

        <p className="scoreboard__round">
          Rodada {game.roundNumber} de {totalRounds}
        </p>

        <div className="scoreboard__machine">
          <span>Máquina</span>
          <strong>{game.machineScore}</strong>
        </div>
      </section>

      <section className="battlefield" aria-label="Cartas da rodada">
        <CharacterCard
          card={game.playerCard}
          owner="Sua carta"
          backLabel="PLAYER"
          flipped={revealedPlayerRound === game.roundNumber}
          selectedAttribute={selectedAttribute}
          resultAttribute={game.lastResult?.attribute}
          attributeResult={
            game.lastResult?.outcome === 'tie'
              ? 'tie'
              : game.lastResult?.outcome === 'player'
                ? 'winner'
                : game.lastResult?.outcome === 'machine'
                  ? 'loser'
                  : null
          }
          onSelectAttribute={
            game.phase === 'choosing' ? onSelectAttribute : undefined
          }
          onReveal={
            game.phase === 'choosing'
              ? () => setRevealedPlayerRound(game.roundNumber)
              : undefined
          }
        />

        <p className="battlefield__versus" aria-hidden="true">
          VS
        </p>

        <CharacterCard
          card={game.machineCard}
          owner="Máquina"
          backLabel="CPU"
          flipped={machineRevealed}
          selectedAttribute={null}
          resultAttribute={game.lastResult?.attribute}
          attributeResult={
            game.lastResult?.outcome === 'tie'
              ? 'tie'
              : game.lastResult?.outcome === 'machine'
                ? 'winner'
                : game.lastResult?.outcome === 'player'
                  ? 'loser'
                  : null
          }
        />
      </section>

      <div className="game-actions">
        {game.phase === 'choosing' && (
          <GameButton
            onClick={startMachineTurn}
            disabled={!selectedAttribute}
          >
            Confirmar jogada
          </GameButton>
        )}

        {game.phase === 'round-complete' && (
          <GameButton
            className="game-button--next-round"
            onClick={advanceToNextRound}
          >
            Próxima rodada
          </GameButton>
        )}

      </div>

      {game.phase === 'finished' ? (
        <FinishedGameFlow
          key={`${game.roundNumber}-${game.playerScore}-${game.machineScore}`}
          game={game}
          onStartNewGame={onStartNewGame}
          onReturnToStart={onReturnToStart}
          onBeforeMachineReveal={revealMachineCard}
        />
      ) : (
        <PopupSequence
          key={`${game.roundNumber}-${game.phase}-${game.lastResult?.attribute ?? 'pending'}`}
          game={game}
          suspended={showMachineTurnPopup}
          onBeforeMachineReveal={revealMachineCard}
        />
      )}
      {showMachineTurnPopup && (
        <GamePopup
          title="Vez da máquina!"
          message="A máquina revela sua carta. Vamos ver quem venceu!"
          autoCloseMs={1600}
          onClose={finishMachineTurn}
        />
      )}
    </>
  )
}

export default GameScreen