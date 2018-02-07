import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderTestComponent } from './under-test.component';
import { FooComponent } from 'app/foo/foo.component';
import { BarComponent } from 'app/bar/bar.component';

describe('UnderTestComponent', () => {
  let component: UnderTestComponent;
  let fixture: ComponentFixture<UnderTestComponent>;
  let mockFoo : FooComponent;
  let mockBar : BarComponent;

  beforeEach(async(() => {
    mockFoo = jasmine.createSpyObj('FooComponent', ['fizz']);
    mockBar = jasmine.createSpyObj('BarComponent', ['buzz']);

    TestBed.configureTestingModule({
      declarations: [ UnderTestComponent ],
      providers: [
        {
          provide: FooComponent, useValue: mockFoo
        },
        {
          provide: BarComponent, useValue: mockBar
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should invoke fizz on FooComponent when action is performed', ()=> {
    component.action();
    expect(mockFoo.fizz).toHaveBeenCalled();
  });

  it('should invoke buzz on BarComponent when action is performed', ()=> {
    component.action();
    expect(mockBar.buzz).toHaveBeenCalled();
  });
});
