import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { AddressBookService } from 'src/app/services/address-book.service';
import { UserAddress } from '../../interfaces/address-interfaces';
import { AddressBookStoreState, AddressBookStoreSelectors } from '../../root-store';

@Component({
    selector: 'app-address-book',
    templateUrl: './address-book.component.html',
    styleUrls: ['./address-book.component.css']
})

export class AddressBookComponent implements OnInit {
    userAddresses$: Observable<UserAddress[]>;

    userAddresses: UserAddress[];
    searchKeyword: string = '';
    page = 1;
    pageSize = 5;

    constructor( private addressBookService: AddressBookService, private router: Router, private store$: Store<AddressBookStoreState.State> ) {}

    ngOnInit() {
        this.userAddresses$ = this.store$.select(
            AddressBookStoreSelectors.selectAllUserAddresses
        );
    }

    search() {
        this.addressBookService.search(this.searchKeyword).subscribe(
            data => {
                this.userAddresses = data;
                this.userAddresses.sort(function(a:UserAddress, b:UserAddress) {
                    return a.id - b.id;
                });
                this.userAddresses$ = of(this.userAddresses);
            }
        )
    }

    navigateDetailedUserPage(userId) {
        this.router.navigateByUrl(`/person/${userId}`)
    }

}

// some useful knowledge on passing data between routes:
// https://www.tektutorialshub.com/angular/angular-pass-data-to-route/
// https://stackoverflow.com/questions/38062702/how-to-pass-a-parameter-to-routerlink-that-is-somewhere-inside-the-url
// https://stackoverflow.com/questions/45025334/how-to-use-router-navigatebyurl-and-router-navigate-in-angular
