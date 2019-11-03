import ErrorPopup from "Templates/ErrorPopup";

let ErrorHandlerInstance;

export default class ErrorHandler {
  constructor() {
    if (ErrorHandlerInstance) {
      return ErrorHandlerInstance;
    }
    ErrorHandlerInstance = this;
  }

  showPopup() {
    const container = document.createElement('div');
    container.classList.add('errorHandler');
    container.innerHTML = ErrorPopup();
    const body = document.querySelector('body');
    body.insertAdjacentElement('beforeend', container);
  }
}