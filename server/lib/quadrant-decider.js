const quadrantDecider = taskObj => {
  if (taskObj.urgent === true && taskObj.important === true) {
    return 1
  };
  if (taskObj.urgent === false && taskObj.important === true) {
    return 2
  };
  if (taskObj.urgent === true && taskObj.important === false) {
    return 3
  };
  if (taskObj.urgent === false && taskObj.important === false) {
    return 4
  };
};



module.exports = {quadrantDecider};