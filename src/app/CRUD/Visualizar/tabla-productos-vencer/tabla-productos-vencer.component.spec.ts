import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaProductosVencerComponent } from './tabla-productos-vencer.component';

describe('TablaProductosVencerComponent', () => {
  let component: TablaProductosVencerComponent;
  let fixture: ComponentFixture<TablaProductosVencerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaProductosVencerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaProductosVencerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
