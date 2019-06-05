import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarProveedoresComponent } from './ingresar-proveedores.component';

describe('IngresarProveedoresComponent', () => {
  let component: IngresarProveedoresComponent;
  let fixture: ComponentFixture<IngresarProveedoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresarProveedoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresarProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
