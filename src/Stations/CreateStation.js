import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { toast } from 'react-toastify';
import axios from 'axios';

import PageLoader from '../PageLoader';

const CreateStation = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // station_id: '',
    location: '',
    station_name: '',
    email:'',
    phone:'',
    fuel_type:'',
    operated_hours:'',
  });
  const [formErrors, setFormErrors] = useState({
    // station_id: '',
    location: '',
    station_name: '',
    email:'',
    phone:'',
    fuel_type:'',
    operated_hours:'',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { location, station_name,email,phone,fuel_type,operated_hours } = formData;
    const errors = {};
   
    // if (station_id.trim() === '') {
    //   errors.station_id = 'This fields is required';
    // }
    if (location.trim() === '') {
      errors.location = 'This fields is required';
    }
    if (station_name.trim() === '') {
      errors.station_name = 'This fields is required';
    }
    if (email.trim() === '') {
      errors.email = 'This fields is required';
    }
    if (phone.trim() === '') {
      errors.phone = 'This fields is required';
    }
    if (fuel_type.trim() === '') {
      errors.fuel_type = 'This fields is required';
    }
    if (operated_hours.trim() === '') {
      errors.operated_hours = 'This fields is required';
    }
  
  
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
        var postData = [formData] ;
        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Token '+localStorage.getItem("token"),
        };
        setLoading(true);
        axios
        .post('createStation/', {
          data:postData
        }, { headers })
        .then((response) => {
          console.log(response.data);
          var data = response.data;
          console.log(data);
          if(data[0] !== undefined){
            var is_created = false;
            Object.keys(data).forEach(function(k) {
              var itemData = data[k];
              Object.keys(data[k]).forEach(function(key) {
                if(itemData[key] == "Station Created"){
                  is_created = true;
                }
              })
            });
            if(is_created){
               toast.success('Record submitted successfully');
               navigate("/stations");
            }else{
              setLoading(false);
              const errors = {};
              Object.keys(data).forEach(function(k) {
                var itemData = data[k];
                Object.keys(data[k]).forEach(function(key) {
                  console.log(itemData[key]);
                  Object.keys(itemData[key]).forEach(function(key2) {
                    console.log(key2,itemData[key][key2]);
                    if(errors[key2] === undefined){
                      errors[key2] = itemData[key][key2]+",";
                    }else{
                      errors[key2] += itemData[key][key2]+",";
                    }
                  })
                })
              });
              setFormErrors(errors);
            }
          }
          
        })

        .catch((error) => {
          // Handle any errors
          setLoading(false);
          console.error('Error saving form data:', error);
        });
    }
  };
  return (
    <div className="p-3">
      {loading &&<PageLoader />}
      <section className="content">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-3 offset-md-9 text-right">
                <Link to="/clients" className='btn btn-primary'><i className='fa fa-angle-left'></i> Back</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <fieldset className='form-fieldset'>
            <legend className="pl-0">New Station</legend>
              <form className="p-3 form-area" onSubmit={handleSubmit}>
                <div className="row">
                    {/* <div className="col-md-6">
                        <div className='form-group'>
                          <label htmlFor="name">Client Number</label>
                          <input
                            className='form-control'
                            type="text"
                            id="station_id"
                            name="station_id"
                            value={formData.station_id}
                            onChange={handleChange}
                          />
                          {formErrors.station_id && <span className="text-danger error">{formErrors.station_id}</span>}
                        </div>
                    </div> */}
                    <div className="col-md-6">
                        <div className='form-group'>
                          <label htmlFor="name">Location</label>
                          <input
                            className='form-control'
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                          />
                          {formErrors.location && <span className="text-danger error">{formErrors.location}</span>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className='form-group'>
                          <label htmlFor="name">Station Name</label>
                          <input
                            className='form-control'
                            type="text"
                            id="station_name"
                            name="station_name"
                            value={formData.station_name}
                            onChange={handleChange}
                          />
                          {formErrors.station_name && <span className="text-danger error">{formErrors.station_name}</span>}
                        </div>
                    </div>
                    
                    <div className="col-md-6">
                        <div className='form-group'>
                          <label htmlFor="name">Email</label>
                          <input
                            className='form-control'
                            type="text"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                          />
                          {formErrors.email && <span className="text-danger error">{formErrors.email}</span>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className='form-group'>
                          <label htmlFor="name">Phone Number</label>
                          <input
                            className='form-control'
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                          {formErrors.phone && <span className="text-danger error">{formErrors.phone}</span>}
                        </div>
                    </div>
                    <div className="col-md-6">
                      <div className='form-group'>
                        <label htmlFor="name">Fuel Type</label>
                        <select className="form-control" name="fuel_type" onChange={handleChange}>
                          <option value="">Select Fuel Type</option>
                          <option value="D">Diesel</option>
                          <option value="P">Petrol</option>
                        </select>
                        {formErrors.fuel_type && <span className="text-danger error">{formErrors.fuel_type}</span>}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className='form-group'>
                        <label htmlFor="name">Operated Hours</label>
                        <input
                          className='form-control'
                          type="number"
                          id="operated_hours"
                          name="operated_hours"
                          value={formData.operated_hours}
                          onChange={handleChange}
                        />
                        {formErrors.operated_hours && <span className="text-danger error">{formErrors.operated_hours}</span>}
                      </div>
                    </div>
                    
                </div>
                <div className="text-center">
                  <button disabled={loading} className="btn btn-primary" type="submit"> {loading ? 'Processing...' : 'Submit'}</button>
                </div>
              </form>
          </fieldset>
        </div>
      </section>
    </div>
  );
};

export default CreateStation;