import React, {  useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actionType } from '../Redux/actions';
import {  Table } from 'reactstrap';


function Districts() {
    const dispatch = useDispatch();
    const state = useSelector(state => state.stateName);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState(false);
    const filteredData = state?.district?.length !== 0 && search?.length !== 0 ? state?.district?.filter((item, index) => item?.districtName?.toLowerCase().startsWith(search?.toLowerCase())) : state?.district;
    const sortData = sort ?  [...filteredData]?.sort((a,b) => b?.districtData?.active- a?.districtData?.active) : filteredData;

    return (
        <div>
            <input type='text' className='search' placeholder='Search District Name' value={search} onChange={(e) => setSearch(e.target.value)} />
            <button onClick={() => setSort(!sort)} > {!sort ? "Sort Cases" : " Unsort cases"}</button>
            <button onClick={()=>dispatch(actionType(null,"State"))}>Back</button>
            {search?.length === 0 && filteredData?.length === 0 && "No Data To Display"}
            {search?.length !== 0 && filteredData?.length === 0 && "No Search Data To Display"}
            {filteredData !== 0 && <Table className="auditTable" responsive borderless hover>
                <thead>
                    <tr>
                        <th> District </th>
                        <th>Active Cases </th>
                        <th>Recovered Cases </th>
                        <th>Confirmed Cases </th>
                        <th>Deceased Cases </th>

                    </tr>
                </thead>
                <tbody>
                    {sortData?.map((x, index) => {
                        return (
                            <tr key={x?.districtName} >
                                <td>{x?.districtName || '-'}</td>
                                <td>{x?.districtData?.active || '-'}</td>
                                <td>{x?.districtData?.recovered || '-'}</td>
                                <td>{x?.districtData?.confirmed || '-'}</td>
                                <td>{x?.districtData?.deceased || '-'}</td>
                            </tr>
                        )
                    })}
                </tbody>

            </Table>}
        </div>
    )
}

export default Districts