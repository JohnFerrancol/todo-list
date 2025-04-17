import { loadProjects } from "../data/storage.js";
import { renderTasks } from "./render.js";
import {
  getAllTasks,
  getTodayTasks,
  getWeekTasks,
  getCompletedTasks,
  getProjectTasks,
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
    renderTasks(getProjectTasks(project.title), tabTitle);
    handleAddTaskButton(true);
  } else {
    const mappingTasksToRender = {
      "All Tasks": getAllTasks(),
      Today: getTodayTasks(),
      Week: getWeekTasks(),
      Completed: getCompletedTasks(),
    };
    renderTasks(mappingTasksToRender[tabTitle], tabTitle);
    if (mappingTasksToRender[tabTitle] === "Completed") {
      const checkboxes = document.querySelectorAll(".checkbox-wrapper > input");
      checkboxes.forEach((checkbox) => (checkbox.checked = true));
    }
    handleAddTaskButton(false);
  }
};

export { handleTabSelectionUI, handleAddTaskButton, refreshTasksHandler };
