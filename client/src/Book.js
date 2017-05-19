import React, {Component} from 'react';

import $ from 'jquery'
import PubSub from 'pubsub-js'
import InputCustom from './component/InputCustom';
import ButtonCustom from './component/ButtonCustom';
import ErrorHandler from './ErrorHandler';

class BookForm extends Component {
  constructor() {
    super();
    this.state = {
      titleBook: '',
      price: '',
      price3: '',
      price4: '',
      authorId: ''
    };

    this.sendForm = this.sendForm.bind(this);
    this.setTitleBook = this.setTitleBook.bind(this);
    this.setPrice = this.setPrice.bind(this);
    this.setPrice3 = this.setPrice3.bind(this);
    this.setPrice4 = this.setPrice4.bind(this);
    this.setAuthorId = this.setAuthorId.bind(this);
  }

  sendForm(event) {
    event.preventDefault();

    $.ajax({
      url: 'http://localhost:3001/books',
      contentType: 'application/json',
      dataType: 'json',
      type: 'post',
      data: JSON.stringify({
        title: this.state.price3,
        price: this.state.price,
        authorId: this.state.price4
      }),
      success: function (res) {
        console.log('suuuuuuccccccess');
        PubSub.publish('book.newList', res);
        this.setState({price3:'', price:'', price4: ''});
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

  setTitleBook(event) {
    console.log(event);
    this.setTitleBook({titleBook: event.target.value})
  }

  setPrice3(event) {
    console.log(event);
    this.setState({price3: event.target.value})
  }

  setPrice(event) {
    console.log(event);
    this.setState({price: event.target.value})
  }

  setPrice4(event) {
    console.log(event);
    this.setState({price4: event.target.value})
  }

  setAuthorId(event) {
    console.log(event);
    this.setAuthorId({authorId: event.target.value})
  }

  render(){
    return (
      <div className="pure-form pure-form-aligned">
        <form className="pure-form pure-form-aligned" method="post" onSubmit={this.sendForm}>

          <InputCustom id="titlee" type="text" name="titlee" label="Title" value={this.state.price3} onChange={this.setPrice3}/>

          <InputCustom id="price" type="text" name="price" label="Price" value={this.state.price} onChange={this.setPrice}/>

          <div className="pure-control-group">
            <label htmlFor="authorId">Author</label>
            <select id="authorId" name="authorId" value={this.state.price4} onChange={this.setPrice4}>
              <option value="">Select the author</option>
              {this.props.authors.map(function(author){
                return (
                  <option key={author.id} value={author.id}>{author.name}</option>
                )
              })}
          </select>
            <span className="error">{this.state.msgError}</span>
          </div>

          <ButtonCustom label="Save"/>

        </form>
      </div>
    );
  }
}

class BookTable extends Component {

  render(){
    return(
      <div>
        <table className="pure-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.list.map(book =>
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.price}</td>
                  <td>{book.author.name}</td>
                </tr>
              )
            }
          </tbody>
        </table>
    </div>
    );
  }
}

export default class BookBox extends Component{
  constructor(){
    super();
    this.state = {list: [], authors:[]};
  }

  componentDidMount(){
    $.ajax({
      url: 'http://localhost:3001/books',
      dataType: 'json',
      success: function(res){
        this.setState({list: res});
      }.bind(this)
    });

    $.ajax({
      url: 'http://localhost:3001/authors',
      dataType: 'json',
      success: function(res){
        this.setState({authors: res});
      }.bind(this)
    });

    PubSub.subscribe('book.newList', function(topic, newList){
      this.setState({list: newList})
    }.bind(this));
  }

  render(){
    return(
      <div>
        <div className="header">
          <h1>Book's registration</h1>
        </div>
        <div className="content" id="content">
          <BookForm authors={this.state.authors}/>
          <BookTable list={this.state.list}/>
        </div>
      </div>
    );
  }
}
