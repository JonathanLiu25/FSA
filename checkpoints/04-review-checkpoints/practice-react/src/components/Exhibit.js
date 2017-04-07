import React, {Component} from 'react';
import AnimalSelect from './AnimalSelect';
import Cage from './Cage';


export default class Exhibit extends Component {

  constructor(props) {
    super();
    this.state = {
      selectedAnimal: props.selectedAnimal
    };
    this.setAnimal = this.setAnimal.bind(this);
  }

  setAnimal(animal) {
    this.setState({selectedAnimal: animal});
  }

  render () {
  	return (
	    <div className="exhibit">
        <AnimalSelect
          animals={this.props.animals}
          submitAnimal={this.setAnimal} />
        <Cage
          selectedAnimal={this.state.selectedAnimal} />
	    </div>
  		)
  }
};