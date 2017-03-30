import React from 'react';

function FilterArtist (props) {
  return (
    <form className="form-group" style={{marginTop: '20px'}}>
      <input
        className="form-control"
        placeholder="Enter artist name"   
      />
    </form>
  );
}

export default FilterArtist;
