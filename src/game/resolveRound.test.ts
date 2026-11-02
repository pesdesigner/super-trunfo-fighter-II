import { describe, expect, it } from 'vitest'
import type { Card } from '../types/card'
import { resolveRound } from './resolveRound'

const playerCard: Card = {
  id: 'player',
  name: 'Ryu',
  imageUrl: '',
  attributes: { attack: 80, defense: 60, magic: 90 },
}

const machineCard: Card = {
  id: 'machine',
  name: 'Ken',
  imageUrl: '',
  attributes: { attack: 70, defense: 70, magic: 90 },
}

describe('resolveRound', () => {
  it('dá 3 pontos ao jogador quando o valor dele é maior', () => {
    expect(resolveRound(playerCard, machineCard, 'attack')).toEqual({
      attribute: 'attack',
      playerValue: 80,
      machineValue: 70,
      outcome: 'player',
      playerPoints: 3,
      machinePoints: 0,
    })
  })

  it('dá 3 pontos à máquina quando o valor dela é maior', () => {
    expect(resolveRound(playerCard, machineCard, 'defense')).toEqual({
      attribute: 'defense',
      playerValue: 60,
      machineValue: 70,
      outcome: 'machine',
      playerPoints: 0,
      machinePoints: 3,
    })
  })

  it('dá 1 ponto para cada participante quando os valores são iguais', () => {
    expect(resolveRound(playerCard, machineCard, 'magic')).toEqual({
      attribute: 'magic',
      playerValue: 90,
      machineValue: 90,
      outcome: 'tie',
      playerPoints: 1,
      machinePoints: 1,
    })
  })
})