import { loadProjects } from "../data/storage.js";
import { renderTasks } from "./render.js";

const handleTabSelectionUI = (links, link) => {
  links.forEach((link) => {
    const navWrapper = link.closest(".nav-wrapper");
    navWrapper.classList.remove("chosen-link");
  });

  const selectedNavWrapper = link.closest(".nav-wrapper");
  selectedNavWrapper.classList.add("chosen-link");
};

const handleAddTaskButton = (showButton) => {
  const addTaskButton = document.querySelector(".add-task-button");
  addTaskButton.style.display = showButton ? "block" : "none";
};

const refreshTasksHandler = (projectTitle) => {
  const projects = loadProjects();
  let project = projects.find((project) => project.title === projectTitle);
  renderTasks(project.getTasks(), projectTitle);
};

export { handleTabSelectionUI, handleAddTaskButton, refreshTasksHandler };
