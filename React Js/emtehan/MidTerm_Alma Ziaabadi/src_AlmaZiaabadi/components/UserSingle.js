import userEvent from '@testing-library/user-event'
import React, { Component } from 'react'
import sampleUsers from './users.js'
import Header from './Header'
import Footer from './Footer'
import { useSearchParams } from "react-router-dom";
import './../css/userSingle.css'


export default function UserSingle() {
    // To use useSearchParams we should use function component
    const [searchParams, setSearchParams] = useSearchParams();      
    const userid = searchParams.get('userid')
    let user = sampleUsers.find(item => item.id == userid) 

    return (
        <div>
            <Header />
            <div className='single-user'>
                <div><img src={user.image} /></div>
                <div><span>Name:</span>{user.name} </div>
                <div><span>User name:</span>{user.username} </div>
                <div><span>Email:</span>{user.email} </div>                
            </div>
            <Footer />
        </div>

    )
}



