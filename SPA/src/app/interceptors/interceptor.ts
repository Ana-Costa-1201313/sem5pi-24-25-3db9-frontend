import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";

export const authenticationInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next:
    HttpHandlerFn) => {
    const modifiedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJhZG1pbkBob3RtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImp0aSI6IjAxYzhmZGExLWFiNjYtNGUwZS1hZTczLWMxZTA0MmIyMTliYyIsImlhdCI6MTczMTU5NjQyNiwibmJmIjoxNzMxNTk2NDI2LCJleHAiOjE3MzE4NTU2MjYsImlzcyI6IkF1dGhfQmFja09mZmljIiwiYXVkIjoiQVVUSCJ9.JqSTpZFqkxWanmZznQm2RUEMZLHu5WoL5hsv0krqSbo`),
    });

    return next(modifiedReq);
};