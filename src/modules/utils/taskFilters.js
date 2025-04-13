import { loadProjects } from "../data/storage.js";

const getAllTasks = () => {
  let projects = loadProjects();
  const allTasks = [];

  projects.forEach((project) => {
    const tasks = project.getTasks();

    tasks.forEach((task) => allTasks.push(task));
  });

  return allTasks;
};

export { getAllTasks };
