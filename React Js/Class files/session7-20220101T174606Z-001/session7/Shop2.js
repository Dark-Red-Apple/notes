import React, { Component } from 'react'

 class Shop2 extends Component {
    myInput=React.createRef();
    goToShop=(e)=>{
        console.log(this.props);
        e.preventDefult();
        const urlPath=this.myInput.current.value;
        this.props.history.push(`/shop/${urlPath}`)

    }

    render() {
        return (
          <form className='shop-form'onSubmit={this.goToShop} >
              <h2>enter shop name</h2>
              <input required ref={this.myInput} type="text" placeholder='shop name'/>
              <button type='submit'>visit shop</button>
          </form>  
        )
    }
}
export default Shop2;
