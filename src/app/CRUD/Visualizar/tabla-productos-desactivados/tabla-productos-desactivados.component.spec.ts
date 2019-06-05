import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaProductosDesactivadosComponent } from './tabla-productos-desactivados.component';

describe('TablaProductosDesactivadosComponent', () => {
  let component: TablaProductosDesactivadosComponent;
  let fixture: ComponentFixture<TablaProductosDesactivadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaProductosDesactivadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaProductosDesactivadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
