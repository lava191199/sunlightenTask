import * as types from './actionType'
export const getDataRequest = () =>{
    return{
        type: types.GET_DATA_REQUEST
    }
}

export const getDataResponse = (data) =>{
    return{
        type: types.GET_DATA_RESPONSE,
        payload: data
    }
}
export const actionType = (stateName,type) =>{
    return{
        type: types.ACTION_TYPE,
        payload: {stateName,type}
    }
}