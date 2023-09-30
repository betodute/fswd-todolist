import $ from 'jquery';

import {
  indexTasks,
  postTask,
  deleteTask,
} from "./requests.js";

// Function to delete a task by ID
function deleteTaskById(taskId) {
  deleteTask(taskId, function() {
    // Refresh the task list after successful deletion
    loadTasks();
  }, function(error) {
    console.error('Error deleting task:', error);
  });
}

// Function to render tasks
function renderTasks(tasks) {
  var htmlString = tasks.map(function(task) {
    return `
      <div class='col-12 mb-3 p-2 border rounded d-flex justify-content-between task' data-id='${task.id}'>
        ${task.content}
        <button class='btn btn-danger btn-sm float-right' data-task-id='${task.id}'>remove</button>
      </div>`;
  }).join('');

  $("#tasks").html(htmlString);

  // Add click event listeners to the Remove buttons
  $('.btn-danger').click(function() {
    var taskId = $(this).data('task-id');
    deleteTaskById(taskId); // Call the deleteTaskById function
  });
}

// Function to load and render tasks
function loadTasks() {
  indexTasks(function(response) {
    renderTasks(response.tasks);
  });
}

// Function to handle form submission
function handleFormSubmission(event) {
  event.preventDefault();
  var newTaskContent = $('#newTaskContent').val();

  // Check if the content is not empty
  if (newTaskContent.trim() !== '') {
    postTask(newTaskContent, function() {
      // Refresh the task list after successful addition
      loadTasks();
      // Clear the input field
      $('#newTaskContent').val('');
    }, function(error) {
      console.error('Error adding task:', error);
    });
  }
}

// Add submit event listener to the form
$(document).ready(function() {
  $('#addTaskForm').submit(handleFormSubmission);
});

// Initial load of tasks
loadTasks();



