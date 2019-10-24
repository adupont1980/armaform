import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';

import {HttpClientModule}  from '@angular/common/http';
import {FormsModule, ReactiveFormsModule}   from '@angular/forms';
import {Observable} from 'rxjs';

import {MainComponent} from "./main.component";
import {FormService} from "./Engine/form.service";
import {BackButtonComponent} from "./form/backButton";
import {ListButtonsComponent} from "./form/listButtons";
import {MultiSelectionComponent} from "./form/multipleSelection";
import {StepService} from "./Engine/step.service";
import {CollectionService} from "./Engine/collection.service";
import {PanelBtnComponent} from "./form/panelBtnImg";
import {FieldPanelComponent} from "./form/fieldPanel.component";
import {SaveButtonComponent} from "./form/saveButton";
import {SaveService} from "./form/saveService";
import {GridPanelComponent} from "./admin/grid.component";
import {GridService} from "./admin/grid.service";
import {MenuComponent} from "./menu/menu.component";
import {MailService} from "./Engine/mail.service";
// import {assetUrl} from "@angular/compiler/src/identifiers";
// import { Ng2CloudinaryModule } from 'ng2-cloudinary';
// import { FileUploadModule } from 'ng2-file-upload';
import {FileUploadComponent} from "./form/fileUpload";
import {FileUploadService} from "./form/fileUpload.service";
import {AuthService} from "./auth/auth.service";
import {SignupComponent} from "./auth/signup.component";
import {SigninComponent} from "./auth/signin.component";
import {AuthenticationComponent} from "./auth/authentication.component";
import {MyAutoFocusDirective} from "./directives/autofocus";
import {BalletDetailsComponent} from "./admin/ballet/balletDetails.component";
import {BalletDetailsService} from "./admin/ballet/balletDetails.service";
import {GroupComponent} from "./admin/ballet/group.component";
import {GroupService} from "./admin/ballet/group.service";
import {StudentComponent} from "./admin/ballet/student.component";
import {StudentService} from "./admin/ballet/student.service";
import {ExportService} from "./admin/export.service";

const routes: Routes = [
  {path: '', component:MenuComponent  },
  {path: 'menu/:app', component:MenuComponent  },
  {path: 'step/:id', component: MainComponent},
  {path: 'step', component: MainComponent},
  {path: 'grid', component: GridPanelComponent},
  {path: 'grid/:grid_name', component: GridPanelComponent},
  {path: 'grid/:grid_name/:master_val/:app_name', component: GridPanelComponent},
  {path: 'details/:record/:grid_name', component: BalletDetailsComponent},
  {path: 'auth/signup', component: SignupComponent},
  {path: 'signin/:app', component: SigninComponent},
  {path: ':firstLoad', component:MenuComponent},
  {path: 'groupManagement/:record/:course_type/:stage', component: GroupComponent},
  {path: 'editStudent/:record/:course_type/:stage', component: StudentComponent},
];
function getStepsFirst(_stepService: StepService) {
  let appName = window.location.search.replace(new RegExp("^(?:.*[&\\?]" + 'app'.replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1");
  return () => _stepService.getSteps(appName)

}
@NgModule({
  declarations: [
    AppComponent, MainComponent,
    BackButtonComponent, ListButtonsComponent, MultiSelectionComponent,
    PanelBtnComponent, FieldPanelComponent, SaveButtonComponent,
    GridPanelComponent, MenuComponent, FileUploadComponent,
    BalletDetailsComponent, SignupComponent, SigninComponent,
    AuthenticationComponent, MyAutoFocusDirective
    ,GroupComponent, StudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    HttpClientModule, 
    ReactiveFormsModule
  ],
  providers: [FormService, StepService,
    {   provide: APP_INITIALIZER,
        useFactory: getStepsFirst,
        deps: [StepService],
        multi: true
    },
    CollectionService, SaveService, FileUploadService,
    MailService, GridService, BalletDetailsService,
    AuthService, GroupService, StudentService,
    ExportService],
  bootstrap: [AppComponent]
})
export class AppModule { }
