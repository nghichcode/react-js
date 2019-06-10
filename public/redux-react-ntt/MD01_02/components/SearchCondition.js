import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { propTypes, Field, reduxForm } from 'redux-form';
import {
    Card, CardHeader, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, CardFooter, Button, Nav, NavItem, NavLink, TabContent, TabPane
} from 'reactstrap';
import Select from 'react-select';
import classnames from 'classnames';
import Select2 from 'react-select2-wrapper';
import DateAutofill from '../../../components/ui/DateAutofill';

const whDefault = _.find(UserSession.warehouses, function(w) { return w.is_default; });
const customerDefault = _.find(UserSession.owners, function(o) { return o.is_default; });
const statusDefault = _.find(MergeDivideType);

class SearchCondition extends Component {
    /* Properties */
    static propTypes = {
        ...propTypes,
        loadingResult: PropTypes.object,
        onSearch: PropTypes.func
    }

    /* Constructors */
    constructor(props) {
        super(props);
    }

    render() {
        const { loadingResult, onSearch } = this.props;
        const warehouses = _.chain([])
            .concat(UserSession.warehouses).map(function(n) {
                return {
                    id: n.wh_code,
                    text: n.wh_name
                }
            }).value();

        const mergeDivideTypes = [];
        Object.keys(MergeDivideType).forEach(function(key) {
            var value = MergeDivideType[key];
            mergeDivideTypes.push({
                id: value,
                text: messages['text.md01.divide_and_merge_' + value]
            });
        });

        const customers = _.chain([]).concat(UserSession.owners).map(function(n) {
            return {
                id: n.owner_code,
                text: n.owner_name
            }
        }).value();
        return (
            <div>
                <form>
                    <Card>
                        <CardHeader>
                            {messages['text.common.search_condition']}
                        </CardHeader>

                        <table className="form-table table table-bordered table-stripped">
                            <colgroup>
                                <col width="20%" />
                                <col width="30%" />
                                <col width="20%" />
                                <col width="30%" />
                            </colgroup>
                            <tbody>
                                <tr>
                                    <td className="control-label">{messages['text.common.warehouse']}</td>
                                    <td>
                                        <Field name="whCode" tabIndex="0"
                                            component={props =>
                                                <Select2
                                                    value={props.input.value}
                                                    onChange={props.input.onChange}
                                                    onBlur={() => props.input.onBlur(props.input.value)}
                                                    data={warehouses}
                                                    options={{
                                                        width: '100%',
                                                        theme: 'bootstrap'
                                                    }}
                                                />
                                            }
                                        />
                                    </td>
                                    <td className="control-label">{messages['text.common.customer']}</td>
                                    <td>
                                        <Field name="customerCode" tabIndex="0"
                                            component={props =>
                                                <Select2
                                                    value={props.input.value}
                                                    onChange={props.input.onChange}
                                                    onBlur={() => props.input.onBlur(props.input.value)}
                                                    data={customers}
                                                    options={{
                                                        width: '100%',
                                                        theme: 'bootstrap'
                                                    }}
                                                />
                                            }
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="control-label">{messages['text.common.product_no']}</td>
                                    <td><Field component="input" name="productNo" className="form-control" tabIndex="0" type="text" maxLength="50" /></td>
                                    <td className="control-label">{messages['text.common.serial_no']}</td>
                                    <td><Field component="input" name="serialNo" className="form-control" tabIndex="0" type="text" maxLength="50" /></td>
                                </tr>
                                <tr>
                                    <td className="control-label">{messages['text.md01.divide_and_merge']}</td>
                                    <td name="mergeDivideTypes">
                                        <Field name="mergeDivideType" tabIndex="0"
                                            component={props =>
                                                <Select2
                                                    name="mergeDivideType"
                                                    defaultValue={0}
                                                    value={props.input.value}
                                                    onChange={(e) => { props.input.onChange(e); handleSelect(e); }}
                                                    onBlur={() => props.input.onBlur(props.input.value)}
                                                    data={mergeDivideTypes}
                                                    options={
                                                        {
                                                            theme: 'bootstrap',
                                                            width: '100%'
                                                        }
                                                    }
                                                />
                                            }
                                        />
                                    </td>
                                    <td className="control-label">{messages['text.common.stock_in_date']}</td>
                                    <td>
                                        <div className="input-group">
                                            <Field component={DateAutofill} name="stockInDateForm" tabIndex="0" />
                                            <div className="input-group-append">
                                                <span className="input-group-text">{messages['text.common.to']}</span>
                                            </div>
                                            <Field component={DateAutofill} name="stockInDateTo" tabIndex="0" />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <CardFooter>
                            {loadingResult && loadingResult.isLoading ?
                                <button type="submit" className="button btn btn-primary" disabled>
                                    {loadingResult && loadingResult.isLoading && <i className="fa fa-refresh fa-spin"></i>}{' '}
                                {messages['text.common.search']}
                                </button>
                                :
                                <button type="submit" className="button btn btn-primary" onClick={onSearch} tabIndex="0">
                                    <i className="fa fa-search" aria-hidden="true"></i>{' '}
                                {messages['text.common.search']}
                                </button>
                            }
                        </CardFooter>
                    </Card>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'searchConditionForm',
    initialValues: {
        whCode: whDefault.wh_code,
        mergeDivideType: statusDefault,
        customerCode: customerDefault.owner_code
    }
})(SearchCondition)