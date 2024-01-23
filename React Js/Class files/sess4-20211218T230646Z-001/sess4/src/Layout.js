import React, { Component } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

class Layout extends Component {
    render() {
        return (
            <>
                <Header />
                <Main />
                <Footer >this is footer</Footer>
            </>
        )
    }
}

export default Layout;
