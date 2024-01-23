import React, { Component } from 'react'
import EditToturialForm from './EditToturialForm';

 class Inventory extends Component {
    render() {
        return (
            <div className='invintory'>
                <h2>invintory</h2>
                {Object.keys(this.props.toturials).map(key=>
                
                <EditToturialForm1 updateForm={this.props.updateForm}
                 key={key} index={key}
                 deleteToturial={this.props.deleteToturial} 
                toturial={this.props.toturials[key]} />)}
                <AddToturialForm1 AddToturial={this.props.AddToturial}  />
                <button className='load-sample' onClick={this.props.load}>load sample</button>
                
            </div>
        )
    }
}
export default Inventory;