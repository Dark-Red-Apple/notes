import React, { Component } from "react";

class App2 extends Component {
  myInputName = React.createRef();
  myInputEmail = React.createRef();
  handeClick = e => {
    e.preventDefault();
    const name = this.myInputName.current.value;
    const email = this.myInputEmail.current.value;
    console.log("this is name " + name);
    console.log(`this is email ${email}`);
  };
  render() {
    return (
      <form onSubmit={this.handeClick}>
        <input ref={this.myInputName} type="text" placeholder="enter name" />
        <input ref={this.myInputEmail} type="text" placeholder="enter email" />
        <button type="submit">click me</button>
      </form>
    );
  }
}
export default App2;
