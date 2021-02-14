import {LitElement,html,css} from "lit-element";
import './shared-styles.js';

class MyView3 extends LitElement {

  static get properties(){
    return {
      arr:{type:Array}
    }
  }

  static get styles(){
    return css `
      html{
        font-family:"Montserrat",sans-serif;
      }
      body{
        background-color:#eee;
      }
      .container {
        display:flex;
        flex-direction:row;
        justify-content:space-between;
        align-items:flex-start;
        flex-wrap:wrap;
        padding:10px;
      }
      .card-body{
        display:flex;
        flex-direction:column;
        align-items:flex-start;
        justify-content:center;
        background-color:#fff;
        padding:10px;
        border-radius:7px;
        box-shadow:0 2px 5px #ccc;
        margin-top:20px;
      }
      .card-body>p{
        font-size:1.1em;
        white-space:pre-wrap;
        word-wrap:break-word;
      }
      p:nth-child(odd){
        font-weight:200;
        color:#000;
      }
    `;
  }
  constructor(){
    super();
    this.arr = [];
  }

   firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    const DATA_URL = 'https://jsonplaceholder.typicode.com/todos?_limit=5';
    fetch(DATA_URL).then(res=>res.json()).then(data=>{
      this.arr = data;
    }).catch(e=>alert('an error occured!'));
  }
  render(){
    return html `
        <div class="container">
        ${
          this.arr.map(({title,completed})=>
         html ` <div class="card-body" >
            <p>Title: ${title}</p>
            <p>Completed: ${completed}</p>
          </div>
          `
          )
        }
        </div>

    `;
  }
}

window.customElements.define('my-view3', MyView3);
