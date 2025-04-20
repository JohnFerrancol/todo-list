import { loadProjects } from '../data/storage.js';
import { renderTasks } from './render.js';
import {
  getAllTasks,
  getTodayTasks,
  getWeekTasks,
  getCompletedTasks,
  getProjectTasks,
} from '../utils/taskFilters.js';

// Function used to help with displaying the current tab opened
const handleTabSelectionUI = (links, link) => {
  // Remove the chosen-link class attribue in all tabs and add the chosen-link class to the tab chosen to be rendered
  links.forEach((link) => {
    const navWrapper = link.closest('.nav-wrapper');
    navWrapper.classList.remove('chosen-link');
  });

  const selectedNavWrapper = link.closest('.nav-wrapper');
  selectedNavWrapper.classList.add('chosen-link');
};

// Function used to help in toggling the displat of the add task button in the main element
const handleAddTaskButton = (showButton) => {
  const addTaskButton = document.querySelector('.add-task-button');
  addTaskButton.style.display = showButton ? 'block' : 'none';
};

// Function used to refresh the tasks when the data is manipulated
const refreshTasksHandler = (tabTitle) => {
  const projects = loadProjects();

  // If the main element shows a specific project, render only the tasks in the project
  // Else, depending on what is pressed, filter the tasks accordingly and display
  if (projects.find((project) => project.title === tabTitle)) {
    let project = projects.find((project) => project.title === tabTitle);
    renderTasks(getProjectTasks(project.title), tabTitle);
    handleAddTaskButton(true);
  } else {
    const mappingTasksToRender = {
      'All Tasks': getAllTasks(),
      Today: getTodayTasks(),
      Week: getWeekTasks(),
      Completed: getCompletedTasks(),
    };
    renderTasks(mappingTasksToRender[tabTitle], tabTitle);

    // This is to ensure that the tasks in the Completed tab is striked as well as the checkbox is checked
    if (mappingTasksToRender[tabTitle] === 'Completed') {
      const checkboxes = document.querySelectorAll('.checkbox-wrapper > input');
      checkboxes.forEach((checkbox) => (checkbox.checked = true));
    }
    handleAddTaskButton(false);
  }
};

// Function used to listen in to a close dialog icon and close the dialog
const closeDialogHandler = (form, dialog) => {
  const closeDialogIcon = document.querySelector('.close-dialog-icon');
  closeDialogIcon.addEventListener('click', () => {
    // Reset the form and close the dialog
    form.reset();
    dialog.close();
  });
};
export {
  handleTabSelectionUI,
  handleAddTaskButton,
  refreshTasksHandler,
  closeDialogHandler,
};
