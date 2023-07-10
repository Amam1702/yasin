import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

import PageLoader from '../PageLoader';


import { toast } from 'react-toastify';
import axios from 'axios';

const ListAttendants = () => {
    const [records, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  
    const columns = [
      { name: 'Attendant ID', key: 'atdt_id' },
      { name: 'First Name', key: 'first_name' },
      { name: 'Last Name', key: 'last_name' },
      { name: 'Employee Id', key: 'employee_id' },
      { name: 'Location Id', key: 'location_id' },
      { name: 'Vouchers', key: 'vouchers' },
      { name: 'Profile', key: 'profile' },
    ];
    const fetchAttendants = async () => {
        try {
            setLoading(true);
            const headers = {
                'Content-Type': 'application/json',
                Authorization: 'Token '+localStorage.getItem("token"),
            };
            const response = await axios.get('attendants/', { headers });
            setData(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };
    
    const deleteAttendant = (voucher_id) => {
     
      Swal.fire({
        title: 'Are you sure to delete?',
        text: 'This action cannot be undone.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
            const headers = {
              'Content-Type': 'application/json',
              Authorization: 'Token '+localStorage.getItem("token"),
            };
              setLoading(true);
              axios
              .delete('attendants/'+voucher_id+'/', { headers })
              .then((response) => {
               
                var res = response.data;
                console.log(res);
                if(res.status == 'Attendant Deleted'){
                    toast.success('Voucher deleted successfully');
                    fetchAttendants();
                }else{
                  toast.error('Something went wrong');
                }
              })
              .catch((error) => {
                setLoading(false);
                console.error('Error saving form data:', error);
              });
        }
      });
    }
    useEffect(() => {
        fetchAttendants();
    }, []);
  return (
    <div className="p-3">
      {loading &&<PageLoader />}
      <section className="content">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-3 offset-md-9 text-right">
                <Link to="/attendants/create" className='btn btn-primary'><i className='fa fa-plus'></i> Add New</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <fieldset className='form-fieldset'>
            <legend className="pl-0">Attendants</legend>
            <div className="records-list mt-3">
              {/* <DataGrid columns={columns} rows={data} /> */}
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                        <th className="text-nowrap">Attendant ID</th>
                        <th className="text-nowrap">First Name</th>
                        <th className="text-nowrap">Last Name</th>
                        <th className="text-nowrap">Employee</th>
                        <th className="text-nowrap">Location</th>
                        <th className="text-nowrap">Vouchers</th>
                        <th className="text-nowrap">Profile</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {records ? (records.map((item) => (
                    <tr key={item.atdt_id}>
                        <td>{item.atdt_id}</td>
                        <td>{item.first_name}</td>
                        <td>{item.last_name}</td>
                        <td className="text-nowrap">{item.employee_id}</td>
                        <td className="text-nowrap">{item.location_id}</td>
                        <td className="text-nowrap">{item.vouchers}</td>
                        <td>{item.profile}</td>
                        <td>
                            <div className="btn-group">
                                <Link to={`/attendants/edit/${item.atdt_id}`} className="btn btn-warning btn-sm mr-2"><i className="fa fa-edit"></i></Link>
                                <button onClick={() => deleteAttendant(item.atdt_id)} type='button' className="btn btn-danger btn-sm"><i className="fa fa-trash"></i></button>
                            </div>
                        </td>
                    </tr>
                    ))
                    ):(<tr>
                      <td colSpan="8">
                        <div className='text-center'><i className='fa fa-spin fa-spinner'></i> Fetching records...</div>
                      </td>
                    </tr>)}
                    </tbody>
                </table>
            </div>      
          </fieldset>
        </div>
      </section>
    </div>
  );
};

export default ListAttendants;