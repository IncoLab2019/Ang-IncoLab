import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaProveedoresDesactivadosComponent } from './tabla-proveedores-desactivados.component';

describe('TablaProveedoresDesactivadosComponent', () => {
  let component: TablaProveedoresDesactivadosComponent;
  let fixture: ComponentFixture<TablaProveedoresDesactivadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaProveedoresDesactivadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaProveedoresDesactivadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
