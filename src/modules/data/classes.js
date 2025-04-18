class Project {
  #id = crypto.randomUUID();
  #tasks = [];
  constructor(title) {
    this.title = title;
  }

  getId() {
    return this.#id;
  }

  getTasks() {
    return this.#tasks;
  }

  addTask(task) {
    this.#tasks.push(task);
  }

  rename(newTitle) {
    this.title = newTitle;
  }

  removeTask(completedTask) {
    this.#tasks = this.#tasks.filter((task) => task !== completedTask);
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
    return this.#id;
  }

  getCompletion() {
    return this.#completed;
  }

  toggleCompletion() {
    this.#completed = !this.#completed;
  }

  editTask(newTaskObject) {
    this.title = newTaskObject.newTitle;
    this.date = newTaskObject.newDate;
  }
}

export { Project, Task };
