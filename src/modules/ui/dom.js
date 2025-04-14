import closeDialogLogo from "../../assets/logos/close.svg";

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

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    const hyphenedTitle = task.title.toLowerCase().split(" ").join("-");
    checkBox.id = hyphenedTitle;
    checkBox.name = hyphenedTitle;
    taskWrapper.appendChild(checkBox);

    const label = document.createElement("label");
    label.for = hyphenedTitle;
    label.textContent = task.title;
    taskWrapper.appendChild(label);

    tasksContainer.appendChild(taskWrapper);

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

const handleTabSelectionUI = (links, link) => {
  links.forEach((link) => {
    const navWrapper = link.closest(".nav-wrapper");
    navWrapper.classList.remove("chosen-link");
  });

  const selectedNavWrapper = link.closest(".nav-wrapper");
  selectedNavWrapper.classList.add("chosen-link");
};

export {
  createTaskContainer,
  createProjectsContainer,
  createProjectDialog,
  handleTabSelectionUI,
};
