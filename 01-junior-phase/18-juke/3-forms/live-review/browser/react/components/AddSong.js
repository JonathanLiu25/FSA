import React from 'react';

class AddSong extends React.Component {
  render () {
    return (
      <div className="well">
         <form className="form-horizontal" noValidate name="songSelect">
           <fieldset>
             <legend>Add to Playlist</legend>
             <div className="form-group">
               <label htmlFor="song" className="col-xs-2 control-label">Song</label>
               <div className="col-xs-10">
                 <select
                  className="form-control"
                  name="song">
                   <option>
                    song name
                  </option>
                   <option>
                    another song name
                  </option>
                 </select>
               </div>
             </div>
             <div className="form-group">
               <div className="col-xs-10 col-xs-offset-2">
                 <button
                  type="submit"
                  className="btn btn-success">
                  Add Song
                </button>
               </div>
             </div>
           </fieldset>
         </form>
       </div>
    );
  }
}

export default AddSong;

