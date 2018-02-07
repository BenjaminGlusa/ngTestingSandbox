# Ngtesting

This is a sandbox to test different approaches for unit testing in Angular.

# The scenario
In this scenario we want to test a very basic component [ComponentUnderTest](./src/app/under-test/under-test.component.ts).

This component has two dependencies:
- [FooComponent](./src/app/foo/foo.component.ts)
- [BarComponent](./src/app/bar/bar.component.ts)

Furthermore, the component provides one public method: 'UnterTestComponent::action()'. It calls:
- FooComponent::fizz()
- BarComponent::buzz()

when invoked.


## Regular Way (ng create)
When we create [ComponentUnderTest](./src/app/under-test/under-test.component.ts) using `ng create component`, we get [ComponentUnderTestSpec](./src/app/under-test/under-test.component.spec.ts) which uses `TestBed`.

```typescript
TestBed.configureTestingModule({
  declarations: [ UnderTestComponent ]
})
.compileComponents();
```

But we have to provide the depencies to [FooComponent](./src/app/foo/foo.component.ts) and [BarComponent](./src/app/bar/bar.component.ts). In order to make the test as isolated as possible, we mock those:

```typescript
let mockFoo = jasmine.createSpyObj('FooComponent', ['fizz']);
let mockBar = jasmine.createSpyObj('BarComponent', ['buzz']);

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
```

Now our test is setup and we can start to describe the component:

```typescript
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
```

## Alternate Way (flat testing)
Let's try a different approach. Instead of using the Testbed, we can create our own component instance. I call this a `flat` test - [ComponentUnderTestFlatSpec](./src/app/under-test/under-test.component.flat.spec.ts).

```typescript
let component : UnderTestComponent;
let mockFoo : FooComponent;
let mockBar : BarComponent;

beforeEach(()=> {
  mockFoo = jasmine.createSpyObj('FooComponent', ['fizz']);
  mockBar = jasmine.createSpyObj('BarComponent', ['buzz']);

  component = new UnderTestComponent(mockFoo, mockBar);
});
```

That's it. Our test is setup and we can use the same description as before:
```typescript
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
```

### The good
**Performance**. This flat test takes 0.004s on average on my machine, where the other spec with the TestBed takes 0.077s. So it is **about 20 times faster**!

I assume the difference will grow only with every new dependency the TestBed has to provide.

### The bad
We cannot test the template (as we don't have a fixture).

### The ugly
Just kidding. It looks like a good approach to me.
