import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserAddress } from '../interfaces/address-interfaces';

const baseUrl = 'http://localhost:8082/api/address-book';

@Injectable({
    providedIn: 'root'
})

export class AddressBookService {

    constructor(private http: HttpClient) {}

    createUserAddress(data) {
        return this.http.post(`${baseUrl}/registration`, data);
    }

    getUserAddresses() {
        return this.http.get<UserAddress[]>(`${baseUrl}/user-addresses`);
    }

    updateUserInfo(data) {
        return this.http.post(`${baseUrl}/update-details`, data);
    }

    search(keyword) {
        return this.http.get<UserAddress[]>(`${baseUrl}/user-addresses?search=${keyword}`);
    }
}
