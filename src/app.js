import "./styles/style.css";
import { renderProjects, renderTasks } from "./modules/ui/render.js";
import { loadProjects } from "./modules/data/storage.js";
import { projectNavListener } from "./modules/ui/event.js";
import { getAllTasks } from "./modules/utils/taskFilters.js";

const init = (function () {
  let projects = loadProjects();

  renderProjects(projects);
  renderTasks(getAllTasks(), "All Tasks");
  projectNavListener();
})();
