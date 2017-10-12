




const sortTasksArray = (array, index, swapped = false) => {

  const cloneTask = (task) => {
    return Object.assign({}, task, {
      userId: Object.assign({}, task.userId)
    });
  };

  const compareTaskOrder = (task1, task2) => {
    if (task1.quadrantValue <= task2.quadrantValue) {
      return {
        tasks: [
          cloneTask(task1), 
          cloneTask(task2)
        ],
        swapped: false
      };
    };
    if (task1.quadrantValue > task2.quadrantValue) { 
      return {
        tasks: [
          cloneTask(task2), 
          cloneTask(task1)
        ],
        swapped: true
      };
    };
  };

  if (array.length === 0) {
    return [];
  }
  if (array.length === 1) {
    return array;
  };
  if (array.length > 1) {
    if (array.length === 2) {
      return compareTaskOrder(array[0], array[1]).tasks;
    }
    if (array.length > 2) {
      const remainingTasks = array.slice(2).map(task => {
        return Object.assign({}, task, {
          userId: Object.assign({}, task.userId)
        });
      });

      if (swapped === true && index === 0) {
        return sortTasksArray(array, 0)
      };
      if (index === 0) {
        const comparedTasks = compareTaskOrder(array[0], array[1])
        const partiallySortedTasks = [...comparedTasks.tasks, ...remainingTasks];
        return sortTasksArray(partiallySortedTasks, 1, comparedTasks.swapped);
      };
      if (index > 0) {

      };

      const partiallySortedTasks = [...compareTaskOrder(array[0], array[1]), ...remainingTasks];
      return [partiallySortedTasks[0], ...(sortTasksArray(partiallySortedTasks.slice(1)))];
    };
  };
  return sortTasksArray();
};

export default sortTasksArray;






// if ((task1.quadrantValue === 3 && task2.quadrantValue === 2) || (task1.quadrantValue === 2 && task2.quadrantValue === 1) || (task1.quadrantValue === 3 && task2.quadrantValue === 1) ) 