import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TetsteComponent } from './tetste.component';

describe('TetsteComponent', () => {
  let component: TetsteComponent;
  let fixture: ComponentFixture<TetsteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TetsteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TetsteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
