import React, { Component } from 'react';

import './css/pure-min.css';
import './css/side-menu.css';

import {AuthorForm, AuthorTable} from './Author';

class App extends Component {

  //antes de chamar o render
  componentWillMount(){}

  //depois de chamar o render 1x
  componentDidMount(){}

  render() {
    return (
        <div id="layout">
            <a href="#menu" id="menuLink" className="menu-link">
                <span></span>
            </a>

            <div id="menu">
                <div className="pure-menu">
                    <a className="pure-menu-heading" href="#">Home</a>

                    <ul className="pure-menu-list">
                        <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
                        <li className="pure-menu-item"><a href="#" className="pure-menu-link">Author</a></li>
                        <li className="pure-menu-item"><a href="#" className="pure-menu-link">Book</a></li>
                    </ul>
                </div>
            </div>

            <div id="main">
                <div className="header">
                    <h1>Cadastro de Autores</h1>
                </div>
                <div className="content" id="content">

                    <AuthorForm/>
                    <AuthorTable/>

                </div>
            </div>
        </div>
    );
  }
}

export default App;
