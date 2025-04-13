import "./styles/style.css";
import { renderProjects, renderTasks } from "./modules/ui/render.js";
import { loadProjects } from "./modules/data/storage.js";

const init = (function () {
  let projects = loadProjects();

  renderProjects(projects);
  renderTasks(projects);
})();
