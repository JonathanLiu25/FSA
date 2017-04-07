import React, { Component } from 'react';

// exporting the constructor function (dumb component).
// what is the parameter coming in here?
export default function AnimalSelect ({animals, submitAnimal}) {
  return (
    <form>
      <label>
        <span>Select an Animal: </span>
      </label>
      <select onChange={e => submitAnimal(e.target.value)}>
        {animals.map(animal => (
          <option key={animal} value={animal}>
            {animal}
          </option>
        ))}
      </select>
    </form>
  );
};

