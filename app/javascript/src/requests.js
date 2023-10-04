import $ from 'jquery';
import { API_KEY } from '../config/initializers/api_key';

$.ajaxSetup({
  headers: {
    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
  }
});

export var indexTasks = function (successCB, errorCB) {
  var request = {
    type: 'GET',
    url: `api/tasks?api_key=${API_KEY}`,
    success: successCB,
    error: errorCB
  };

  $.ajax(request);
};

export var postTask = function (content, successCB, errorCB) {
  var request = {
    type: 'POST',
    url: `api/tasks?api_key=${API_KEY}`,
    data: {
      task: {
        content: content
      }
    },
    success: successCB,
    error: errorCB
  };

  $.ajax(request);
};

export var toggleComplete = function (taskId, isChecked, successCB, errorCB) {
  var endpoint = isChecked ? 'mark_complete' : 'mark_active';

  var request = {
    type: 'PUT',
    url: `api/tasks/${taskId}/${endpoint}?api_key=${API_KEY}`,
    success: successCB,
    error: errorCB
  };

  $.ajax(request);
};

export var deleteTask = function (taskId, successCB, errorCB) {
  var request = {
    type: 'DELETE',
    url: `api/tasks/${taskId}?api_key=${API_KEY}`,
    success: successCB,
    error: errorCB
  };

  $.ajax(request);
};




