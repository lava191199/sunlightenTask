import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { State } from './states'
import { getDataRequest } from '../Redux/actions';
import Districts from './Districts';

function Parent() {
    const dispatch = useDispatch();
    const type = useSelector(state => state?.type) || "State";
    useEffect(() => {
        dispatch(getDataRequest())
    }, []);
    return (
        <div>
            {type === "District" ? <Districts /> : <State />}
        </div>
    )
}

export default Parent