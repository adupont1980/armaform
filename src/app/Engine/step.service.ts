import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from "@angular/core";
import { StepModel } from "./stepModel";
import {GlobalVariable} from "../global";
@Injectable()
export class StepService {

    constructor (private _http: HttpClient) {}

    steps: [];
    language = '';
    languages = [];
    template: '';
    menu_level = 0

    getSteps(appName): Promise<void>{
        var query = 'app_name=' +appName;
        var completeUrl = GlobalVariable.BASE_URL+'step?'+query;
        return this._http.get(completeUrl)
            .toPromise()
            .then(response => {
                this.steps = response;
                this.language = response[0].default_language;
                this.languages = response[0].languages;
                this.template = response[0].design;
                this.menu_level = response[0].menu_level;

                this.steps.splice(0,1);
                // console.log(window.location.hash);
                if (window.location.hash == '#/admin'){
                    this.steps[0].master_type = 'admin';
                }
                else this.steps[0].master_type = 'form';

                // consol e.log(this.steps)
        })
            .catch(error => console.log(error));
    }
}
