import React from 'react';

function NewPlaylist (props) {
  return (
    <div className="well">
      <form
        onSubmit={event => {
          event.preventDefault();
          props.submitPlaylist();
        }}
        className="form-horizontal">
        <fieldset>
          <legend>New Playlist</legend>
          <div className="form-group">
            {props.errors.map(err => {
              return <div className='alert alert-warning'>{err}</div>
            })}
            <label className="col-xs-2 control-label">Name</label>
            <div className="col-xs-10">
              <input
                className="form-control"
                type="text"
                onChange={event => {
                  props.changePlaylistName(event.target.value);
                }} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-xs-10 col-xs-offset-2">
              <button
                disabled={props.errors.length > 0}
                type="submit"
                className="btn btn-success">
                Create Playlist
              </button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default NewPlaylist;
