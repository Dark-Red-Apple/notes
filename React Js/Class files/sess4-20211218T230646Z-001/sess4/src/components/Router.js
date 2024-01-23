import React, { Component } from 'react';
import {BrowserRouter , Switch , Route} from 'react-router-dom';
import Test from './Test';
import App from '../App';
import NotFound from './NotFound';

class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Test}/>
                    <Route path="/shop/:shopId" component={App}/>
                    <Route component={NotFound}/>
                    
                </Switch>
                
            </BrowserRouter>
        )
    }
}
export default Router;