import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";

export const authenticationInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next:
    HttpHandlerFn) => {
    const modifiedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJhZG1pbkBob3RtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImp0aSI6IjE4ZGU4MDdkLWEyMDUtNDI3NC1iYjA3LTQ1YmU0MTQ5NjkyMSIsImlhdCI6MTczMTcwMTc3OCwibmJmIjoxNzMxNzAxNzc4LCJleHAiOjE3MzE5NjA5NzgsImlzcyI6IkF1dGhfQmFja09mZmljIiwiYXVkIjoiQVVUSCJ9.pXSZKVAMnUP1A-VVGQEIPd8z0ASUW5Kl2JuOsZyerDs`),
    });

    return next(modifiedReq);
};