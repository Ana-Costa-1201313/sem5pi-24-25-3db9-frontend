import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";

export const authenticationInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next:
    HttpHandlerFn) => {
    const modifiedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJhZG1pbkBob3RtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImp0aSI6ImJlMDJhY2E0LTFlYjMtNGRkMS1hNTNmLThjNTM5NjVkODlkMSIsImlhdCI6MTczMTg3MzgyNywibmJmIjoxNzMxODczODI3LCJleHAiOjE3MzIxMzMwMjcsImlzcyI6IkF1dGhfQmFja09mZmljIiwiYXVkIjoiQVVUSCJ9.XyyruGtfveOFniGYcpq7miYsLWosH66-950bInhotFA`),
    });

    return next(modifiedReq);
};