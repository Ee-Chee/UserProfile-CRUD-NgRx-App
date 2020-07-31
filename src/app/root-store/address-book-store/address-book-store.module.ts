import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AddressBookStoreEffects } from './effects';
import { addressBookReducer } from './reducer';
//improt eventlisteners => effects and reducers
@NgModule({
    imports: [
      CommonModule,
      StoreModule.forFeature('addressBook', addressBookReducer),
      EffectsModule.forFeature([AddressBookStoreEffects])
    ],
    providers: [AddressBookStoreEffects]
  })
  export class AddressBookStoreModule {}
