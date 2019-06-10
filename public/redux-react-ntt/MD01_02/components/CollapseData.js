import PropTypes from 'prop-types';
import moment from 'moment';
import React, { Component } from 'react';
import { propTypes, Field, reduxForm , change} from 'redux-form';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';
import numeral from 'numeral';
import Checkbox from './Checkbox';
export default class CollapseData extends Component {

    /* Constructors */
    constructor(props) {
        super(props);
        /* State */
        this.state = {
            isOpened: true
        }

        this.toggle = this.toggle.bind(this);
        this.close = this.close.bind(this);
    }

    toggle() {
        this.setState({
            isOpened: !this.state.isOpened
        });
    }

    close() {
        this.setState({
            isOpened: false,
        });
    }

    render() {
        const {item, level, index, result, onSelectOne} = this.props;
        const paddingLeft = level * 20;
        const emptyPadding = _.isEmpty(item.children) ? 20 : 0;
        return (
                <React.Fragment>
                    {this.state.isOpened && (
                       <React.Fragment>
                         <tr style={{ background: '#F3F3F3' }}>
                             <td style={{ textAlign: "center" }}>
                                 <Checkbox checked={result.checkboxes[index]} onChange={onSelectOne.bind(this, index)} />
                                 </td>
                                 <td style={{ textAlign: "left" }}>{item.whCode}</td>
                                 <td style={{ textAlign: "left" }}>{item.customerCode}</td>
                                 <td style={{ textAlign: "left" }}>{item.productNo}</td>

                            <td style={{ textAlign: "left" }}>
                                {_.isEmpty(item.children) ? <span style={{paddingLeft: emptyPadding }}><i className="fa fa-barcode"></i></span> : null}
                                {_.isEmpty(item.children) ? null : this.state.isOpened ? <i className="fa fa-minus-square" onClick={this.toggle} ></i> : <i className="fa fa-plus-square" onClick={this.toggle} ></i> }
                                {' '}<span className="serial-number qr-code">{item.serialNo}</span>
                            </td>
                            <td style={{ textAlign: "left" }}>{item.quantity}</td>
                            <td style={{ textAlign: "left" }}>{item.action}</td>
                            <td style={{ textAlign: "right" }}>{moment([item.updatedDate[0], item.updatedDate[1] - 1, item.updatedDate[2], item.updatedDate[3], item.updatedDate[4], item.updatedDate[5]]).format(SystemPrefs.dateTimeFormat)}</td>
                            <td style={{ textAlign: "left" }}>{item.userName}</td>
                            <input type="hidden" value={item.level} name="level" />
                        </tr>

                        {item.children && item.children.map((children, j) =>
                        <CollapseData item={children} level={1} result={result} index={children.level} onSelectOne={onSelectOne}/>
                        )}
                     </React.Fragment>
                    )}

                    {!this.state.isOpened && (
                        <React.Fragment>
                            <tr style={{ background: '#F3F3F3' }}>
                                <td style={{ textAlign: "center" }}>
                                 <Checkbox checked={result.checkboxes[index]} onChange={onSelectOne.bind(this, index)} />
                                 </td>
                                 <td style={{ textAlign: "left" }}>{item.whCode}</td>
                                 <td style={{ textAlign: "left" }}>{item.customerCode}</td>
                                 <td style={{ textAlign: "left" }}>{item.productNo}</td>

                                 <td style={{ textAlign: "left" }}>
                                     {_.isEmpty(item.children) ? <span style={{paddingLeft: emptyPadding }}><i className="fa fa-barcode"></i></span> : null}
                                     {_.isEmpty(item.children) ? null : this.state.isOpened ? <i className="fa fa-minus-square" onClick={this.toggle} ></i> : <i className="fa fa-plus-square" onClick={this.toggle} ></i> }
                                     {' '}<span className="serial-number qr-code">{item.serialNo}</span>
                                </td>
                                <td style={{ textAlign: "left" }}>{item.quantity}</td>
                                <td style={{ textAlign: "left" }}>{item.action}</td>
                                <td style={{ textAlign: "right" }}>{moment(item.updatedDate).format(SystemPrefs.dateTimeFormat)}</td>
                                <td style={{ textAlign: "left" }}>{item.userName}</td>
                                <input type="hidden" value={item.level} name="level" />
                            </tr>
                        </React.Fragment>
                    )}
                </React.Fragment>
        );
    }

}