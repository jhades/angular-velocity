/// <reference path="../../typings/angular2/angular2.d.ts" />

import {Component, View, bootstrap, NgFor, NgModel} from 'angular2/angular2';
import {ReferenceData, ReferenceDataService} from 'showcase/common/referenceData';
import {Dropdown,NvSelect, NvSelectOption, NvOptGroup, TypeAhead, Autocomplete} from 'angular-velocity';
import {formDirectives, Validators, NgFormModel, FormBuilder, formInjectables, NgControl} from 'angular2/forms';
import {Inject} from 'angular2/di';


@Component({
    selector: 'sample-app'
})
@View({
    template: `<div class="demos">
                    <form class="pure-form">
                        <div class="demo">
                            <h3>simple form:</h3>
                            <form>
                                <div [ng-form-model]="form">
                                    <p>
                                        <label>Username:</label>
                                        <input type="text" ng-control="username" [(ng-model)]="user.username">
                                    </p>
                                    <p>
                                        <label>Password:</label>
                                        <input type="password" ng-control="password">
                                    </p>
                                    <p>
                                        <label>Country:</label>
                                        <nv-dropdown dropdown-height="250px" dropdown-width="200px"
                                            [options]="refData.COUNTRIES"
                                            (change)="onSelection($event)"
                                        </nv-dropdown>
                                    </p>
                                     <button [disabled]="!form.valid" (click)="onSubmit()">Submit</button>
                                </div>
                            </form>
                        </div>
                        <div class="demo">
                            <h3>nv-dropdown:</h3>
                            <nv-dropdown dropdown-height="250px" dropdown-width="200px"
                                [options]="refData.COUNTRIES"
                                (change)="onSelection($event)"
                            </nv-dropdown>
                        </div>
                        <div class="demo">
                            <h3>nv-dropdown with groups:</h3>
                            <nv-dropdown dropdown-height="250px" dropdown-width="200px"
                                [option-groups]="refData.NBA_DIVISIONS"
                                (change)="onSelection($event)"
                            </nv-dropdown>
                        </div>
                        <div class="demo">
                            <h3>nv-typeahead (in-memory):</h3>
                            <nv-typeahead dropdown-height="250px" dropdown-width="200px"
                                [options]="refData.COUNTRIES"
                                (change)="onSelection($event)"
                            </nv-typeahead>
                        </div>
                        <div class="demo">
                            <h3>nv-autocomplete (server):</h3>
                            <nv-autocomplete dropdown-height="250px" dropdown-width="200px"
                                (search)="onCountrySearch($event)" [options]="refDataService.getCountries()"
                                (change)="onSelection($event)"
                            </nv-autocomplete>
                        </div>
                        <div class="demo">
                            <h3>nv-select:</h3>
                            <nv-select dropdown-height="250px" dropdown-width="200px" (change)="onSelection($event)">
                                <option *ng-for="#team of refData.NBA_TEAMS" [value]="team" [text]="team.description"></option>
                            </nv-select>
                        </div>
                        <div class="demo">
                            <h3>nv-select with groups:</h3>
                            <nv-select dropdown-height="250px" dropdown-width="200px" (change)="onSelection($event)">
                                <optgroup *ng-for="#division of refData.NBA_DIVISIONS;" [label]="division.label">
                                    <option *ng-for="#team of division.options" [value]="team" [text]="team.description"></option>
                                </optgroup>
                            </nv-select>
                        </div>
                    </form>
                </div>`,
    directives: [Dropdown,NgFor,NvSelect, NvSelectOption, NvOptGroup, TypeAhead,formDirectives, NgModel,Autocomplete],
    viewInjector: [FormBuilder, ReferenceDataService]
})
export class DemoApp {
    refData: ReferenceData;
    refDataService: ReferenceDataService;
    form;
    user: Object = {};

    constructor(@Inject(FormBuilder) fb: FormBuilder, @Inject(ReferenceDataService) refDataService: ReferenceDataService) { //TODO remove @Inject https://github.com/angular/angular/issues/2788
        this.refData = new ReferenceData();
        this.refDataService = refDataService;

        this.form = fb.group({
            "username": ["", Validators.required],
            "password": ["", Validators.required]
            //"country": ["", Validators.required]
        });

        this.form.valueChanges.toRx().map((value) =>value).subscribe((value) => {
            console.log(value);
            console.log(this.user);
        });

    }

    onSelection(option) {
        console.log("clicked option, event received in app: " + option.description);
    }

    onSubmit() {
        console.log("username valid " + this.form.controls.username.valid);
    }

    onCountrySearch(search) {
        console.log("looking for country " + search);
    }

}

bootstrap(DemoApp, [formInjectables, ReferenceDataService]);
