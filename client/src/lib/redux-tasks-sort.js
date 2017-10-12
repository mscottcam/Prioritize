




const sortTasksArray = array => {

  const compareTaskOrder = (task1, task2) => {
    if (task1.quadrantValue <= task2.quadrantValue) {
      return [
        Object.assign({}, task1, {
          userId: Object.assign({}, task1.userId)
        }), 
        Object.assign({}, task2, {
          userId: Object.assign({}, task2.userId)
        })
      ];
    };
    if (task1.quadrantValue > task2.quadrantValue) {
      return [
        Object.assign({}, task2, {
          userId: Object.assign({}, task2.userId)
        }), 
        Object.assign({}, task1, {
          userId: Object.assign({}, task1.userId)
        })
      ];
    }
  };
  if (!('length' in array)) {
    return [];
  }
  if (array.length === 1) {
    return array;
  };
  if (array.length > 1) {
    if (array.length === 2) {
      return compareTaskOrder(array[0], array[1]);
    }
    if (array.length > 2) {
      let remainingTasks = array.slice(2).map(task => {
        return Object.assign({}, task, {
          userId: Object.assign({}, task.userId)
        });
      });
      const partiallySortedTasks = [...compareTaskOrder(array[0], array[1]), ...remainingTasks];
      return [partiallySortedTasks[0], ...(sortTasksArray(partiallySortedTasks.slice(1)))];
    };
  };
  return sortTasksArray();
};

export default sortTasksArray;






// if ((task1.quadrantValue === 3 && task2.quadrantValue === 2) || (task1.quadrantValue === 2 && task2.quadrantValue === 1) || (task1.quadrantValue === 3 && task2.quadrantValue === 1) ) 