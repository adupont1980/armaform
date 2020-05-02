import { Component } from '@angular/core';
import { FormService } from "./Engine/form.service";
declare var module: {
  id: string;
}
@Component({
  moduleId: module.id,
  selector: 'app-root',
  // templateUrl: './app.component.html',
  template: ` 
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'armaform';
  constructor(private _formService: FormService){}
    ngOnInit() {
        this._formService.init();
    }
}
