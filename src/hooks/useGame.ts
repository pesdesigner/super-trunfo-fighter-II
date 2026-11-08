import { useState } from 'react'
import { cards } from '../data/cards'
import {
  createGame,
  MAX_ROUNDS,
  playRound,
  startNextRound,
} from '../game/game'
import type { GameState } from '../game/game'
import type { CardAttribute } from '../types/card'

function useGame() {
  const [game, setGame] = useState<GameState | null>(null)
  const [selectedAttribute, setSelectedAttribute] =
    useState<CardAttribute | null>(null)

  // 1. Inicia ou reinicia a partida e limpa a escolha anterior.
  function startMatch() {
    setGame(createGame(cards))
    setSelectedAttribute(null)
  }

  function returnToStart() {
    setGame(null)
    setSelectedAttribute(null)
  }

  // 2. Registra o atributo escolhido pelo jogador na carta.
  function selectAttribute(attribute: CardAttribute) {
    setSelectedAttribute(attribute)
  }

  // 3. Confirma a escolha e solicita a resolução da rodada.
  function confirmPlay() {
    if (!game || !selectedAttribute) {
      return
    }

    setGame(playRound(game, selectedAttribute))
  }

  // 5. Distribui as cartas da próxima rodada e limpa a escolha anterior.
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
    totalRounds: game?.totalRounds ?? MAX_ROUNDS,
    startMatch,
    returnToStart,
    selectAttribute,
    confirmPlay,
    advanceRound,
  }
}

export default useGame