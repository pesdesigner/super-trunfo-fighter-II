import { useState } from 'react'
import { cards } from '../data/cards'
import { createGame, playRound, startNextRound } from '../game/game'
import type { GameState } from '../game/game'
import type { CardAttribute } from '../types/card'

function useGame() {
  const [game, setGame] = useState<GameState | null>(null)
  const [selectedAttribute, setSelectedAttribute] =
    useState<CardAttribute | null>(null)

  function startMatch() {
    setGame(createGame(cards))
    setSelectedAttribute(null)
  }

  function selectAttribute(attribute: CardAttribute) {
    setSelectedAttribute(attribute)
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

  return {
    game,
    selectedAttribute,
    totalRounds: Math.floor(cards.length / 2),
    startMatch,
    selectAttribute,
    confirmPlay,
    advanceRound,
  }
}

export default useGame