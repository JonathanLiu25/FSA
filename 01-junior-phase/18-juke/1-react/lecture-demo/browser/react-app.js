const React = require('react');
const ReactDOM = require('react-dom');

// simpler, very lightweight
// cannot define lifecycle hooks (e.g. `componentDidMount`) nor state
function WelcomeCohort (props) {
  return (
    <div>
      <h1>Welcome {props.cohort}</h1>
      <Face/>
    </div>
  );
}

function SimpleFace (props) {
  const url = `http://fillmurray.com/${props.width}/${props.height}`;
  return <img src={url} />;
}

// heavier (lines of code)
// can define lifecycle hooks and state
class Face extends React.Component {
  constructor () {
    super();
    this.state = {
      height: 100,
      width: 100
    };
  }
  componentDidMount () {
    console.log('i made it to the dom');
  }
  // whenever React asks me to produce some html, here's what I do
  render () {
    return (
      <div>
        <SimpleFace height={this.state.height} width={this.state.width} />
        <hr />
        <button onClick={() => {
          this.setState({ // `.setState` triggers re-render
            height: this.state.height * 2
          });
        }}>
          Supersize Me
        </button>
      </div>
    );
  }
}

const theCohort = '1702';

const rootElement = <WelcomeCohort cohort={theCohort} />;

ReactDOM.render(
  rootElement, // what do I render
  document.getElementById('main') // where do I render it
);
