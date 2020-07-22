export interface UserAddress {
    id?: number;
    firstname: string;
    lastname: string;
    gender: string;
    birthday: string;
    address: Address;
}

export interface Address {
    street: string;
    number: number;
    postcode: string;
    city: string;
}