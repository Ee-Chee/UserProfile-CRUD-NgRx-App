import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core'; 

import { AddressBookStoreState, AddressBookStoreActions, AddressBookStoreSelectors } from './root-store';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
    error$: Observable<string>;
    isLoading$: Observable<boolean>;

    toggleLanguage: boolean = true;

    constructor( private translate: TranslateService, private store$: Store<AddressBookStoreState.State> ) {
        translate.setDefaultLang('en');
        localStorage.setItem('locale', 'en');
    }

    ngOnInit() {
        this.store$.dispatch(
            new AddressBookStoreActions.RequestAddressAction()
        );

        this.error$ = this.store$.select(
            AddressBookStoreSelectors.selectRequestError
        );
      
        this.isLoading$ = this.store$.select(
            AddressBookStoreSelectors.selectRequetIsLoading
        );
    }

    useLanguage(language: string) {
        this.translate.use(language);
        localStorage.setItem('locale', language);
        this.toggleLanguage = !this.toggleLanguage;
    }
}

// https://www.codeandweb.com/babeledit/tutorials/how-to-translate-your-angular8-app-with-ngx-translate