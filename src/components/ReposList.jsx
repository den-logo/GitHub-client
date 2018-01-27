import React, { Component } from 'react';
import axios from 'axios';
import { RepoCard } from './RepoCard.jsx';

export class ReposList extends Component {
  constructor(props){
    super(props);
    this.allRepos = [];
    this.page = 1;
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
    this.page = 1;
    this.setState({repos: []});
    this.getRepos(nextProps.username);
  }
  getRepos(userName){
    document.removeEventListener('scroll', this.trackScrolling);
    function isFork(fork){
        if(fork) return 'forked';
        return 'unforked';
    }
    function getupdatedDate(date){
      return date.slice(0, -1).split('T')[0];
    }
      axios.get('https://api.github.com/users/' + userName + '/repos?page=' + this.page + '&per_page=18')
        .then( (response) => {
            if(response.data.length !== 0) {
              response.data.forEach((rep, i) => {
                  this.allRepos.push(<RepoCard
                    key = { this.page + '.' + i }
                    repoName = { rep.name }
                    repoFullName = { rep.full_name }
                    url = { rep.html_url }
                    description = { rep.description }
                    language = { rep.language }
                    stars = { rep.stargazers_count }
                    fork = { isFork(rep.fork) }
                    updated = { getupdatedDate(rep.updated_at) } />)
              });
              this.page++;
              this.setState({repos: this.allRepos});
              document.addEventListener('scroll', this.trackScrolling);
            }
            document.getElementById('loader').style.display = 'none';
          })
        .catch( (error) => {
          console.log('error', error);
        });
  }
  isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }
  trackScrolling = () => {
    const wrappedElement = document.getElementById('repo-card-list');
    if (this.isBottom(wrappedElement)) {
      this.getRepos(this.props.username);
      document.getElementById('loader').style.display = 'block';
    }
  };
  render(){
    return (
      <div className="container">
        <ul className="container-fluid justify-content-center" id="repo-card-list">
          <div className="row repo-card-list">
            {this.allRepos}
          </div>
        </ul>
        <div className="mx-auto loader" id="loader"></div>
      </div>
    );
  }
}
