import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoProductoManualComponent } from './ingreso-producto-manual.component';

describe('IngresoProductoManualComponent', () => {
  let component: IngresoProductoManualComponent;
  let fixture: ComponentFixture<IngresoProductoManualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresoProductoManualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoProductoManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
