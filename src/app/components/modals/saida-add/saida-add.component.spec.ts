import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaidaAddComponent } from './saida-add.component';

describe('SaidaAddComponent', () => {
  let component: SaidaAddComponent;
  let fixture: ComponentFixture<SaidaAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaidaAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaidaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
