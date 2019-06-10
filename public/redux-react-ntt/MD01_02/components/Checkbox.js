import PropTypes from 'prop-types';
import React, { Component } from 'react';
export default class Checkbox extends Component {
    static PropTypes = {
        checked: PropTypes.bool,
        onChange: PropTypes.func
    }

    render() {
        return (
            <input type="checkbox" checked={this.props.checked} onChange={this.props.onChange} className="ckbArr"/>
        );
    }
}