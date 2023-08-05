import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ICustomer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {


  constructor(private http: HttpClient) { }

  public getAllCustomers(): Observable<ICustomer[]> {
    //return this.http.get<ICustomer[]>('https://getinvoices.azurewebsites.net/api/Customers');
    return this.http.get<ICustomer[]>('http://localhost:9000/customers');
  }

  public getCustomer(customerId: string): Observable<ICustomer> {
    //let dataURL: string = `https://getinvoices.azurewebsites.net/api/Customer/${customerId}`;
    let dataURL: string = `http://localhost:9000/customers/${customerId}`;
    return this.http.get<ICustomer>(dataURL).pipe(catchError(this.handleError));
  }

  public SaveCustomer(saveRequest: ICustomer): Observable<ICustomer> {
    //return this.http.post<ICustomer>('https://getinvoices.azurewebsites.net/api/Customer', saveRequest).pipe(catchError(this.handleError));
    return this.http.post<ICustomer>('http://localhost:9000/customers', saveRequest).pipe(catchError(this.handleError));
  }

  updateCustomer(updateContactRequest:ICustomer,id: string): Observable<ICustomer> {
    //return this.http.put<ICustomer>('https://getinvoices.azurewebsites.net/api/Customer/' + id, updateContactRequest);
    return this.http.put<ICustomer>('http://localhost:9000/customers/' + id, updateContactRequest);
  }

  deleteCustomer(id: string): Observable<ICustomer> {
    //return this.http.delete<ICustomer>('https://getinvoices.azurewebsites.net/api/Customer/' + id);
    return this.http.delete<ICustomer>('http://localhost:9000/customers/' + id);
  }

  public handleError(error: HttpErrorResponse) {
    let errorMessage: string = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = 'Error:${error.error.message}'
    }
    else {
      errorMessage = 'status:${error.status}\n Message:${error.message}';
    }
    return throwError(errorMessage);
  }

}
