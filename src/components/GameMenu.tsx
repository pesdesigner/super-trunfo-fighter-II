import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import GameButton from './GameButton'
import GameInfoPopup, { type GameInfoPopupType } from './GameInfoPopup'
import './GameMenu.css'

interface GameMenuProps {
  onReturnToStart: () => void
}

function GameMenu({ onReturnToStart }: GameMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activePopup, setActivePopup] = useState<GameInfoPopupType | null>(null)
  const closePopup = () => setActivePopup(null)

  const closeMenu = () => setIsOpen(false)
  const openPopup = (popup: GameInfoPopupType) => {
    setActivePopup(popup)
    closeMenu()
  }

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  return createPortal(
    <>
      <button
        className="game-menu__trigger"
        type="button"
        aria-label="Abrir menu do jogo"
        aria-expanded={isOpen}
        aria-controls={isOpen ? 'game-menu-panel' : undefined}
        onClick={() => setIsOpen(true)}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="game-menu-overlay"
          onClick={closeMenu}
        >
          <aside
            id="game-menu-panel"
            className="game-menu"
            role="dialog"
            aria-modal="true"
            aria-labelledby="game-menu-title"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="game-menu__header">
              <h2 id="game-menu-title">Menu</h2>
              <button
                className="game-menu__close"
                type="button"
                aria-label="Fechar menu"
                onClick={closeMenu}
              >
                ×
              </button>
            </header>
            <nav className="game-menu__items" aria-label="Opções do jogo">
              <GameButton
                className="game-menu__button"
                onClick={onReturnToStart}
              >
                Tela inicial
              </GameButton>
              <GameButton
                className="game-menu__button"
                onClick={() => openPopup('instructions')}
              >
                Como jogar
              </GameButton>
              <GameButton
                className="game-menu__button"
                onClick={() => openPopup('about')}
              >
                Sobre o projeto
              </GameButton>
              <GameButton
                className="game-menu__button"
                onClick={closePopup}
                disabled
              >
                Configuração
              </GameButton>
            </nav>
          </aside>
        </div>
      )}
      <GameInfoPopup activePopup={activePopup} onClose={closePopup} />
    </>,
    document.body,
  )
}

export default GameMenu
