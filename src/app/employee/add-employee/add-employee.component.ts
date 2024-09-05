import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/Model/Employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { NgForm } from '@angular/forms';
import alertify from 'alertifyjs';
import { ToastrService } from 'ngx-toastr';





@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  selectedEmployee: Employee=this.createEmptyEmployee() ;
  
  loading: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private route:Router,
    private toastr: ToastrService // Inject ToastrService

  ) {}
   

  ngOnInit(): void {
    this.loading = true;
  }



  saveEmployee(employeeForm:NgForm){
 //
        this.loading = true;

        this.employeeService.saveEmployee( this.selectedEmployee).subscribe(() => {
          console.log('llllllllllll')
          this.toastr.success('Employee added successfully!', 'Success');

          this.route.navigate(['/Main/employees']);
     
        }, error => {
          this.toastr.error('There was an error adding the employee.', 'Error');
          console.error('Save Field', error);
          this.loading = false;
       });
      
  

    
  }
  createEmptyEmployee(): Employee {
    return {
      id: 0,
      sarf_Id: '',
      fullName: '',
      nationalId: '',
      ta2meen_No: '',
      bankAcc_No: '',
      nationality: '',
      phoneNumber: ''
    };
  }
}
