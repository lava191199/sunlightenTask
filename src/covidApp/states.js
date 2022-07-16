import React, {  useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actionType } from '../Redux/actions';
import {  Table } from 'reactstrap';


export const State = () => {
  const dispatch = useDispatch();
  const [sort,setSort] = useState(false);
  const [search, setSearch] = useState('');
  const totalData = useSelector(state => state.totalData) || [];

  const filteredData = totalData?.length !== 0 && search?.length !== 0 ? totalData?.filter((item, index) => item?.state?.toLowerCase().startsWith(search?.toLowerCase())) : totalData;
  const sortData = sort ?  [...filteredData]?.sort((a,b) => b?.stateActive- a?.stateActive) : filteredData;

  const onClickFunc = (state) => {
    dispatch(actionType(state, "District"))
  };
  return (
    <div>
      <input type='text' className='search' placeholder='Search State Name' value={search} onChange={(e) => setSearch(e.target.value)} />
      <button onClick={()=>setSort(!sort)} > {!sort ?"Sort Cases":" Unsort cases" }</button>
      <br />
      {search?.length === 0 && filteredData?.length === 0 && "No Data To Display"}
      {search?.length !== 0 && filteredData?.length === 0 && "No Search Data To Display"}
      {filteredData?.length !== 0 && <Table className="auditTable" responsive borderless hover>
        <thead>
          <tr>
            <th> State </th>
            <th >Active Cases </th>
            <th>Recovered Cases </th>
            <th>Confirmed Cases </th>
            <th>Deceased Cases </th>

          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 && sortData?.map((x, index) => {
            return (
              <tr key={x?.state} onClick={() => onClickFunc(x)}>
                <td>{x?.state || '-'}</td>
                <td>{x?.stateActive || '-'}</td>
                <td>{x?.stateRecovred || '-'}</td>
                <td>{x?.stateConfirmed || '-'}</td>
                <td>{x?.stateDeceased || '-'}</td>
              </tr>
            )
          })}
        </tbody>

      </Table>}
    </div>
  )
}
