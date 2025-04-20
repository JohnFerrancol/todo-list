import {
  renderAddProjectDialog,
  renderAddTaskDialog,
  renderProjects,
  renderChangeProjectStateIcon,
  renderChangeStateMenu,
} from './render.js';
import {
  loadProjects,
  addProjectHandler,
  renameProjectHandler,
  removeProjectHandler,
  addTaskHandler,
  completeTaskHandler,
  editTaskHandler,
} from '../data/storage.js';
import {
  handleTabSelectionUI,
  handleAddTaskButton,
  refreshTasksHandler,
  closeDialogHandler,
} from './uiHelpers.js';
import { findTask } from '../utils/taskFilters.js';
import { deformatDate, formatDate } from '../utils/dateUtils.js';

// Function used to handle the tab switching logic
const projectNavListener = () => {
  handleAddTaskButton(false);
  const links = document.querySelectorAll('.nav-text');

  // When running the tab switching, run the logic to to do tab switching in the UI as well rendering the new tasks relating to that tab
  links.forEach((link) => {
    link.addEventListener('click', () => {
      handleTabSelectionUI(links, link);
      const tabToRender = link.dataset.tab;
      refreshTasksHandler(tabToRender);
    });
  });
};

// Event listener to hear when the add projects button is pressed
document
  .querySelector('.add-projects-container')
  .addEventListener('click', () => {
    // Render the dialog which displays the create project form
    renderAddProjectDialog();

    const addProjectDialog = document.querySelector('dialog');
    addProjectDialog.showModal();

    const createProjectForm = document.querySelector('.create-project-form');
    createProjectForm.addEventListener('submit', (event) => {
      // Preventing webpage from refreshing
      event.preventDefault();

      // Add the project object to the project array as well as re-render the new projects array
      const addProjectTitle = document
        .querySelector('#new-project-title')
        .value.trim();
      addProjectHandler(addProjectTitle);
      const projects = loadProjects();
      renderProjects(projects);

      // Switch the tab to the newly added project and refresh the tasks shown and close the dialog
      const links = document.querySelectorAll('.nav-text');
      const newProjectLink = document.querySelector(
        `[data-tab="${addProjectTitle}"]`
      );

      handleTabSelectionUI(links, newProjectLink);
      refreshTasksHandler(addProjectTitle);
      addProjectDialog.close();

      // The projectNavListener is ran to ensure that the nav listener can function again
      projectNavListener();
      handleAddTaskButton(true);
    });

    // Run the function to listen in the when the user wants to close the dialog
    closeDialogHandler(createProjectForm, addProjectDialog);
  });

// Event listener to hear when the add task button is pressed
document.querySelector('.add-task-button').addEventListener('click', () => {
  // Render the dialog which displays the create task form
  renderAddTaskDialog();

  const addTaskDialog = document.querySelector('dialog');
  addTaskDialog.showModal();

  const createTaskForm = document.querySelector('.create-task-form');
  createTaskForm.addEventListener('submit', (event) => {
    // Preventing webpage from refreshing
    event.preventDefault();

    // Add the task to the corresponding project object into the tasks array attribute of the project
    const addTaskTitle = document.querySelector('#new-task-title').value.trim();
    const addTaskDate = document.querySelector('#new-task-date').value.trim();
    const projectTitle = document.querySelector('.projects-title').textContent;

    addTaskHandler(addTaskTitle, addTaskDate, projectTitle);

    // Refresh the task and close the dialog
    refreshTasksHandler(projectTitle);
    addTaskDialog.close();
    handleAddTaskButton(true);
  });

  // Run the function to listen in the when the user wants to close the dialog
  closeDialogHandler(createTaskForm, addTaskDialog);
});

// Event listener to hear when the user wants to either complete or delete a task
const completeTaskListener = (elementClicker) => {
  elementClicker.addEventListener('click', (event) => {
    const clickedElement = event.target;
    // Ensure that the element clicked is an INPUT (checkbox to complete) and IMG (delete svg to delete images)
    if (
      clickedElement.tagName === 'INPUT' ||
      clickedElement.tagName === 'IMG'
    ) {
      // Run the completeTaskHandler which determines whether to toggle the complete attribute in the task object or to delete the task object
      const findTaskWrapper = elementClicker.closest('.task-wrapper');
      const taskToCompleteId = findTaskWrapper.dataset.id;
      completeTaskHandler(taskToCompleteId, clickedElement.tagName === 'INPUT');
      const tabTitle = document.querySelector('.projects-title').textContent;

      // Add a UX element to delay the completion of the task when the user wants to complete a task
      let timeOut = 0;
      if (clickedElement.tagName !== 'IMG') timeOut = 250;
      setTimeout(() => {
        refreshTasksHandler(tabTitle);
      }, timeOut);
    }
  });
};

