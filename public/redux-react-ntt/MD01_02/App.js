import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getFormValues } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import * as conditionActions from './redux/condition';
import * as searcherActions from './redux/searcher';
import * as loadingActions from '../../core/loading/redux/loading';

import SearchCondition from './components/SearchCondition';
import SearchResult from './components/SearchResult';
import Loading from '../../core/loading/components/Loading';

const App = ({
    dispatch,
    searchCondition,
    appSearcherActions,
    searchResult,
    loadingResult
}) => {

    const onSelectAll = (event) => {
        appSearcherActions.selectAll(event.target.checked);
    };

    const onSelectOne = (index, event) => {
        appSearcherActions.selectOne(event.target.checked, index);
    };
    
    const onSearch = (event) => {
        // cancel form submission
        event.preventDefault();
        appSearcherActions.fetchData(searchCondition.form.values, 0, SystemPrefs.rowsPerPage);
    };

    const onPaginate = (page, event) => {
        // cancel form submission
        event.preventDefault();
        appSearcherActions.fetchData(searchCondition.form.values, page, SystemPrefs.rowsPerPage);
    };

    const handleExport = (event) => {
        event.preventDefault();
        var cuttingPoint = $("input[name=cuttingPoint]").val();
        var printer = $("select[name=printer]").val();
        var printList = [];
        let instanceList = [];
        $(".ckbArr:checked").each(function(i, input) {
            let tr = $(input).closest("tr");
            let level = $("input[name=level]", tr).val();
            let check = true;
            let instance = {};
            for (i = 0; i < printList.length; i++ ) {
                if (level == printList[i]) {
                    check = false;
                }
            }
            if (check == true) {
                printList.push(level);
                for (i = 0; i < searchResult.data.length; i++) {
                    if (searchResult.data[i].level == level) {
                        instance = {
                            whCode: searchResult.data[i].whCode,
                            customerCode:  searchResult.data[i].customerCode,
                            productNo: searchResult.data[i].productNo,
                            serialNo: searchResult.data[i].serialNo,
                            quantity: searchResult.data[i].quantity
                        };
                        instanceList.push(instance);
                        break;
                    } else {
                        for (var j = 0; j < searchResult.data[i].children.length; j++) {
                            if (searchResult.data[i].children[j].level == level) {
                                instance = {
                                    whCode: searchResult.data[i].whCode,
                                    customerCode:  searchResult.data[i].customerCode,
                                    productNo: searchResult.data[i].productNo,
                                    serialNo: searchResult.data[i].children[j].serialNo,
                                    quantity: searchResult.data[i].children[j].quantity
                                };
                                instanceList.push(instance);
                                break;
                            }
                        }
                    }
                }
            }
        });
        appSearcherActions.download(instanceList, cuttingPoint, printer);
    }

    return (
        <div>
            <SearchCondition loadingResult={loadingResult} onSearch={onSearch} />
            <SearchResult loadingResult={loadingResult} result={searchResult} onPaginate={onPaginate} handleExport={handleExport} onSelectAll={onSelectAll} onSelectOne={onSelectOne} />
        </div>
    );
};

App.propTypes = {
    dispatch: PropTypes.func,
    searchCondition: PropTypes.object,
    searchResult: PropTypes.object,
    loadingResult: PropTypes.object,
};

/* Component <-> State & Dispatch */
const mapDispatchToProps = (dispatch) => ({
    appConditionActions: bindActionCreators(conditionActions, dispatch),
    appSearcherActions: bindActionCreators(searcherActions, dispatch)
});

export default connect(createStructuredSelector({
    searchCondition: conditionActions.allConditionsSelector,
    searchResult: searcherActions.allResultsSelector,
    loadingResult: loadingActions.allLoadingSelector
}), mapDispatchToProps)(App);
