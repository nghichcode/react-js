import moment from 'moment';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { propTypes, Field, reduxForm } from 'redux-form';
import {
    Card, CardHeader, CardImg, CardText, CardBody,
    Modal, ModalHeader, ModalBody, ModalFooter,
    CardTitle, CardSubtitle, CardFooter, Button, Nav, NavItem, NavLink, TabContent, TabPane
} from 'reactstrap';
import CollapseData from './CollapseData';
import ModalPrint from './ModalPrint';
import Checkbox from './Checkbox';
import Pagination from '../../../components/ui/Pagination';

const SearchResult = ({
    result, loadingResult,
    onDelete, onPaginate, handleExport, onSelectAll, onSelectOne
}) => {
    if (_.isNull(result.metadata) || _.isUndefined(result.metadata)) {
        return null;
    }
    var isCheckAll = result.checkboxes.filter(function(c) {
        return c;
    }).length === result.checkboxes.length;
    var check = result.checkboxes.filter(function (c) {
        return c;
    });
    const currentPage = result.metadata.paging.currentPage;
    const totalPages = result.metadata.paging.totalPages;
    const totalElements = result.metadata.paging.totalElements;
    return (
    <form>
        <Card>
            <CardHeader>
                {totalElements > 0 &&
                    <span>{window.MessageService.getMessage('info.search_found', totalElements)}</span>
                }
                {totalElements == 0 &&
                    <span>{messages['info.search_not_found']}</span>
                }
            </CardHeader>
            {result && result.data && totalElements > 0 && (
                <table className="form-table table table-bordered stickyTable">
                    <colgroup>
                        <col width="5%" />
                        <col width="7%" />
                        <col width="10%" />
                        <col width="14%" />
                        <col width="20%" />
                        <col width="7%" />
                        <col width="7%" />
                        <col width="15%" />
                        <col width="15%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th style={{ textAlign: "center" }}>
                                <input type="checkbox" checked={isCheckAll} onChange={onSelectAll} />
                            </th>
                            <th style={{ textAlign: "left" }}>{messages['text.md01.divide_and_merge_whCode']}</th>
                            <th style={{ textAlign: "left" }}>{messages['text.md01.divide_and_merge_customerCode']}</th>
                            <th style={{ textAlign: "left" }}>{messages['text.common.product_no']}</th>
                            <th style={{ textAlign: "left" }}>{messages['text.common.serial_no']}</th>
                            <th style={{ textAlign: "left" }}>{messages['text.md01.divide_and_merge_quantity']}</th>
                            <th style={{ textAlign: "left" }}>{messages['text.md01.divide_and_merge']}</th>
                            <th style={{ textAlign: "right" }}>{messages['text.md01.divide_and_merge_operated_date']}</th>
                            <th style={{ textAlign: "left" }}>{messages['text.md01.divide_and_merge_operated_name']}</th>
                        </tr>

                    </thead>

                    <tbody>
                        {result.data.map(function(item, i) {
                                return (
                                        <React.Fragment>
                                        <CollapseData item={item} level={1} result={result} index={item.level} onSelectOne={onSelectOne}/>
                                        </React.Fragment>

                                )
                        })}

                    </tbody>

                </table>
            )}

            <CardFooter>
                {result && result.metadata && totalElements > 0 && (
                    <Pagination onPaginate={onPaginate} currentPage={currentPage} totalPages={totalPages} totalElements={totalElements} />
                )}
                <ModalPrint check={check} result={result} loadingResult={loadingResult} handleExport={handleExport} totalElements={totalElements}/>
            </CardFooter>
        </Card>
      </form>
    );
};

SearchResult.propTypes = {
    result: PropTypes.object,
    loadingResult: PropTypes.object,
    onDelete: PropTypes.func,
    onPaginate: PropTypes.func,
    handleExport: PropTypes.func,
    onSelectAll: PropTypes.func,
    onSelectOne: PropTypes.func
};

export default reduxForm({
    form: 'searchResultForm'
})(SearchResult)