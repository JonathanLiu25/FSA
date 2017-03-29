import axios from 'axios';
import React from 'react';

function AllDiaries (props) {
  return (
    <div>
      {props.entries.map((entry) => {
        return (
          <div style={{backgroundColor: entry.color}}>
            <h3>{entry.title}</h3>
            <p>{entry.text}</p>
          </div>
        );
      })}
    </div>
  );
}

// "presentational" component
function DiaryForm (props) {
  return (
    <div>
      <p>
        <span>Title: </span>
        <input
          type="text"
          value={props.inputTitle}
          onChange={event => props.changeTitle(event.target.value)} />
      </p>
      <p>
        <span>Color: </span>
        <input
          type="text"
          value={props.inputColor}
          onChange={event => props.changeColor(event.target.value)} />
      </p>
      <p>
        <textarea
          style={{backgroundColor: props.inputColor}}
          value={props.inputEntryText}
          onChange={event => props.changeText(event.target.value)}/>
      </p>
      <p>
        <button onClick={() => props.submit()}>
          Save me to a secret safe
        </button>
      </p>
    </div>
  );
}

// "container" component
class Main extends React.Component {
  constructor () {
    super();
    this.state = {
      inputTitle: '',
      inputColor: '',
      inputEntryText: '',
      allEntries: []
    };
  }
  componentDidMount () {
    axios.get('/api/diary')
    .then(response => {
      return response.data;
    })
    .then(data => {
      this.setState({
        allEntries: data
      });
    });
    axios.get('/api/diary/current')
    .then(response => {
      this.setState({
        inputTitle: response.data.title,
        inputColor: response.data.color,
        inputEntryText: response.data.text
      });
    });
  }
  saveCurrent () {
    axios.put('/api/diary/current', {
      title: this.state.inputTitle,
      color: this.state.inputColor,
      text: this.state.inputEntryText
    });
  }
  render () {
    return (
      <div>
        <h3>Dear diary...</h3>
        <hr />
        <DiaryForm
          inputTitle={this.state.inputTitle}
          inputColor={this.state.inputColor}
          inputEntryText={this.state.inputEntryText}
          changeTitle={newTitle => {
            this.setState({
              inputTitle: newTitle
            });
            this.saveCurrent();
          }}
          changeColor={newColor => {
            this.setState({
              inputColor: newColor
            });
            this.saveCurrent();
          }}
          changeText={newEntryText => {
            this.setState({
              inputEntryText: newEntryText
            });
            this.saveCurrent();
          }}
          submit={() => {
            axios.post('/api/diary', {
              title: this.state.inputTitle,
              color: this.state.inputColor,
              text: this.state.inputEntryText
            })
            .then(function (response) {
              console.log(response.data);
            });
          }}
        />
        <hr />
        <AllDiaries entries={this.state.allEntries} />
      </div>
    );
  }
}

export default Main;
