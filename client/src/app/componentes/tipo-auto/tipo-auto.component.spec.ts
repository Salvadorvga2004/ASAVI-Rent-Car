import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoAutoComponent } from './tipo-auto.component';

describe('TipoAutoComponent', () => {
  let component: TipoAutoComponent;
  let fixture: ComponentFixture<TipoAutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TipoAutoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipoAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
