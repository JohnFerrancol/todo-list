import closeDialogLogo from "../../assets/logos/close.svg";
import deleteIconLogo from "../../assets/logos/delete.svg";
import { completeTaskListener, editingTaskListener } from "./event.js";

const createProjectsContainer = (projectsContainer, projects) => {
  projects.forEach((project) => {
    const navWrapper = document.createElement("li");
    navWrapper.classList.add("nav-wrapper");

    const navText = document.createElement("a");
    navText.classList.add("nav-text");
    const hyphenedTitle = project.title.toLowerCase().split(" ").join("-");
    navText.href = `#${hyphenedTitle}`;
    navText.textContent = `# ${project.title}`;
    navText.dataset.tab = project.title;

    navWrapper.appendChild(navText);
    projectsContainer.appendChild(navWrapper);
  });
};

const createTaskContainer = (tasksContainer, tasks, tabTitle) => {
  const tabTitleDisplay = document.querySelector(".projects-title");
  tabTitleDisplay.textContent = tabTitle;

  tasks.forEach((task) => {
    const taskWrapper = document.createElement("div");
    taskWrapper.classList.add("task-wrapper");
    taskWrapper.dataset.id = task.getId();
    tasksContainer.appendChild(taskWrapper);

    const checkBoxWrapper = document.createElement("div");
    checkBoxWrapper.classList.add("checkbox-wrapper");
    taskWrapper.appendChild(checkBoxWrapper);

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    const hyphenedTitle = task.title.toLowerCase().split(" ").join("-");
    checkBox.id = hyphenedTitle;
    checkBox.name = hyphenedTitle;
    checkBoxWrapper.appendChild(checkBox);
    if (task.getCompletion()) {
      checkBox.checked = true;
      checkBox.disabled = true;
    }
    completeTaskListener(checkBox);

    const label = document.createElement("label");
    label.for = hyphenedTitle;
    label.textContent = task.title;
    checkBoxWrapper.appendChild(label);
    editingTaskListener(label);

    const deleteTaskIcon = document.createElement("img");
    deleteTaskIcon.classList.add("delete-task-icon");
    deleteTaskIcon.src = deleteIconLogo;
    deleteTaskIcon.alt = "Delete Task";
    taskWrapper.appendChild(deleteTaskIcon);
    completeTaskListener(deleteTaskIcon);

    const taskInformation = document.createElement("div");
    taskInformation.classList.add("task-information");

    const projectTitle = document.createElement("div");
    projectTitle.classList.add("project-task-belongs-to");
    projectTitle.innerHTML = `<p># ${task.projectTitle}</p>`;
    taskInformation.appendChild(projectTitle);

    const taskDate = document.createElement("div");
    taskDate.classList.add("task-date");
    taskDate.innerHTML = `<p>${task.date}</p>`;
    taskInformation.appendChild(taskDate);

    tasksContainer.appendChild(taskInformation);

    const customHr = document.createElement("hr");
    customHr.classList.add("custom-hr");
    tasksContainer.appendChild(customHr);
  });
};

const createProjectDialog = (addProjectDialog) => {
  const closeDialogContainer = document.createElement("div");
  closeDialogContainer.classList.add("close-dialog-container");

  const closeDialogIcon = document.createElement("img");
  closeDialogIcon.classList.add("close-dialog-icon");
  closeDialogIcon.src = closeDialogLogo;
  closeDialogIcon.alt = "Close Dialog";
  closeDialogContainer.appendChild(closeDialogIcon);
  addProjectDialog.appendChild(closeDialogContainer);

  const dialogTitle = document.createElement("h3");
  dialogTitle.textContent = "Add Project";
  dialogTitle.classList.add("dialog-title");
  addProjectDialog.appendChild(dialogTitle);

  const createProjectForm = document.createElement("form");
  createProjectForm.classList.add("create-project-form");
  addProjectDialog.appendChild(createProjectForm);

  const newProjectTitle = document.createElement("input");
  newProjectTitle.classList.add("dialog-inputs");
  newProjectTitle.type = "text";
  newProjectTitle.id = "new-project-title";
  newProjectTitle.name = "new-project-title";
  newProjectTitle.placeholder = "Project Title";
  newProjectTitle.required = true;
  createProjectForm.appendChild(newProjectTitle);

  const submitButtonContainer = document.createElement("div");
  submitButtonContainer.classList.add("button-container");
  createProjectForm.appendChild(submitButtonContainer);

  const submitButton = document.createElement("button");
  submitButton.classList.add("submit-button");
  submitButton.type = "submit";
  submitButton.textContent = "Submit";
  submitButtonContainer.appendChild(submitButton);
};

const createTaskDialog = (addTaskDialog) => {
  const closeDialogContainer = document.createElement("div");
  closeDialogContainer.classList.add("close-dialog-container");

  const closeDialogIcon = document.createElement("img");
  closeDialogIcon.classList.add("close-dialog-icon");
  closeDialogIcon.src = closeDialogLogo;
  closeDialogIcon.alt = "Close Dialog";
  closeDialogContainer.appendChild(closeDialogIcon);
  addTaskDialog.appendChild(closeDialogContainer);

  const dialogTitle = document.createElement("h3");
  dialogTitle.textContent = "Add Task";
  dialogTitle.classList.add("dialog-title");
  addTaskDialog.appendChild(dialogTitle);

  const createTaskForm = document.createElement("form");
  createTaskForm.classList.add("create-task-form");
  addTaskDialog.appendChild(createTaskForm);

  const newTaskTitle = document.createElement("input");
  newTaskTitle.classList.add("dialog-inputs");
  newTaskTitle.type = "text";
  newTaskTitle.id = "new-task-title";
  newTaskTitle.name = "new-task-title";
  newTaskTitle.placeholder = "Task Title";
  newTaskTitle.required = true;
  createTaskForm.appendChild(newTaskTitle);

  const newTaskDate = document.createElement("input");
  newTaskDate.classList.add("dialog-inputs");
  newTaskDate.type = "date";
  newTaskDate.id = "new-task-date";
  newTaskDate.name = "new-task-date";
  newTaskDate.placeholder = "Task Due Date";
  newTaskDate.required = true;
  createTaskForm.appendChild(newTaskDate);

  const submitButtonContainer = document.createElement("div");
  submitButtonContainer.classList.add("button-container");
  createTaskForm.appendChild(submitButtonContainer);

  const submitButton = document.createElement("button");
  submitButton.classList.add("submit-button");
  submitButton.type = "submit";
  submitButton.textContent = "Submit";
  submitButtonContainer.appendChild(submitButton);
};

export {
  createTaskContainer,
  createProjectsContainer,
  createProjectDialog,
  createTaskDialog,
};
