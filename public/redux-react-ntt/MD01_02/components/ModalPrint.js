import React, { Component } from 'react';
import { propTypes, Field, reduxForm } from 'redux-form';
import Select2 from 'react-select2-wrapper';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalPrint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
    this.togglePrint = this.togglePrint.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
    this.props.result.modal = !this.state.modal;
  }
  togglePrint(e) {
    this.props.handleExport(e);
  }

  render() {
    const {check, result, loadingResult, handleExport, totalElements} = this.props;
    return (
      <div>
      {result && result.metadata && totalElements > 0 && (
              (check.length == 0) || (loadingResult && loadingResult.isLoading) ?
                      <Button name="printButton" color="primary" disabled>
                      {messages['text.md01.divide_and_merge_print']}
                  </Button>
                  :
                      <Button name="printButton" color="primary" onClick={this.toggle}>
                      {messages['text.md01.divide_and_merge_print']}
                  </Button>
          )}
        <Modal isOpen={this.props.result.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{messages['text.md01.divide_and_merge_modal_title']}</ModalHeader>
          <ModalBody>
          <table className="form-table table table-bordered stickyTable">
              <tr>
                  <td className="control-label">{messages['text.pr01.cutting_point']}
                      <span style={{opacity:'0.5'}}>{' '}(1-100)</span>
                      <span className="required">{' '}*</span></td>
                  <td><Field component="input" type="number" onKeyPress={this.handleNumber} name="cuttingPoint" className="form-control"/></td>
              </tr>
              <tr>
                  <td className="control-label">{messages['text.pr01.printer']}
                      <span className="required">{' '}*</span></td>
                  <td name="printer">
                      <Field name="printer"
                          component={props =>
                              <Select2
                                    name="printer"
                                  value={props.input.value}
                                  onChange={props.input.onChange}
                                  onBlur={() => props.input.onBlur(props.input.value)}
                                  data={[
                                      { id: props.input.value, text: props.input.value }
                                  ]}
                                  options={{
                                      theme: 'bootstrap',
                                      width: '100%',
                                      ajax: {
                                          url: `${ACTION_PATH}/api/printers/search.json`,
                                          dataType: 'json',
                                          // Additional AJAX parameters go here; see the end of this chapter for the full code of this example
                                          processResults: function(data) {
                                              const items = _.map(data.data, function(item) {
                                                  return {
                                                      id: item.printerId.name,
                                                      text: item.printerId.name
                                                  }
                                              });
                                              return {
                                                  results: items
                                              };
                                          }
                                      }
                                  }}
                              />
                          }
                      />
                  </td>
              </tr>
          </table>
          </ModalBody>
          <ModalFooter>
              <Button color="secondary" onClick={this.toggle}>{messages['text.common.cancel']}</Button>{' '}
              {result && result.metadata && totalElements > 0 && (
                  (($("select[name=printer]").val() != "") && ($("input[name=cuttingPoint]").val() != "")) ?
                        <Button name="goToPrint" color="primary" onClick={(e) => this.togglePrint(e)} >{messages['text.common.print']}</Button>
                        :
                        <Button color="primary" disabled>{messages['text.common.print']}</Button>
              )}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalPrint;