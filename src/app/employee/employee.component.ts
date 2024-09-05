import { Component, ElementRef, ViewChild , AfterViewChecked} from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../Model/Employee';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { HttpEventType } from '@angular/common/http'; // Add this import




@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent {
  @ViewChild('updateForm') updateForm: ElementRef | undefined;
  employees: Employee[] = [];
  selectedFile: File | null = null;
  filteredEmployees: Employee[] = [];
  selectedEmployees: Employee[] = []; // For holding selected employees for deletion
  allSelected: boolean = false; // For the "select all" checkbox
  selectedEmployee: Employee | null = null;
  searchQuery: string = '';
  loading: boolean = false;
  page: number = 1;  // New property for pagination
  scrollToUpdateForm: boolean = false;


  constructor(
    private employeeService: EmployeeService,
    private toastr: ToastrService // Inject ToastrService

  ) 
  {}

  ngOnInit(): void {
    this.loading = true;
    this.loadEmployees();
  }

  ngAfterViewChecked(): void {
    if (this.scrollToUpdateForm && this.updateForm) {
      this.scrollToForm();
      this.scrollToUpdateForm = false; // Reset the flag
    }
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
    this.scrollToUpdateForm = true;  // Set the flag to scroll after view is updated
  }

  scrollToForm(): void {
    if (this.updateForm) {
      this.updateForm.nativeElement.scrollIntoView({ behavior: 'smooth' , block: 'start'});
    }
    
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

      this.toastr.success('Employee updated successfully!', 'Success');
      
      this.selectedEmployee = null; // Hide the form after updating
      this.loadEmployees();
    }, error => {
      this.toastr.error('There was an error updating the employee.', 'Error');
      this.loading = false;
    }).add(() => {
      // Ensure loading is stopped after the operation completes
      this.loading = false;
    });
  }
}

// Method to Upload employee
onFileChange(event: any) {
 
    this.selectedFile = event.target.files[0];

}

uploadExcel(): void {
  if (!this.selectedFile) {
    this.toastr.error('Please select a file to upload.', 'Error');
    return;
  }

  const formData = new FormData();
  formData.append('file', this.selectedFile);

  this.employeeService.uploadExcel(formData).subscribe(
    (event) => {
      if (event.type === HttpEventType.UploadProgress) {
        const progress = Math.round((100 * event.loaded) / event.total!);
        console.log(`Upload progress: ${progress}%`);
      } else if (event.type === HttpEventType.Response) {
        this.toastr.success('Excel file uploaded successfully!', 'Success');
        this.loadEmployees(); // Refresh employee list
      }
    },
    (error) => {
      this.toastr.error('There was an error uploading the Excel file.', 'Error');
    }
  );
}

// Method to Delete employee object


deleteEmployee(id: number, i: number): void {
  Swal.fire({
    title: 'Are you sure?',
    text: 'Do you really want to delete this employee?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.isConfirmed) {
      this.employeeService.deleteEmployee(id).subscribe(() => {
        this.filteredEmployees.splice(i, 1);
        this.toastr.success('Employee deleted successfully!', 'Success');
        this.loadEmployees();
      }, error => {
        this.toastr.error('There was an error deleting the employee.', 'Error');
        this.loading = false;
      });

      Swal.fire(
        'Deleted!',
        'The employee has been deleted.',
        'success'
      );
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelled',
        'The employee is safe :)',
        'error'
      );
    }
  });
}

onCheckboxChange(): void {
  this.selectedEmployees = this.filteredEmployees.filter(emp => emp.selected);
  this.allSelected = this.selectedEmployees.length === this.filteredEmployees.length;
}

selectAll(event: any): void {
  const checked = event.target.checked;
  this.filteredEmployees.forEach(emp => {
    emp.selected = checked;
  });
  this.onCheckboxChange();
}

deleteSelectedEmployees(): void {
  if (this.selectedEmployees.length === 0) return;

  Swal.fire({
    title: 'Are you sure?',
    text: 'Do you really want to delete the selected employees?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete them!',
    cancelButtonText: 'No, keep them'
  }).then((result) => {
    if (result.isConfirmed) {
      const ids = this.selectedEmployees.map(emp => emp.id);  // Extract IDs
      this.employeeService.deleteSelectedEmployees(ids).subscribe(() => {
        this.toastr.success('Selected employees deleted successfully!', 'Success');
        this.selectedEmployees = [];
        this.loadEmployees();
        // this.onCheckboxChange();  // Reset the selected employees
      }, error => {
        this.toastr.error('There was an error deleting the selected employees.', 'Error');
      });
    }
  });
}


deleteAllEmployees(): void {
  Swal.fire({
    title: 'Are you sure?',
    text: 'Do you really want to delete all employees?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete all!',
    cancelButtonText: 'No, keep them'
  }).then((result) => {
    if (result.isConfirmed) {
      this.employeeService.deleteAllEmployees().subscribe(() => {
        this.toastr.success('All employees deleted successfully!', 'Success');
        this.loadEmployees();
      }, error => {
        this.toastr.error('There was an error deleting all employees.', 'Error');
      });
    }
  });
} 

}
