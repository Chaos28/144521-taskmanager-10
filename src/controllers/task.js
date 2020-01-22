import TaskComponent from '../components/task';
import TaskEditorComponent from '../components/task-editor';
import {render, replace, remove} from '../utils/render';
import {COLOR} from '../const-data';

export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`
};


export const EmptyTask = {
  description: ``,
  dueDate: null,
  repeatingDays: {
    'mo': false,
    'tu': false,
    'we': false,
    'th': false,
    'fr': false,
    'sa': false,
    'su': false,
  },
  tags: [],
  color: COLOR.BLACK,
  isFavorite: false,
  isArchive: false
};

export default class TaskController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = Mode.DEFAULT;

    this._taskComponent = null;
    this._taskEditorComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(task, mode) {
    const oldTaskComponent = this._taskComponent;
    const oldTaskEditorComponent = this._taskEditorComponent;
    this._mode = mode;

    this._taskComponent = new TaskComponent(task);
    this._taskEditorComponent = new TaskEditorComponent(task);

    this._taskComponent.setEditorButtonClickHandler(() => {
      this._replaceTaskToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._taskComponent.setArchiveButtonClickHandler(() => {
      this._onDataChange(this, task, Object.assign({}, task, {
        isArchive: !task.isArchive
      }));
    });

    this._taskComponent.setFavoritesButtonClickHandler(() => {
      this._onDataChange(this, task, Object.assign({}, task, {
        isFavorite: !task.isFavorite
      }));
    });

    this._taskEditorComponent.setSubmitButtonClickHandler((evt) => {
      evt.preventDefault();
      const data = this._taskEditorComponent.getData();
      this._onDataChange(this, task, data);
    });

    this._taskEditorComponent.setDeleteButtonClickHandler(() => this._onDataChange(this, task, null));

    switch (mode) {
      case Mode.DEFAULT:
        if (oldTaskEditorComponent && oldTaskComponent) {
          replace(this._taskComponent, oldTaskComponent);
          replace(this._taskEditorComponent, oldTaskEditorComponent);
          this._replaceEditToTask();
        } else {
          render(this._container, this._taskComponent);
        }
        break;
      case Mode.ADDING:
        if (oldTaskEditorComponent && oldTaskComponent) {
          remove(oldTaskComponent);
          remove(oldTaskEditorComponent);
        }
        document.addEventListener(`keydown`, this._onEscKeyDown);
        render(this._container, this._taskEditorComponent);
        break;
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToTask();
    }
  }

  destroy() {
    remove(this._taskEditorComponent);
    remove(this._taskComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _replaceEditToTask() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);

    this._taskEditorComponent.reset();

    replace(this._taskComponent, this._taskEditorComponent);
    this._mode = Mode.DEFAULT;
  }

  _replaceTaskToEdit() {
    this._onViewChange();

    replace(this._taskEditorComponent, this._taskComponent);
    this._mode = Mode.EDIT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      if (this._mode === Mode.ADDING) {
        this._onDataChange(this, EmptyTask, null);
      }
      this._replaceEditToTask();
    }
  }
}
