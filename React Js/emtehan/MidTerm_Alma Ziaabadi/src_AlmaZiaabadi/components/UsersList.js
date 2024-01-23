import React, { Component } from 'react'
import UserItem from './UserItem'

export default class UserList extends Component {
    render() {
        return (
            <div className='userItems'>
                
                {
                this.props.foundItems.length != 0 ?
                this.props.foundItems.map((user,index)=>{
                            
                    return <UserItem
                    name = {user.name}
                    image = {user.image}
                    email = {user.email}
                    phone = {user.phone}
                    id = {user.id}
                    key = {index}                           
                    />
                    
                }): ''
                }

            </div>
        )
    }
}
