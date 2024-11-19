import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";

export const authenticationInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next:
    HttpHandlerFn) => {
    const modifiedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJhZG1pbkBob3RtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImp0aSI6IjEyZDgwYjcwLWM5MTYtNDRkNC05NDkwLTAxYTRhNjc4NDBlYiIsImlhdCI6MTczMTk0MTYxOCwibmJmIjoxNzMxOTQxNjE4LCJleHAiOjE3MzIyMDA4MTgsImlzcyI6IkF1dGhfQmFja09mZmljIiwiYXVkIjoiQVVUSCJ9.pgz175yjo2e6Fduizp6e1ejvPBxA1cyvVrqaKZf_ieU`),
    });

    return next(modifiedReq);
};