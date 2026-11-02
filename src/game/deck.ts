import type { Card } from '../types/card'

export interface DealtRound {
  playerCard: Card
  machineCard: Card
  remainingDeck: Card[]
}

export function shuffleCards(
  cards: readonly Card[],
  random: () => number = Math.random,
): Card[] {
  const shuffled = [...cards]

  for (let currentIndex = shuffled.length - 1; currentIndex > 0; currentIndex--) {
    const randomIndex = Math.floor(random() * (currentIndex + 1))

    ;[shuffled[currentIndex], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[currentIndex],
    ]
  }

  return shuffled
}

export function dealRound(deck: readonly Card[]): DealtRound | null {
  if (deck.length < 2) {
    return null
  }

  return {
    playerCard: deck[0],
    machineCard: deck[1],
    remainingDeck: deck.slice(2),
  }
}