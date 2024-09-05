import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../Model/Employee';
//import { Employee } from '../employee/employee.component';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  // private apiUrl = 'http://hcfi1234.somee.com/api/Employee';
  private apiUrl = 'https://localhost:44320/api/Employee';
  constructor(private http: HttpClient) {}

  getEmployees(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  } 

  updateEmployee(id: number, employee: Employee): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, employee);
  }
  uploadExcel(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/uploadExcelEmployee`, formData, {
      reportProgress: true,
      observe: 'events' // This allows tracking progress
    });
  }
  
  
  deleteEmployee(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/delete/${id}`);
  }

  saveEmployee(employee: Employee): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, employee);
  }

  addEmployee(employee: Employee): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, employee);
  }

  deleteSelectedEmployees(ids: number[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/deleteSelected`, ids);
  }

  deleteAllEmployees(): Observable<any> {
    return this.http.get(`${this.apiUrl}/deleteAll`);
  }
  
}
