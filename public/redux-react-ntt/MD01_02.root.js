import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App, { configureStore } from './MD01_02';

const store = configureStore();
class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
}

ReactDOM.render(
    <Root />,
    document.getElementById('root')
);