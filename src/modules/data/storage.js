import { Project, Task } from "./classes.js";

const loadProjects = () => {
  const project1 = new Project("Web Development");
  project1.addTask(new Task("Complete Odin", "December", project1.title));
  project1.addTask(new Task("Complete CS50", "December", project1.title));

  const project2 = new Project("CS Prep");
  project2.addTask(new Task("Complete SICP", "March", project2.title));

  return [project1, project2];
};

export { loadProjects };
