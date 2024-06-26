import { TodoListItem } from "./components/TodoList.js";

const list = document.querySelector(".list-group");
document.querySelector("form").addEventListener("submit", (e) => onSubmit(e));
document
  .querySelectorAll(".btn-group button")
  .forEach((button) =>
    button.addEventListener("click", (e) => toggleFilter(e))
  );

function toggleFilter(e) {
  e.preventDefault();
  const filter = e.currentTarget.getAttribute("data-filter");
  e.currentTarget.parentElement
    .querySelector(".active")
    .classList.remove("active");
  e.currentTarget.classList.add("active");
  if (filter === "todo") {
    list.classList.add("hide-completed");
    list.classList.remove("hide-todo");
  } else if (filter === "done") {
    list.classList.add("hide-todo");
    list.classList.remove("hide-completed");
  } else {
    list.classList.remove("hide-todo");
    list.classList.remove("hide-completed");
  }
}
function onSubmit(e) {
  const form = e.currentTarget;
  e.preventDefault();
  const title = new FormData(form).get("title").toString().trim();
  if (title === "") {
    return;
  }
  const todo = {
    id: Date.now(),
    title,
    completed: false,
  };

  const item = new TodoListItem(todo);
  list.prepend(item.element);
  form.reset();
}
