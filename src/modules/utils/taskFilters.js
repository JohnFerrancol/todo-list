import { loadProjects } from "../data/storage.js";
import { isToday, isThisWeek } from "date-fns";

const getFilteredTasks = (filterFunction, filterIsComplete) => {
  const projects = loadProjects();
  const filteredTasks = [];

  projects.forEach((project) => {
    const tasks = project.getTasks();

    tasks.forEach((task) => {
      const completionMatches = task.getCompletion() === filterIsComplete;
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

const findTask = (taskId) => {
  const allTasks = getAllTasks();

  return allTasks.find((task) => task.getId() === taskId);
};

export {
  getAllTasks,
  getTodayTasks,
  getWeekTasks,
  getCompletedTasks,
  findTask,
};
