import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";

export const authenticationInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next:
    HttpHandlerFn) => {
    const modifiedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJhZG1pbkBob3RtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImp0aSI6IjI0MTNkODAxLTY1ODctNDg2NS05NGI3LTQxM2JjN2FmMmMwMSIsImlhdCI6MTczMjA1NTA2NywibmJmIjoxNzMyMDU1MDY3LCJleHAiOjE3MzIzMTQyNjcsImlzcyI6IkF1dGhfQmFja09mZmljIiwiYXVkIjoiQVVUSCJ9.SA0eCDp0Vr3NpBOGolS7smgNOm0Zl-eDq_5C1ybMEFg`),
    });

    return next(modifiedReq);
};