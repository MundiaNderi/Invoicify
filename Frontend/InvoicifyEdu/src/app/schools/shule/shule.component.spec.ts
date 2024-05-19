import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShuleComponent } from './shule.component';

describe('ShuleComponent', () => {
  let component: ShuleComponent;
  let fixture: ComponentFixture<ShuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShuleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
