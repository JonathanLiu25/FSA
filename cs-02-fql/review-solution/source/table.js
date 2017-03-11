const fs = require('fs');

function Table (folderPath) {
  // `_propertyName` is an idiom for signalling an "internal" property
  this._folderPath = folderPath;
}

Table.toFilename = function (id) {
  return id + '.json';
};

Table.toId = function (filename) {
  return filename.slice(0, -5);
};

Table.prototype.read = function (id) {
  const filename = Table.toFilename(id);
  const fullpath = this._folderPath + '/' + filename;
  const doesExist = fs.existsSync(fullpath);
  if (!doesExist) return undefined;
  const buffer = fs.readFileSync(fullpath);
  const filestr = buffer.toString();
  const row = JSON.parse(filestr);
  return row;
};

Table.prototype.getRowIds = function () {
  const filenames = fs.readdirSync(this._folderPath);
  const ids = filenames.map(function (filename) {
    return Table.toId(filename);
  });
  return ids;
};

module.exports = Table;