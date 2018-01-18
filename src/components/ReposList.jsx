import React, { Component } from 'react';
import axios from 'axios';
import { RepoCard } from './RepoCard.jsx';

export class ReposList extends Component {
  constructor(props){
    super(props);
    this.getRepos = this.getRepos.bind(this);
    this.state = {
      repos: ''
    }
  }

  getRepos(){
    var reposArr = [];
    let userName = this.props.username;
    var page = 1;
    function isFork(fork){
        if(fork) return 'forked';
        return 'unforked';
    }
    function getupdatedDate(date){
      return date.slice(0, -1).split('T')[0];
    }
      axios.get('https://api.github.com/users/' + userName + '/repos?page=' + page + '&per_page=40')
        .then( (response) => {
            response.data.forEach((rep) => {
                reposArr.push(<RepoCard
                  repoName = { rep.name }
                  description = { rep.description }
                  language = { rep.language }
                  stars = { rep.stargazers_count }
                  fork = { isFork(rep.fork) }
                  updated = { getupdatedDate(rep.updated_at) } />)
            });
            this.setState({repos: reposArr});
            page++;
          })
        .catch( (error) => {
          console.log(error);
        });
}
  render(){
    this.getRepos();
    return (
      <ul className="repo-card-list container justify-content-center ">
        <div className="row">
          {this.state.repos}
        </div>
      </ul>
    );
  }
}
