import {Injectable} from "@angular/core";
import { GlobalVariable } from "../../global";
// import {Http, Headers, RequestOptions} from "@angular/http";
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from "rxjs/Observable";

@Injectable()
export class StudentService {

    constructor (private _http: HttpClient) {}
    dataGrid = [];
    keysName = [];
    colTitle = [];
    keysName_details = [];
    colTitle_details = [];
    originalData = this.dataGrid;

    updateStudent(data) {
        let body = data;
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        var completeUrl = GlobalVariable.BASE_URL + 'update_student';
        return this._http.post(completeUrl, JSON.stringify(body), {headers: headers})
            // .map(response => response)
            // .catch(error => Observable.throw(error.json()));
    }

}