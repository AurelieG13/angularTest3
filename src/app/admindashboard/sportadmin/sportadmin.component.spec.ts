import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportadminComponent } from './sportadmin.component';

describe('SportadminComponent', () => {
  let component: SportadminComponent;
  let fixture: ComponentFixture<SportadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SportadminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SportadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
