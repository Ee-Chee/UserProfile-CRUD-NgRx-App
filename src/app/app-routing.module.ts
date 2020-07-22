import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddressBookComponent } from './components/address-book/address-book.component';
import { AddUserAddressComponent } from './components/add-user-address/add-user-address.component';

const routes: Routes = [
    { path: '', component: AddressBookComponent},
    { path: 'add', component: AddUserAddressComponent},
    { path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
