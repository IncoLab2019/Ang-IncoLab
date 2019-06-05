import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarPresentacionComponent } from './ingresar-presentacion.component';

describe('IngresarPresentacionComponent', () => {
  let component: IngresarPresentacionComponent;
  let fixture: ComponentFixture<IngresarPresentacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresarPresentacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresarPresentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
