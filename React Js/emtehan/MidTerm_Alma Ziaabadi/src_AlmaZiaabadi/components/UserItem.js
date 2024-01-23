import React, { Component } from 'react'


export default class UserItem extends Component {
    render() {
        return (
            <div className='user-item'>     
                <div className='user-item-cont'>
                    <img src={this.props.image} />
                    <div>{this.props.name}</div> 
                    <div>{this.props.email}</div> 
                    <div>{this.props.phone}</div>                 
                    <a className='showButton' href={`/user?userid=${this.props.id}`}>Show</a>
                </div>           
            </div>            

          )
    }
}

