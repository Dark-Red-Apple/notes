import React, { Component } from 'react'
import { Switch } from 'react-router-dom';
import { BrowserRouter,Route } from 'react-router-dom/cjs/react-router-dom.min';
import NottFound from './NottFound';
import Shop2 from './Shop2';

 class Router2 extends Component {
    render() {
        return (
           <BrowserRouter>
           <Switch>
               <Route exact path="/" Component={Shop2}/>
               <Route path="/shop:shopid" Component={App2}/>
               <Route Component={NottFound}/>
           </Switch>
           </BrowserRouter>
        )
    }
}
export default Router2;