export enum AppActionType {
  FETCH_DATA = 'FETCH_DATA',
  FETCH_DATA_START = 'FETCH_DATA_START',
}

export interface FetchDataAction {
  type: AppActionType.FETCH_DATA;
}

/** FETCH_DATA begins a fetch of important data
 *
 *  If we have required authentication, FETCH_DATA_START is dispatched
 *
 *  See {@link fetchDataEpic} for the authentication check
 */

export const fetchData = (): FetchDataAction => ({
  type: AppActionType.FETCH_DATA,
});

export interface FetchDataStartAction {
  type: AppActionType.FETCH_DATA_START;
}

export const fetchDataStart = (): FetchDataStartAction => ({
  type: AppActionType.FETCH_DATA_START,
});

export type AppAction = FetchDataAction | FetchDataStartAction;
