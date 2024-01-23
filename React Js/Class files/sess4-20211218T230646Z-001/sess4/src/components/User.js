import React, { Component } from 'react'

class User extends Component {
    render() {
        return (
            <li>
                <h3 style={{color: 'red'}}>User : {this.props.userName}</h3>
                <h4>from : {this.props.city}</h4>
                <p>
                    email : {this.props.email}
                </p>
            </li>
        )
    }
}

export default User;