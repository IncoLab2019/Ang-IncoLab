import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosInactivosComponent } from './usuarios-inactivos.component';

describe('UsuariosInactivosComponent', () => {
  let component: UsuariosInactivosComponent;
  let fixture: ComponentFixture<UsuariosInactivosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosInactivosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosInactivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
