'use strict';
const e = React.createElement;
function Welcome(props) {return e('h1',{id: 'wel'},'Hello, '+props.name);}
const cre = e('div',{name:'Mr.Greet'},Welcome({name:'Mr.G'}));
ReactDOM.render(cre,document.getElementById('root'));

function Xwelcome(props) {return <h1>Hello, {props.name}! Now: {new Date().toLocaleTimeString()}</h1>}
ReactDOM.render(<Xwelcome name="SanNA" />,document.getElementById('xroot'));

// XButton
class XButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false, date: new Date() };
  }
  componentDidMount(){this.timer = setInterval( ()=>this.tick(), 1000 );}
  componentWillUnmount(){clearInterval(this.timer);}
  tick(){this.setState({date: new Date()});}
  render() {
    return (
    <div>
      <button onClick={() => this.setState({ liked: this.state.liked?false:true }) } >
        {this.state.liked?'Liked':'Like this'+", "+this.props.name}
      </button>
      <h1>Now: {this.state.date.toLocaleTimeString()}</h1>
    </div>
    );
  }
}
ReactDOM.render(<XButton name="Mr. X" />, document.getElementById('like_button_container'));

const scaleNames = {c: 'Celsius',f: 'Fahrenheit'};
class TemperatureInput extends React.Component {
  constructor(props) {super(props);this.handleChange = this.handleChange.bind(this);}
  handleChange(e) {this.props.onTemperatureChange(e.target.value);}
  render() {const temperature = this.props.temperature;const scale = this.props.scale;
    return (<fieldset><input value={temperature} onChange={this.handleChange} /></fieldset>);
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {temperature: '', scale: 'c'};
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
  }

  toCelsius(fahrenheit) {return (fahrenheit - 32) * 5 / 9;}
  toFahrenheit(celsius) {return (celsius * 9 / 5) + 32;}
  tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {return '';}
    const rounded = Math.round(convert(input) * 1000) / 1000;
    return rounded.toString();
  }

  handleCelsiusChange(temperature) {this.setState({scale: 'c', temperature});}
  handleFahrenheitChange(temperature) {this.setState({scale: 'f', temperature});}

  render() {
    return (
      <div>
        <TemperatureInput scale="c" 
          temperature={this.state.scale === 'f' ? this.tryConvert(this.state.temperature, this.toCelsius) : this.state.temperature}
          onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput scale="f" 
          temperature={this.state.scale === 'c' ? this.tryConvert(this.state.temperature, this.toFahrenheit) : this.state.temperature}
          onTemperatureChange={this.handleFahrenheitChange} />
      </div>
    );
  }
}

class TemperatureInp extends React.Component {
  constructor(props){super(props);this.handleChange = this.handleChange.bind(this);}
  handleChange(e){this.props.onTemperatureChange(e.target.value);}
  render(){
    return(<input value={this.props.temperature} onChange={this.handleChange} />);
  }
}
class CalculatorTemp extends React.Component {
  constructor(props){
    super(props);
    this.state={temperature:'',scale:'c'}
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
  }

  toCelsius(fahrenheit) {return (fahrenheit - 32) * 5 / 9;}
  toFahrenheit(celsius) {return (celsius * 9 / 5) + 32;}
  tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {return '';}
    const rounded = Math.round(convert(input) * 1000) / 1000;
    return rounded.toString();
  }

  handleCelsiusChange(temperature){this.setState({temperature,scale:'c'});}
  handleFahrenheitChange(temperature){this.setState({temperature,scale:'f'});}

  render(){return(<div>
      <TemperatureInp scale='c'
       temperature={this.state.scale==='f'?this.tryConvert(this.state.temperature,this.toCelsius):this.state.temperature}
       onTemperatureChange={this.handleCelsiusChange} />
      <TemperatureInp scale='f'
       temperature={this.state.scale==='c'?this.tryConvert(this.state.temperature,this.toFahrenheit):this.state.temperature}
       onTemperatureChange={this.handleFahrenheitChange} />
    </div>);}
}

ReactDOM.render(
  <CalculatorTemp />,
  document.getElementById('root')
);

// console.log();