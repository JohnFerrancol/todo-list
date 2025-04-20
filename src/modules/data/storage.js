import { Project, Task } from './classes.js';
import { formatDate } from '../utils/dateUtils.js';

// Function used to update the projects array in local storage
const setProjects = (projects) => {
  localStorage.setItem('projects', JSON.stringify(projects));
};

// Function used to get the projects array in the local storage and converting the projects array from JSON to an array of Project objects with an array of Task Objects
const loadProjects = () => {
  const projectData = localStorage.getItem('projects');
  if (projectData) {
    let rawProjects = JSON.parse(projectData);
    return rawProjects.map(Project.fromJSON);
  }
};

// Function used to add a project object to the projects array
const addProjectHandler = (projectName) => {
  let projects = loadProjects();

  const newProject = new Project(projectName);
  projects.push(newProject);
  setProjects(projects);
};

// Function used to rename a title attribute of a project object
const renameProjectHandler = (projectName, projectId) => {
  let projects = loadProjects();

  let project = projects.find((project) => project.getId() === projectId);

  const tasks = project.getTasks();
  tasks.forEach((task) => (task.projectTitle = projectName));
  project.rename(projectName);
  setProjects(projects);
};

// Function used to delete project object from a projects array
const removeProjectHandler = (projectId) => {
  let projects = loadProjects();

  let projectIndex = projects.findIndex(
    (project) => project.getId() === projectId
  );
  projects.splice(projectIndex, 1);
  setProjects(projects);
};

// Function used to delete project object from a projects array
const addTaskHandler = (taskName, taskDate, projectName) => {
  let projects = loadProjects();
  let project = projects.find((project) => project.title === projectName);

  project.addTask(new Task(taskName, formatDate(taskDate), projectName));
  setProjects(projects);
};

// Function used to either toggle the completion attribute of a Task object or remove the task object from the projects object task array attribute
const completeTaskHandler = (taskId, isCheckBox) => {
  let projects = loadProjects();
  projects.forEach((project) => {
    // Finding the task object from the projects array
    let targetTask = project.getTasks().find((task) => task.getId() === taskId);

    // If the task is found do the following
    if (targetTask) {
      if (isCheckBox) {
        // Toggle the completion of the task when the user wants to complete the task
        targetTask.toggleCompletion();
      } else {
        // Remove the task object from the project object tasks array attribute
        let project = projects.find(
          (project) => project.title === targetTask.projectTitle
        );
        project.removeTask(targetTask);
      }
    }
  });

  setProjects(projects);
};

// Function used to edit the task details
const editTaskHandler = (newTaskObject, taskToChange) => {
  let projects = loadProjects();

  let targetTask;
  projects.forEach((project) => {
    // Fidning the task object from the projects array
    targetTask = project
      .getTasks()
      .find((task) => task.getId() === taskToChange.getId());

    // If the task is found, edit the task object from the new values given in the newTaskObject
    if (targetTask) {
      targetTask.editTask(newTaskObject);
      setProjects(projects);
    }
  });
};

export {
  setProjects,
  loadProjects,
  addProjectHandler,
  removeProjectHandler,
  addTaskHandler,
  completeTaskHandler,
  editTaskHandler,
  renameProjectHandler,
};
