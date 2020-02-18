import React, { Component } from 'react'
import './App.css';
import logo from './images/coctail-logo.svg';
import Search from './components/Search/Search';

class App extends Component {
    render() {
        const sharp = "#";
        return(
            <div className="wrapper">
                <header>
                    <strong className="logo"><a href={sharp}><img src={logo} alt=""/></a></strong>
                    <span className="slogan">Find your way</span>
                </header>
                <main className="main">
                    <Search />
                </main>
            </div>
        )
    }
}

export default App;