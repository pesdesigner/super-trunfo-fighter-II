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

// 4. Compara o atributo escolhido e define o vencedor e os pontos da rodada.
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
      playerPoints: playerCard.kind === 'wild' ? 4 : 3,
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
      machinePoints: machineCard.kind === 'wild' ? 4 : 3,
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