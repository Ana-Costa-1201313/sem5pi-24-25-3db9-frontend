import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";

export const authenticationInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next:
    HttpHandlerFn) => {
    const modifiedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJhZG1pbkBob3RtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImp0aSI6ImMyMDYzMTJmLWFiYzUtNGUxYS04ZTE3LTk4NWJmOWFjMzdmNyIsImlhdCI6MTczMTM2NjcxMCwibmJmIjoxNzMxMzY2NzEwLCJleHAiOjE3MzE2MjU5MTAsImlzcyI6IkF1dGhfQmFja09mZmljIiwiYXVkIjoiQVVUSCJ9._1tfpG4sMjOWYZQdlytUUEuONxtVe3WnSIT_APQ6KMc`),
    });

    return next(modifiedReq);
};