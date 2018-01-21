import React, { Component } from 'react';
import axios from 'axios';
import { RepoCard } from './RepoCard.jsx';


export class ReposList extends Component {
  constructor(props){
    super(props);
    this.allRepos = [];
    this.getRepos = this.getRepos.bind(this);
    this.state = {
      repos: []
    };
  }
  componentWillMount(){
    this.getRepos(this.props.username);
  }
  componentWillReceiveProps(nextProps){
    this.allRepos = [];
    this.setState({repos: []});
    this.getRepos(nextProps.username);
  }
  getRepos(userName){
    let page = 1;
    function isFork(fork){
        if(fork) return 'forked';
        return 'unforked';
    }
    function getupdatedDate(date){
      return date.slice(0, -1).split('T')[0];
    }
      axios.get('https://api.github.com/users/' + userName + '/repos?page=' + page + '&per_page=40')
        .then( (response) => {
            response.data.forEach((rep, i) => {
                this.allRepos.push(<RepoCard
                  key = { this.page + '.' + i }
                  repoName = { rep.name }
                  url = { rep.html_url }
                  description = { rep.description }
                  language = { rep.language }
                  stars = { rep.stargazers_count }
                  fork = { isFork(rep.fork) }
                  updated = { getupdatedDate(rep.updated_at) } />)
            });
            page++;
            this.setState({repos: this.allRepos});
          })
        .catch( (error) => {
          console.log('error', error);
        });
  }
  render(){
    console.log(this.state.repos, this.allRepos);
    return (
      <ul className="repo-card-list container justify-content-center " id="repo-card-list">
        <div className="card-columns">
          {this.allRepos}
        </div>
      </ul>
    );
  }
}
