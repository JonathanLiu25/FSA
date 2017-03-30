import React from 'react';

function FilterArtist (props) {
  return (
    <form className="form-group" style={{marginTop: '20px'}}>
      <input
        onChange={event => {
          props.updateSearchText(event.target.value);
        }}
        className="form-control"
        placeholder="Enter artist name"   
      />
    </form>
  );
}

export default FilterArtist;
