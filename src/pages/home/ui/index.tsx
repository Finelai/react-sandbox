import { Link } from 'react-router'

import { ROUTE_CONSTANTS } from '@shared/consts'

import reactLogo from '@assets/react.svg'
import viteLogo from '/images/vite.svg'

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
          <Link to={ROUTE_CONSTANTS.NOT_FOUND}>
            {ROUTE_CONSTANTS.NOT_FOUND.substring(1)}
          </Link>
        </div>
        <div>
          <Link to={ROUTE_CONSTANTS.PRODUCT}>
            {ROUTE_CONSTANTS.PRODUCT.substring(1)}
          </Link>
        </div>
        <div>
          <Link to={ROUTE_CONSTANTS.CALLS}>
            {ROUTE_CONSTANTS.CALLS.substring(1)}
          </Link>
        </div>
      </nav>
    </>
  )
}

export { HomePage }
