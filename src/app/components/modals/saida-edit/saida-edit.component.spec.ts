import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaidaEditComponent } from './saida-edit.component';

describe('SaidaEditComponent', () => {
  let component: SaidaEditComponent;
  let fixture: ComponentFixture<SaidaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaidaEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaidaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
