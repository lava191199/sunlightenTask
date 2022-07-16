import { ACTION_TYPE, GET_DATA_RESPONSE } from "./actionType";


const initialState = {
    totalData: [],
    type: "",
    stateName:''
}

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DATA_RESPONSE:
            return {
                ...state,
                totalData: action?.payload

            }
            case ACTION_TYPE:
                return{
                    ...state,
                    type:action?.payload?.type,
                    stateName:action?.payload?.stateName,
                }
        default:
            return state
    }

}

export default taskReducer