import { Project, Task } from "./classes.js";
import { formatDate } from "../utils/dateUtils.js";
import { getAllTasks, findTask } from "../utils/taskFilters.js";

const setProjects = (projects) => {
  localStorage.setItem("projects", JSON.stringify(projects));
};

const loadProjects = () => {
  const projectData = localStorage.getItem("projects");
  if (projectData) {
    let rawProjects = JSON.parse(projectData);
    return rawProjects.map(Project.fromJSON);
  }
};

const addProjectHandler = (projectName) => {
  let projects = loadProjects();

  const newProject = new Project(projectName);
  projects.push(newProject);
  setProjects(projects);
};

const renameProjectHandler = (projectName, projectId) => {
  let projects = loadProjects();

  let project = projects.find((project) => project.getId() === projectId);

  const tasks = project.getTasks();
  tasks.forEach((task) => (task.projectTitle = projectName));
  project.rename(projectName);
  setProjects(projects);
};

const removeProjectHandler = (projectId) => {
  let projects = loadProjects();

  let projectIndex = projects.findIndex(
    (project) => project.getId() === projectId
  );
  projects.splice(projectIndex, 1);
  setProjects(projects);
};

const addTaskHandler = (taskName, taskDate, projectName) => {
  let projects = loadProjects();
  let project = projects.find((project) => project.title === projectName);

  project.addTask(new Task(taskName, formatDate(taskDate), projectName));
  setProjects(projects);
};

const completeTaskHandler = (taskId, isCheckBox) => {
  let projects = loadProjects();
  projects.forEach((project) => {
    let targetTask = project.getTasks().find((task) => task.getId() === taskId);

    if (targetTask) {
      if (isCheckBox) {
        targetTask.toggleCompletion();
      } else {
        let project = projects.find(
          (project) => project.title === targetTask.projectTitle
        );
        project.removeTask(targetTask);
      }
    }
  });

  setProjects(projects);
};

const editTaskHandler = (newTaskObject, taskToChange) => {
  let projects = loadProjects();

  let targetTask;
  projects.forEach((project) => {
    targetTask = project
      .getTasks()
      .find((task) => task.getId() === taskToChange.getId());

    if (targetTask) {
      targetTask.editTask(newTaskObject);
      setProjects(projects);
    }
  });
};

export {
  loadProjects,
  addProjectHandler,
  removeProjectHandler,
  addTaskHandler,
  completeTaskHandler,
  editTaskHandler,
  renameProjectHandler,
};
