import { useEffect } from 'react'
import type { ReactNode } from 'react'
import './GamePopup.css'

export type GamePopupVariant =
  | 'default'
  | 'wild'
  | 'machine-wild'
  | 'victory'
  | 'defeat'
  | 'tie'
  | 'special'

interface GamePopupProps {
  title: string
  message: ReactNode
  onClose: () => void
  autoCloseMs?: number
  variant?: GamePopupVariant
  className?: string
  actionLabel?: string
  onAction?: () => void
}

function GamePopup({
  title,
  message,
  onClose,
  autoCloseMs,
  variant = 'default',
  className,
  actionLabel,
  onAction,
}: GamePopupProps) {
  useEffect(() => {
    if (autoCloseMs === undefined) {
      return
    }

    const timeoutId = window.setTimeout(onClose, autoCloseMs)
    return () => window.clearTimeout(timeoutId)
  }, [autoCloseMs, onClose])

  return (
    <div className="game-popup-backdrop">
      <section
        className={`game-popup game-popup--${variant}${className ? ` ${className}` : ''}`}
        role="dialog"
        aria-modal="true"
        aria-live="assertive"
        aria-labelledby="game-popup-title"
        aria-describedby="game-popup-message"
      >
        <h2 id="game-popup-title">{title}</h2>
        <div className="game-popup__message" id="game-popup-message">
          {typeof message === 'string' ? <p>{message}</p> : message}
        </div>
        {actionLabel && onAction && (
          <button
            className="game-popup__action"
            type="button"
            onClick={onAction}
          >
            {actionLabel}
          </button>
        )}
      </section>
    </div>
  )
}

export default GamePopup