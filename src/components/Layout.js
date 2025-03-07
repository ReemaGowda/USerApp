import React from 'react'
import { Link } from 'react-router-dom'

export function Navbar(){
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom box-shadow py-3 mb-3">
  <div className="container">
    <Link className="navbar-brand" to="/">Curd App</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link text-dark" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-dark" to="/userlist">Userlist</Link>
        </li>
        
      </ul>
     
    </div>
  </div>
</nav>

    )}


    export function Footer(){
        return(
            <footer>
                <div className='conatiner p-3 mt-5 border-top'>
                    <p className='d-block text-muted text-center'>&copy; Curd App 2023</p>

                </div>
            </footer>
        )
    }
