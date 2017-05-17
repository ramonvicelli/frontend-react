import React, { Component } from 'react';

import './css/pure-min.css';
import './css/side-menu.css';

import $ from 'jquery'

class App extends Component {

  constructor(){
    super();
    this.state = {
        list: [],
        name: '',
        email: '',
        password: ''
    };
    this.sendForm = this.sendForm.bind(this);
    this.setName = this.setName.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);
  }

  //antes de chamar o render
  componentWillMount(){}

  //depois de chamar o render 1x
  componentDidMount(){
      $.ajax({
        url: 'http://localhost:3001/authors',
        dataType: 'json',
        success: function(res){
             this.setState({list: res});
        }.bind(this)
      });
  }

  sendForm(event){
      event.preventDefault();

      $.ajax({
          url: 'http://localhost:3001/authors',
          contentType: 'application/json',
          dataType: 'json',
          type: 'post',
          data: JSON.stringify({name: this.state.name, email: this.state.email, password:this.state.password}),
          success: function(res){
              console.log('success');
          },
          error: function(res){
              console.log('error');
          }
      });
  }

  setName(event){
      this.setState({name: event.target.value})
  }
  
  setEmail(event){
      this.setState({email: event.target.value})
  }

  setPassword(event){
      this.setState({password: event.target.value})
  }
  
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
                    <div className="pure-form pure-form-aligned">
                        <form className="pure-form pure-form-aligned" method="post" onSubmit={this.sendForm}>
                            <div className="pure-control-group">
                                <label htmlFor="nome">Nome</label> 
                                <input id="nome" type="text" name="nome" value={this.state.name} onChange={this.setName}/>
                            </div>
                            <div className="pure-control-group">
                                <label htmlFor="email">Email</label>
                                <input id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail}/>
                            </div>
                            <div className="pure-control-group">
                                <label htmlFor="senha">Senha</label>
                                <input id="senha" type="password" name="senha" value={this.state.password} onChange={this.setPassword}/>
                            </div>
                            <div className="pure-control-group">
                                <label></label>
                                <button type="submit" className="pure-button pure-button-primary">Gravar</button>
                            </div>
                        </form>
                    </div>
                    <div>
                        <table className="pure-table">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.list.map(author =>
                                        <tr key={author.id}>
                                            <td>{author.name}</td>
                                            <td>{author.email}</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table> 
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default App;
