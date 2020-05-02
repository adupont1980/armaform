import { Component } from '@angular/core'
import { StepService } from "../Engine/step.service";
import { Router, ActivatedRoute } from '@angular/router';
import { GridService } from "../admin/grid.service";
import { AuthService } from "../auth/auth.service";
@Component({
    selector: 'grid-panel',
    template: `
     <div class="{{_stepService.template.panel_heading}}" *ngIf="preMenu == 1"   >
         <!--<button (click)="logout()" class="btn btn-warning" ><i class="glyphicon glyphicon-log-out" ></i></button>-->
         <div align="right">
            <button (click)="logout()" class="btn btn-warning" ><img src="/images/icones/if_door_open.png"> </button>
        </div>
    </div>
    <div class="{{_stepService.template.panel_heading}}" *ngIf="preMenu == 2" >
        <!--PREMENU {{this.preMenu}}-->
        <div  class="row" align="left" >
            
            <div *ngIf="backBtn" class="col-md-2">
                
                <nav class="form-navArrow">
                    <button (click)="onClick()" class="btn btn-warning" >
                        <i class="glyphicon glyphicon-triangle-left" ></i>
                    </button>
                </nav>
            </div>
        
           <div class="col-md-9" align="center">
                <h2>{{val_level2}}</h2>
           </div>
           <div class="col-md-1" align="right">
                <!--<button (click)="logout()" class="btn btn-warning" ><i class="glyphicon glyphicon-log-out" ></i></button>-->
                <button (click)="logout()" class="btn btn-warning" ><img src="/images/icones/if_door_open.png"> </button>
           </div>
          
        </div>
    </div>

    <div class="panel-body" *ngIf="ready == true">
          
           <div  *ngIf="preMenu == 0"> 
                <!--PREMENU {{this.preMenu}}-->
                <div *ngFor="let grid of grids" class="col-md-3">
                 
                    <span *ngIf="grid.display">
                        
                            <a [routerLink]="['/grid']" [queryParams]="{'grid_name': grid.name, 'master': 0, 'app_name': appName}"> 
                                <button type="button" class="{{_stepService.template.list_btn}}" >{{grid.name}}</button>    
                            </a>
                    </span>
                </div>
            </div>
            
            <div *ngIf="preMenu == 1"> 
                <!--steps from admin_ballet-->
                    <!--step 1 { type : buttons } pass stage_name to step 2-->
                    <!--step 2 {type: grids} get all grids from stage_name-->
                <!--steps from grids-->
                 <!--{{this.preMenu}}-->
                 <div *ngFor="let btn of preMenuLst" align="center">
                    <button class="{{_stepService.template.list_btn}}"  type="button"  style="width: 500px"
                        (click)="getGridsBtn($event, btn)"
                        value="{{btn.children}}">{{btn}}
                    </button>
                    <br><br>
                </div>
            </div>          
          
            <!--<div class="col-md-3"><button type="button" class="btn btn-success"><a [routerLink]="['/step']"> Nouveau flow</a></button></div>-->
            <div *ngIf="preMenu == 2"> 
                <div *ngFor="let grid of gridBtns" align="center">
                    <!--{{this.preMenu}}-->
                    <!--<div *ngIf="grid.display">-->
                       
                        <a [routerLink]="['/grid']" [queryParams]="{'grid_name': grid.children, 'master': val_level2, 'app_name': appName}">
                            <button type="button" style="width: 500px" class="{{_stepService.template.list_btn}}" ><span  class="badge pull-left">{{grid.nbRecords}}</span><span> {{grid.children}}</span></button>
                            <!--<button type="button" style="width: 500px" class="btn btn-primary btn-lg" > {{grid}}</button> -->
                        </a>
                        <br><br>   
                    <!--</div>-->
                    
                </div>
            </div>
    </div>
`
})

export class MenuComponent {
    constructor(private _stepService: StepService, private router: Router, private _gridService: GridService,
                private route: ActivatedRoute, private _authService: AuthService) {
    }

    grids = [];
    ready = false;
    appName = '';
    preMenu = 0;
    backBtn = false;
    preMenuLst = [];
    level2 = false;
    val_level2 = '';
    firstLoad = true;
    gridBtns;
    signedIn= false;
    private sub: any;
    ngOnInit() {

        this.appName = this.route.snapshot.queryParams["app"];
        // console.log(this.appName);
        if (typeof this.route.snapshot.queryParams["firstLoad"] != 'undefined') {
            this.firstLoad = this.route.snapshot.queryParams["hasLoaded"];
        }
        // console.log(this.firstLoad)
        if (typeof this.route.snapshot.queryParams["premenu"] != 'undefined') {
            this.preMenu = this.route.snapshot.queryParams["premenu"];
            // console.log(this.preMenu)
        }

        this.sub = this.route.params.subscribe(params => {
            if (typeof params['signed'] != 'undefined'){
                // console.log('ici dans signed et app')
                this.appName = params['app'];
                this.signedIn = params['signed'];
            }
        });

        if (this.isLoggedIn() && this._stepService.master_type == 'admin' || this.preMenu == 1)
        {
            console.log(this._stepService)

            this._gridService.getActivatedGrids(this._stepService.master_name)
                .then(
                    gridsList => {
                        console.log(gridsList)
                        this.grids = Object.assign([], gridsList);

                        for (let j = 0; j < this.grids.length; j++) {
                            // console.log(this.grids[j].name);
                            // console.log(this.grids[j].listBtn);
                            if (typeof this.grids[j].listBtn != 'undefined') {
                                if (this.firstLoad == true) {
                                    this.preMenu = 1;
                                    for (let main of this.grids[j].listBtn) {
                                        if (this.preMenuLst.indexOf(main.name) == -1)
                                            this.preMenuLst.push(main.name);
                                    }
                                }
                            }

                        }
                        if (this.route.snapshot.queryParams["premenu"] == 1) {
                        // if (this._stepService.menu_level == 1) {
                            let master = this.route.snapshot.queryParams["master"];
                            this.getGridsBtn('e',master);
                        }

                        this.ready = true;
                    }
                ), error => console.log(error)
        }
        else
        {
            if (this._stepService.master_type == 'form' && this.firstLoad) {
                this.router.navigate(['/step']);
            }
            else {
                if (this.isLoggedIn() == false && this.firstLoad == true) {
                    this.router.navigate(['/signin', this.appName]);
                }
            }
        }

    }


    getGridsBtn($event, val) {
        //this.gridBtns = $event.target.value;
        this.val_level2 = val;
        //console.log(this.gridBtns);
       // console.log(gridList);
        console.log(val)
        console.log(this.grids)
        // TOUS LES GRIDS de la collection grids
        this.gridBtns = [];
        for (let j = 0; j < this.grids.length; j++) {
            //cas où un prémenu exist alors on a dans grids un "type": "listBtn"
            if (typeof this.grids[j].listBtn != 'undefined') {
                {
                    for (let obj of this.grids[j].listBtn) {
                        // console.log(obj)
                        if (obj.name == val){
                            // if (this.gridBtns.indexOf({"children":obj.children, "nbRecords": obj.nbRecords}) == 1) {
                            this.gridBtns.push({"children":obj.children, "nbRecords": obj.nbRecords});
                        }
                    }
                }
            }
        }
        this.preMenu = 2;
        this.backBtn = true;
        this.level2 = true;
    }

    onClick() {
        console.log(this.preMenuLst);
        this.preMenu = 1;
        this.backBtn = false;
    }

    logout(){
        this._authService.logout();

    }

    isLoggedIn() {
        // console.log(this.appName)
        return this._authService.isLoggedIn()
    }
}

