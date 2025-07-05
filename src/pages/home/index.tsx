import { Link } from 'react-router'

import reactLogo from '@assets/react.svg'
import viteLogo from '/images/vite.svg'

import '@shared/styles/home.css'

function HomePage() {
  return (
    <>
      <section>
        <h1>Home Page</h1>

        <div className="flex flex-row w-full justify-center">
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>

          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
      </section>

      <nav className="card">
        <h2>Pages:</h2>

        <div>
          <Link to="/404">404</Link>
        </div>
        <div>
          <Link to="/products">Products</Link>
        </div>
      </nav>
    </>
  )
}

export { HomePage }
