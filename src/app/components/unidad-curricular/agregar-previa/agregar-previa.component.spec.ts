import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPreviaComponent } from './agregar-previa.component';

describe('AgregarPreviaComponent', () => {
  let component: AgregarPreviaComponent;
  let fixture: ComponentFixture<AgregarPreviaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarPreviaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarPreviaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
