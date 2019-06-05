import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SucursalesInactivasComponent } from './sucursales-inactivas.component';

describe('SucursalesInactivasComponent', () => {
  let component: SucursalesInactivasComponent;
  let fixture: ComponentFixture<SucursalesInactivasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SucursalesInactivasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SucursalesInactivasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
