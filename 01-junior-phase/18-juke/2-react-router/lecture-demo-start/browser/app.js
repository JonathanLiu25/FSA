
import React, { cloneElement } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Route, Router, hashHistory, browserHistory, Link } from 'react-router';


class App extends React.Component {
  
  render() {
    return (

      <div>

        <h1>This is the Main App</h1>
        <ul>
          <li><Link to="/puppies">puppies</Link></li>
          <li><Link to="/kittens">kittens</Link></li>

        </ul>

        {this.props.children }
      </div>

      
    )
  }
}


class Puppies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      puppies: []
    }
  }

  componentDidMount() {
    axios.get('/api/puppies')
    .then(res => {
      this.setState({
        puppies: res.data
      })
    })
  }

  render() {
    return (
      <div>
        <h2>Here are the puppies</h2>
        {this.state.puppies.map(puppy=>{
          return (
            <div key={puppy.id}>
              <Link to={`/puppies/${puppy.id}`}>{puppy.name}</Link>
            </div>
          )
        })}

        {this.props.children && cloneElement(this.props.children, {
          myName: 'John'
        })}
      </div>
    )
  }
}


class Kittens extends React.Component {
  render() {
    return (
      <div>Here are the kittens</div>
    )
  }
}


class Puppy extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      selectedPuppy: {}
    }
  }

  // This is just to get it to render now
  // in reality we would likely refactor this out
  componentDidMount() {
    axios.get(`/api/puppies/${this.props.params.id}`)
    .then(res => res.data)
    .then(data => {
      this.setState({selectedPuppy: data})
    })
  }

  componentWillReceiveProps(nextProps) {
    axios.get(`/api/puppies/${nextProps.params.id}`)
    .then(res => res.data)
    .then(data => {
      this.setState({selectedPuppy: data})
    })    
  }


  render() {
    console.log(this.props)
    const { name, image } = this.state.selectedPuppy

    return (
      <div>
        <h1>{name}</h1>
        <img src={image} alt=""/>
      </div>
    )
  }
}


ReactDOM.render(
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <Route path='/puppies' component={Puppies}>
        <Route path='/puppies/:id' component={Puppy}></Route>
      </Route>
      <Route path='/kittens' component={Kittens}></Route>
    </Route>
    
  </Router>,
  document.getElementById('app')
);





