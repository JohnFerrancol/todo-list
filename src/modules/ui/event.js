import {
  renderAddProjectDialog,
  renderAddTaskDialog,
  renderProjects,
  renderChangeProjectStateIcon,
  renderChangeStateMenu,
} from "./render.js";
import {
  loadProjects,
  addProjectHandler,
  renameProjectHandler,
  removeProjectHandler,
  addTaskHandler,
  completeTaskHandler,
  editTaskHandler,
} from "../data/storage.js";
import {
  handleTabSelectionUI,
  handleAddTaskButton,
  refreshTasksHandler,
} from "./uiHelpers.js";
import { findTask } from "../utils/taskFilters.js";
import { deformatDate, formatDate } from "../utils/dateUtils.js";

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

const completeTaskListener = (elementClicker) => {
  elementClicker.addEventListener("click", (event) => {
    const clickedElement = event.target;
    if (
      clickedElement.tagName === "INPUT" ||
      clickedElement.tagName === "IMG"
    ) {
      const findTaskWrapper = elementClicker.closest(".task-wrapper");
      const taskToCompleteId = findTaskWrapper.dataset.id;
      completeTaskHandler(taskToCompleteId, clickedElement.tagName === "INPUT");
      const tabTitle = document.querySelector(".projects-title").textContent;

      let timeOut = 0;
      if (clickedElement.tagName !== "IMG") timeOut = 250;
      setTimeout(() => {
        refreshTasksHandler(tabTitle);
      }, timeOut);
    }
  });
};

const editingTaskListener = (taskClicked) => {
  taskClicked.addEventListener("click", () => {
    const findTaskWrapper = taskClicked.closest(".task-wrapper");
    renderAddTaskDialog();

    const findTaskObject = findTask(findTaskWrapper.dataset.id);
    const taskTitle = document.querySelector("#new-task-title");
    const taskDate = document.querySelector("#new-task-date");
    taskTitle.value = findTaskObject.title;
    taskDate.value = deformatDate(findTaskObject.date);

    const editTaskDialog = document.querySelector("dialog");
    editTaskDialog.showModal();

    const editTaskForm = document.querySelector(".create-task-form");
    editTaskForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const editTaskTitle = document
        .querySelector("#new-task-title")
        .value.trim();
      const editTaskDate = document
        .querySelector("#new-task-date")
        .value.trim();
      const projectTitle =
        document.querySelector(".projects-title").textContent;
      editTaskHandler(
        { newTitle: editTaskTitle, newDate: formatDate(editTaskDate) },
        findTaskObject
      );
      console.log(loadProjects());
      refreshTasksHandler(projectTitle);
      editTaskDialog.close();
      handleAddTaskButton(true);
    });

    const closeDialogIcon = document.querySelector(".close-dialog-icon");
    closeDialogIcon.addEventListener("click", () => {
      editTaskDialog.close();
    });
  });
};

const hoverNavWrapperListener = (navWrapper) => {
  navWrapper.addEventListener("mouseenter", () => {
    renderChangeProjectStateIcon(navWrapper);

    const deleteProjectIcon = document.querySelector(".dots-vertical-icon");
    deleteProjectIcon.addEventListener("click", () => {
      renderChangeStateMenu(navWrapper);

      const projectId = navWrapper.dataset.id;

      const contextMenu = document.querySelector(".context-menu");
      contextMenuEventListener(contextMenu, projectId);
    });
  });

  navWrapper.addEventListener("mouseleave", () => {
    const icon = navWrapper.querySelector(".dots-vertical-icon");
    const contextMenu = navWrapper.querySelector(".context-menu");
    if (icon) icon.remove();
    if (contextMenu) contextMenu.remove();
  });
};

const contextMenuEventListener = (contextMenu, projectId) => {
  contextMenu.addEventListener("click", (event) => {
    let targetId = event.target.id;

    switch (targetId) {
      case "rename-project-button":
        renderAddProjectDialog();

        let projects = loadProjects();
        let project = projects.find((project) => project.getId() === projectId);

        const projectTitle = document.querySelector("#new-project-title");
        projectTitle.value = project.title;

        const editProjectDialog = document.querySelector("dialog");
        editProjectDialog.showModal();

        const editProjectForm = document.querySelector(".create-project-form");
        editProjectForm.addEventListener("submit", (event) => {
          event.preventDefault();
          const newProjectTitle = document
            .querySelector("#new-project-title")
            .value.trim();

          renameProjectHandler(newProjectTitle, projectId);
          const projects = loadProjects();
          renderProjects(projects);

          const links = document.querySelectorAll(".nav-text");
          const projectLink = document.querySelector(
            `[data-tab="${newProjectTitle}"]`
          );

          handleTabSelectionUI(links, projectLink);
          refreshTasksHandler(newProjectTitle);
          editProjectDialog.close();
          projectNavListener();
          handleAddTaskButton(true);
        });

        const closeDialogIcon = document.querySelector(".close-dialog-icon");
        closeDialogIcon.addEventListener("click", () => {
          editProjectDialog.close();
        });
        break;
      case "delete-project-button":
        removeProjectHandler(projectId);
        setTimeout(() => {
          renderProjects(loadProjects());
          refreshTasksHandler("All Tasks");

          const links = document.querySelectorAll(".nav-text");
          const projectLinks = document.querySelector(
            ".nav-projects .nav-text"
          );

          console.log(projectLinks);
          const linkToRender = projectLinks
            ? projectLinks
            : document.querySelector("[data-tab='All Tasks']");
          handleTabSelectionUI(links, linkToRender);
        }, 250);

        break;
    }
  });
};

export {
  projectNavListener,
  completeTaskListener,
  editingTaskListener,
  hoverNavWrapperListener,
};
