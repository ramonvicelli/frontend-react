import React, {Component} from 'react';

import $ from 'jquery'
import PubSub from 'pubsub-js'
import InputCustom from './component/InputCustom';
import ButtonCustom from './component/ButtonCustom';
import ErrorHandler from './ErrorHandler';

class AuthorForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: ''
    };

    this.sendForm = this.sendForm.bind(this);
  }

  sendForm(event) {
    event.preventDefault();

    $.ajax({
      url: 'http://localhost:3001/authors',
      contentType: 'application/json',
      dataType: 'json',
      type: 'post',
      data: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      }),
      success: function (res) {
        PubSub.publish('author.newList', res);
        this.setState({name:'', email:'', password: ''});
      }.bind(this),
      error: function (res) {
        if(res.status === 400){
          new ErrorHandler().publisher(res.responseJSON);
        }
      },
      beforeSend: function(){
        PubSub.publish('error-clean', {});
      }
    });
  }

  updateFormState(name, event) {
    this.setState({[name]: event.target.value});
  }

  render(){
    return (
      <div className="pure-form pure-form-aligned">
        <form className="pure-form pure-form-aligned" method="post" onSubmit={this.sendForm}>

          <InputCustom id="nome" type="text" name="name" label="Name" value={this.state.name} onChange={this.updateFormState.bind(this, 'name')}/>

          <InputCustom id="email" type="email" name="email" label="Email" value={this.state.email} onChange={this.updateFormState.bind(this, 'email')}/>

          <InputCustom id="password" type="password" name="password" label="Password" value={this.state.password} onChange={this.updateFormState.bind(this, 'password')}/>

          <ButtonCustom label="Save"/>

        </form>
      </div>
    );
  }
}

class AuthorTable extends Component {

  render(){
    return(
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
              this.props.list.map(author =>
                <tr key={author.id}>
                  <td>{author.name}</td>
                  <td>{author.email}</td>
                </tr>
              )
            }
          </tbody>
        </table>
    </div>
    );
  }
}

export default class AuthorBox extends Component {

  constructor(){
    super();
    this.state = {list: []};
  }

  componentDidMount(){
    $.ajax({
      url: 'http://localhost:3001/authors',
      dataType: 'json',
      success: function(res){
        this.setState({list: res});
      }.bind(this)
    });

    PubSub.subscribe('author.newList', function(topic, newList){
      this.setState({list: newList})
    }.bind(this));
  }

  render(){
    return (
      <div>
         <div className="header">
              <h1>Author's registration</h1>
          </div>
          <div className="content" id="content">
            <AuthorForm/>
            <AuthorTable list={this.state.list}/>
          </div>
      </div>
    );
  }
}
