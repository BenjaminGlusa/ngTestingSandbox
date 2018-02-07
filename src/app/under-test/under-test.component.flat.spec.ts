import { UnderTestComponent } from "app/under-test/under-test.component";
import { FooComponent } from "app/foo/foo.component";
import { BarComponent } from "app/bar/bar.component";

describe('UnderTestComponent Flat', ()=> {
    
    let component : UnderTestComponent;
    let mockFoo : FooComponent;
    let mockBar : BarComponent;

    beforeEach(()=> {
        mockFoo = jasmine.createSpyObj('FooComponent', ['fizz']);
        mockBar = jasmine.createSpyObj('BarComponent', ['buzz']);

        component = new UnderTestComponent(mockFoo, mockBar);
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