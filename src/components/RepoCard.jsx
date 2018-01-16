import React, { Component } from 'react';

class RepoCard extends Component{
  render(){
    return(
      <div className="container">
        <div className="row">
          <div className="col-sm-3">

            <div class="card">
              <div class="card-header">Header</div>
              <div class="card-body">Content</div>
              <div class="card-footer">Footer</div>
            </div>
            
          </div>
        </div>
      </div>
    );
  }
}
