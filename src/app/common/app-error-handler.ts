import { ErrorHandler } from "@angular/core";


export class AppErrorHandler implements ErrorHandler {

  handleError(error: any): void {
    // we could put a toaster
    alert("Unexpected error has occurred!");
    // we could send this error to the server
        console.log(error);
  }

}
