import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";

export const authenticationInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next:
    HttpHandlerFn) => {
    const modifiedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJhZG1pbkBob3RtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImp0aSI6IjY1OGY1MTQwLWNmMTQtNDdlOC04NzBjLWJiNjNmNTk2ZjhiYSIsImlhdCI6MTczMTA4OTA2NiwibmJmIjoxNzMxMDg5MDY2LCJleHAiOjE3MzEzNDgyNjYsImlzcyI6IkF1dGhfQmFja09mZmljIiwiYXVkIjoiQVVUSCJ9.X725a9ka9S2N4JjmC9oH4Qr-WXKj2dJrYtyVWlSzCtc`),
    });

    return next(modifiedReq);
};