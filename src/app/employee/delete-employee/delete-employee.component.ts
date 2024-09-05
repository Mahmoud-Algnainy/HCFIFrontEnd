import { Component } from '@angular/core';
import alertify from 'alertifyjs';
import { Employee } from 'src/app/Model/Employee';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css']
})
export class DeleteEmployeeComponent {
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
// Method to Delete employee object

deleteEmployee(id: number,i:number): void {
  this.employeeService.deleteEmployee( id).subscribe(() => {
    this.filteredEmployees.splice(1,i);
    alertify.success('Employee deleted successfully!');
    this.loadEmployees();

  }, error => {
   
      this.loadEmployees();
      // console.error('Update failed', error);
      alertify.error('There was an error deleting the employee.');
      this.loading = false;
  }
  // .subscribe(() => {
  //   console.log('llllllllllll')
  //   this.toaster.success('add succes')
  //  this.route.navigate(["/Main/employees"])
  // this.employeeService.deleteEmployee(id).subscribe({
  //   next: () => {
  //     alert('Employee deleted successfully.');
  //     this.loadEmployees();
  //   },
  //   error: (error) => {
  //     console.error('Error deleting employee:', error);
  //     alert('There was an error deleting the employee.');
  //   }
  );
}

// deleteEmployee(employeeId: number): void {
//   if (confirm('Are you sure you want to delete this employee?')) {
//     alertify.alert('Are you sure ');
//     this.loading = true;
//     this.employeeService.deleteEmployee(employeeId).subscribe({
//       next: () => {
//         this.employees = this.employees.filter((e) => e.id !== employeeId);
//         this.filteredEmployees = [...this.employees];

//         this.loading = false;

//         // Show success notification
//         alertify.success('Employee deleted successfully!');

//         // Reload employees
//         this.loadEmployees();
//       },
//       error: (error) => {
//         console.error('Delete failed', error);
//         alertify.error('There was an error deleting the employee.');
//         this.loading = false;
//       },
//     });
//   }
// }

}
