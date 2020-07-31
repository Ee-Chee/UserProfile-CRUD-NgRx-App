import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export interface UserAddress {
    id?: number;
    firstname: string;
    lastname: string;
    gender: string;
    birthday: NgbDateStruct;
    address: Address;
}

export interface Address {
    street: string;
    number: number;
    postcode: string;
    city: string;
}