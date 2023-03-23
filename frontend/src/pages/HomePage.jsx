import React from 'react'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div>
        <header>
            <nav className="navbar bg-primary">
                <div className="container">
                    <Link to="/" className="navbar-brand" >DevPOS</Link>
                </div>
            </nav>

        </header>
        <main>

        </main>
    </div>
  )
}

export default HomePage