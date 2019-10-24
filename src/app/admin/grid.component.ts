declare const $ : any;
import {Component, Input, Output, EventEmitter} from '@angular/core'
import {GridService} from "./grid.service";
import {Router, NavigationExtras, ActivatedRoute} from '@angular/router';
import {StepService} from "../Engine/step.service";
// import {Http} from "@angular/http";
import {ExportService} from "./export.service";
@Component({
    selector: 'grid-panel',
    template: `
       <div  class="{{_stepService.template.panel_heading}}" >
         <div  class="row" align="left">
          <div class="col-md-2">
            <nav class="form-navArrow">
               <a *ngIf="master != 1" [routerLink]="['/home']" [queryParams]="{'app': app_name, 'master': master, 'premenu': _stepService.menu_level}" >
                   <button class="btn btn-warning"><i class="glyphicon glyphicon-triangle-left" ></i>BACK</button>
              </a>
               <a *ngIf="master == 1" [routerLink]="['/menu']" [queryParams]="{'app': app_name}" >
                   <button class="btn btn-warning"><i class="glyphicon glyphicon-triangle-left" ></i>BACK</button>
              </a>
            </nav>
          </div>
         <div class="col-md-10" align="center">
             <h2 *ngIf="master != '0' ">{{master}}</h2>
             <h3>{{grid_name}}</h3>
         </div>
       </div>
       <div *ngIf="export" align="left">               
            <button (click)="exportExcel()" class="brown_button" ><i class="glyphicon glyphicon-save" ></i></button>
       </div>
       </div>
        <div class="panel-body">
       <!--class="table-responsive"-->
       <div  *ngIf="display">
            <table class="table table-hover table-condensed"  >
                <tr>
                    <th *ngFor="let obj of _gridService.colTitle;let i = index" >
                       {{obj.title}}&nbsp; 
                            
                            <button *ngIf="obj.filterable" 
                                class="glyphicon glyphicon-filter" 
                                type="button" 
                                (click)="showFilterInput(i)">
                            </button>
                            <br>
                            <input   
                                *ngIf="obj.filterable && showInput[i] && obj.filter_type == 'text' "
                                myAutofocus="true"
                                type="text" 
                                id="{{obj.key}}"
                                name="{{obj.key}}"
                                (keyup)="filter($event)"
                             >
                            <select 
                                *ngIf="obj.filterable && showInput[i] && obj.filter_type == 'combo' "
                                id="{{obj.key}}" 
                                size="{{obj.data_combo.length}}"
                                name="{{obj.key}}"
                                (change)="filterByCombo($event)" >
                                    <option *ngFor="let val of obj.data_combo" value="{{val}}">{{val}}</option>
                            </select>
                        
                    </th>
                    <th  *ngIf="this._gridService.config.details_activated"></th>
                    <th *ngIf="this._gridService.config.group"  ></th>
                </tr>
                <tr *ngFor="let item of _gridService.dataGrid;let j = index">
                    <td *ngFor="let key of _gridService.keysName;let i = index" >
                        <!-- TYPE CHECK BOX -->
                        <span *ngIf="this._gridService.colTitle[i].type == 'checkbox' "> 
                            <input *ngIf="item[key]" name="{{key}}" type="checkbox" value="{{item[key]}}" checked (change)=updateCheckBox($event,item) /> 
                            <input *ngIf="item[key] == false" name="{{key}}" type="checkbox" value="{{item[key]}}" (change)=updateCheckBox($event,item) /> 
                        </span>
                        
                        <!-- TYPE COMBO MORE THAN 1 VALUE IN LIST COMBO-->
                        <span *ngIf="this._gridService.colTitle[i].type == 'combo' &&  _gridService.dataGrid[0].course_list.length > 1" >
                               <select id="groups" (change)="changeCourse($event, item._id)"   >
                                    <option selected value="item[key]">{{item[key]}}</option>
                                    
                                    <option *ngFor="let course of _gridService.dataGrid[0].course_list">
                                        <b selected *ngIf="course == item[key]">{{course}}</b>
                                        <b *ngIf="course != item[key]">{{course}}</b></option>
                                        
                               </select>
                        </span>
                        <!-- TYPE COMBO LESS THAN 1 VALUE IN LIST COMBO-->
                        <span *ngIf="this._gridService.colTitle[i].type == 'combo' && _gridService.dataGrid[0].course_list.length < 2">
                                {{item[key]}}  
                        </span>
                        
                        <!-- NORMAL TYPE -->
                        <span *ngIf="!filterActivated && _gridService.colTitle[i].type == 'standard'">
                            {{item[key]}}  
                        </span>
                        
                        <!-- FIELD PANEL TYPE -->
                        <p class="span-table" *ngIf="!filterActivated && _gridService.colTitle[i].type == 'field_panel'">
                            {{item[key]}}
                        
                        </p>
                        
                        <!--<span class="span-table" *ngIf="!filterActivated && _gridService.colTitle[i].type == 'field_panel'">-->
                            <!--{{item[key]}}  -->
                        <!--</span>-->
                    </td>
                    
                    <!-- EDIT BUTTON BALLET -->
                    <td  *ngIf="this._gridService.config.details_activated && app_name == 'ballet'">
                        <a [routerLink]="['/editStudent', item._id, grid_name, master] "> 
                            <button class="{{_stepService.template.grid_btn}}"  type="button" > 
                                <i class="glyphicon glyphicon-edit"> </i>
                            </button>
                        </a> 
                    </td>
                    <!-- DETAILS CARGO RATE -->
                    <td  *ngIf="this._gridService.config.details_activated && app_name == 'cargo'">
                        <a [routerLink]="['/flyDetails', item.origin, item.destination] "> 
                            <button class="{{_stepService.template.grid_btn}}"  type="button" > 
                                Rates<!--<i class="glyphicon glyphicon-edit"> </i>-->
                            </button>
                        </a> 
                    </td>
                        <!-- EDIT BUTTON AUTO  -->
                    <td *ngIf="this._gridService.config.details_activated && app_name =='auto'">
                        <a [routerLink]="['/auto_details', item._id, grid_name] ">
                            <button class="btn btn-primary" type="button"> Detail </button>
                        </a> 
                    </td>
                    <!--- GROUP MANAGEMENT BUTTON --->
                    <!--*ngIf="item.group_mgt"-->
                    <td *ngIf="this._gridService.config.group" >
                        <a [routerLink]="['/groupManagement', item._id, grid_name, master] ">
                            <button class="{{_stepService.template.grid_btn}}"  type="button"> Group </button>
                        </a> 
                    </td>
                    <!-- DELETE RECORD -->
                    <td *ngIf="this._gridService.config.removable" >
                       
                            <button class="{{_stepService.template.grid_btn}}" (click)="_gridService.delete_record(item._id)" type="button"> <i class="glyphicon glyphicon-remove"> </i> </button>
                       
                    </td>
                    <!-- IF DETAILS IS ACTIVATED IN GRID CONFIG COLLECTION -->
                    <!--<td *ngIf="item.details.activated && app_name == 'ballet'">-->
                        <!--<a [routerLink]="['/details', item._id, grid_name] ">-->
                            <!--<button class="{{_stepService.template.grid_btn}}"  type="button"> Detail </button>-->
                        <!--</a> -->
                    <!--</td>-->

                    <!-- MODAL <td *ngIf="item.details.activated"><button class="btn btn-success" type="button" data-toggle="modal" data-target="#myModal">DETAIL </button></td>-->
                    
                    <!--IF WORKFLOW TYPE BTN TO GO BACK TO CURRENT STEP -->
                    <td *ngIf="this._stepService.steps[0].master_type == 'workflow'"> <button class="btn btn-success" type="button" (click)="goToCurrentStep(item)" value="{{item.step_id}} ">Current step </button></td>
                
                </tr>
                
            </table>
        </div>
       
    </div>
            <!-- Modal -->

    `
})

 export class GridPanelComponent {

   // router = new Router;
    constructor(private _stepService: StepService, private _gridService: GridService, private router: Router,
                private route: ActivatedRoute, private _exportService: ExportService){}

    display = false;
    myListData = [];// =  this._gridService.dataGrid;
    grid_name;
    keysName = [];
    showInput = [];
    filterActivated = false;
    master = "";
    app_name = "";
    export = false;
    ngOnInit() {
        // console.log( this._stepService.menu_level);
        this.grid_name = this.route.snapshot.queryParams["grid_name"];
        this.master = this.route.snapshot.queryParams["master"];
        this.app_name = localStorage.getItem('app')
        console.log(this.app_name)
console.log(this._gridService.colTitle)
        // console.log(this.app_name);
        // console.log(this.master)
        if(this.master != ''){
            this._gridService.getDatas(this.grid_name, this.master)
                .subscribe(data => {
                         // console.log(data)
                        console.log(this._gridService)
                        console.log(this._gridService.config)
                        if (typeof this._gridService.config.export !== 'undefined'){
                            this.export = this._gridService.config.export;
                        }
                    },
                    error => console.log(error)
                )
        }
        else {
            this._gridService.getDatas(this.grid_name, '')
                .subscribe(data => {
                    // console.log(data)
                    // console.log(this._gridService)
                    },
            error => console.log(error)
        )
        }

        for (let i = 0; i < this._gridService.colTitle.length; i++) {
            this.showInput.push(false);
        }

        this.myListData = this._gridService.dataGrid;
        this.keysName = this._gridService.keysName;

        // console.log(this._gridService.keysName);
        // console.log(this._gridService);
        this.display = true;

}
    goToCurrentStep(item){
        console.log(item);
        let navigationExtras: NavigationExtras = {
            queryParams: { 'current_id': item.step_id, '_id': item._id }

        };

        this.router.navigate(['/step'], navigationExtras);
    }

    isObject(item) {
        return (typeof item === "object" && !Array.isArray(item) && item !== null);
    }

    showFilterInput(idx){

        if (this.showInput[idx] == true)
        {
            this._gridService.dataGrid = this._gridService.originalData
            this.showInput[idx] = false;
        }else{
            this.showInput[idx] = true;
        }
    }

    checkUndefined(value){
        console.log(value);
        console.log(typeof value === 'undefined')
        return (typeof value === 'undefined');
    }


    updateCheckBox($event, item){
       // let value = $event.target.getAttribute('value');
        let value =$event.target.checked;
        // console.log(item)
        // console.log($event.target)
        let fieldName = $event.target.name;
        // console.log(this.master)
        this._gridService.updateCheckbox(value,item._id,this.master, this.app_name, fieldName)
            .subscribe(
                data => console.log(data),
                error => console.log(error)
            )
      // console.log(value);
      //  console.log(val2);

    }

    changeCourse($event, id){
        let course_type = $event.target.value
        this._gridService.changeCourse(course_type,id)
            .subscribe(
                data => {
                },
                error => console.log(error)
            )
    }
    filter(event: any){
        // console.log(event.target);
        //if (event.target.value ==''){
        // console.log("passe par grid cmp");
            //}else {
        // console.log(event);
        // console.log(this. _gridService.dataGrid);
        this._gridService.filterData(event.target.value, event.target.id);
    }

    filterByCombo(event:any){

        // console.log(id)
        this._gridService.filterData(event.target.value, event.srcElement.id);
    }

    exportExcel(){
        // this.grid_name
        // this.master
        // console.log(this._gridService.dataGrid)
        // console.log("XXXXXX")
        let export_id = 0
        if (typeof this._gridService.config.export_id !== 'undefined')
        {
            export_id = this._gridService.config.export_id;
        }
        this._exportService.toExcel(this.grid_name,this.master,this._gridService.config.export_id)
            .subscribe(
                data => {
                    // console.log(data)
                    let fileName = this.grid_name + ".csv"
                    let blob = new Blob([data], { type: 'text/csv' });
                    let url= window.URL.createObjectURL(blob);
                    if(navigator.msSaveOrOpenBlob) {
                        navigator.msSaveBlob(blob, fileName);
                    } else {
                        let a = document.createElement('a');
                        a.href = url;
                        a.download = fileName;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                    }
                    window.URL.revokeObjectURL(url);

                    // window.open(url);
                },
                error => console.log(error)
            )

    }

}