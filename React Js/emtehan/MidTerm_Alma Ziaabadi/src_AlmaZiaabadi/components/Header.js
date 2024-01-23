import React, { Component } from 'react'

export default class Header extends Component {
    render() {
        return (
            <div className="header" style={{
                textAlign: "center"}}
            ><div style={{
                width: "30%"}} >left</div><div style={{
                    width: "60%"}} 
            >Header</div><div style={{
                width: "30%"}} >right</div></div>
        )
    }
}
