import React, { Component } from 'react';
import axios from 'axios';
import { ReposList } from './ReposList.jsx';

export class UserNameInput extends Component{
  constructor(props){
    super(props);
    this.state = {
      value: '',
      repos: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleChange(event){
    this.setState({value: event.target.value});
  }
  handleClick(){
    let userName = this.state.value;
    axios.get('https://api.github.com/users/'+ userName + '/repos?page=1&per_page=40')
      .then( (response) => {
        this.setState({
          repos: <ReposList username= {this.state.value}/>
        })
      })
      .catch( (error) => {
        this.setState({
          repos:
            <div className="container alert alert-danger mx-auto text-center alert-dismissable"
                style={{width: 300, margin: 10}} id='warning-alert'>
                  <strong>Invalid username!</strong>
            </div>
        });
      });
  };
  render(){
    return (
      <div className= "container-fluid">
        <div className="row justify-content-center form" id="user-name-form">
          <input type="search"
            id="user-name-input"
            placeholder="Enter GitHub username"
            value={this.state.value}
            onChange={this.handleChange} />
          <span className="input-group-btn">
                <button className="btn btn-secondary"
                  id="search-button"
                  type="button"
                  onClick={this.handleClick}
                  >Search
                </button>
          </span>
        </div>
        {this.state.repos}
      </div>
    );
  }
}
