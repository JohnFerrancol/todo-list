import {
  renderTasks,
  renderAddProjectDialog,
  renderProjects,
} from "./render.js";
import { loadProjects, addProjectHandler } from "../data/storage.js";
import { getAllTasks } from "../utils/taskFilters.js";
import { Task } from "../data/classes.js";
import { handleTabSelectionUI } from "./dom.js";
import { formatDate } from "../utils/dateUtils.js";

const projectNavListener = () => {
  const links = document.querySelectorAll(".nav-text");

  links.forEach((link) => {
    link.addEventListener("click", () => {
      handleTabSelectionUI(links, link);
      const tabToRender = link.dataset.tab;
      const projects = loadProjects();
      if (projects.find((project) => project.title === tabToRender)) {
        let project = projects.find((project) => project.title === tabToRender);
        renderTasks(project.getTasks(), tabToRender);
      } else {
        const mappingTasksToRender = {
          "All Tasks": getAllTasks(),
          Today: getAllTasks(),
          Week: getAllTasks(),
        };
        renderTasks(mappingTasksToRender[tabToRender], tabToRender);
      }
    });
  });
};

document
  .querySelector(".add-projects-container")
  .addEventListener("click", () => {
    renderAddProjectDialog();

    const addProjectDialog = document.querySelector(".add-project-dialog");
    addProjectDialog.showModal();

    const createProjectForm = document.querySelector(".create-project-form");
    createProjectForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const addProjectTitle = document
        .querySelector("#new-project-title")
        .value.trim();
      addProjectHandler(addProjectTitle);
      const projects = loadProjects();
      renderProjects(projects);

      const links = document.querySelectorAll(".nav-text");
      const newProjectLink = document.querySelector(
        `[data-tab="${addProjectTitle}"]`
      );

      handleTabSelectionUI(links, newProjectLink);
      let project = projects.find(
        (project) => project.title === addProjectTitle
      );
      project.addTask(
        new Task(
          "Boiler Plate",
          formatDate(new Date("2025-04-13")),
          project.title
        )
      );
      renderTasks(project.getTasks(), addProjectTitle);
      addProjectDialog.close();
      projectNavListener();
    });

    const closeDialogIcon = document.querySelector(".close-dialog-icon");
    closeDialogIcon.addEventListener("click", () => {
      createProjectForm.reset();
      addProjectDialog.close();
    });
  });

export { projectNavListener };
