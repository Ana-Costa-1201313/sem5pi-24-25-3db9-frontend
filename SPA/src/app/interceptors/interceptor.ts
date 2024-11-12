import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";

export const authenticationInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next:
    HttpHandlerFn) => {
    const modifiedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJhZG1pbkBob3RtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImp0aSI6ImU5YzkxNDQ1LWE1ODEtNDk5Ni04NjBmLTAxMzE5ZWZlNzY5OCIsImlhdCI6MTczMTQwNzI1MywibmJmIjoxNzMxNDA3MjUzLCJleHAiOjE3MzE2NjY0NTMsImlzcyI6IkF1dGhfQmFja09mZmljIiwiYXVkIjoiQVVUSCJ9.BdePAuWHrJoQzLA_-BykxJfsnjb9rqdpeIpmim62F6k`),
    });

    return next(modifiedReq);
};