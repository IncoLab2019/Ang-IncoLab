import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoTipoExamenComponent } from './ingreso-tipo-examen.component';

describe('IngresoTipoExamenComponent', () => {
  let component: IngresoTipoExamenComponent;
  let fixture: ComponentFixture<IngresoTipoExamenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresoTipoExamenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoTipoExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
