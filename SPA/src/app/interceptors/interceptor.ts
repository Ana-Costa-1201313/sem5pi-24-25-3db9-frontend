import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";

export const authenticationInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next:
    HttpHandlerFn) => {
    const modifiedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJhZG1pbkBob3RtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImp0aSI6IjgxMGM3YTRkLTJmNmUtNDU1Ny04NzM1LTgzNGEwZDY5MzlmNyIsImlhdCI6MTczMTg1NDA0MSwibmJmIjoxNzMxODU0MDQxLCJleHAiOjE3MzIxMTMyNDEsImlzcyI6IkF1dGhfQmFja09mZmljIiwiYXVkIjoiQVVUSCJ9.6zx7E2lKWWKtVE820fvgl5HKD3ocrXtjVwvniMAwpvc`),
    });

    return next(modifiedReq);
};