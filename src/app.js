import "./styles/style.css";
import { renderProjects, renderTasks } from "./modules/ui/render.js";
import { loadProjects, setProjects } from "./modules/data/storage.js";
import { projectNavListener } from "./modules/ui/event.js";
import { getAllTasks } from "./modules/utils/taskFilters.js";
import { Project, Task } from "./modules/data/classes.js";
import { formatDate } from "./modules/utils/dateUtils.js";

const initialiseProjects = () => {
  let projects = [];
  const project1 = new Project("Web Development");
  project1.addTask(
    new Task(
      "Complete Odin",
      formatDate(new Date("2025-04-15")),
      project1.title
    )
  );
  project1.addTask(
    new Task(
      "Complete CS50",
      formatDate(new Date("2025-04-13")),
      project1.title
    )
  );
  projects.push(project1.toJSON());

  const project2 = new Project("CS Prep");
  project2.addTask(
    new Task(
      "Complete SICP",
      formatDate(new Date("2025-04-15")),
      project2.title
    )
  );
  project2.addTask(
    new Task("Complete DSA", formatDate(new Date("2025-04-22")), project2.title)
  );
  projects.push(project2.toJSON());
  localStorage.setItem("projects", JSON.stringify(projects));
};

const init = (function () {
  let projects = loadProjects();

  if (!projects) {
    initialiseProjects();
    projects = loadProjects();
  }
  renderProjects(projects);
  renderTasks(getAllTasks(), "All Tasks");
  projectNavListener();
})();
