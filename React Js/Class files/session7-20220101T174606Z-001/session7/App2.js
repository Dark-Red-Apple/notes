import React, { Component } from 'react'
import samples from './samples';
import Toturial from './Toturial';

 class App2 extends Component {
     state ={
         toturial:{},
         order:{}
     };
     addToturial=(toturial)=>{
         const course={...this.state.toturial};
         course [`learn${Date.now()}`]=toturial;
         this.setState(()=>{
             return{toturial:cours};
         })

     };
     deleteToturial=(Key)=>{
         const toturials={...this.state.toturial};
        delete toturials[Key];
        this.setState({toturials});
         
     }
     addToOredr=(Key)=>{
         const order={...this.state.order};
         order[Key]=order[Key]+1 || 1;
         this.setState({order});
     };
     removeFromOrder=(Key)=>{
         const order={...this.state.order};
         delete order[Key];
         this.state({order});
     }

     loadSample=()=>{
         this.setState(()=>{
             return{toturial:samples}
         })
     }
     updateForm=(Key,updateForm)=>{
         const toturials={...this.state.toturials};
         toturials[Key]=updateForm;
         this.setState({toturials});
     }
     
    render() {
        return (
            <div className='toturial-app'>
                <div className='toturial'>
                <Header/>
                <ul>
                    {
                        Object.keys(this.state.toturial).map(Key=><Toturial addToOredr={this.addToOredr} Key={Key} index={Key} details={this.state.toturial[Key]}/>)
                    }
                </ul>
                </div>
                <Order removeFromOrder={this.removeFromOrder} toturials={this.state.toturial} order={this.state.order}/>
                <Inventory deleteToturial={this.deleteToturial}
                updateForm={this.updateForm} toturial={this.state.toturials}
                addToturial={this.addToturial} load={this.loadSample}
                />

            </div>
        )
    }
}
export default App2;