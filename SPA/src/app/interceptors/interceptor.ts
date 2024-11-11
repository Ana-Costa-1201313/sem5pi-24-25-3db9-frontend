import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";

export const authenticationInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next:
    HttpHandlerFn) => {
    const modifiedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJhZG1pbkBob3RtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImp0aSI6IjVjY2NiNTY2LTc1YzEtNDlkYy1iZWY1LTE0ODhmNTAwY2ExZCIsImlhdCI6MTczMTM1MjU4OSwibmJmIjoxNzMxMzUyNTg5LCJleHAiOjE3MzE2MTE3ODksImlzcyI6IkF1dGhfQmFja09mZmljIiwiYXVkIjoiQVVUSCJ9.D3sJOiI-q7EhmHKzF0FScaIkZrmTzdY4cUxqsdT8D0Y`),
    });

    return next(modifiedReq);
};