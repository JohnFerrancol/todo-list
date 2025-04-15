import {
  renderAddProjectDialog,
  renderAddTaskDialog,
  renderProjects,
} from "./render.js";
import {
  loadProjects,
  addProjectHandler,
  addTaskHandler,
  completeTaskHandler,
} from "../data/storage.js";
import {
  handleTabSelectionUI,
  handleAddTaskButton,
  refreshTasksHandler,
} from "./uiHelpers.js";

const projectNavListener = () => {
  handleAddTaskButton(false);
  const links = document.querySelectorAll(".nav-text");

  links.forEach((link) => {
    link.addEventListener("click", () => {
      handleTabSelectionUI(links, link);
      const tabToRender = link.dataset.tab;
      refreshTasksHandler(tabToRender);
    });
  });
};

document
  .querySelector(".add-projects-container")
  .addEventListener("click", () => {
    renderAddProjectDialog();

    const addProjectDialog = document.querySelector("dialog");
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
      refreshTasksHandler(addProjectTitle);
      addProjectDialog.close();
      projectNavListener();
      handleAddTaskButton(true);
    });

    const closeDialogIcon = document.querySelector(".close-dialog-icon");
    closeDialogIcon.addEventListener("click", () => {
      createProjectForm.reset();
      addProjectDialog.close();
    });
  });

document.querySelector(".add-task-button").addEventListener("click", () => {
  renderAddTaskDialog();

  const addTaskDialog = document.querySelector("dialog");
  addTaskDialog.showModal();

  const createTaskForm = document.querySelector(".create-task-form");
  createTaskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const addTaskTitle = document.querySelector("#new-task-title").value.trim();
    const addTaskDate = document.querySelector("#new-task-date").value.trim();
    const projectTitle = document.querySelector(".projects-title").textContent;

    addTaskHandler(addTaskTitle, addTaskDate, projectTitle);
    refreshTasksHandler(projectTitle);
    addTaskDialog.close();
    handleAddTaskButton(true);
  });

  const closeDialogIcon = document.querySelector(".close-dialog-icon");
  closeDialogIcon.addEventListener("click", () => {
    createTaskForm.reset();
    addTaskDialog.close();
  });
});

const completeTaskListener = (checkBox) => {
  checkBox.addEventListener("change", () => {
    if (checkBox.checked) {
      const taskToCompleteId = checkBox.dataset.Id;
      completeTaskHandler(taskToCompleteId);

      const projects = loadProjects();
      console.log(projects);
      const tabTitle = document.querySelector(".projects-title").textContent;

      setTimeout(() => {
        refreshTasksHandler(tabTitle);
      }, 250);
    }
  });
};

export { projectNavListener, completeTaskListener };
