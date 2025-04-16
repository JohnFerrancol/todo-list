import { loadProjects } from "../data/storage.js";
import { isToday, isThisWeek } from "date-fns";

const getFilteredTasks = (filterFunction) => {
  const projects = loadProjects();
  const filteredTasks = [];

  projects.forEach((project) => {
    const tasks = project.getTasks();

    tasks.forEach((task) => {
      if (filterFunction(task)) {
        filteredTasks.push(task);
      }
    });
  });

  return filteredTasks;
};

const getAllTasks = () => getFilteredTasks(() => true);
const getTodayTasks = () => getFilteredTasks((task) => isToday(task.date));
const getWeekTasks = () => getFilteredTasks((task) => isThisWeek(task.date));

const findTask = (taskId) => {
  const allTasks = getAllTasks();

  return allTasks.find((task) => task.getId() === taskId);
};

export { getAllTasks, getTodayTasks, getWeekTasks, findTask };
