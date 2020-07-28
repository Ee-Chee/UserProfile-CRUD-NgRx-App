import { Component, OnInit, Injectable } from '@angular/core';
import { AddressBookService } from 'src/app/services/address-book.service';
import { NgbCalendar, NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import * as data from '../../postcodes.de.json';
import { UserAddress, Address } from '../../interfaces/address-interfaces';

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
    readonly DELIMITER = '.';
    //NgbDateParserFormatter is an abstract service/class for parsing and formatting dates for the NgbInputDatepicker directive
    //Note that you are allowed to write a statement that “invokes” the abstract methods (Parse and Format). 
    //Since the class is abstract, it can’t be instantiated, and there is no way that the abstract (unimplemented method) will be actually invoked. 
    //If you want to create a descendant of the abstract class that can be instantiated, you must implement all abstract methods of the ancestor.
    //parse first and then format. Both are invoked automatically.
    parse(value: string): NgbDateStruct | null {
        if (value) {
        let date = value.split(this.DELIMITER);
        return {
            day : parseInt(date[0], 10),
            month : parseInt(date[1], 10),
            year : parseInt(date[2], 10)
        };
        }
        return null;
    }

    format(date: NgbDateStruct | null): string {
        return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
    }
}

@Component({
    selector: 'app-add-user-address',
    templateUrl: './add-user-address.component.html',
    styleUrls: ['./add-user-address.component.css'],
    providers: [{provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}]
})
export class AddUserAddressComponent implements OnInit {
    registrationFormData = <UserAddress>{}; //use type assertions to create empty object for typed variables
    model = <NgbDateStruct>{};
    minDate: NgbDateStruct;
    maxDate: NgbDateStruct;
    address = <Address>{};
    cities: string[];
    registered: boolean = false;
    message: string = '';
    toggleSelectPlaceholder: boolean = true;
    enableUpdate: boolean = false;

    constructor(private addressBookService: AddressBookService, private ngbCalendar: NgbCalendar, private route: ActivatedRoute) { }

    ngOnInit() {
        this.maxDate = this.ngbCalendar.getToday();
        this.minDate = { year: (this.maxDate.year - 120), month:1, day: 1} //set 120-year range
        if(this.route.snapshot.paramMap.get('id')) {
            this.addressBookService.getUserInfo(this.route.snapshot.paramMap.get('id'))
                .subscribe(data => {
                    if(data === null || data['errMsg'] === "invalid id"){
                        window.alert("Invalid user ID!");
                    } else {
                        //id is retrived in registrationFormData
                        this.registrationFormData = data;
                       
                        // to get correctly translated value for gender's select input
                        if(localStorage.getItem('locale') == "en" && this.registrationFormData.gender == "männlich") {
                            this.registrationFormData.gender = "Male";
                        }
                        if(localStorage.getItem('locale') == "en" && this.registrationFormData.gender == "weiblich") {
                            this.registrationFormData.gender = "Female";
                        }
                        if(localStorage.getItem('locale') == "de" && this.registrationFormData.gender == "Male") {
                            this.registrationFormData.gender = "männlich";
                        }
                        if(localStorage.getItem('locale') == "de" && this.registrationFormData.gender == "Female") {
                            this.registrationFormData.gender = "weiblich";
                        }
                        
                        this.model = data['birthday'];
                        this.address = data['address'];
                        this.toggleSelectPlaceholder = false;
                        this.enableUpdate = true;
                    }
                }
            )
       
        } 
    }

    search = (text$: Observable<string>) =>
    text$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        map(term => term.length < 2 ? [] : (data as any).default.filter(obj => 
                obj.zipcode.indexOf(term) == 0
            ).map(obj => obj.zipcode).reduce(
                (unique, zipcode) => (unique.includes(zipcode) ? unique : [...unique, zipcode]),[])
            .slice(0, 10)
        )
    )
    //no options shown on empty input/on focus //too many of them
    //kicks in only if 2+ characters typed
    //filtering always starts at first position, index 0 of the string.
    //limits to 10 different results, no duplicates

    getCities(e, control) {
        if(e.length == 5) {
            this.address.city = undefined; //reset for city validation later

            this.cities = (data as any).default.filter(obj =>
                obj.zipcode == e
            ).map(obj => obj.place);

            if(this.cities.length == 0){
                control.control.setErrors({notFound:"Postcode not found"}); //customize validation
            }else {
                control.control.setErrors(null);
            }
        }
    }

    onSubmit() {
        this.registrationFormData.address = JSON.stringify(this.address);
        this.registrationFormData.birthday = JSON.stringify(this.model);
        if(this.enableUpdate){
            this.addressBookService.updateUserInfo(this.registrationFormData)
                .subscribe(data => {
                    this.message = data['message'];
                    this.registered = true;
                })
        } else {
            this.addressBookService.createUserAddress(this.registrationFormData)
                .subscribe(data => {
                    this.message = data['message'];
                    this.registered = true;
                })
        }
    }

}
