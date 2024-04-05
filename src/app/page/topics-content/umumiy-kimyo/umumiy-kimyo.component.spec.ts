import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UmumiyKimyoComponent } from './umumiy-kimyo.component';

describe('UmumiyKimyoComponent', () => {
  let component: UmumiyKimyoComponent;
  let fixture: ComponentFixture<UmumiyKimyoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UmumiyKimyoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UmumiyKimyoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
