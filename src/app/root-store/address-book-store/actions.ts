import { Action } from '@ngrx/store';
import { UserAddress } from '../../interfaces/address-interfaces';

export enum ActionTypes {
    LOAD_REQUEST = '[Address Book] Load Request',
    REQUEST_FAILURE = '[Address Book] Request Failure',
    REQUEST_SUCCESS = '[Address Book] Request Success',
    UPDATE_INFO = '[Address Book] Update Info',
    UPDATE_SUCCESS = '[Address Book] Update Success',
    CREATE_USER = '[Address Book] Create User',
    CREATE_SUCCESS = '[Address Book] Create Success',
}

export class RequestAddressAction implements Action {
    readonly type = ActionTypes.LOAD_REQUEST;
}

export class RequestFailureAction implements Action {
    readonly type = ActionTypes.REQUEST_FAILURE;
    constructor(public payload: { error: string }) {}
}

export class RequestSuccessAction implements Action {
    readonly type = ActionTypes.REQUEST_SUCCESS;
    constructor(public payload: { items: UserAddress[] }) {}
}

export class UpdateInfoAction implements Action {
    readonly type = ActionTypes.UPDATE_INFO;
    constructor(public payload: { addressInfo: UserAddress}) {}
}

export class UpdateSuccessAction implements Action {
    readonly type = ActionTypes.UPDATE_SUCCESS;
    constructor(public payload: { item: UserAddress }) {}
}

export class CreateUserAction implements Action {
    readonly type = ActionTypes.CREATE_USER;
    constructor(public payload: { addressInfo: UserAddress}) {}
}

export class CreateSuccessAction implements Action {
    readonly type = ActionTypes.CREATE_SUCCESS;
    constructor(public payload: { item: UserAddress}) {}
}

export type Actions = 
RequestAddressAction | RequestFailureAction | RequestSuccessAction | UpdateInfoAction | UpdateSuccessAction | CreateUserAction | CreateSuccessAction;