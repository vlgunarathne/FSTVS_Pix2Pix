import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Train from './Train';
import Test from './Test';
import registerServiceWorker from './registerServiceWorker';
import {Route, BrowserRouter, Switch} from 'react-router-dom'

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Test}/>
            <Route path="/train" component={Train}/>
            <Route path="/test" component={Test}/>
        </Switch>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
