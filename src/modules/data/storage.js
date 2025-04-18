import { Project, Task } from "./classes.js";
import { formatDate } from "../utils/dateUtils.js";
import { getAllTasks, findTask } from "../utils/taskFilters.js";

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
  new Task("Complete SICP", formatDate(new Date("2025-04-15")), project2.title)
);
project2.addTask(
  new Task("Complete DSA", formatDate(new Date("2025-04-22")), project2.title)
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

const removeProjectHandler = (projectId) => {
  let projects = loadProjects();

  let projectIndex = projects.findIndex(
    (project) => project.getId() === projectId
  );
  projects.splice(projectIndex, 1);
};

const addTaskHandler = (taskName, taskDate, projectName) => {
  let projects = loadProjects();
  let project = projects.find((project) => project.title === projectName);

  project.addTask(new Task(taskName, formatDate(taskDate), projectName));
};

const completeTaskHandler = (taskId, isCheckBox) => {
  const taskToComplete = findTask(taskId);

  if (isCheckBox) {
    taskToComplete.toggleCompletion();
  } else {
    let project = projects.find(
      (project) => project.title === taskToComplete.projectTitle
    );
    project.removeTask(taskToComplete);
  }
};

const editTaskHandler = (newTaskObject, task) => {
  task.editTask(newTaskObject);
};

export {
  loadProjects,
  addProjectHandler,
  removeProjectHandler,
  addTaskHandler,
  completeTaskHandler,
  editTaskHandler,
};
