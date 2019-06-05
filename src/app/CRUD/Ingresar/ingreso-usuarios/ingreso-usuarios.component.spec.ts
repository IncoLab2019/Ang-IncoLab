import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoUsuariosComponent } from './ingreso-usuarios.component';

describe('IngresoUsuariosComponent', () => {
  let component: IngresoUsuariosComponent;
  let fixture: ComponentFixture<IngresoUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresoUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
