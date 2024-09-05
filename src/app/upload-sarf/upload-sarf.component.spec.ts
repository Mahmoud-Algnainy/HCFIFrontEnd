import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSarfComponent } from './upload-sarf.component';

describe('UploadSarfComponent', () => {
  let component: UploadSarfComponent;
  let fixture: ComponentFixture<UploadSarfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadSarfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadSarfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
