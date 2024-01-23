import React, { Component } from 'react'

 class Toturial1 extends Component {

    render() {
        const{name,price,status,des,image}=this.props.details;
        return (
            <div className='single-toturial'>
                <img src={image} alt={name}/>
                <div className='details'>
                <h2 className='toturial-name'>
                    <span >{name}</span>
                    <span className='price'>{price}</span>
                </h2>
                <p>{desc}</p>
                <button onClick={this.handeClick} disable={!Available} className='add-to-order'>{isAvailable?'add to cart':'sold Out'}</button>
                </div>
            </div>
        )
    }
}
export default Toturial1;