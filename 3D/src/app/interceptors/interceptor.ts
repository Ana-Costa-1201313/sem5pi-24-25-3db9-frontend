import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";

export const authenticationInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next:
    HttpHandlerFn) => {
    const modifiedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJhZG1pbkBob3RtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImp0aSI6Ijk3NTU4OTBkLTRkZWItNDNhZS05YTljLTUyMmE3NGUyN2VmNiIsImlhdCI6MTczMTcwNzU2OCwibmJmIjoxNzMxNzA3NTY4LCJleHAiOjE3MzE5NjY3NjgsImlzcyI6IkF1dGhfQmFja09mZmljIiwiYXVkIjoiQVVUSCJ9.JKYmf-ADxMJWlyDQbEKqPPji3PEfWh-_MokD0RY1W6M`),
    });

    return next(modifiedReq);
};