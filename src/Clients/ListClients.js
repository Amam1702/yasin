import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { toast } from 'react-toastify';
import axios from 'axios';

import PageLoader from '../PageLoader';
const ListClients = () => {

    const [records, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const pageSize = 10; 
    const columns = [
      { headerName: 'Client ID', field: 'client_id', width: 160,  },
      { headerName: 'Client Name', field: 'client_name', width: 160  },
      { headerName: 'Contact Name', field: 'contact_name', width: 160  },
      { headerName: 'Last Order Date', field: 'last_order_number', width: 160  },
      { headerName: 'Last Order Amount', field: 'last_order_amount', width: 160  },
      {
        field: 'actions',
        headerName: 'Actions',
        width: 160,
        sortable: false,
        renderCell: (params) => {
          return (
            <div className='btn-group'>
              <Link to={`/clients/edit/${params.row.client_id}`} className="btn btn-warning btn-sm mr-2"><i className="fa fa-edit"></i></Link>
              <button onClick={() => deleteClient(params.row.client_id)} type='button' className="btn btn-danger btn-sm"><i className="fa fa-trash"></i></button>
            </div>
          );
        },
      },
    ];
    const getRowId = (row) => row.client_id;
    const fetchClients = async () => {
        try {
            setLoading(true);
            const headers = {
                'Content-Type': 'application/json',
                Authorization: 'Token '+localStorage.getItem("token"),
            };
            const response = await axios.get('clients/', { headers });
            let results = response.data;
            setData(results);
            setLoading(false);

        } catch (error) {
            setLoading(false);
            toast.error("Something went wrong");
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
              if(res.status === 'Client Deleted'){
                  toast.success('Client deleted successfully');
                  fetchClients();
              }else{
                toast.error('Something went wrong');
              }
            })
            .catch((error) => {
              setLoading(false);
              toast.error("Something went wrong");
            });
        }
      });
    }
    useEffect(() => {
      window.addEventListener('error', e => {
        if (e.message === 'ResizeObserver loop limit exceeded' || e.message === 'Script error.') {
          const resizeObserverErrDiv = document.getElementById(
            'webpack-dev-server-client-overlay-div'
          )
          const resizeObserverErr = document.getElementById(
            'webpack-dev-server-client-overlay'
          )
          if (resizeObserverErr) {
            resizeObserverErr.setAttribute('style', 'display: none');
          }
          if (resizeObserverErrDiv) {
            resizeObserverErrDiv.setAttribute('style', 'display: none');
          }
        }
      })
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
            <div className="records-list mt-3" style={{ height: 400, width: '100%' }}>
            <Box sx={{ width: '100%' }}>
            <DataGrid
              rows={records}
              columns={columns}
              getRowId={getRowId}
              pageSize={pageSize}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[10,20,50,100]}
              disableRowSelectionOnClick
       
            />
            </Box>
            </div>      
          </fieldset>
        </div>
      </section>
    </div>
  );
};

export default ListClients;