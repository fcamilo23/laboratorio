import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaPreviaComponent } from './alta-previa.component';

describe('AltaPreviaComponent', () => {
  let component: AltaPreviaComponent;
  let fixture: ComponentFixture<AltaPreviaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaPreviaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaPreviaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
