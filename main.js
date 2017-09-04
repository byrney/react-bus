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
        return (<div>It is:</div>);
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

    tick(ts){
        this.setState(
            {date: new Date()}
        );
        this.timerId = window.requestAnimationFrame( () => this.tick() );
    }

    componentDidMount(){
        this.timerId = window.requestAnimationFrame( () => this.tick() );
    }

    componentWillUnmount(){
        window.cancelAnimationFrame(this.timerId);
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

