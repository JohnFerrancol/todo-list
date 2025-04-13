import { renderTasks } from "./render.js";
import { loadProjects } from "../data/storage.js";
import { getAllTasks } from "../utils/taskFilters.js";

const projectNavListener = () => {
  const links = document.querySelectorAll(".nav-text");

  links.forEach((link) => {
    link.addEventListener("click", () => {
      links.forEach((link) => {
        const navWrapper = link.closest(".nav-wrapper");
        navWrapper.classList.remove("chosen-link");
      });

      const selectedNavWrapper = link.closest(".nav-wrapper");
      selectedNavWrapper.classList.add("chosen-link");

      const tabToRender = link.dataset.tab;
      const projects = loadProjects();
      if (projects.find((project) => project.title === tabToRender)) {
        let project = projects.find((project) => project.title === tabToRender);
        renderTasks(project.getTasks(), tabToRender);
      } else {
        const mappingTasksToRender = {
          "All Tasks": getAllTasks(),
          Today: getAllTasks(),
          Week: getAllTasks(),
        };
        renderTasks(mappingTasksToRender[tabToRender], tabToRender);
      }
    });
  });
};

export { projectNavListener };
