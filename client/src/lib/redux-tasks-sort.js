const sortTasksArray = (array, index = 0, swapped) => {

  const cloneTask = (task) => {
    return Object.assign({}, task, {
      userId: Object.assign({}, task.userId)
    });
  };

  const compareTaskOrder = (task1, task2, currentlySwapped) => {
    if (task1.quadrantValue <= task2.quadrantValue) {
      return {
        tasks: [
          cloneTask(task1), 
          cloneTask(task2)
        ],
        swapped: currentlySwapped ? true : false
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
      return compareTaskOrder(array[0], array[1], swapped).tasks;
    }
    if (array.length > 2) {
      if (swapped === false && index === 0) {
        return array;
      }
      if (swapped === true && index === 0) {
        return sortTasksArray(array, 0);
      };
      if (swapped === undefined && index === 0) {
        const remainingTasks = array.slice(2).map(cloneTask);
        const comparedTasks = compareTaskOrder(array[0], array[1], swapped);
        const partiallySortedTasks = [...comparedTasks.tasks, ...remainingTasks];
        return sortTasksArray(partiallySortedTasks, 1, comparedTasks.swapped);
      };
      if (index > 0) { 
        const comparedTasks = compareTaskOrder(array[index], array[index + 1], swapped);
        const beginningTasks = array.slice(0, index).map(cloneTask);
        if (array.length >= index + 3) {
          console.log('LOOK HERE ---->', comparedTasks.tasks)
          const endingTasks = comparedTasks.tasks.slice(index + 2).map(cloneTask);
          const assembledArray = [...beginningTasks, ...comparedTasks.tasks, ...endingTasks];
          return sortTasksArray(assembledArray, index + 1, comparedTasks.swapped);
        };
        const assembledArray = [...beginningTasks, ...comparedTasks.tasks];
        return sortTasksArray(assembledArray, 0, comparedTasks.swapped);
      };

      const partiallySortedTasks = [...compareTaskOrder(array[0], array[1], swapped).tasks, ...remainingTasks];
      return [partiallySortedTasks[0], ...(sortTasksArray(partiallySortedTasks.slice(1)))];
    };
  };
};

export default sortTasksArray;






// if ((task1.quadrantValue === 3 && task2.quadrantValue === 2) || (task1.quadrantValue === 2 && task2.quadrantValue === 1) || (task1.quadrantValue === 3 && task2.quadrantValue === 1) ) 