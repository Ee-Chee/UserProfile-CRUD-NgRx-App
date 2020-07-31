import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import { AddressBookService } from '../../services/address-book.service';
import * as featureActions from './actions';

@Injectable()
export class AddressBookStoreEffects {

    constructor(private addressBookService: AddressBookService, private actions$: Actions) {}

    @Effect()
    loadRequestEffect$: Observable<Action> = this.actions$.pipe(
        ofType<featureActions.RequestAddressAction>(featureActions.ActionTypes.LOAD_REQUEST),
        startWith(new featureActions.RequestAddressAction()),
        switchMap(() =>
            this.addressBookService.getUserAddresses().pipe(
                map(items =>
                    new featureActions.RequestSuccessAction({items})
                ),
                catchError(error => {
                    // console.log("error", error);
                    return observableOf(new featureActions.RequestFailureAction({error}));
                }
                    
                )
            )
        )
    );
            
    @Effect()
    updateInfoEffect$: Observable<Action> = this.actions$.pipe(
        ofType<featureActions.UpdateInfoAction>(featureActions.ActionTypes.UPDATE_INFO),
        switchMap(action =>
            this.addressBookService.updateUserInfo(action.payload.addressInfo).pipe(
                map((item:any) => {
                    return new featureActions.UpdateSuccessAction({item: item[1]})
                }),
                catchError(error =>
                    observableOf(new featureActions.RequestFailureAction({error}))
                )
            )
        )
    );

    @Effect()
    createUserEffect$: Observable<Action> = this.actions$.pipe(
        ofType<featureActions.CreateUserAction>(featureActions.ActionTypes.CREATE_USER),
        switchMap(action =>
            this.addressBookService.createUserAddress(action.payload.addressInfo).pipe(
                map((item:any) => {
                    return new featureActions.CreateSuccessAction({item})
                }),
                catchError(error =>
                    observableOf(new featureActions.RequestFailureAction({error}))
                )
            )
        )
    );
}