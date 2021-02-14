import { LitElement,html,css } from 'lit-element';


class MyView1 extends LitElement {
  static get properties() {
    return {
      formVal:{type:Object}
    }
  }

  static get styles(){
    return css `
      body{
        font-family:"Source Sans Pro", sans-serif;
        color:white;
        background-color:#eee;
        font-weight:300;
      }
      form{
        padding:20px 0;
        position:relative;
      }
      form input {
        border:1px solid rgba(252,252,252,0.4);
        background-color:white;
        border-radius:3px;
        display:block;
        text-align:center;
        padding:10px 15px;
        color:#000;
        margin:0 auto 10px auto;
        font-weight:300;
      }
      form button {
        appearance:none;
        outline:none;
        background-color:white;
        border:0;
        padding:10px 16px;
        color:#50a3a2;
        border-radius:3px;
        font-size:18px;
        margin-left:490px;
        display:block;
      }
    `;
  }
  constructor(){
    super();
    this.formVal = {};
  }

  render(){
    return html `
      <form id="my-form">
        <input class="input is-primary" @change=${this.handleChange} autocomplete="off" placeholder="name" type="text" name="name" />
        <input class="input is-primary" @change=${this.handleChange} autocomplete="off" placeholder="email" type="email" name="email" />
        <input class="input is-primary" @change=${this.handleChange} autocomplete="off" placeholder="phone number" type="tel" name="phonenumber" />
        <button @click=${this.handleSubmit} type="button"> Submit Info</button>
      </form>
    `;
  }

  handleSubmit(e){
    e.preventDefault();
    console.log(this.formVal);
    alert(JSON.stringify(this.formVal));
    this.clearInputs();
    
  }
  clearInputs(){
    const inputs = document.querySelectorAll('input');
    inputs.forEach(item => item.value = '');
  }
  handleChange(e){
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.formVal[name] = value;
  }
}

window.customElements.define('my-view1', MyView1);
