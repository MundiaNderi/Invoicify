import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShuleInvoicesComponent } from './shule-invoices.component';

describe('ShuleInvoicesComponent', () => {
  let component: ShuleInvoicesComponent;
  let fixture: ComponentFixture<ShuleInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShuleInvoicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShuleInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
