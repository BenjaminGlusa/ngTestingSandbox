import { Component } from '@angular/core';
import { FooComponent } from 'app/foo/foo.component';
import { BarComponent } from 'app/bar/bar.component';

@Component({
  selector: 'app-under-test',
  templateUrl: './under-test.component.html',
  styleUrls: ['./under-test.component.css']
})
export class UnderTestComponent  {

  constructor(private foo: FooComponent, private bar: BarComponent) { }

  action(){
    this.foo.fizz();
    this.bar.buzz();
  }

}
