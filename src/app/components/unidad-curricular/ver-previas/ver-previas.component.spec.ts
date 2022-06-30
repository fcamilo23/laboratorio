import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPreviasComponent } from './ver-previas.component';

describe('VerPreviasComponent', () => {
  let component: VerPreviasComponent;
  let fixture: ComponentFixture<VerPreviasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerPreviasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerPreviasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
