import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from "@angular/core";
import { StepModel } from "./stepModel";
import {GlobalVariable} from "../global";
@Injectable()
export class StepService {

    constructor (private _http: HttpClient) {}

    master_name: string = 'default'
    master_type: string = 'form'
    steps: Array<any>;
    language = '';
    languages = [];
    template: 'form';
    menu_level = 0

    getSteps(appName:string): Promise<void>{
        if (appName !== ' ') { this.master_name = 'ballet'; }
        var query = 'app_name=' + this.master_name;
        var completeUrl = GlobalVariable.BASE_URL+'step?'+query;
        return this._http.get(completeUrl)
            .toPromise()
            .then(response => {
                this.steps = Object.assign([], response);
                this.language = response[0].default_language;
                this.languages = response[0].languages;
                this.template = response[0].design;
                this.menu_level = response[0].menu_level;

                this.steps.splice(0,1);
                // console.log(window.location.hash);
                if (window.location.hash == '#/admin'){
                    this.master_type = 'admin';
                }

        })
            .catch(error => console.log(error));
    }
}
