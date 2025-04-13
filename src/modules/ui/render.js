const renderProjects = (projects) => {
  const projectsContainer = document.querySelector(".nav-projects-container");

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

const renderTasks = (tasks, tabTitle) => {
  const tasksContainer = document.querySelector(".tasks-container");
  tasksContainer.innerHTML = "";

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

    const projectTitle = document.createElement("div");
    projectTitle.classList.add("project-task-belongs-to");
    projectTitle.innerHTML = `<p># ${task.projectTitle}</p>`;
    tasksContainer.appendChild(projectTitle);

    const customHr = document.createElement("hr");
    customHr.classList.add("custom-hr");
    tasksContainer.appendChild(customHr);
  });
};

export { renderProjects, renderTasks };
