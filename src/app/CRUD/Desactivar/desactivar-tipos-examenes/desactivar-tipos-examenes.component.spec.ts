import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesactivarTiposExamenesComponent } from './desactivar-tipos-examenes.component';

describe('DesactivarTiposExamenesComponent', () => {
  let component: DesactivarTiposExamenesComponent;
  let fixture: ComponentFixture<DesactivarTiposExamenesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesactivarTiposExamenesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesactivarTiposExamenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
