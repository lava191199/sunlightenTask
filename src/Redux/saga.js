import * as types from "./actionType";
import { all, fork, put, call, takeLeading, take } from "redux-saga/effects";
import axios from 'axios';
import { getDataResponse } from "./actions";

function* getData() {
    let totalDataResponse;
    try {
        const apiFetch = async () => { return await axios.get("https://data.covid19india.org/state_district_wise.json") };
        const response = yield call(apiFetch);
        console.log("Response", response);

        if (response && response?.status === 200) {
            let totalData = Object.entries(response?.data)?.map((item, index) => {
                return {
                    state: item[0],
                    district:Object.entries(item[1]?.districtData)?.map((x,ind) => {
                        return{
                            districtData:x[1],
                            districtName: x[0]
                        }
                    })
                }
            });
            totalDataResponse =  totalData?.length !==0 && totalData?.map((item,index) =>{
                return{
                    ...item,
                    stateActive: Math.max(...item?.district?.map((v) => v?.districtData?.active)),
                    stateConfirmed:Math.max(...item?.district?.map((v) => v?.districtData?.confirmed)),
                    stateDeceased:Math.max(...item?.district?.map((v) => v?.districtData?.deceased)),
                    stateRecovred:Math.max(...item?.district?.map((v) => v?.districtData?.recovered)),
                }
            })

            console.log("asdsfdf", totalDataResponse);
        }
    } catch (error) {
        console.log("ERROR_Part=>", error);
    }
    console.log("Final_response_data", totalDataResponse);
    yield put(getDataResponse(totalDataResponse))
}


export function* taskWatcher() {
    yield takeLeading(types.GET_DATA_REQUEST, getData)
}

function* taskSaga() {
    yield all([fork(taskWatcher)]);
}
export default taskSaga;