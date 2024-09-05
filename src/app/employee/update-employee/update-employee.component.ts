import { Component } from '@angular/core';
import alertify from 'alertifyjs';
import { Employee } from 'src/app/Model/Employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  selectedEmployee: Employee | null = null;
  searchQuery: string = '';
  loading: boolean = false;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.loading = true;
    this.loadEmployees();
  }
  loadEmployees() {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
      this.filteredEmployees = data;
      this.loading = false;
    });
  }
  search(): void {
    this.filteredEmployees = this.employees.filter(employee =>
      Object.values(employee).some(val =>
        val.toString().toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    );
  }

  selectEmployee(employee: Employee): void {
    this.selectedEmployee = { ...employee };
  }
// Method to Update employee object
  updateEmployee(): void {
    if (this.selectedEmployee) {
      this.loading = true;
      this.employeeService.updateEmployee(this.selectedEmployee.id, this.selectedEmployee).subscribe(() => {
        const index = this.employees.findIndex(e => e.id === this.selectedEmployee!.id);
        if (index !== -1) {
          this.employees[index] = this.selectedEmployee as Employee;
          this.filteredEmployees = [...this.employees];
        }
        this.selectedEmployee = null;
        this.loading = false;
        alertify.success('Employee updated successfully!');
        this.loadEmployees();

      }, error => {
       
          this.loadEmployees();
          // console.error('Update failed', error);
          alertify.error('There was an error updating the employee.');
          this.loading = false;
      });
    }
  }
}
