import React, { Component } from 'react';

export class RepoCard extends Component {
  getHr(){
    if(this.props.description == null){
      return ''
    }
    return <hr />
  }
  render() {
    return (
      <li className="col-4 repo-card">
        <div className="card">
          <div className="card-header text-center">
            <a href={this.props.url}>{ this.props.repoName }</a>
          </div>
          <div className="card-body">
            <div class="rep-description">{ this.props.description }</div>
            { this.getHr() }
            <ul className="list-inline">
              <li className="list-inlie-item">{ this.props.language }</li>
              <li className="list-inlie-item"> &#9733;{ this.props.stars }</li>
              <li className="list-inlie-item">{ this.props.fork }</li>
            </ul>
          </div>
          <div className="card-footer"><i className="float-right text-muted">Updated on { this.props.updated }</i></div>
        </div>
      </li>
    );
  }
}
