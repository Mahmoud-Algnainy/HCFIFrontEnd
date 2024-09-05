import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { EmployeeComponent } from './employee/employee.component';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { DeleteEmployeeComponent } from './employee/delete-employee/delete-employee.component';
import { UpdateEmployeeComponent } from './employee/update-employee/update-employee.component';
import { UploadSarfComponent } from './upload-sarf/upload-sarf.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'All-Employees', component:EmployeeComponent},
  // { path: 'upload-sarf', component: UploadSarfComponent },
  // { path: 'Update-Employee', component:UpdateEmployeeComponent},
  // { path: 'Add-Employee', component: AddEmployeeComponent },
  // { path: 'Delete-Employee', component:DeleteEmployeeComponent },
  {
    path: 'Main', component: HomeComponent, children: [
      { path: 'employees', component: EmployeeComponent }
    ]
  },
  // {
  //   path: 'Main', component: HomeComponent, children: [
  //     { path: 'Update-Employee', component:UpdateEmployeeComponent}
  //   ]
  // },
  {
    path: 'Main', component: HomeComponent, children: [
      { path: 'Add-Employee', component: AddEmployeeComponent}
    ]
  },
  // {
  //   path: 'Main', component: HomeComponent, children: [
  //     { path: 'Delete-Employee', component:DeleteEmployeeComponent}
  //   ]
  // },
  {
    path: 'Main', component: HomeComponent, children: [
      { path: 'upload-sarf', component: UploadSarfComponent}
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
