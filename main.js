require('./node_modules/leaflet/dist/leaflet.css');
require('./main.html');
require('./styles.css');
const React = require('react');
const ReactDOM = require('react-dom');

class Text extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (<div>Hello</div>);
    }

}

class ClockDisplay extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (<div className='clock'>{this.props.date.toISOString()}</div>);
    }
}


class Clock extends React.Component {
    constructor(props){
        super(props);
        this.state = {date: new Date()};
    }

    tick(){
        this.setState(
            {date: new Date()}
        );
    }

    componentDidMount(){
        this.timerId = setInterval( () => this.tick(), 500 );
    }

    componentWillUnmount(){
        clearInterval(this.timerId);
    }

    render(){
        return (<ClockDisplay date={this.state.date} />);
    }
}

class App extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return (<div id='app'><Text /><Clock/></div>);
    }


}

ReactDOM.render(<App />, document.getElementById('content'));

