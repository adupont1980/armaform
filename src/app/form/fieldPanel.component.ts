import {CountriesService} from "./countries.service";
declare const $ : any;
import {Component, Input, Output, EventEmitter} from '@angular/core'
import {FormBuilder, Validators, FormGroup, FormControl, FormArray} from "@angular/forms";
import {FormService} from "../Engine/form.service";
import {EmailValidator} from "./emailValidator.component";
import {StepService} from "../Engine/step.service";
@Component({
    selector: 'field-panel',
    template: `
 <div *ngIf="display">
    <div class="{{_stepService.template.panel_heading}}">
        <p *ngIf="_stepService.language == 'en'" class="text-uppercase">{{objStep.configuration.labelPanel}} </p>
        <p *ngIf="_stepService.language == 'es'" class="text-uppercase">{{objStep.configuration.labelPanel_es}} </p>
        <p *ngIf="_stepService.language == 'fr'" class="text-uppercase">{{objStep.configuration.labelPanel_fr}} </p>
    </div>
    <div class="panel-body">
        <form  class="form-horizontal" name="{{objStep.name}}"  >
            <div [formGroup]="myGroup">                  

               <!--/* FORMAT Configuration.form_values-->
                    <!--[{  name,     :id
                        ,  type :string, number-->
                    <!--}]-->
               <!--*/ -->
                <div *ngFor="let field of objStep.configuration.form_values; let i = index">
                     <div *ngIf="field.type == 'text'">
                         <div class="form-group" [ngClass]="{'has-error':!myGroup.controls[field.name].valid && myGroup.controls[field.name].touched}">
                             <label *ngIf="_stepService.language == 'en'" for="{{field.value}}"   class="col-sm-2 control-label" >{{field.label_en}} </label>
                             <label *ngIf="_stepService.language == 'es'" for="{{field.value}}"   class="col-sm-2 control-label" >{{field.label_es}} </label>
                             <label *ngIf="_stepService.language == 'fr'" for="{{field.value}}"   class="col-sm-2 control-label" >{{field.label_fr}} </label>
                              <label *ngIf="_stepService.language == 'nl'" for="{{field.value}}"   class="col-sm-2 control-label" >{{field.label_nl}} </label>
                             <div class="col-sm-10">
                                 <input *ngIf="i == 0"     
                                        myAutofocus
                                        class="form-control" 
                                        type="{{field.type}}" 
                                        id="{{field.name}}"
                                        name="{{field.name}}"
                                        required="{{field.required}}"
                                        minlength="{{field.minlength}}"
                                        maxlength="{{field.maxlength}}"
                                        formControlName="{{field.name}}"
                                        [formControl]="myGroup.controls[field.name]"
                                        >
                         
                                    <input *ngIf="i > 0"     
                                            class="form-control" 
                                            type="{{field.type}}" 
                                            id="{{field.name}}"
                                            name="{{field.name}}"
                                            required="{{field.required}}"
                                            minlength="{{field.minlength}}"
                                            maxlength="{{field.maxlength}}"
                                            formControlName="{{field.name}}"
                                            [formControl]="myGroup.controls[field.name]"
                                            >
                          
                                <div class="alert alert-danger" role="alert" *ngIf="!myGroup.controls[field.name].valid && myGroup.controls[field.name].touched ">
                                    <div *ngIf="_stepService.language == 'en'">This field is required</div>
                                    <div *ngIf="_stepService.language == 'es'">Este campo es obligatorio</div>
                                    <div *ngIf="_stepService.language == 'fr'">Champs obligatoire</div>
                                    <div *ngIf="_stepService.language == 'nl'">Dit veld is vermeld</div>
                                </div>
                                <div *ngIf="myGroup.controls[field.name].hasError('min') && myGroup.controls[field.name].touched" class="alert alert-danger">
                                    <p *ngIf="_stepService.language == 'en'">Field must be at least {{field.minlength}} characters long.</p>
                                    <p *ngIf="_stepService.language == 'fr'">Ce champs doit contenir au minimum {{field.minlength}} caractères.</p>
                                </div>
                               </div>
                         </div>
                     </div>
                    <div *ngIf="field.type == 'phone'">
                        <div class="form-group" [ngClass]="{'has-error':!myGroup.controls[field.name].valid && myGroup.controls[field.name].touched}">
                             <label *ngIf="_stepService.language == 'en'" for="{{field.value}}"  class="col-sm-2 control-label" >{{field.label_en}} </label>
                             <label *ngIf="_stepService.language == 'es'" for="{{field.value}}"  class="col-sm-2 control-label" >{{field.label_es}} </label>
                             <label *ngIf="_stepService.language == 'fr'" for="{{field.value}}"  class="col-sm-2 control-label" >{{field.label_fr}} </label>
                             <label *ngIf="_stepService.language == 'nl'" for="{{field.value}}"  class="col-sm-2 control-label" >{{field.label_nl}} </label>
                             <div class="col-sm-10">
                             <input *ngIf="i == 0"  
                                    myAutofocus
                                    class="form-control" 
                                    type="{{field.type}}" 
                                    id="{{field.name}}"
                                    name="{{field.name}}"
                                    required="{{field.required}}"
                                    min="{{field.minlength}}"
                                    max="{{field.maxlength}}"
                                    minlength="8"
                                    maxlength="14"
                                    formControlName="{{field.name}}"
                                    [formControl]="myGroup.controls[field.name]"
                                   
                                    >
                         
                             <input *ngIf="i > 0"  
                                    class="form-control" 
                                    type="text"
                                     (keypress)="keyPress($event)" 
                                    id="{{field.name}}"
                                    name="{{field.name}}"
                                    required="{{field.required}}"
                                    min="{{field.minlength}}"
                                    max="{{field.maxlength}}"
                                    minlength="8"
                                    maxlength="14"
                                    formControlName="{{field.name}}"
                                    [formControl]="myGroup.controls[field.name]"
                                    >
                              <div class="alert alert-danger" role="alert" *ngIf="!myGroup.controls[field.name].valid && myGroup.controls[field.name].touched ">
                                        <div>ERROR</div>
                                        <div *ngIf="_stepService.language == 'en'">This field is required</div>
                                        <div *ngIf="_stepService.language == 'nl'">Dit veld is vermeld</div>
                                        <div *ngIf="_stepService.language == 'es'">Este campo es obligatorio</div>
                                        <div *ngIf="_stepService.language == 'fr'">Champs obligatoire</div>
                              </div>
                         
                         
                         <div *ngIf="myGroup.controls[field.name].hasError('min') && myGroup.controls[field.name].touched" class="alert alert-danger">Veuillez indiquer un nombre plus grand</div>
                        
                        </div> 
                           
                        </div>
                    </div>                     
                    <div *ngIf="field.type == 'number'">
                        <div class="form-group" [ngClass]="{'has-error':!myGroup.controls[field.name].valid && myGroup.controls[field.name].touched}">
                             <label *ngIf="_stepService.language == 'en'" for="{{field.value}}"  class="col-sm-2 control-label" >{{field.label_en}} </label>
                             <label *ngIf="_stepService.language == 'es'" for="{{field.value}}"  class="col-sm-2 control-label" >{{field.label_es}} </label>
                             <label *ngIf="_stepService.language == 'fr'" for="{{field.value}}"  class="col-sm-2 control-label" >{{field.label_fr}} </label>
                             <label *ngIf="_stepService.language == 'nl'" for="{{field.value}}"  class="col-sm-2 control-label" >{{field.label_nl}} </label>
                             <div class="col-sm-10">
                             <input *ngIf="i == 0"  
                                    myAutofocus
                                    class="form-control" 
                                    type="{{field.type}}" 
                                    id="{{field.name}}"
                                    name="{{field.name}}"
                                    required="{{field.required}}"
                                    min="{{field.minlength}}"
                                    max="{{field.maxlength}}"
                                    minlength="{{field.minlength}}"
                                    maxlength="{{field.maxlength}}"
                                    formControlName="{{field.name}}"
                                    [formControl]="myGroup.controls[field.name]"
                                   
                                    >
                         
                         <input *ngIf="i > 0"  
                                    class="form-control" 
                                    type="{{field.type}}" 
                                    id="{{field.name}}"
                                    name="{{field.name}}"
                                    required="{{field.required}}"
                                    min="{{field.minlength}}"
                                    max="{{field.maxlength}}"
                                    minlength="{{field.minlength}}"
                                    maxlength="{{field.maxlength}}"
                                    formControlName="{{field.name}}"
                                    [formControl]="myGroup.controls[field.name]"
                                    >
                          <div class="alert alert-danger" role="alert" *ngIf="!myGroup.controls[field.name].valid && myGroup.controls[field.name].touched ">
                                    <div>ERROR</div>
                                    <div *ngIf="_stepService.language == 'en'">This field is required</div>
                                    <div *ngIf="_stepService.language == 'nl'">Dit veld is vermeld</div>
                                    <div *ngIf="_stepService.language == 'es'">Este campo es obligatorio</div>
                                    <div *ngIf="_stepService.language == 'fr'">Champs obligatoire</div>
                          </div>
                         
                         
                         <div *ngIf="myGroup.controls[field.name].hasError('min') && myGroup.controls[field.name].touched" class="alert alert-danger">Veuillez indiquer un nombre plus grand</div>
                        
                        </div> 
                           
                        </div>
                    </div>
                         
                    <div *ngIf="field.type == 'date'">
                        <div class="form-group" [ngClass]="{'has-error':!myGroup.controls[field.name].valid && myGroup.controls[field.name].touched}">
                             <label *ngIf="_stepService.language == 'en'" for="{{field.value}}"  class="col-sm-2 control-label" >{{field.label_en}} </label>
                             <label *ngIf="_stepService.language == 'es'" for="{{field.value}}"  class="col-sm-2 control-label" >{{field.label_es}} </label>
                             <label *ngIf="_stepService.language == 'fr'" for="{{field.value}}"  class="col-sm-2 control-label" >{{field.label_fr}} </label>
                             <label *ngIf="_stepService.language == 'nl'" for="{{field.value}}"  class="col-sm-2 control-label" >{{field.label_nl}} </label>
                             <div class="col-sm-10">
                                <input class="form-control"  
                                    type='date' 
                                    name='{{field.name}}'
                                    id="{{field.name}}"
                                    formControlName="{{field.name}}"
                                    required="{{field.required}}"
                                    [formControl]="myGroup.controls[field.name]"/>
                             </div>
                        </div>
                    </div> 

                    <div *ngIf="field.type == 'countries'">
                    <div class="form-group" [ngClass]="{'has-error':!myGroup.controls[field.name].valid && myGroup.controls[field.name].touched}">
                    <label *ngIf="_stepService.language == 'en'" for="{{field.value}}"   class="col-sm-2 control-label" >{{field.label_en}} </label>
                    <label *ngIf="_stepService.language == 'es'" for="{{field.value}}"   class="col-sm-2 control-label" >{{field.label_es}} </label>
                    <label *ngIf="_stepService.language == 'fr'" for="{{field.value}}"   class="col-sm-2 control-label" >{{field.label_fr}} </label>
                     <label *ngIf="_stepService.language == 'nl'" for="{{field.value}}"   class="col-sm-2 control-label" >{{field.label_nl}} </label>
                    <div class="col-sm-10">
                        <input *ngIf="i == 0"     
                               myAutofocus
                               class="form-control" 
                               type="{{field.type}}" 
                               id="{{field.name}}"
                               name="{{field.name}}"
                               required="{{field.required}}"
                               minlength="{{field.minlength}}"
                               maxlength="{{field.maxlength}}"
                               formControlName="{{field.name}}"
                               [formControl]="myGroup.controls[field.name]"
                               >
                
                           <input *ngIf="i > 0"     
                                   class="form-control" 
                                   type="{{field.type}}" 
                                   id="{{field.name}}"
                                   name="{{field.name}}"
                                   required="{{field.required}}"
                                   minlength="{{field.minlength}}"
                                   maxlength="{{field.maxlength}}"
                                   formControlName="{{field.name}}"
                                   [formControl]="myGroup.controls[field.name]"
                                   >
                 
                       <div class="alert alert-danger" role="alert" *ngIf="!myGroup.controls[field.name].valid && myGroup.controls[field.name].touched ">
                           <div *ngIf="_stepService.language == 'en'">This field is required</div>
                           <div *ngIf="_stepService.language == 'es'">Este campo es obligatorio</div>
                           <div *ngIf="_stepService.language == 'fr'">Champs obligatoire</div>
                           <div *ngIf="_stepService.language == 'nl'">Dit veld is vermeld</div>
                       </div>
                       <div *ngIf="myGroup.controls[field.name].hasError('min') && myGroup.controls[field.name].touched" class="alert alert-danger">
                           <p *ngIf="_stepService.language == 'en'">Field must be at least {{field.minlength}} characters long.</p>
                           <p *ngIf="_stepService.language == 'fr'">Ce champs doit contenir au minimum {{field.minlength}} caractères.</p>
                       </div>
                      </div>
                </div>   
                    // <div class="form-group" [ngClass]="{'has-error':!myGroup.controls[field.name].valid && myGroup.controls[field.name].touched}">
                        //     <!--(change)="changeCourse($event, item._id)"-->
                        //     <label for="countries"   class="col-sm-2 control-label">COUNTRY:</label>
                        //      <div class="col-sm-10">
                        //         <select id="countries"    >
                        //                 <option *ngFor="let country of this.countries">
                        //                     <b>{{country.name}}</b></option>
                        //         </select>
                        //     </div>
                          
                        // </div> 
                    </div>
            
                     
                    <div *ngIf="field.type == 'email'">
                        <div class="form-group" [ngClass]="{'has-error':!myGroup.controls[field.name].valid && myGroup.controls[field.name].touched}">
                            <label for="{{field.value}}"   class="col-sm-2 control-label">EMAIL:</label>
                            
                            <div class="col-sm-10">
                                <input *ngIf="i == 0"  
                                    myAutofocus 
                                    class="form-control" 
                                    type="{{field.type}}" 
                                    id="{{field.name}}"
                                    name="{{field.name}}"
                                  
                                    #email
                                    formControlName="{{field.name}}"
                                    required="{{field.required}}"
                                    [formControl]="myGroup.controls[field.name]">
                                    
                                <input *ngIf="i > 0"  
                                    class="form-control" 
                                    type="{{field.type}}" 
                                    id="{{field.name}}"
                                    name="{{field.name}}"
                                    #email
                                    formControlName="{{field.name}}"
                                    required="{{field.required}}"
                                    [formControl]="myGroup.controls[field.name]">
                                                                  
                                <div *ngIf="!myGroup.controls[field.name].valid && myGroup.controls[field.name].touched" class="alert alert-danger">
                                    <p *ngIf="_stepService.language == 'en'"> We need a valid adress email </p>
                                    <p *ngIf="_stepService.language == 'es'"> Necesitamos una dirección de e-mail correcta</p>
                                    <p *ngIf="_stepService.language == 'fr'"> Merci d'indiquer un e-mail valide.</p>
                                </div>
                            </div> 
                        </div>
                    </div>
                     
                    </div>
        <div  id="myModal" class="modal fade" role="dialog">
          <div class="modal-dialog">
        
            <!-- Modal content-->
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 *ngIf="_stepService.language == 'en'" class="modal-title">Fields mandatory </h4>
                <h4 *ngIf="_stepService.language == 'es'" class="modal-title">Campos obligatorios</h4>
                <h4 *ngIf="_stepService.language == 'fr'" class="modal-title">Champs obligatoire</h4>
                <h4 *ngIf="_stepService.language == 'nl'" class="modal-title">Velden vermeld</h4>
              </div>
              <div class="modal-body">
                <p *ngIf="_stepService.language == 'en'">THANKS FOR FILL IN ALL THE MANDATOY FIELDS</p>
                <p *ngIf="_stepService.language == 'es'">GRACIAS POR RELLENAR TODOS LOS CAMPOS</p>
                <p *ngIf="_stepService.language == 'fr'">Merci de remplir tous les champs obligatoires</p>
                <p *ngIf="_stepService.language == 'nl'">Bedankt alles velden zijn vermeld</p>
              </div>
              <div class="modal-footer">
                <button *ngIf="_stepService.language == 'en'" type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button *ngIf="_stepService.language == 'es'" type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                <button *ngIf="_stepService.language == 'fr'" type="button" class="btn btn-default" data-dismiss="modal">Fermer</button>
                <button *ngIf="_stepService.language == 'fr'" type="button" class="btn btn-default" data-dismiss="modal">Sluiten</button>
              </div>
            </div>
        
          </div>
        </div>
             <!--<div *ngIf="btnDisabled"><i class="fa fa-spinner fa-spin" style="font-size:96px"></i></div>       -->
             <!--<button type="submit" class="btn btn-primary" [disabled]="myGroup.invalid">Valider</button>-->
             <div align="center">
                <button [disabled]="btnDisabled" *ngIf="_stepService.language == 'en'" type="button" data-target="#myModal" (click)="onClick()" class="btn btn-default btn-lg">   Send   </button>
                <button [disabled]="btnDisabled" *ngIf="_stepService.language == 'es'" type="button" data-target="#myModal" (click)="onClick()" class="btn btn-default btn-lg">   Enviar  </button>
                <button [disabled]="btnDisabled" *ngIf="_stepService.language == 'fr'" type="button" data-target="#myModal" (click)="onClick()" class="btn btn-default btn-lg">   Envoyer  </button>
                <button [disabled]="btnDisabled" *ngIf="_stepService.language == 'nl'" type="button" data-target="#myModal" (click)="onClick()" class="btn btn-default btn-lg">   Verzenden  </button>
             </div>
                </div>   
    </form>
    </div> 
 </div>
`
})

