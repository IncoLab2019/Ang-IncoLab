import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesactivarProductoComponent } from './desactivar-producto.component';

describe('DesactivarProductoComponent', () => {
  let component: DesactivarProductoComponent;
  let fixture: ComponentFixture<DesactivarProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesactivarProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesactivarProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
