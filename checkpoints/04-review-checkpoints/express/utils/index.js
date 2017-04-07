module.exports.HTTP_Error = function (status, message) {
  var err = Error(message);
  err.status = status;
  return err;
}
