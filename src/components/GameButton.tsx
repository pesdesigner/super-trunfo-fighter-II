import type { ReactNode } from 'react'
import './GameButton.css'

interface GameButtonProps {
  children: ReactNode
  onClick: () => void
  disabled?: boolean
  className?: string
}

function GameButton({
  children,
  onClick,
  disabled = false,
  className,
}: GameButtonProps) {
  return (
    <button
      className={className ? `game-button ${className}` : 'game-button'}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default GameButton