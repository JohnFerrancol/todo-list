import {
  createTaskContainer,
  createProjectsContainer,
  createProjectDialog,
  createTaskDialog,
  createChangeProjectStateIcon,
  createChangeStateMenu,
} from "./dom.js";

// Function used to render the projects by removing the dom in the projects container and rebuilding it with the new data
const renderProjects = (projects) => {
  const projectsContainer = document.querySelector(".nav-projects-container");
  projectsContainer.innerHTML = "";

  createProjectsContainer(projectsContainer, projects);
};

// Function used to render the tasks by removing the dom in the projects container and rebuilding it with the new data
const renderTasks = (tasks, tabTitle) => {
  const tasksContainer = document.querySelector(".tasks-container");
  tasksContainer.innerHTML = "";
  createTaskContainer(tasksContainer, tasks, tabTitle);
};

// Function used to render a project to add a project and resetting the form content
const renderAddProjectDialog = () => {
  const addProjectDialog = document.querySelector("dialog");
  addProjectDialog.innerHTML = "";

  createProjectDialog(addProjectDialog);
};

// Function used to render a tasks to add a project and resetting the form content
const renderAddTaskDialog = () => {
  const addTaskDialog = document.querySelector("dialog");
  addTaskDialog.innerHTML = "";

  createTaskDialog(addTaskDialog);
};

// Function used to display the three dots icon
const renderChangeProjectStateIcon = (navWrapper) => {
  // Only one three dots icon should be active at one point, and it should be next to the project hovered in the aside element
  // When running this function, removen all three dots icon currently in the webpage
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
