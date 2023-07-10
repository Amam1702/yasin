import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import 'react-data-grid/lib/styles.css';
import DataGrid from 'react-data-grid';
import PageLoader from '../PageLoader';

import { toast } from 'react-toastify';
import axios from 'axios';

const ListClients = () => {
    const [records, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [apiCalled, setApiCalled] = useState(false);

  
    const columns = [
      { name: 'Client ID', key: 'client_id' },
      { name: 'Client Name', key: 'client_ame' },
      { name: 'Contact Name', key: 'contact_name' },
      { name: 'Last Order Date', key: 'last_order_number' },
      { name: 'Last Order Amount', key: 'last_order_amount' },
    ];
    const fetchClients = async () => {
        try {
            setLoading(true);
            const headers = {
                'Content-Type': 'application/json',
                Authorization: 'Token '+localStorage.getItem("token"),
            };
            const response = await axios.get('clients/', { headers });
            console.log(response.data);
            setData(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };
    const deleteClient = (client_id) => {
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
              .delete('client/'+client_id+'/', { headers })
              .then((response) => {
                var res = response.data;
                console.log(res);
                if(res.status == 'Client Deleted'){
                    toast.success('Client deleted successfully');
                    fetchClients();
                }else{
                  toast.error('Something went wrong');
                }
              })
      
              .catch((error) => {
                // Handle any errors
                console.error('Error saving form data:', error);
              });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // User clicked "No" or closed the dialog
          Swal.fire('Cancelled', 'Your action was cancelled.', 'error');
        }
      });
    }
    useEffect(() => {
        fetchClients();
    }, []);
  return (
    <div className="p-3">
      {loading &&<PageLoader />}
      <section className="content">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-3 offset-md-9 text-right">
                <Link to="/clients/create" className='btn btn-primary'><i className='fa fa-plus'></i> Add New</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <fieldset className='form-fieldset'>
            <legend className="pl-0">Clients</legend>
            <div className="records-list mt-3">
              {/* <DataGrid columns={columns} rows={data} /> */}
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                        <th className="text-nowrap">Client ID</th>
                        <th className="text-nowrap">Client Name</th>
                        <th className="text-nowrap">Contact Name</th>
                        <th className="text-nowrap">Contact Number</th>
                        <th className="text-nowrap">Last Order Date</th>
                        <th className="text-nowrap">Last Order Amount</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {records ? (records.map((item) => (
                    <tr key={item.client_id}>
                        <td>{item.client_id}</td>
                        <td>{item.client_name}</td>
                        <td>{item.contact_name}</td>
                        <td>{item.contact_no}</td>
                        <td>{item.last_order_date}</td>
                        <td>{item.last_order_amount}</td>
                        <td>
                            <div className="btn-group">
                                <Link to={`/clients/edit/${item.client_id}`} className="btn btn-warning btn-sm mr-2"><i className="fa fa-edit"></i></Link>
                                <button onClick={() => deleteClient(item.client_id)} type='button' className="btn btn-danger btn-sm"><i className="fa fa-trash"></i></button>
                            </div>
                        </td>
                    </tr>
                    ))
                    ):(<tr>
                      <td colSpan="7">
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

export default ListClients;