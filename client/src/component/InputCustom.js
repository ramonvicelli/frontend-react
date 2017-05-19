import React, { Component } from 'react';
import PubSub from 'pubsub-js';

export default class InputCustom extends Component {

    constructor(){
      super();
      this.state = {msgError: ''};
    }

    componentDidMount(){
      PubSub.subscribe('error-validation', function(topic, error){
        if(this.props.name === error.field){
          this.setState({msgError: error.defaultMessage});
        }
      }.bind(this));

      PubSub.subscribe('error-clean', function(topic){
          this.setState({msgError: ''});
      }.bind(this));
    }

    render(){
        return (
            <div className="pure-control-group">
                <label htmlFor="{this.props.id}">{this.props.label}</label>
                <input {...this.props}/>
                <span className="error">{this.state.msgError}</span>
            </div>
        );
    }
}
