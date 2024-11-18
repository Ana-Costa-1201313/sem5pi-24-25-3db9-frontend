import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";

export const authenticationInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next:
    HttpHandlerFn) => {
    const modifiedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJhZG1pbkBob3RtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImp0aSI6Ijg4YzQ3MzY2LWMwN2EtNDkyOS1iNzkzLTRjZWU2OWY3NDZkYSIsImlhdCI6MTczMTc4NDEwNCwibmJmIjoxNzMxNzg0MTA0LCJleHAiOjE3MzIwNDMzMDQsImlzcyI6IkF1dGhfQmFja09mZmljIiwiYXVkIjoiQVVUSCJ9.MIWanAnzQri2oHvZ9H4QCiVJGTlEKZ59yrfE70dxJBY`),
    });

    return next(modifiedReq);
};