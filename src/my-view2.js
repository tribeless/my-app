import {LitElement,html,css} from "lit-element";

class MyView2 extends LitElement {
    static get properties(){
      return {
        arr:{type:Array},
        filteredArr:{type:Array},
        filterValue:{type:String}
      }
    }

    static get styles(){
      return css `
        body{
          background-color:#eee;
        }
        a{
          text-decoration:none;
        }
        .red{
          color:red;
          font-weight:300;
        }
        form{
          position:relative;
          top:10px;
          left:1.5rem;
        }
        input{
          width:300px;
          height:30px;
          border-radius:10px;
          outline:none;
          border:none;
          padding:10px;
        }
        .green{
          color:green;
          font-weight:300;
        }
        .container{
          display:flex;
          flex-direction:column;
          padding:10px 15px;
          justify-content:space-evenly;
          align-items:fklex-start;
        }
        .card-body{
          padding:10px 15px;
          margin-top:10px;
          border-radius:7px;
          box-shadow:0 2px 5px #ccc;
          background-color:white;
        }
      `;
    }
    constructor(){
      super();
      this.arr = [];
      this.filteredArr = [];
      this.filterValue = "";
    }
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        const BASE_URL = 'https://api.spacexdata.com/v2/launches';
        fetch(BASE_URL).then(res=>res.json())
        .then(data=>{
            this.filteredArr = data.filter(item=>item.flight_number < 11);
        }).catch(e=>
          {
            alert("error while fetching");
        }
          );
     }
    render(){
      return html `
        <form>
          <input class="test" @keyup=${this.handleKeyUp} type="text" name="filter" autocomplete="off" placeholder="enter mission name" />
          
        </form>
        <div class="container">
        ${this.arr && this.arr.map(({mission_name,links,launch_success})=>
         html ` <div class="card-body" >
            <a class=${launch_success ? "green" : "red"} target="blank" href=${links.article_link}>MissionName: ${mission_name} <br> MissionSuccess : ${launch_success}</a>
          </div>
          `
          )
        }
        </div>
      `;
    }

    sliceDetails(details){
      return details.length != null && details.length > 20 && details.slice(0,21).concat('...');
    }

    handleKeyUp(e){
      return this.arr =  e.target.value ? this.filteredArr.filter(item => item.mission_name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1 ) : null;
    }

}

window.customElements.define('my-element', MyView2);
