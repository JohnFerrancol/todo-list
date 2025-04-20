import { loadProjects } from '../data/storage.js';
import { isToday, isThisWeek } from 'date-fns';

// Running a central function that takes in a function inline that is used to filter the tasks rendered
const getFilteredTasks = (filterFunction, filterIsComplete) => {
  const projects = loadProjects();
  const filteredTasks = [];

  projects.forEach((project) => {
    const tasks = project.getTasks();

    tasks.forEach((task) => {
      // Boolean variable is used to ensure that the the task is complete boolean value and whether we want to see completed tasks boolean value matches
      // This is because -> For all tabs in the webpage, we only want to see incomplete tasks so both values should be false
      // For tab with completed tasks, both values should be true
      const completionMatches = task.getCompletion() === filterIsComplete;

      // Is the boolean value matches as well as it matches the filter function push the task onto the array
      if (filterFunction(task) && completionMatches) {
        filteredTasks.push(task);
      }
    });
  });

  return filteredTasks;
};

const getAllTasks = () => getFilteredTasks(() => true, false);
const getTodayTasks = () =>
  getFilteredTasks((task) => isToday(task.date), false);
const getWeekTasks = () =>
  getFilteredTasks((task) => isThisWeek(task.date), false);
const getCompletedTasks = () =>
  getFilteredTasks((task) => task.getCompletion(), true);
const getProjectTasks = (targetTitle) =>
  getFilteredTasks((task) => task.projectTitle === targetTitle, false);

const findTask = (taskId) => {
  const allTasks = getAllTasks();

  return allTasks.find((task) => task.getId() === taskId);
};

export {
  getAllTasks,
  getTodayTasks,
  getWeekTasks,
  getCompletedTasks,
  getProjectTasks,
  findTask,
};
