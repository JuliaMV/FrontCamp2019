let ErrorHandlerInstance;

export default class ErrorHandler {
  constructor() {
    if (ErrorHandlerInstance) {
      return ErrorHandlerInstance;
    }
    ErrorHandlerInstance = this;
  }

  showAlert() {
    alert(`Sorry something went wrong`);
  }
}