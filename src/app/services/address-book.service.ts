import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:8082/api/address-book';

@Injectable({
    providedIn: 'root'
})

export class AddressBookService {

    constructor(private http: HttpClient) {}

    getUserAddress(){
        return this.http.get(`${baseUrl}/user-address`);
    }
}
