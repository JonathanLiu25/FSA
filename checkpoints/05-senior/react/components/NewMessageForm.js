import React from 'react';

export default class extends React.Component {
  
  constructor () {
    super();
    this.state = {
      recipient: '',
      subject: '',
      body: ''
    };
    // bind instance methods to avoid `this` issues when passing the methods around
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // generic handler for any input change
  // relies on the event target having a `name` that corresponds to a key name on `this.state`
  handleChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  
  onSubmit (event) {
    event.preventDefault();
    this.props.onSend(this.state);
  }
  
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label>To:</label>
          <input
            onChange={this.handleChange}
            type="text"
            id="recipient-field"
            name="recipient" />
        </div>
        <div className="form-group">
          <label>Subject:</label>
          <input
            onChange={this.handleChange}
            type="text"
            id="subject-field"
            name="subject" />
        </div>
        <div className="form-group">
          <label>Body:</label>
          <textarea
            onChange={this.handleChange}
            id="body-field"
            name="body" />
        </div>
        <button type="submit">Send Message</button>
      </form>
    );
  }

}
