import React, { Component } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import App from "./App.js"
import UserSingle from "./UserSingle.js"
import NotFound from "./NotFound.js"

export default class Router extends Component {
    render() {
        return (
            <BrowserRouter> 
                <Routes>
                    <Route exact path="/" element={<App />} />
                    <Route path="/user" element={<UserSingle />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        )
    }
}
