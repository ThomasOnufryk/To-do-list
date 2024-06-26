import { createElement } from "../dom.js";

/**
 * @typedef {object} todo
 * @property {number} id
 * @property {string} title
 * @property {boolean} completed
 */

export class TodoListItem {
  #element;

  /** @type {todo} */

  constructor(todo) {
    const id = `todo-${todo.id}`;
    const li = createElement("li", {
      class: "todo list-group-item d-flex align-items-center",
    });
    this.#element = li;
    const checkbox = createElement("input", {
      class: "form-check-input",
      type: `checkbox`,
      id,
      checked: todo.completed ? "" : null,
    });
    const label = createElement("label", {
      class: "ms-2 form-check-label",
      for: id,
    });
    label.innerText = todo.title;

    const button = createElement("button", {
      class: "ms-auto btn btn-danger btn-sm",
    });
    button.innerHTML = `<i class="bi-trash"> </i>`;

    li.append(checkbox);
    li.append(label);
    li.append(button);
    this.toggle(checkbox);
    button.addEventListener("click", (e) => this.remove(e));
    checkbox.addEventListener("change", (e) => this.toggle(e.currentTarget));
  }
  /**
   *
   * @retun {HTMLElement}
   */
  get element() {
    return this.#element;
  }

  /**
   *
   * @param {PointerEvent} e
   */
  remove(e) {
    e.preventDefault();
    this.#element.remove();
  }
  /**
   * Change l'état (Fait / A faire) de la tâche
   * @param {HTMLInputElement} checkbox
   */
  toggle(checkbox) {
    if (checkbox.checked) {
      this.#element.classList.add("is-completed");
    } else {
      this.#element.classList.remove("is-completed");
    }
  }
}
