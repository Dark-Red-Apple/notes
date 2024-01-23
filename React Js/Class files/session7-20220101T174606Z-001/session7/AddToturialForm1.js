import React, { Component } from 'react'

 class AddToturialForm1 extends Component {
     nameRef=React.createRef();
     priceRef=React.createRef();
     statusRef=React.createRef();
     descRef=React.createRef();
     imageRef=React.createRef();
     createToturial=(e)=>{
         e.preventDefault();
     
     const toturial={
         name:this.nameRef.current.value,
         price:this.priceRef.current.value,
         status:this.statusRef.current.value,
         desc:this.descRef.current.value,
         image:this.imageRef.current.value,
     }
     this.props.AddToturial(toturial);
     e.currentTarget.reset();}
    render() {
        return (
            <form className='add-toturial-form'>
                <input  ref={this.nameRef} name='name' type='text' placeholder='name'/>
                <input  ref={this.priceRef}name="price" placeholder='price' type='text' />
                <select ref={this.statusRef} name='status'>
                    <option value="available">available</option>
                    <option value="unavailble">unavailble</option>
                </select>
                <textarea ref={this.descRef} name='desc' placeholder='desc' >

                </textarea>
                <input ref={this.imageRef} name='image' type='text'/>
                <button className='add-toturial'>add-toturial</button>

            </form>
        )
    }
}
export default AddToturialForm1;