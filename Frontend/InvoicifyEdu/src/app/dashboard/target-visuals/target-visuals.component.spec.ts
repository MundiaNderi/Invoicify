import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetVisualsComponent } from './target-visuals.component';

describe('TargetVisualsComponent', () => {
  let component: TargetVisualsComponent;
  let fixture: ComponentFixture<TargetVisualsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TargetVisualsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TargetVisualsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
