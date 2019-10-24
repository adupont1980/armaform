import {Injectable} from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
// import { Observable } from "rxjs/Observable";
import {FormService} from "../Engine/form.service";
import {GlobalVariable} from "../global";

@Injectable()
export class SaveService {

    constructor (private _http: HttpClient, private _formService: FormService) {}

    saveFiles() {
            let headerFiles = new HttpHeaders();
            headerFiles.append('EncType', 'multipart/form-data');
            headerFiles.append('Accept', 'application/json');
            let options = new HttpResponse({headers: headerFiles});
            var completeUrl = GlobalVariable.BASE_URL + 'store_file';
            return this._http.post(`${completeUrl}`, this._formService.arrayFiles, {headers: headerFiles})
                // .map(res => res)
                // .catch(error => Observable.throw(error))
                }

    saveData(currentStep, appName) {
            console.log(appName)
            this._formService.arraySteps.push({"step_id": currentStep},{"app_name" : appName});
            //this._formService.arraySteps.push()
            let body = this._formService.arraySteps;

            //SAVE FORM DATA INTO COLLECTION
            const headers = new HttpHeaders({'Content-Type': 'application/json'});
            var completeUrl = GlobalVariable.BASE_URL + 'save_datas';
            return this._http.post(completeUrl, JSON.stringify(body), {headers: headers})
                // .map(response => response)
                // .catch(error => Observable.throw(error.json()));
        }
     }