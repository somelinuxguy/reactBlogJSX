const boks = [];

let genID = () => 
    Math.floor(Math.random() * 101009).toString();

// h is conventional, and shorter to type.
const h = React.createElement;

let BokRow = (props) =>
    <li> <p>{props.bok.content}</p></li>


let BokList = (props) => 
    <ul>
        { props.boks.map(bok =>
            <BokRow bok={bok} key={bok.id} />
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
        return (
            h('form', {
            onSubmit: (event) => {
                event.preventDefault();
                console.log('Submit!!!!');
                this.props.addBok(this.state.newBok);
            }
        },

            <input type="text" value={this.state.newBok} onChange={
                (event) =>{
                    this.setState({ newBok: event.target.value})
                   }
               }/>,

            <input type="submit"  value="Post" />
        )
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

    getBoks() {
        fetch('http://0.tcp.ngrok.io:18229/wassups.json')
            .then( res => res.json())
            .then( boks => {
                this.setState({
                    boks: boks
                });
            });
        };

    render () {
        let addBok = (newBok) => {
            this.setState({
                boks: this.state.boks.concat([
                    {
                        userId: genID(),
                        id: genID(),
                        user: "kevin",
                        content: newBok
                    }
                ])
            })
        }

        return h('div' , {className: "chicekn"}, 
            <h1 className="chickken">Bok Bok Bgok!</h1>,
            <h2 className="chieknen">chicken chicken chicken</h2>,
            <button onClick={this.getBoks.bind(this)}>Get things</button>,
            h(BokForm, {addBok: addBok}),
            h(BokList, { boks: this.state.boks})
        );
    }
}

//
// My main
//
ReactDOM.render( h(Homepage, {boks}), document.getElementById('react-main') );