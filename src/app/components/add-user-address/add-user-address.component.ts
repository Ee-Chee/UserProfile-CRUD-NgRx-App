import { Component, OnInit, Injectable } from '@angular/core';
import { NgbCalendar, NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

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
    registrationFailed = false;
    errorMessage = '';
    model: NgbDateStruct;
    minDate: NgbDateStruct;
    maxDate: NgbDateStruct;
    address = <Address>{};

    constructor(private ngbCalendar: NgbCalendar) { }

    ngOnInit() {
        this.maxDate = this.ngbCalendar.getToday();
        this.minDate = { year: (this.maxDate.year - 120), month:1, day: 1} //set 120-year range
    }

    onSubmit() {
        console.log("hey", this.model);
    }

}
