import React, {Fragment, useContext} from "react";
import StateContext from "../../../context/StateContext";
const AdsTable = ({data , action})=>{
    console.log(data, action)
    const allAds =data.length > 0?(data.map((d,i)=> {
            return(<tr key={i}>
                    <td>{i + 1}</td>
                    <td>{d.name} </td>
                    <td> <button onClick={()=>action(d._id)}>
                        del
                    </button></td>
                </tr>
            )
    })): (
    <tr>
        <td>-</td>
        <td>- </td>
        <td>-</td>
    </tr>
    );
    return(
        <Fragment>
            <table>
                <thead>
                <tr>
                    <td>N0</td>
                    <td>Name</td>
                    <td>Actions</td>
                </tr>
                </thead>
                <tbody>
                {allAds}
                </tbody>
            </table>
        </Fragment>
    )
}
export default AdsTable;