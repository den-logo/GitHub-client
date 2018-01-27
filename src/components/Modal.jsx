import React, { Component } from 'react';

export class Modal extends Component {
  render(){
    return(
      <div className="modal fade"
        id={this.props.id}
        tabIndex="-1"
        role="dialog"
        aria-labelledby=""
        aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle"></h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body"></div>
            <div className="modal-footer inline">
              <div className="repo-source mr-auto"></div>
              <button type="button" className="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
