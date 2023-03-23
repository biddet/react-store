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
            <div className="container mt-3">
              <div className="bg-light p-5 mt-4 rounded-3">
                    <h1>Welcome to the simple POS for small businesses</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur numquam minima quis ex voluptatem doloremque excepturi nostrum omnis quos sapiente, nihil unde laborum quidem similique sint quam dicta aut fugiat.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt numquam explicabo accusamus consequuntur praesentium qui maxime, ad neque sint, sed rem doloremque aliquam itaque odit minima, aspernatur ex quidem accusantium?</p>
                    <Link to="/pos" className="btn btn-primary"> Click here to sell products</Link>
              </div>


            </div>
        </main>
    </div>
  )
}

export default HomePage