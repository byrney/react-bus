require('./node_modules/leaflet/dist/leaflet.css');
require('./main.html');
require('./styles.css');
const accessToken = 'pk.eyJ1IjoicmJ5cm5lIiwiYSI6ImNpc3dhYTR6cDAwMmIydG1uOGNiYzYxYXcifQ.N0aptrqEwFyMpA_-I09tYQ';
const ReactMap = require('react-map-gl').InteractiveMap;
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

class Map extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return (
            <ReactMap width={400} height={400} latitude={37.7577} longitude={-122.4376} zoom={8}
                mapboxApiAccessToken={accessToken}
                onViewportChange={(viewport) => {
                    const {width, height, latitude, longitude, zoom} = viewport;
                    // Optionally call `setState` and use the state to update the map.
                }
                }
          />
        );
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
        return (<div><ClockDisplay date={this.state.date} /> <Map /></div>);
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

