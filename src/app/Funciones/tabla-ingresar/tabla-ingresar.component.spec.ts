import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaIngresarComponent } from './tabla-ingresar.component';

describe('TablaIngresarComponent', () => {
  let component: TablaIngresarComponent;
  let fixture: ComponentFixture<TablaIngresarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaIngresarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaIngresarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
