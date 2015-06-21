import 'bootstrap';
import $ from 'jquery';
import React from 'react';
import Base from 'scripts/components/base/base';
import dispatcher from 'scripts/dispatchers/dispatcher';
import emitter from 'scripts/emitters/emitter';

export default class TodoModal extends Base {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      value: ''
    };

    this.bindMethods('onChange', 'save', 'reset');
  }

  componentDidMount() {
    this.$el = $(React.findDOMNode(this));
    this.$el.on('hidden.bs.modal', this.reset);

    emitter.on('todos-changed', () => {
      this.$el.modal('hide');
    });
  }

  componentWillUnmount() {
    emitter.off('todos-changed');
  }

  show() {
    this.$el.modal('show');
  }

  reset() {
    this.setState({ value: '' });
  }

  save() {
    dispatcher.dispatch({
      type: 'create-todo',
      content: {
        name: this.state.value,
        isComplete: false
      }
    });
  }

  onChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <div className="modal fade" tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                <span aria-hidden="true">&times;</span>
                <span className="sr-only">Close</span>
              </button>
              <h3 className="modal-title">New Task</h3>
            </div>
            <div className="modal-body">
              <input placeholder="Task name..." type="text" value={ this.state.value } onChange={ this.onChange } />
            </div>
            <div className="modal-footer">
              <div className="row">
                <div className="col col-md-12">
                  <button type="button" className="btn btn-primary pull-right" onClick={ this.save }>Save</button>
                  <button type="button" className="btn btn-default pull-right spacing-right" onClick={ this.reset } data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
