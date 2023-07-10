import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
// import 'react-data-grid/lib/styles.css';
// import DataGrid from 'react-data-grid';


import { toast } from 'react-toastify';
import axios from 'axios';

const ListStations = () => {
    const [records, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  
    const columns = [
      { name: 'Station ID', key: 'station_id' },
      { name: 'Location', key: 'location' },
      { name: 'Station Name', key: 'station_name' },
      { name: 'Email', key: 'email' },
      { name: 'Phone', key: 'phone' },
      { name: 'Fuel Type', key: 'fuel_type' },
      { name: 'Operated Hours', key: 'operated_hours' },
      { name: 'Created Time', key: 'created_time' },
    ];
    const fetchStations = async () => {
        try {

          setLoading(true);
            const headers = {
                'Content-Type': 'application/json',
                Authorization: 'Token '+localStorage.getItem("token"),
            };
            const response = await axios.get('stations/', { headers });
            console.log(response.data);
            setData(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };
    const deleteStation = (station_id) => {
      Swal.fire({
        title: 'Are you sure to delete?',
        text: 'This action cannot be undone.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          setLoading(true);
            const headers = {
              'Content-Type': 'application/json',
              Authorization: 'Token '+localStorage.getItem("token"),
            };
              axios
              .delete('station/'+station_id+'/', { headers })
              .then((response) => {
                var res = response.data;
                console.log(res);
                if(res.status == 'User Deleted'){
                    toast.success('Station deleted successfully');
                    fetchStations();
                }else{
                  toast.error('Something went wrong');
                }
              })
      
              .catch((error) => {
                // Handle any errors
                setLoading(false);
                console.error('Error saving form data:', error);
              });
        } 
      });
    }
    useEffect(() => {
        fetchStations();
    }, []);
  return (
    <div className="p-3">
      <section className="content">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-3 offset-md-9 text-right">
                <Link to="/stations/create" className='btn btn-primary'><i className='fa fa-plus'></i> Add New</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <fieldset className='form-fieldset'>
            <legend className="pl-0">Stations</legend>
            <div className="records-list mt-3">
              {/* <DataGrid columns={columns} rows={data} /> */}
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                        <th className="text-nowrap">Station ID</th>
                        <th className="text-nowrap">Location</th>
                        <th className="text-nowrap">Station Name</th>
                        <th className="text-nowrap">Email</th>
                        <th className="text-nowrap">Phone Number</th>
                        <th className="text-nowrap">Fuel Type</th>
                        <th className="text-nowrap">Operated Hours</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {records ? (records.map((item) => (
                    <tr key={item.station_id}>
                        <td>{item.station_id}</td>
                        <td>{item.location}</td>
                        <td>{item.station_name}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.fuel_type}</td>
                        <td>{item.operated_hours}</td>
                        <td>
                            <div className="btn-group">
                                <Link to={`/stations/edit/${item.station_id}`} className="btn btn-warning btn-sm mr-2"><i className="fa fa-edit"></i></Link>
                                <button onClick={() => deleteStation(item.station_id)} type='button' className="btn btn-danger btn-sm"><i className="fa fa-trash"></i></button>
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

export default ListStations;