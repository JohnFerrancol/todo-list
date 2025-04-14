import { Project, Task } from "./classes.js";
import { formatDate } from "../utils/dateUtils.js";

let projects = [];
const project1 = new Project("Web Development");
project1.addTask(
  new Task("Complete Odin", formatDate(new Date("2025-04-15")), project1.title)
);
project1.addTask(
  new Task("Complete CS50", formatDate(new Date("2025-04-13")), project1.title)
);
projects.push(project1);

const project2 = new Project("CS Prep");
project2.addTask(
  new Task("Complete SICP", formatDate(new Date("2025-04-13")), project2.title)
);
projects.push(project2);

const loadProjects = () => {
  return projects;
};

const addProjectHandler = (projectName) => {
  let projects = loadProjects();

  const newProject = new Project(projectName);
  projects.push(newProject);
};

const addTaskHandler = (taskName, taskDate, projectName) => {
  let projects = loadProjects();
  let project = projects.find((project) => project.title === projectName);

  project.addTask(new Task(taskName, formatDate(taskDate), projectName));
};

export { loadProjects, addProjectHandler, addTaskHandler };
