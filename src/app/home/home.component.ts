import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('toggleAnimation', [
      state('void', style({ height: '0px', overflow: 'hidden' })),
      state('*', style({ height: '*', overflow: 'hidden' })),
      transition(':enter', [
        style({ height: '0px', overflow: 'hidden' }),
        animate('300ms ease-out', style({ height: '*' }))
      ]),
      transition(':leave', [
        style({ height: '*', overflow: 'hidden' }),
        animate('300ms ease-in', style({ height: '0px' }))
      ])
    ])
  ]
})
export class HomeComponent {
  isSidedrawerHidden = false;

  categories = [
    {
      name: 'Employees', icon: 'fas fa-folder', isOpen: false, items: [
        { name: 'All Employees', link: 'employees', icon: 'fas fa-file' }, 
        // { name: 'Update Employee', link: '/Main/Update-Employee', icon: 'fas fa-file' }, 
        { name: 'Add Employee', link: '/Main/Add-Employee', icon: 'fas fa-file' },
        // { name: 'Delete Employee', link: '/Main/Delete-Employee', icon: 'fas fa-file' },
      ]
    },
    {
      name: 'Sarf', icon: 'fas fa-folder', isOpen: false, items: [
        
        { name: 'Upload Sarf', link: '/Main/upload-sarf', icon: 'fas fa-file' }, 
       
      ]
    },
  ];

  toggleSidedrawer() {
    this.isSidedrawerHidden = !this.isSidedrawerHidden;
  }

  toggleCategory(index: number) {
    this.categories[index].isOpen = !this.categories[index].isOpen;
  }
}