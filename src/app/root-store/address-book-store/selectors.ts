import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { UserAddress } from '../../interfaces/address-interfaces';
import { addressBookAdapter, State } from './state';

//not yet selectors, getting materials
export const getError = (state: State): any => {
    return state.error; //dont forget to 'return' when console.log is needed. Originally was arrow function without 'return'
}

export const getIsLoading = (state: State): boolean => {
    return state.isLoading;
}

////////////////////////////////////////////////////////
//featured state
export const selectAddressBookState: MemoizedSelector<object, State> = createFeatureSelector<State>('addressBook');

//featured items
export const selectAllUserAddresses: (state: State) => 
    UserAddress[] = addressBookAdapter.getSelectors(selectAddressBookState).selectAll;
////////////////////////////////////////////////////////

//customize/create desired selectors
export const selectUserAddressById = (id: any) =>
    createSelector(selectAllUserAddresses, (userAddresses: UserAddress[]) => {
        let foundUserAddress: UserAddress = userAddresses.find(p => p.id == id);
        //if id not found
        if(foundUserAddress === undefined) {
            return null; //handle invalid id input, non-existing id, empty data array during data retrieving process and zero-registered-user array
            //Address and form data are initialized as empty object in add-user-address component. 
        } else { //handle valid, found id and rerendering as data retrieved in store
            return foundUserAddress;
        }
});

export const selectRequestError: MemoizedSelector<object, any> = createSelector(
    selectAddressBookState,
    getError
);

export const selectRequetIsLoading: MemoizedSelector<object,boolean> = createSelector(
    selectAddressBookState, 
    getIsLoading
);