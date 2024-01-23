import userEvent from '@testing-library/user-event'
import React, { Component } from 'react'
import sampleUsers from './users.js'
import { useSearchParams } from "react-router-dom";

export default function UserSingle() {

        const [searchParams, setSearchParams] = useSearchParams();      
        const userid = searchParams.get('userid')
        let user = sampleUsers.find(item => item.id == userid) 

    console.log(userid)
    return (
        <div className='single-user'>
            <div>{user.name} </div>
            <div>{user.username} </div>
            <div>{user.email} </div>                
        </div>
    )
}
