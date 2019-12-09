import {createBoardTemplate} from './components/board';
import {createSiteMenuTemplate} from './components/site-menu';
import {createFilterTemplate} from './components/filter';
import {createTaskTemplate} from './components/task';
import {createTaskEditTemplate} from './components/task-editor';
import {createLoadMoreButtonTemplate} from './components/load-more-button';
import {generateTasks} from './mock/task';
import {generateFilters} from './mock/filter';
import {render} from './utils';

const TaskCount = {
  DEFAULT: 22,
  BY_BUTTON: 8,
  ON_START: 8
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, createSiteMenuTemplate());

const filters = generateFilters();

render(siteMainElement, createFilterTemplate(filters));
render(siteMainElement, createBoardTemplate());

const taskListElement = siteMainElement.querySelector(`.board__tasks`);
const tasks = generateTasks(TaskCount.DEFAULT);

render(taskListElement, createTaskEditTemplate(tasks[0]));

let showingTasksCount = TaskCount.ON_START;
tasks.slice(1, showingTasksCount).forEach((task) => render(taskListElement, createTaskTemplate(task)));

const boardElement = siteMainElement.querySelector(`.board`);
render(boardElement, createLoadMoreButtonTemplate());

const loadMoreButton = boardElement.querySelector(`.load-more`);
loadMoreButton.addEventListener(`click`, () => {
  const previousTasksCount = showingTasksCount;
  showingTasksCount += TaskCount.BY_BUTTON;

  tasks.slice(previousTasksCount, showingTasksCount).forEach((task) => render(taskListElement, createTaskTemplate(task)));

  if (showingTasksCount >= tasks.length) {
    loadMoreButton.remove();
  }
});
