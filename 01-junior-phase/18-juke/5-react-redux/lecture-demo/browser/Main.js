import axios from 'axios';
import React from 'react';
import {Provider, connect} from 'react-redux';

import ourStore from './store';
import {
  changeTitle,
  changeColor,
  changeText,
  retrieveEntries
} from './actions';

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

// // "container" component
// class DiaryApp extends React.Component {
//   componentDidMount () {
//     axios.get('/api/diary')
//     .then(response => {
//       return response.data;
//     })
//     .then(data => {
//       this.setState({
//         allEntries: data
//       });
//     });
//     axios.get('/api/diary/current')
//     .then(response => {
//       this.setState({
//         inputTitle: response.data.title,
//         inputColor: response.data.color,
//         inputEntryText: response.data.text
//       });
//     });
//   }
//   saveCurrent () {
//     axios.put('/api/diary/current', {
//       title: this.state.inputTitle,
//       color: this.state.inputColor,
//       text: this.state.inputEntryText
//     });
//   }
//   render () {
//     return ;
//   }
// }

class DiaryAppPresentational extends React.Component {
  componentDidMount () {
    this.props.retrieveEntries();
  }
  render () {
    return (
      <div>
        <h3>Dear diary...</h3>
        <hr />
        <DiaryForm
          inputTitle={this.props.inputTitle}
          inputColor={this.props.inputColor}
          inputEntryText={this.props.inputEntryText}
          changeTitle={this.props.changeTitle}
          changeColor={this.props.changeColor}
          changeText={this.props.changeText}
          submit={() => {}}
        />
        <hr />
        <AllDiaries entries={this.props.allEntries} />
      </div>
    );
  }
}

function mapStateToProps (storeState) {
  return {
    inputTitle: storeState.inputTitle,
    inputColor: storeState.inputColor,
    inputEntryText: storeState.inputEntryText,
    allEntries: storeState.allEntries
  };
}

function mapDispatchToProps (dispatch) {
  return {
    changeTitle: function (newTitle) {
      dispatch(changeTitle(newTitle));
    },
    changeColor: function (color) {
      dispatch(changeColor(color));
    },
    changeText: function (text) {
      dispatch(changeText(text));
    },
    retrieveEntries: function () {
      dispatch(retrieveEntries());
    }
  };
}

// // alternative format, more succinct
// // all methods must conform to:
// // fuction (arg) {dispatch(actionCreator(arg))}
// const mapDispatchToProps = {
//   changeTitle,
//   changeColor,
//   changeText,
//   retrieveEntries
// };

// "connect"ed (to the store) component
const DiaryAppContainer = connect(
  // data the presentational component needs
  mapStateToProps,
  // methods that the presentational component needs
  mapDispatchToProps
)(DiaryAppLocalContainer);

function Main () {
  return (
    <Provider store={ourStore}>
      <DiaryAppContainer />
    </Provider>
  );
}

export default Main;
