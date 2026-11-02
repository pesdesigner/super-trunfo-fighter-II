import type { Card, CardAttribute } from '../types/card'

export type RoundOutcome = 'player' | 'machine' | 'tie'

export interface RoundResult {
  attribute: CardAttribute
  playerValue: number
  machineValue: number
  outcome: RoundOutcome
  playerPoints: number
  machinePoints: number
}

export function resolveRound(
  playerCard: Card,
  machineCard: Card,
  attribute: CardAttribute,
): RoundResult {
  const playerValue = playerCard.attributes[attribute]
  const machineValue = machineCard.attributes[attribute]

  if (playerValue > machineValue) {
    return {
      attribute,
      playerValue,
      machineValue,
      outcome: 'player',
      playerPoints: 3,
      machinePoints: 0,
    }
  }

  if (machineValue > playerValue) {
    return {
      attribute,
      playerValue,
      machineValue,
      outcome: 'machine',
      playerPoints: 0,
      machinePoints: 3,
    }
  }

  return {
    attribute,
    playerValue,
    machineValue,
    outcome: 'tie',
    playerPoints: 1,
    machinePoints: 1,
  }
}