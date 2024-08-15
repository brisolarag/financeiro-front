import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradaAddComponent } from './entrada-add.component';

describe('SaidaAddComponent', () => {
  let component: EntradaAddComponent;
  let fixture: ComponentFixture<EntradaAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntradaAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntradaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
