import Task from './models/task';

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (responce) => {
  if (responce.status >= 200 && responce.status < 300) {
    return responce;
  } else {
    throw new Error(`${responce.status}: ${responce.statusText}`);
  }
};

const API = class {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getTasks() {
    return this._load({url: `tasks`})
      .then((responce) => responce.json())
      .then(Task.parseTasks);
  }

  // createTask(task) {

  // }

  updateTask(id, data) {
    return this._load({
      url: `tasks/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data.toRAW()),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((responce) => responce.json())
      .then(Task.parseTask);

  }

  // deleteTask(id) {

  // }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
};

export default API;
