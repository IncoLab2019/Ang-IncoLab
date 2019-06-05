import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoSucursalesComponent } from './ingreso-sucursales.component';

describe('IngresoSucursalesComponent', () => {
  let component: IngresoSucursalesComponent;
  let fixture: ComponentFixture<IngresoSucursalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresoSucursalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoSucursalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
