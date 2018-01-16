import React, { Component } from 'react';
import axios from 'axios';

export class ReposList extends Component{
  getRepos(){
    let userName = this.props.username;
    axios.get('https://api.github.com/users/' + userName + '/repos?page=1&per_page=40')
      .then( (response) => {
           console.log(response.date[0].full_name);
      })
      .catch( (error) => {
        return <div>The End</div>;
      });
  }
  render(){
    return <div>{this.props.username}</div>;
  }
}