export class FieldPanelComponent {
    @Input() objStep;     //Value received from MainComponent
    @Input() stepIdx;     //Value received from MainComponent
    @Output() sent = new EventEmitter(); // Emitter to send back data to parent component
//private _countriesService: CountriesService
    constructor(private _fb: FormBuilder, public _formService: FormService, private _stepService: StepService, ) {
    }

    display = false;
    tempDisplay = false;
    myGroup = new FormGroup({});
    arr = new FormArray([]);
    errorForm = false;
    app_name;
    btnDisabled = false;
    countries = [];

    ngOnInit() {
        // this.countries = this._countriesService.getCountries()

//             .subscribe(data => {
//                 console.log(data)
//                 console.log(typeof data)
//                 console.log(this._countriesService.countries)
//                 // this.countries = data.split(',');
// this.countries = data;
//                     console.log(this.countries.length)
//                     console.log(typeof this.countries)
//                 console.log(this.countries)
//                 },
//                 error => console.log(error)
//             )
        // this._countriesService.ngOnInit();
        console.log('NgOnInit');
        console.log(this.objStep);
        console.log(this.countries);
        // let countries = this._countriesService.ngOnInit();
        // console.log(countries)
        // console.log(this._countriesService.countries)
        this.app_name = this.objStep.master_name;
        /* CHECK IF THIS MUST DISPLAYED*/
        if (this.objStep.conditions.length > 0) {
            let valueCondition = this.objStep.conditions[0].value;
            let keyCondition = this.objStep.conditions[0].key;
            console.log(valueCondition);
            console.log(keyCondition);
            console.log(this.stepIdx);
            console.log(this._formService);

            if (typeof (this._formService.arraySteps.find(x => x[keyCondition] === valueCondition)) != 'undefined') {
                this.tempDisplay = true;
            }
        }
        else {
            this.tempDisplay = true;
        }
        console.log(this.myGroup);


        if (this.tempDisplay) {

            console.log(this.objStep);
            /* ADD ALL SPECIFIC CONTROL FOR EACH FIELD */
            for (let index = 0; index < this.objStep.configuration.form_values.length; index++) {
                if (typeof (this.objStep.configuration.form_values[index].autofocus) == 'undefined') {
                    this.objStep.configuration.form_values[index].autofocus = false;
                }
                console.log(this.objStep.name);
                console.log(this.objStep.configuration.form_values[index].name);   // 1 = NOM ; 2 = EMAIL
                console.log(this._formService.arraySteps);

                if (this.objStep.configuration.form_values[index].type == 'email') {
                    this.myGroup.addControl([this.objStep.configuration.form_values[index].name].toLocaleString(), new FormControl('', [Validators.required, EmailValidator.checkEmail]));
                }
                else {
                    this.myGroup.addControl([this.objStep.configuration.form_values[index].name].toLocaleString(), new FormControl('', [Validators.required, Validators.minLength(2)]));
                }

                /* SET FIELD VALUE IF A DATA HAS BEEN INSERTED PREVIOUSLY */
                var objFieldsPanel = this._formService.arraySteps.find(y => y["nom"] === this.objStep.name);

                console.log("objFieldsPanel");
                console.log(objFieldsPanel);
                if (typeof objFieldsPanel != 'undefined') {

                    if (typeof objFieldsPanel[this.objStep.name][index] != 'undefined') {
                        let keyField = objFieldsPanel[this.objStep.name][index];
                        let valueField = keyField[this.objStep.configuration.form_values[index].name];
                        this.myGroup.controls[this.objStep.configuration.form_values[index].name].setValue(valueField);
                    }

                }
            }
            this.display = true;

        }

        /* validatePhone(c: FormControl) {
             let PHONE_REGEXP = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i;
             return PHONE_REGEXP.test(c.value) ? null : {
                 validatePhone: {
                     valid: false
                 }
         };*/
    }


