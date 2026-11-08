import type { Card, CardAttribute } from '../types/card'
import { dealRound, shuffleCards } from './deck'
import { resolveRound, type RoundResult } from './resolveRound'

export type GamePhase = 'choosing' | 'round-complete' | 'finished'

export const MAX_ROUNDS = 7

export interface GameState {
  playerCard: Card
  machineCard: Card
  kageCard: Card | null
  remainingDeck: readonly Card[]
  roundNumber: number
  totalRounds: number
  playerScore: number
  machineScore: number
  playerWinStreak: number
  machineWinStreak: number
  playerKagePending: boolean
  machineKagePending: boolean
  playerKageUsed: boolean
  machineKageUsed: boolean
  phase: GamePhase
  lastResult: RoundResult | null
}

// 1. Embaralha o baralho e prepara as cartas da primeira rodada.
export function createGame(
  cards: readonly Card[],
  random: () => number = Math.random,
): GameState | null {
  const kageCard = cards.find((card) => card.kind === 'special') ?? null
  const normalDeck = cards.filter((card) => card.kind !== 'special')
  const totalRounds = Math.min(MAX_ROUNDS, Math.floor(normalDeck.length / 2))
  const shuffledDeck = shuffleCards(normalDeck, random)
  const firstRound = dealRound(shuffledDeck)

  if (!firstRound) {
    return null
  }

  return {
    ...firstRound,
    kageCard,
    roundNumber: 1,
    totalRounds,
    playerScore: 0,
    machineScore: 0,
    playerWinStreak: 0,
    machineWinStreak: 0,
    playerKagePending: false,
    machineKagePending: false,
    playerKageUsed: false,
    machineKageUsed: false,
    phase: 'choosing',
    lastResult: null,
  }
}

// 4. Usa o resultado da comparação para atualizar a pontuação e a rodada.
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
  const playerWinStreak =
    result.outcome === 'player' ? game.playerWinStreak + 1 : 0
  const machineWinStreak =
    result.outcome === 'machine' ? game.machineWinStreak + 1 : 0
  const hasNextRound = game.roundNumber < game.totalRounds
  const canAwardKage = hasNextRound && game.kageCard !== null

  return {
    ...game,
    playerScore: game.playerScore + result.playerPoints,
    machineScore: game.machineScore + result.machinePoints,
    playerWinStreak,
    machineWinStreak,
    playerKagePending:
      game.playerKagePending ||
      (canAwardKage && !game.playerKageUsed && playerWinStreak >= 3),
    machineKagePending:
      game.machineKagePending ||
      (canAwardKage && !game.machineKageUsed && machineWinStreak >= 3),
    phase: game.roundNumber >= game.totalRounds ? 'finished' : 'round-complete',
    lastResult: result,
  }
}

// 5. Distribui as cartas seguintes e prepara o estado para outra escolha.
export function startNextRound(game: GameState): GameState {
  if (game.phase !== 'round-complete') {
    return game
  }

  const nextRound = dealRound(game.remainingDeck)

  if (!nextRound) {
    return { ...game, phase: 'finished' }
  }

  const playerCard =
    game.playerKagePending && game.kageCard
      ? game.kageCard
      : nextRound.playerCard
  const machineCard =
    game.machineKagePending && game.kageCard
      ? game.kageCard
      : nextRound.machineCard
  const playerReceivesKage = playerCard === game.kageCard
  const machineReceivesKage = machineCard === game.kageCard

  return {
    ...game,
    ...nextRound,
    playerCard,
    machineCard,
    roundNumber: game.roundNumber + 1,
    playerKagePending: false,
    machineKagePending: false,
    playerKageUsed: game.playerKageUsed || playerReceivesKage,
    machineKageUsed: game.machineKageUsed || machineReceivesKage,
    phase: 'choosing',
    lastResult: null,
  }
}