import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AddressBookComponent } from './components/address-book/address-book.component';
import { AddUserAddressComponent } from './components/add-user-address/add-user-address.component';
import { UserAddressDetailsComponent } from './components/user-address-details/user-address-details.component';

import { ReformatDatePipe } from './pipes/date-reformatting';

@NgModule({
    declarations: [
        AppComponent,
        AddressBookComponent,
        AddUserAddressComponent,
        UserAddressDetailsComponent,
        ReformatDatePipe
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        NgbModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
