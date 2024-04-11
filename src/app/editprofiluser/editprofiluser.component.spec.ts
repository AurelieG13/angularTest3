import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditprofiluserComponent } from './editprofiluser.component';

describe('EditprofiluserComponent', () => {
  let component: EditprofiluserComponent;
  let fixture: ComponentFixture<EditprofiluserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditprofiluserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditprofiluserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
