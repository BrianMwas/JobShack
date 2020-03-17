import { createAction, props } from "@ngrx/store";
import { Company } from 'src/app/shared/models/company';


export enum CompanyActionTypes {
    LOAD_COMPANY = '[COMPANY] Loading Company',
    LOAD_COMPANY_SUCCESS = '[COMPANY] Company Loaded',
    LOAD_COMPANY_FAILED = '[COMPANY] Load Company failed',

    CREATE_COMPANY_LOADING = '[COMPANY] Creating Company',
    CREATE_COMPANY_SUCCESSFUL = '[COMPANY] Create Company Success',
    CREATE_COMPANY_FAILED = '[COMPANY] Create Company Failed',

    UPDATE_COMPANY_LOADING = '[COMPANY] Updating Company',
    UPDATE_COMPANY_SUCCESSFUL = '[COMPANY] Update Company Successful',
    UPDATE_COMPANY_FAIL = '[COMPANY] Update Company failed'
}

export const loadingCompany = createAction(CompanyActionTypes.CREATE_COMPANY_LOADING);
export const loadedCompany = createAction(CompanyActionTypes.LOAD_COMPANY_SUCCESS, props<{ payload: Company }>());
export const loadCompanyFailed = createAction(CompanyActionTypes.LOAD_COMPANY_FAILED, (error_message: "Sorry Company not Loaded") => ({ payload: { error_message } }));


export const creatingCompany = createAction(CompanyActionTypes.CREATE_COMPANY_LOADING);
export const createdCompany = createAction(CompanyActionTypes.CREATE_COMPANY_SUCCESSFUL, props<{ company: Company }>());
export const createCompanyFail = createAction(CompanyActionTypes.CREATE_COMPANY_FAILED, (error_message: "Company Creation failed") => ({ payload: { error_message } }));

export const updatingCompany = createAction(CompanyActionTypes.UPDATE_COMPANY_LOADING);
export const companyUpdated = createAction(CompanyActionTypes.UPDATE_COMPANY_SUCCESSFUL, props<{ payload: Company }>());
export const companyUpdateFailed = createAction(CompanyActionTypes.UPDATE_COMPANY_FAIL, props<{ error: string }>());