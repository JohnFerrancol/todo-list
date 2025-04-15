import { loadProjects } from "../data/storage.js";
import { renderTasks } from "./render.js";
import {
  getAllTasks,
  getTodayTasks,
  getWeekTasks,
} from "../utils/taskFilters.js";

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

const refreshTasksHandler = (tabTitle) => {
  const projects = loadProjects();
  if (projects.find((project) => project.title === tabTitle)) {
    let project = projects.find((project) => project.title === tabTitle);
    renderTasks(project.getTasks(), tabTitle);
    handleAddTaskButton(true);
  } else {
    const mappingTasksToRender = {
      "All Tasks": getAllTasks(),
      Today: getTodayTasks(),
      Week: getWeekTasks(),
    };
    renderTasks(mappingTasksToRender[tabTitle], tabTitle);
    handleAddTaskButton(false);
  }
};

export { handleTabSelectionUI, handleAddTaskButton, refreshTasksHandler };
