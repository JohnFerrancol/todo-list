import {
  createTaskContainer,
  createProjectsContainer,
  createProjectDialog,
} from "./dom.js";

const renderProjects = (projects) => {
  const projectsContainer = document.querySelector(".nav-projects-container");
  projectsContainer.innerHTML = "";

  createProjectsContainer(projectsContainer, projects);
};

const renderTasks = (tasks, tabTitle) => {
  const tasksContainer = document.querySelector(".tasks-container");
  tasksContainer.innerHTML = "";

  createTaskContainer(tasksContainer, tasks, tabTitle);
};

const renderAddProjectDialog = () => {
  const addProjectDialog = document.querySelector("dialog");
  addProjectDialog.innerHTML = "";
  addProjectDialog.classList.add("add-project-dialog");

  createProjectDialog(addProjectDialog);
};

export { renderProjects, renderTasks, renderAddProjectDialog };
