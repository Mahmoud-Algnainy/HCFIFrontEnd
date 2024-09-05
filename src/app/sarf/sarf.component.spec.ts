import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SarfComponent } from './sarf.component';

describe('SarfComponent', () => {
  let component: SarfComponent;
  let fixture: ComponentFixture<SarfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SarfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SarfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
