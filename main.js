// a constant, a list of posts from some given source.
const boks = [{
    "userId": 1,
    "bokId": 1,
    "bok": "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto"
  },{
    "userId": 1,
    "bokId": 2,
    "bok": "est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla"
  },{
    "userId": 2,
    "bokId": 9,
    "bok": "et iusto sed quo iure voluptatem occaecati omnis eligendi aut ad voluptatem doloribus vel accusantium quis pariatur molestiae porro eius odio et labore et velit aut"
  }];

let genID = () => 
    Math.floor(Math.random() * 101009).toString();

// h is conventional, and shorter to type.
const h = React.createElement;

let BokRow = (props) =>
    <li> <p>{props.bok.bok}</p></li>


let BokList = (props) => 
    <ul>
        { props.boks.map(bok =>
            <BokRow bok={bok} key={bok.bokId} />
        ) }
    </ul>


// an object, with a function in it. {onsubmit, classname: "blah"}
// careful, this happens a lot in React Code Spaghetti
class BokForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newBok: ''
        }
    }
    render() {
        return h('form', {
            onSubmit: (event) => {
                event.preventDefault();
                console.log('Submit!!!!');
                this.props.addBok(this.state.newBok);
            },
            className: "inputForm" },

            <input type="text" value={this.state.newBok} onChange={
                (event) =>{
                    this.setState({ newBok: event.target.value})
                   }
               }/>,

            <input type="submit"  value="Post" />
        )
    }
}

class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            boks: this.props.boks
        }
    }
    render () {
        let addBok = (newBok) => {
            this.setState({
                boks: this.state.boks.concat([
                    {
                        userId: genID(),
                        bokId: genID(),
                        bok: newBok
                    }
                ])
            })
        }

        return h('div' , {className: "chicekn"}, 
            <h1 className="chickken">Bok Bok Bgok!</h1>,
            h('h2', {className: "chieknen"}, 'chicken chicken chicken'),
            h(BokForm, {addBok: addBok}),
            h(BokList, { boks: this.state.boks})
        );
    }
}

//
// My main
//
ReactDOM.render( h(Homepage, {boks}), document.getElementById('react-main') );