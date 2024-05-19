import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShuleDetailsComponent } from './shule-details.component';

describe('ShuleDetailsComponent', () => {
  let component: ShuleDetailsComponent;
  let fixture: ComponentFixture<ShuleDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShuleDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShuleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
