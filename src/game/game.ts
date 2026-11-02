import type { Card, CardAttribute } from '../types/card'
import { dealRound, shuffleCards } from './deck'
import { resolveRound, type RoundResult } from './resolveRound'

export type GamePhase = 'choosing' | 'round-complete' | 'finished'

export interface GameState {
  playerCard: Card
  machineCard: Card
  remainingDeck: readonly Card[]
  roundNumber: number
  playerScore: number
  machineScore: number
  phase: GamePhase
  lastResult: RoundResult | null
}

export function createGame(
  cards: readonly Card[],
  random: () => number = Math.random,
): GameState | null {
  const shuffledDeck = shuffleCards(cards, random)
  const firstRound = dealRound(shuffledDeck)

  if (!firstRound) {
    return null
  }

  return {
    ...firstRound,
    roundNumber: 1,
    playerScore: 0,
    machineScore: 0,
    phase: 'choosing',
    lastResult: null,
  }
}

export function playRound(
  game: GameState,
  attribute: CardAttribute,
): GameState {
  if (game.phase !== 'choosing') {
    return game
  }

  const result = resolveRound(
    game.playerCard,
    game.machineCard,
    attribute,
  )

  return {
    ...game,
    playerScore: game.playerScore + result.playerPoints,
    machineScore: game.machineScore + result.machinePoints,
    phase: game.remainingDeck.length < 2 ? 'finished' : 'round-complete',
    lastResult: result,
  }
}

export function startNextRound(game: GameState): GameState {
  if (game.phase !== 'round-complete') {
    return game
  }

  const nextRound = dealRound(game.remainingDeck)

  if (!nextRound) {
    return { ...game, phase: 'finished' }
  }

  return {
    ...game,
    ...nextRound,
    roundNumber: game.roundNumber + 1,
    phase: 'choosing',
    lastResult: null,
  }
}