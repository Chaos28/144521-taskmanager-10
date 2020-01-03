import BoardComponent from './components/board';
import BoardController from './controllers/board';
import FilterComponent from './components/filter';
import SiteMenuComponent from './components/site-menu';
import {generateTasks} from './mock/task';
import {generateFilters} from './mock/filter';
import {render} from './utils/render';

const TASK_COUNT_DEFAULT = 22;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, new SiteMenuComponent());

const filters = generateFilters();
render(siteMainElement, new FilterComponent(filters));

const boardComponent = new BoardComponent();
render(siteMainElement, boardComponent);

const tasks = generateTasks(TASK_COUNT_DEFAULT);

const boardController = new BoardController(boardComponent);

boardController.render(tasks);
