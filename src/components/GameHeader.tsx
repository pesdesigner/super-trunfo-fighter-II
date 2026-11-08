import './GameHeader.css'

function GameHeader() {
  return (
    <header className="game-header">
      <h1>
        <img
          className="game-header__logo"
          src="/images/logo-super-trunfo-fighter-ii-web.png"
          alt="Super Trunfo Fighter II"
        />
      </h1>
      <p className="game-header__eyebrow">Uma nova luta está começando</p>
    </header>
  )
}

export default GameHeader