import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AddressBookComponent } from './components/address-book/address-book.component';
import { AddUserAddressComponent } from './components/add-user-address/add-user-address.component';

import { TransformAddressPipe } from './pipes/transform-address';
import { TransformDatePipe } from './pipes/transform-date';

@NgModule({
    declarations: [
        AppComponent,
        AddressBookComponent,
        AddUserAddressComponent,
        TransformAddressPipe,
        TransformDatePipe
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
