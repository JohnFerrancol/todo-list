class Project {
  _id = crypto.randomUUID();
  _tasks = [];
  constructor(title) {
    this.title = title;
  }

  getId() {
    return this._id;
  }

  getTasks() {
    return this._tasks;
  }

  addTask(task) {
    this._tasks.push(task);
  }

  rename(newTitle) {
    this.title = newTitle;
  }

  removeTask(completedTask) {
    this._tasks = this._tasks.filter((task) => task !== completedTask);
  }

  // Restore from JSON
  static fromJSON(data) {
    const project = new Project(data.title);
    project._id = data._id;
    project._tasks = data._tasks.map((taskData) => Task.fromJSON(taskData));
    return project;
  }

  toJSON() {
    return {
      _id: this._id,
      title: this.title,
      _tasks: this._tasks.map((task) => task.toJSON()),
    };
  }
}

class Task {
  constructor(title, date, projectTitle) {
    this.title = title;
    this.date = date;
    this.projectTitle = projectTitle;
    this._id = crypto.randomUUID();
    this._completed = false;
  }

  getId() {
    return this._id;
  }

  getCompletion() {
    return this._completed;
  }

  toggleCompletion() {
    this._completed = !this._completed;
  }

  editTask(newTaskObject) {
    this.title = newTaskObject.newTitle;
    this.date = newTaskObject.newDate;
  }

  toJSON() {
    return {
      _id: this._id,
      _completed: this._completed,
      title: this.title,
      date: this.date,
      projectTitle: this.projectTitle,
    };
  }

  static fromJSON(data) {
    const task = new Task(data.title, data.date, data.projectTitle);
    task._id = data._id;
    task._completed = data._completed;
    return task;
  }
}

export { Project, Task };
