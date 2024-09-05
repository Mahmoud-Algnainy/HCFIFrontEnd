// upload-sarf.component.ts

import { Component } from '@angular/core';
import { EmployeeSarfUploadService } from '../employee-sarf-upload.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-upload-sarf',
  templateUrl: './upload-sarf.component.html',
  styleUrls: ['./upload-sarf.component.css']
})
export class UploadSarfComponent {
  selectedFile: File | null = null;
  loading: boolean = false;

  constructor(private uploadService: EmployeeSarfUploadService, private toastr: ToastrService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    // const input = event.target as HTMLInputElement;
    // if (input.files && input.files.length > 0) {
    //   this.selectedFile = input.files[0];
    // }
  }

  onUpload() {
    if (!this.selectedFile) {
      this.toastr.error('Please select a file to upload.');
      return;
    }

    this.loading = true;

    this.uploadService.uploadExcelFile(this.selectedFile).subscribe(
      () => {
        this.toastr.success('File uploaded successfully!');
        this.loading = false;
      },
      (error) => {
        console.error('Upload failed:', error);
        this.toastr.error('Failed to upload the file.');
        this.loading = false;
      }
    );
  }
}
