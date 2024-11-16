import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";

export const authenticationInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next:
    HttpHandlerFn) => {
    const modifiedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJhZG1pbkBob3RtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImp0aSI6IjFkNzQ1MGEyLTFmYWYtNDE5MC1hNDIwLTExZTYwNDA5Yjg0YSIsImlhdCI6MTczMTc3NzQwNSwibmJmIjoxNzMxNzc3NDA1LCJleHAiOjE3MzIwMzY2MDUsImlzcyI6IkF1dGhfQmFja09mZmljIiwiYXVkIjoiQVVUSCJ9.j5Vd4c9LRz2iySclDtLanNgHH64o_ADx9AW_oHxyk6w`),
    });

    return next(modifiedReq);
};