import type { ReactNode } from 'react'
import './GameButton.css'

interface GameButtonProps {
  children: ReactNode
  onClick: () => void
  disabled?: boolean
}

function GameButton({
  children,
  onClick,
  disabled = false,
}: GameButtonProps) {
  return (
    <button
      className="game-button"
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default GameButton