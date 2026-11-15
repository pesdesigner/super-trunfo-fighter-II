import './SpecialBars.css'

interface SpecialMeterProps {
  label: string
  level: number
  streakBroken: boolean
  counterAfterLabel?: boolean
}

export function SpecialMeter({
  label,
  level,
  streakBroken,
  counterAfterLabel = false,
}: SpecialMeterProps) {
  const stateClass = streakBroken
    ? ' is-broken'
    : level === 3
      ? ' is-ready'
      : ''

  return (
    <div
      className={`special-bars__meter${counterAfterLabel ? ' special-bars__meter--machine' : ''}`}
    >
      <span className="special-bars__label">
        {counterAfterLabel ? (level === 3 ? 'SUPER' : 'LEVEL') : null}
        {counterAfterLabel && ' '}
        <span className="special-bars__count">{level}</span>
        {!counterAfterLabel && (level === 3 ? ' SUPER' : ' LEVEL')}
      </span>
      <div
        className={`special-bars__track${stateClass}`}
        role="progressbar"
        aria-label={`${label}: ${level} de 3 níveis especiais`}
        aria-valuemin={0}
        aria-valuemax={3}
        aria-valuenow={level}
      >
        {[1, 2, 3].map((segment) => (
          <span
            className={`special-bars__segment${segment <= level ? ' is-filled' : ''}`}
            key={segment}
          />
        ))}
      </div>
    </div>
  )
}
