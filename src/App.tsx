import { useState } from 'react'
import { cards } from './data/cards'
import { createGame, playRound, startNextRound } from './game/game'
import type { GameState } from './game/game'
import type { Card, CardAttribute } from './types/card'
import packageJson from '../package.json'
import './App.css'

const attributes: CardAttribute[] = ['attack', 'defense', 'magic']

const attributeLabels: Record<CardAttribute, string> = {
  attack: 'Ataque',
  defense: 'Defesa',
  magic: 'Magia',
}

interface CharacterCardProps {
  card: Card
  owner: string
  hidden?: boolean
  selectedAttribute: CardAttribute | null
  onSelectAttribute?: (attribute: CardAttribute) => void
}

function CharacterCard({
  card,
  owner,
  hidden = false,
  selectedAttribute,
  onSelectAttribute,
}: CharacterCardProps) {
  return (
    <article className="fighter-card">
      <p className="fighter-card__owner">{owner}</p>

      {hidden ? (
        <div
          className="fighter-card__hidden"
          role="img"
          aria-label="Carta da máquina ainda não revelada"
        >
          <span>?</span>
          <small>Carta oculta</small>
        </div>
      ) : (
        <>
          <img
            className="fighter-card__image"
            src={card.imageUrl}
            alt={`Retrato de ${card.name}`}
          />

          <h2 className="fighter-card__name">{card.name}</h2>

          <div className="fighter-card__attributes">
            {attributes.map((attribute) => {
              const isSelected = selectedAttribute === attribute
              const value = card.attributes[attribute]
              const className = `attribute-row${isSelected ? ' is-selected' : ''}`

              if (onSelectAttribute) {
                return (
                  <label className={className} key={attribute}>
                    <input
                      type="radio"
                      name="player-attribute"
                      value={attribute}
                      checked={isSelected}
                      onChange={() => onSelectAttribute(attribute)}
                    />
                    <span>{attributeLabels[attribute]}</span>
                    <strong>{value}</strong>
                  </label>
                )
              }

              return (
                <div className={className} key={attribute}>
                  <span>{attributeLabels[attribute]}</span>
                  <strong>{value}</strong>
                </div>
              )
            })}
          </div>
        </>
      )}
    </article>
  )
}

function App() {
  const [game, setGame] = useState<GameState | null>(null)
  const [selectedAttribute, setSelectedAttribute] =
    useState<CardAttribute | null>(null)

  function startMatch() {
    setGame(createGame(cards))
    setSelectedAttribute(null)
  }

  function confirmPlay() {
    if (!game || !selectedAttribute) {
      return
    }

    setGame(playRound(game, selectedAttribute))
  }

  function advanceRound() {
    if (!game) {
      return
    }

    setGame(startNextRound(game))
    setSelectedAttribute(null)
  }

  return (
    <>
    <main className="game-page">
      <header className="game-header">
        <p className="game-header__eyebrow">Uma nova luta está começando</p>
        <h1>Super Trunfo Fighter II</h1>
      </header>

      {!game ? (
        <section className="start-panel">
          <p>
            Escolha um atributo da sua carta e vença a máquina em combate.
          </p>
          <button className="game-button" type="button" onClick={startMatch}>
            Começar partida
          </button>
        </section>
      ) : (
        <>
          <section className="scoreboard" aria-label="Placar da partida">
            <div className="scoreboard__player">
              <span>Jogador</span>
              <strong>{game.playerScore}</strong>
            </div>

            <p className="scoreboard__round">
              Rodada {game.roundNumber} de {Math.floor(cards.length / 2)}
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
                game.phase === 'choosing' ? setSelectedAttribute : undefined
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
              <button
                className="game-button"
                type="button"
                onClick={confirmPlay}
                disabled={!selectedAttribute}
              >
                Confirmar jogada
              </button>
            )}

            {game.phase === 'round-complete' && (
              <button
                className="game-button"
                type="button"
                onClick={advanceRound}
              >
                Próxima rodada
              </button>
            )}

            {game.phase === 'finished' && (
              <button
                className="game-button"
                type="button"
                onClick={startMatch}
              >
                Jogar novamente
              </button>
            )}
          </div>
        </>
      )}
    </main>
    <footer className="app-footer">
      <span>Versão {packageJson.version}</span>
      <a
        href="https://github.com/pesdesigner"
        target="_blank"
        rel="noreferrer"
      >
        GitHub · @pesdesigner
      </a>
    </footer>
  </>

  )
}

export default App