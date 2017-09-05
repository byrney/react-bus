require('./node_modules/leaflet/dist/leaflet.css');
require('./main.html');
require('./styles.css');
const accessToken = 'pk.eyJ1IjoicmJ5cm5lIiwiYSI6ImNpc3dhYTR6cDAwMmIydG1uOGNiYzYxYXcifQ.N0aptrqEwFyMpA_-I09tYQ';
const ReactMap = require('react-map-gl').InteractiveMap;
const Marker = require('react-map-gl').Marker;
const SvgOverlay = require('react-map-gl').SVGOverlay;
const React = require('react');
const ReactDOM = require('react-dom');
const mapBoxStyle = require('./mapstyle.json');
const route = require('./route.js');
const turf = {
    along: require('@turf/along'),
    distance: require('@turf/line-distance')
};


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

    formatClockTime(time){
        const date = new Date(time * 1000);
        let hh = date.getUTCHours();
        let mm = date.getUTCMinutes();
        let ss = date.getUTCSeconds();
        if (hh < 10) {hh = `0${hh}`;}
        if (mm < 10) {mm = `0${mm}`;}
        if (ss < 10) {ss = `0${ss}`;}
        return `${hh}:${mm}:${ss}`;
    }

    render(){
        const display = this.formatClockTime(this.props.date);
        return (<div className='clock'>{display}</div>);
    }

}

class Map extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            mapStyle: mapBoxStyle,
            viewport: {
                longitude: -3.5275513517662205,
                latitude: 50.72603021548042,
                zoom:15,
                pitch: 60,
                scrollZoom: true,
                width: 800,
                height: 600
            }
        };
        this._viewportChange = this.viewportChange.bind(this);
        this._svgRedraw = this.svgRedraw.bind(this);
        this.route = route();
        this.distance = turf.distance(this.route, 'kilometers');
        this.speed = 100 / 60 / 60;
    }

    svgRedraw({project}){
        const travelled = (this.speed * this.props.elapsed) % this.distance;
        const geopoint = turf.along(this.route, travelled, 'kilometers');
        const coordinates = geopoint.geometry.coordinates;
        const point = project(coordinates);
        return (<g><circle cx={point[0]} cy={point[1]} r={4} stroke={'white'} fill={'red'}/></g>);
    }

    viewportChange(viewport){
        const {width, height, latitude, longitude, zoom} = viewport;
        this.setState({viewport: viewport});
    }

    render(){
        return (
            <ReactMap
                {...this.state.viewport}
                mapboxApiAccessToken={accessToken}
                mapStyle={mapBoxStyle}
                onViewportChange={this._viewportChange}
            >
            <SvgOverlay redraw={this._svgRedraw} />
          </ReactMap>
        );
    }

}

class Clock extends React.Component {
    constructor(props){
        super(props);
        this.clockOffset = 4 * 60 * 60;  // 5am start
        this.secondsPerTimestamp = 15 * 60;
        this.secondsPerDay = 60 * 60 * 24;
        this.startTs = null;
        this.startDate = new Date();
        this.state = {
            elapsed: 0,
            date: this.clockOffset
        };
    }

    tick(ts){
        this.startTs = this.startTs || ts;
        const elapsed = (ts - this.startTs) / this.secondsPerTimestamp;
        const time = (elapsed + this.clockOffset) % this.secondsPerDay;
        this.setState(
            {
                elapsed: elapsed,
                date: time
            }
        );
        this.timerId = window.requestAnimationFrame( timestamp => this.tick(timestamp) );
    }

    componentDidMount(){
        this.timerId = window.requestAnimationFrame( timestamp => this.tick(timestamp) );
    }

    componentWillUnmount(){
        window.cancelAnimationFrame(this.timerId);
    }

    render(){
        return (<div><ClockDisplay date={this.state.date} /> <Map elapsed={this.state.elapsed}/></div>);
    }
}

class App extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return (<div id='app'>
                    <Text />
                        <Clock/>
                </div>
        );
    }


}

ReactDOM.render(<App />, document.getElementById('content'));

