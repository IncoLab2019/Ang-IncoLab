import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaProductosAcabarseComponent } from './tabla-productos-acabarse.component';

describe('TablaProductosAcabarseComponent', () => {
  let component: TablaProductosAcabarseComponent;
  let fixture: ComponentFixture<TablaProductosAcabarseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaProductosAcabarseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaProductosAcabarseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
