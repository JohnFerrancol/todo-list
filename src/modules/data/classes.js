class Project {
  #id = crypto.randomUUID();
  #tasks = [];
  constructor(title) {
    this.title = title;
  }

  getTasks() {
    return this.#tasks;
  }

  addTask(task) {
    this.#tasks.push(task);
  }
}

class Task {
  #id = crypto.randomUUID();
  #completed = false;
  constructor(title, date, projectTitle) {
    this.title = title;
    this.date = date;
    this.projectTitle = projectTitle;
  }

  getId() {
    console.log(this.#id);
  }

  toggleCompletion() {
    this.#completed = !this.#completed;
  }
}

export { Project, Task };
