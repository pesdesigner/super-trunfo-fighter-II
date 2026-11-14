import packageJson from '../../package.json'
import './AppFooter.css'

function AppFooter() {
  return (
    <footer className="app-footer">
      <span>Versão {packageJson.version}</span>
      <a
        href="https://github.com/pesdesigner"
        target="_blank"
        rel="noreferrer"
      >
        GitHub · @pesdesigner
      </a>
    </footer>
  )
}

export default AppFooter