import type { CardAttribute } from '../types/card'
import type { GameState } from '../game/game'
import CharacterCard from './CharacterCard'
import GameButton from './GameButton'
import './GameScreen.css'

interface GameScreenProps {
  game: GameState
  selectedAttribute: CardAttribute | null
  totalRounds: number
  onSelectAttribute: (attribute: CardAttribute) => void
  onConfirmPlay: () => void
  onAdvanceRound: () => void
  onRestart: () => void
}

function GameScreen({
  game,
  selectedAttribute,
  totalRounds,
  onSelectAttribute,
  onConfirmPlay,
  onAdvanceRound,
  onRestart,
}: GameScreenProps) {
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
          selectedAttribute={selectedAttribute}
          onSelectAttribute={
            game.phase === 'choosing' ? onSelectAttribute : undefined
          }
        />

        <p className="battlefield__versus" aria-hidden="true">
          VS
        </p>

        <CharacterCard
          card={game.machineCard}
          owner="Máquina"
          hidden={game.phase === 'choosing'}
          selectedAttribute={null}
        />
      </section>

      {game.lastResult && (
        <section className="round-message" aria-live="polite">
          {game.lastResult.outcome === 'player' &&
            'Você venceu a rodada e ganhou 3 pontos!'}
          {game.lastResult.outcome === 'machine' &&
            'A máquina venceu a rodada e ganhou 3 pontos.'}
          {game.lastResult.outcome === 'tie' &&
            'Empate! Cada participante ganhou 1 ponto.'}
        </section>
      )}

      {game.phase === 'finished' && (
        <section className="final-message" aria-live="polite">
          <h2>Fim de jogo</h2>
          <p>
            {game.playerScore === game.machineScore
              ? 'A partida terminou empatada.'
              : game.playerScore > game.machineScore
                ? 'Você venceu a partida!'
                : 'A máquina venceu a partida.'}
          </p>
        </section>
      )}

      <div className="game-actions">
        {game.phase === 'choosing' && (
          <GameButton
            onClick={onConfirmPlay}
            disabled={!selectedAttribute}
          >
            Confirmar jogada
          </GameButton>
        )}

        {game.phase === 'round-complete' && (
          <GameButton onClick={onAdvanceRound}>
            Próxima rodada
          </GameButton>
        )}

        {game.phase === 'finished' && (
          <GameButton onClick={onRestart}>
            Jogar novamente
          </GameButton>
        )}
      </div>
    </>
  )
}

export default GameScreen