// Event listener to hear when the user wants to edit a task
const editingTaskListener = (taskClicked) => {
  taskClicked.addEventListener('click', () => {
    // Render the dialog which renders the add task form and change the title to edit task
    const findTaskWrapper = taskClicked.closest('.task-wrapper');
    renderAddTaskDialog();
    const editTaskDialog = document.querySelector('dialog');
    editTaskDialog.querySelector('.dialog-title').textContent = 'Edit Task';

    // Populate the form data with the original data
    const findTaskObject = findTask(findTaskWrapper.dataset.id);
    const taskTitle = document.querySelector('#new-task-title');
    const taskDate = document.querySelector('#new-task-date');
    taskTitle.value = findTaskObject.title;
    taskDate.value = deformatDate(findTaskObject.date);

    editTaskDialog.showModal();

    const editTaskForm = document.querySelector('.create-task-form');
    editTaskForm.addEventListener('submit', (event) => {
      // Preventing webpage from refreshing
      event.preventDefault();

      // Edit the task from the corresponding project object in the tasks array attribute of the project
      const editTaskTitle = document
        .querySelector('#new-task-title')
        .value.trim();
      const editTaskDate = document
        .querySelector('#new-task-date')
        .value.trim();
      const projectTitle =
        document.querySelector('.projects-title').textContent;
      editTaskHandler(
        { newTitle: editTaskTitle, newDate: formatDate(editTaskDate) },
        findTaskObject
      );

      // Refresh the task and close the dialog
      refreshTasksHandler(projectTitle);
      editTaskDialog.close();
    });

    // Run the function to listen in the when the user wants to close the dialog
    closeDialogHandler(editTaskForm, editTaskDialog);
  });
};

// Event listener to hear when the user hovers around the project
const hoverNavWrapperListener = (navWrapper) => {
  // When the user's mouse enter the nav wrapper add display the three dots icon and render the context menu when the three dots is pressed
  navWrapper.addEventListener('mouseenter', () => {
    renderChangeProjectStateIcon(navWrapper);

    const deleteProjectIcon = document.querySelector('.dots-vertical-icon');
    deleteProjectIcon.addEventListener('click', () => {
      renderChangeStateMenu(navWrapper);

      const projectId = navWrapper.dataset.id;

      // Add an event listener which listens to when any button in the context menu is pressed
      const contextMenu = document.querySelector('.context-menu');
      contextMenuEventListener(contextMenu, projectId);
    });
  });

  // When the user's mouse leaves the wrapper, remove the icon and context menu
  navWrapper.addEventListener('mouseleave', () => {
    const icon = navWrapper.querySelector('.dots-vertical-icon');
    const contextMenu = navWrapper.querySelector('.context-menu');
    if (icon) icon.remove();
    if (contextMenu) contextMenu.remove();
  });
};

const contextMenuEventListener = (contextMenu, projectId) => {
  contextMenu.addEventListener('click', (event) => {
    let targetId = event.target.id;

    switch (targetId) {
      // Case when the user want to rename the porject
      case 'rename-project-button': {
        // Load the dialog hosting the add project form
        renderAddProjectDialog();

        let projects = loadProjects();
        let project = projects.find((project) => project.getId() === projectId);

        // Populate the form with the original project title and change the dialog title to Renaming the project
        const projectTitle = document.querySelector('#new-project-title');
        projectTitle.value = project.title;

        const editProjectDialog = document.querySelector('dialog');
        editProjectDialog.querySelector('.dialog-title').textContent =
          'Rename Project';
        editProjectDialog.showModal();

        const editProjectForm = document.querySelector('.create-project-form');
        editProjectForm.addEventListener('submit', (event) => {
          // Preventing webpage from refreshing
          event.preventDefault();

          // Edit the project title from the projects array and rerender the projects container
          const newProjectTitle = document
            .querySelector('#new-project-title')
            .value.trim();

          renameProjectHandler(newProjectTitle, projectId);
          const projects = loadProjects();
          renderProjects(projects);

          const links = document.querySelectorAll('.nav-text');
          const projectLink = document.querySelector(
            `[data-tab="${newProjectTitle}"]`
          );

          // Switch to the tab to the project renamed as well as close the dialog
          handleTabSelectionUI(links, projectLink);
          refreshTasksHandler(newProjectTitle);
          editProjectDialog.close();
          projectNavListener();
          handleAddTaskButton(true);
        });

        // Run the function to listen in the when the user wants to close the dialog
        closeDialogHandler(editProjectForm, editProjectDialog);
        break;
      }
      case 'delete-project-button':
        // Remove the project from the project array
        removeProjectHandler(projectId);

        // Adding UX elements to delay the deletion of the projecs
        setTimeout(() => {
          // If there is no more projects, render all Task else render the first project in the projects container
          renderProjects(loadProjects());
          refreshTasksHandler('All Tasks');

          const links = document.querySelectorAll('.nav-text');
          const projectLinks = document.querySelector(
            '.nav-projects .nav-text'
          );
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