    onClick() {
        // console.log(this.arr);
        // console.log(this.myGroup.controls);
        // console.log(this.myGroup.invalid);
        // console.log(this.myGroup.valid);
        // console.log(this.myGroup);
        if (this.myGroup.valid) {
            this.btnDisabled = true;
            // console.log('form');
            // console.log(this.objStep.name);
            // console.log(eval(this.objStep.name));
            // console.log(this.objStep.configuration.form_values[0].name);
            // console.log(eval(this.objStep.name)[this.objStep.configuration.form_values[0].name].value);

            //  console.log(eval(this.objStep.name)[this.objStep.configuration.form_values[1].name].value);

            var valuesName = [];
            var valuesSelected = [];
            for (let index = 0; index < this.objStep.configuration.form_values.length; index++) {
                valuesName.push(this.objStep.configuration.form_values[index].name);
                valuesSelected.push(eval(this.objStep.name)[this.objStep.configuration.form_values[index].name].value);
            }
            // console.log(valuesSelected);

            this.sent.emit(
                {
                    valueName: valuesName,
                    valueSelected: valuesSelected,
                    stepIdx: this.stepIdx,
                    name: this.objStep.name
                })

        }
        else {
            $("#myModal").modal('show');
        }
    }
    keyPress(event: any) {
        const pattern = /[0-9\+\-\ ]/;

        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
}