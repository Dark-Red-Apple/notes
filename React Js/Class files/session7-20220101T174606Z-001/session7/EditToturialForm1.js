import React, { Component } from 'react'

 class EditToturialForm1 extends Component {
     handleChange=(e)=>{
         const updateForm={...this.props.toturial};
         updateForm[e.currentTarget.name]=e.currentTarget.value;
         this.props.updateForm(this.props.index,updateForm);
     }
    render() {
        return (
           <form className='add-toturial-form' onSubmit={this.createToturial}>
               <input  onChange={this.handleChange}  defaultValue={this.props.toturial.name} type='text' placeholder='name' name='name' />
               <input  onChange={this.handleChange}  defaultValue={this.props.toturial.price} type='text' placeholder='price' name='price' />
               <select onChange={this.handleChange} name='status' defaultValue={this.props.toturial.status}>
                   <option value="availble">availble</option>
                   <option value='unavailble'>unavailble</option>
               </select>
               <textarea onChange={this.handleChange} name='desc' placeholder='desc' defaultValue={this.props.toturial.desc}></textarea>
               <input  onChange={this.handleChange}  defaultValue={this.props.toturial.image} type='text' placeholder='image' name='image' />
               <button onClick={()=>this.props.deleteToturial(this.props.index)}>remove Toturial</button>
           </form>
        )
    }
}
export default EditToturialForm1;