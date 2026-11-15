import { useState } from 'react'
import GameButton from './GameButton'
import GameInfoPopup, { type GameInfoPopupType } from './GameInfoPopup'
import './GameInfoPanel.css'

interface GameInfoPanelProps {
  className?: string
}

function GameInfoPanel({ className }: GameInfoPanelProps) {
  const [activePopup, setActivePopup] = useState<GameInfoPopupType | null>(null)

  return (
    <section
      className={`game-info-panel${className ? ` ${className}` : ''}`}
      aria-label="Informações do jogo"
    >
      <GameButton
        className="game-info-panel__button"
        onClick={() => setActivePopup('instructions')}
      >
        COMO JOGAR
      </GameButton>
      <GameButton
        className="game-info-panel__button game-info-panel__about-button"
        onClick={() => setActivePopup('about')}
      >
        SOBRE O PROJETO
      </GameButton>
      <p className="game-info-panel__disclaimer">
        Projeto de fã, não oficial e sem vínculo com a Capcom.
      </p>
      <GameInfoPopup
        activePopup={activePopup}
        onClose={() => setActivePopup(null)}
      />
    </section>
  )
}

export default GameInfoPanel
