import React, { Component } from 'react'
import sampleUsers from './users.js'
import UsersList from './UsersList'
import Header from './Header'
import  Footer from './Footer'
import './../css/App.css'


 class App extends Component {
    state ={
        users:{}, 
        foundItems:[]
    }

    componentDidMount() {
        this.loadUser();
      
    }

    loadUser=()=>{
        this.setState(()=>{
            return{users:sampleUsers} 
        })
    }

    loadFounds=(e)=>{
        const userName = e.target.elements.userName.value
        e.preventDefault()
        this.searchResult(userName);
    }

    searchResult =(userName)=>{
        
        const foundItes = sampleUsers.filter((item)=>{
            return item.name == userName
        })
        this.setState(()=>{
            return{foundItems:foundItes} 
        })
    }
     
    render() {
        
        return (
            <div className='wrapper'>
                <Header />
                <form className='search-form' onSubmit={this.loadFounds} action=''>
                    <input name="userName" id="user-name" type="text" placeholder='please write the user name'/>
                    <input type="submit" value="search"/>
                </form>
                <UsersList foundItems = {this.state.foundItems} />
                <Footer />
            </div>
            
        )
    }
    
}
export default App;