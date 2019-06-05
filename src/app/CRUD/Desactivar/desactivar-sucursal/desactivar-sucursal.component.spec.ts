import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesactivarSucursalComponent } from './desactivar-sucursal.component';

describe('DesactivarSucursalComponent', () => {
  let component: DesactivarSucursalComponent;
  let fixture: ComponentFixture<DesactivarSucursalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesactivarSucursalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesactivarSucursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
