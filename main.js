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
            <ReactMap width={800} height={600}
                mapboxApiAccessToken={accessToken}
                mapStyle={'mapbox://styles/rbyrne/cit3c6w6j005v2xqrfv80tjp5'}
                longitude={-3.5275513517662205}
                latitude={50.72603021548042}
                zoom={15} pitch={60}
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
        return (<ClockDisplay date={this.state.date} /> );
    }
}

class App extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return (<div id='app'>
                    <Text />
                    <div>
                        <Clock/>
                        <Map />
                    </div>
                </div>
        );
    }


}

ReactDOM.render(<App />, document.getElementById('content'));

