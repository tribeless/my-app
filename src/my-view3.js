import {LitElement,html,css} from "lit-element";
import './shared-styles.js';

class MyView3 extends LitElement {

  static get properties(){
    return {
      arr:{type:Array},
      dictionary:{type:Object},
      numericResult:{type:Array},
      asciiResult:{type:Array}
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
    this.dictionary = {
      '34': 'thirty-four',
      '90': 'ninety',
      '91': 'ninety-one',
      '21': 'twenty-one',
      '61': 'sixty-one',
      '9': 'nine',
      '2': 'two',
      '6': 'six',
      '3': 'three',
      '8': 'eight',
      '80': 'eighty',
      '81': 'eighty-one',
      'Ninety-Nine': '99',
      'nine-hundred': '900'
    }
  }

   firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    //data fetching
    const DATA_URL = 'https://jsonplaceholder.typicode.com/todos?_limit=5';
    fetch(DATA_URL).then(res=>res.json()).then(data=>{
      this.arr = data;
    }).catch(e=>alert('an error occured!'));

    //sorting
    this.numericResult = Object.keys(this.dictionary).sort((a,b)=>{
      return a-b;
    });
    this.asciiResult = Object.values(this.dictionary).sort((a,b)=>{
        return a-b;
    });
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
        <div class="card-body">
          <p>Numeric Result : ${JSON.stringify(this.numericResult)}</p>
        </div>
        <div class="card-body">
            <p>Ascii Result : ${JSON.stringify(this.asciiResult)}</p>
        </div>

        </div>

    `;
  }
}

window.customElements.define('my-view3', MyView3);
