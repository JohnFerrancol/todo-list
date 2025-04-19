import "./styles/style.css";
import { renderProjects, renderTasks } from "./modules/ui/render.js";
import { loadProjects, setProjects } from "./modules/data/storage.js";
import { projectNavListener } from "./modules/ui/event.js";
import { getAllTasks } from "./modules/utils/taskFilters.js";
import { Project, Task } from "./modules/data/classes.js";
import { formatDate } from "./modules/utils/dateUtils.js";

// Define a function that is used to populate the projects array in local storage when the projects does not exist in the array
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
  setProjects(projects);
};

const init = (function () {
  let projects = loadProjects();

  // Run the initialiseProjects if projects in local storage does not exist
  if (!projects) {
    initialiseProjects();
    projects = loadProjects();
  }

  // Render the projects and all of the tasks as well as run the event listener which listens for tab switching
  renderProjects(projects);
  renderTasks(getAllTasks(), "All Tasks");
  projectNavListener();
})();
