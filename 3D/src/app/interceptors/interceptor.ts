import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";

export const authenticationInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next:
    HttpHandlerFn) => {
    const modifiedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJhZG1pbkBob3RtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImp0aSI6ImRmN2U1OTNiLTVmYTEtNDY1Ni1hNmQ2LTBhMzdkYTI3YzNiNyIsImlhdCI6MTczMTUxOTU2NiwibmJmIjoxNzMxNTE5NTY2LCJleHAiOjE3MzE3Nzg3NjYsImlzcyI6IkF1dGhfQmFja09mZmljIiwiYXVkIjoiQVVUSCJ9.yaOQTKfTycNbXhBEqR8mXskbxcfU5AILCV1E3Q46R48`),
    });

    return next(modifiedReq);
};