import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";

export const authenticationInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next:
    HttpHandlerFn) => {
    const modifiedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJhZG1pbkBob3RtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImp0aSI6ImY5NmIxZGI4LTlmYjctNDNkYy1iZmYxLTg3MzQ2OWM0ODEyZiIsImlhdCI6MTczMDgyNjY4MSwibmJmIjoxNzMwODI2NjgxLCJleHAiOjE3MzEwODU4ODEsImlzcyI6IkF1dGhfQmFja09mZmljIiwiYXVkIjoiQVVUSCJ9.xTRr2ayoZU-g2e8nIXRbU9Ul8POOrmgET2hVYPNRaeE`),
    });

    return next(modifiedReq);
};