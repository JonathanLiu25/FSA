import React from 'react';
import Message from './Message';
import store from '../redux/store';

export default class extends React.Component {

  constructor() {
    super();
    this.state = this.getOwnStateFromStore();
  }

  // method for selecting the part of the store that that this component uses as its own state
  getOwnStateFromStore () {
    const storeState = store.getState();
    return {
      messages: storeState.messages,
      messagesLoading: storeState.messagesLoading
    };
  }

  componentDidMount () {
    // listen for store changes and re-render when the come in
    this.unsubscribe = store.subscribe(() => {
      this.setState(this.getOwnStateFromStore());
    });
  }

  componentWillUnmount () {
    // stop listening for store changes
    this.unsubscribe();
  }

  render() {
    return (
      <div>
        <h1>Inbox</h1>
        {this.state.messages.map(message => (
          <Message
            fullMessage={message}
            key={message.id} />
        ))}
      </div>
    );
  }

}