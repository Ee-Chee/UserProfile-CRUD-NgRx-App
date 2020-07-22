import { Component, OnInit } from '@angular/core';
import { AddressBookService } from 'src/app/services/address-book.service';
import { UserAddress } from '../../interfaces/address-interfaces';

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.css']
})
export class AddressBookComponent implements OnInit {
    userAddresses: UserAddress[];

    constructor( private addressBookService: AddressBookService ) {}

    ngOnInit() {
        this.addressBookService.getUserAddress().subscribe(
            data => {
                console.log("test1", data);
            }
        )
    }

}
