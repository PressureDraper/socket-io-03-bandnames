import React from 'react'

export const BandList = () => {
    
    const createRows = () => {
        return (
            <tr>
                <td>
                    <button className='btn btn-primary'> + 1</button>
                </td>
                <td>
                    <input type="text" className='form-control' />
                </td>
                <td> <h3> 15 </h3> </td>
                <td> <button className="btn btn-danger"> Delete </button> </td>
            </tr>
        )
    }

  return (
    <>
        <table className='table table-stripped'>
            <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Votes</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                { createRows() }
            </tbody>
        </table>
    </>
  )
}
