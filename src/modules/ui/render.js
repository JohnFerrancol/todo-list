import {
  createTaskContainer,
  createProjectsContainer,
  createProjectDialog,
  createTaskDialog,
  createChangeProjectStateIcon,
  createChangeStateMenu,
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

  createProjectDialog(addProjectDialog);
};

const renderAddTaskDialog = () => {
  const addTaskDialog = document.querySelector("dialog");
  addTaskDialog.innerHTML = "";

  createTaskDialog(addTaskDialog);
};

const renderChangeProjectStateIcon = (navWrapper) => {
  const existingIcon = document.querySelector(".dots-vertical-icon");
  if (!existingIcon) {
    createChangeProjectStateIcon(navWrapper);
  }
};

const renderChangeStateMenu = (navWrapper) => {
  createChangeStateMenu(navWrapper);
};

export {
  renderProjects,
  renderTasks,
  renderAddProjectDialog,
  renderAddTaskDialog,
  renderChangeProjectStateIcon,
  renderChangeStateMenu,
};
