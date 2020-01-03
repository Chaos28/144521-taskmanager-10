import LoadMoreButtonComponent from '../components/load-more-button';
import TaskEditorComponent from '../components/task-editor';
import TaskComponent from '../components/task';
import TasksComponent from '../components/tasks';
import SortComponent from '../components/sort';
import NoTasksComponent from '../components/no-tasks';
import {render, remove, replace} from '../utils/render';

const TaskCount = {
  BY_BUTTON: 8,
  ON_START: 8
};

const renderTask = (taskListElement, task) => {
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const replaceEditToTask = () => {
    replace(taskComponent, taskEditComponent);
  };

  const replaceTaskToEdit = () => {
    replace(taskEditComponent, taskComponent);
  };

  const taskComponent = new TaskComponent(task);

  taskComponent.setEditorButtonClickHandler(() => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const taskEditComponent = new TaskEditorComponent(task);

  taskEditComponent.setSubmitButtonClickHandler(replaceEditToTask);

  render(taskListElement, taskComponent);
};


export default class BoardController {
  constructor(container) {
    this._container = container;

    this._tasksComponent = new TasksComponent();
    this._noTasksComponent = new NoTasksComponent();
    this._sortComponent = new SortComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
  }

  render(tasks) {
    const container = this._container.getElement();
    const isAllTasksArchived = tasks.every((task) => task.isArchive);

    if (isAllTasksArchived) {
      render(container, this._noTasksComponent);
      return;
    }

    render(container, this._sortComponent);
    render(container, this._tasksComponent);

    const taskListElement = this._tasksComponent.getElement();

    let showingTasksCount = TaskCount.ON_START;
    tasks.slice(0, showingTasksCount)
      .forEach((task) => {
        renderTask(taskListElement, task);
      });

    render(container, this._loadMoreButtonComponent);

    this._loadMoreButtonComponent.setLoadMoreButtonClickHandler(() => {
      const prevTasksCount = showingTasksCount;
      showingTasksCount = showingTasksCount + TaskCount.BY_BUTTON;

      tasks.slice(prevTasksCount, showingTasksCount)
        .forEach((task) => renderTask(taskListElement, task));

      if (showingTasksCount >= tasks.length) {
        remove(this._loadMoreButtonComponent);
      }
    });
  }
}
