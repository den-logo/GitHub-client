/* global $ */
import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import axios from 'axios';
import { Modal } from './Modal.jsx';

export class RepoCard extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      modal: ''
    }
  }
  getHr(){
    if(this.props.description == null){
      return ''
    }
    return <hr />
  }
  jsxTranslate(jsx){
    return ReactDOMServer.renderToStaticMarkup(jsx);
  }
  componentDidMount(){
    this.setState({
      modal : <Modal id={this.props.repoName.split('.').join('')} />
    });
  }
  handleClick(){
    function jsxTranslate(jsx){
      return ReactDOMServer.renderToStaticMarkup(jsx);
    }
    let title = this.jsxTranslate(<a href={this.props.url}>{this.props.repoName}</a>);
    let tableRows = [];
    let source = '';
    let contributorsTable =
    <div className="text-center">
      <h4>Top Contributors</h4>
      <table className="table-striped">
        <thead>
          <tr>
            <th>User</th>
            <th>Contributions</th>
          </tr>
        </thead>
        <tbody>
          { tableRows }
        </tbody>
      </table>
    </div>
    let langsTable =
    <div className="text-center">
      <h4>Most used langs</h4>
      <table className="table-striped">
        <thead>
          <tr>
            <th>User</th>
            <th>Contributions</th>
          </tr>
        </thead>
        <tbody>
          { tableRows }
        </tbody>
      </table>
    </div>
    axios.get('https://api.github.com/repos/' + this.props.repoFullName + '/contributors')
      .then( (response) => {
        for(let i = 0; i < 3; i++){
          if(response.data[i]){
            tableRows.push(
              <tr>
                <td className="float-left">
                  <img className="rounded"
                    alt=''
                    src={ response.data[i].avatar_url }
                    style={{ height: 45, width: 45, marginRight: 5}} />
                  <a href={ response.data[i].html_url }>{ response.data[i].login }</a>
                </td>
                <td>
                  { response.data[i].contributions }
                </td>
              </tr>
            );
          } else{
            return '';
          }
        }
      })
      .catch( (error) => {
        console.log(error);
      });
    if(this.props.fork === 'forked'){
      axios.get('https://api.github.com/repos/' + this.props.repoFullName)
        .then( (response) => {
          source =
            <div className="">
              <label className="text-muted">Forked from</label>
              <a href={response.data.parent.html_url}> {response.data.parent.full_name}</a>
            </div>
        })
        .catch( (error) => {
          console.log(error);
        });
    }
    $('.modal').on('shown.bs.modal', function (e) {
    if(!tableRows.length)  contributorsTable = '';
    let modal = $(this);
      modal.find('.modal-title').html(title);
      modal.find('.modal-body').html(jsxTranslate(contributorsTable));
      modal.find('.repo-source').html(jsxTranslate(source));
    });
  }
  render() {
    return (
      <li className="repo-card col-xs-12 col-sm-6 col-lg-4">
        <div className="card">
          <div className="card-header text-center">
            <a href={this.props.url}>{ this.props.repoName }</a>
          </div>
          <div className="card-body">
            <div className="rep-description">{ this.props.description }</div>
            { this.getHr() }
            <ul className="list-inline">
              <li className="list-inlie-item">{ this.props.language }</li>
              <li className="list-inlie-item"> &#9733;{ this.props.stars }</li>
              <li className="list-inlie-item">{ this.props.fork }</li>
            </ul>
          </div>
          <div className="card-footer">
            <a href=""
               onClick={this.handleClick}
               className="card-link"
               data-toggle="modal"
               data-target={'#' + this.props.repoName.split('.').join('')} >
               See more
            </a>
            {this.state.modal}
            <i className="float-right text-muted clearfix">Updated on { this.props.updated }</i>
        </div>
        </div>
      </li>
    );
  }
}
