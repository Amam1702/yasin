import React, { useEffect, useState } from 'react';

import { useNavigate,Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { toast } from 'react-toastify';
import axios from 'axios';

import PageLoader from '../PageLoader';

const CreateAttendant = () => {
  const navigate = useNavigate();
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    employee_id: '',
    location_id: '',
    password: '',
    vouchers: '',
    station_id:'',
    // profile: null
  });
  const [formErrors, setFormErrors] = useState({
    first_name: '',
    last_name: '',
    employee_id: '',
    location_id: '',
    password: '',
    vouchers: '',
    station_id:'',
    error_message:'',
    // profile: ''
  });

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event2) => {
      const base64Data = event2.target.result;
      setFormData((prevFormData) => ({
        ...prevFormData,
        profile: base64Data,
      }));
    };
    reader.readAsDataURL(file);
    
  };
  const fetchStations = async () => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: 'Token '+localStorage.getItem("token"),
        };
        const response = await axios.get('stations/', { headers });
        setStations(response.data);
        setLoading(false);
    } catch (error) {
        setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { first_name, last_name, employee_id,location_id,password,vouchers,station_id,profile } = formData;
    const errors = {};
   
    if (first_name.trim() === '') {
      errors.first_name = 'This fields is required';
    }
    if (last_name.trim() === '') {
      errors.last_name = 'This fields is required';
    }
    if (employee_id.trim() === '') {
      errors.employee_id = 'This fields is required';
    }
    if(location_id.trim() === '') {
      errors.location_id = 'This fields is required';
    }
    if (password.trim() === '') {
      errors.password = 'This fields is required';
    }
    if (vouchers.trim() === '') {
      errors.vouchers = 'This fields is required';
    }
    if (station_id.trim() === '') {
      errors.station_id = 'This fields is required';
    }
    // if (profile.trim() === '') {
    //   errors.profile = 'This fields is required';
    // }
   
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
        const fdata = new FormData();
        fdata.append('first_name', formData.first_name);
        fdata.append('last_name', formData.last_name);
        fdata.append('employee_id', formData.employee_id);
        fdata.append('location_id', formData.location_id);
        fdata.append('password', formData.password);
        fdata.append('vouchers', formData.vouchers);
        if(formData.profile != ''){
          fdata.append('profile', formData.profile);
        }
        console.log("DATA",fdata);
        var postData = [formData] ;
        const headers = {
          'Content-Type': 'application/json',
          // 'content-type': 'multipart/form-data',
          Authorization: 'Token '+localStorage.getItem("token"),
        };

        setLoading(true);
        axios
        .post('createAttendant/', {
          data:postData
        }, { headers })
        .then((response) => {
        

          var data = response.data;
          if(data[0] !== undefined){
            
            var is_created = false;
            Object.keys(data).forEach(function(k) {
              var itemData = data[k];
              Object.keys(data[k]).forEach(function(key) {
                if(itemData[key] == "Attendant Created"){
                  is_created = true;
                }
              })
            });
            
            if(is_created){
              setLoading(false);
               toast.success('Record submitted successfully');
               navigate("/attendants");
            }else{
              
              const errors = {};
              let error_message = '';
              Object.keys(data).forEach(function(k) {
                var itemData = data[k];
                Object.keys(data[k]).forEach(function(key) {
                  console.log(itemData[key]);
                  error_message += itemData[key]+"\n";
                })
              });
              setLoading(false);
              if(error_message != ''){
                errors.error_message = error_message;
                setFormErrors(errors);
              }
            }
          }else{
            setLoading(false);
          }
        })
        .catch((error) => {
          setLoading(false);
          setFormErrors(errors);
          toast.error("Something went wrong. Try again");
        });
    }
  };
  useEffect(() => {
    fetchStations();
  }, []);
  return (
    <div className="p-3">
      {loading &&<PageLoader />}
      <section className="content">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-3 offset-md-9 text-right">
                <Link to="/attendants" className='btn btn-primary'><i className='fa fa-angle-left'></i> Back</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <fieldset className='form-fieldset'>
            <legend className="pl-0">New Attendant</legend>
              <form className="p-3 form-area" onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="row">
                   
                    <div className="col-md-6">
                        <div className='form-group'>
                          <label htmlFor="name">First Name</label>
                          <input
                            className='form-control'
                            type="text"
                            id="first_name"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                          />
                          {formErrors.first_name && <span className="text-danger error">{formErrors.first_name}</span>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className='form-group'>
                          <label htmlFor="name">Last Name</label>
                          <input
                            className='form-control'
                            type="text"
                            id="last_name"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                          />
                          {formErrors.last_name && <span className="text-danger error">{formErrors.last_name}</span>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className='form-group'>
                          <label htmlFor="name">Employee</label>
                          <input
                            className='form-control'
                            type="text"
                            id="employee_id"
                            name="employee_id"
                            value={formData.employee_id}
                            onChange={handleChange}
                          />
                          {formErrors.employee_id && <span className="text-danger error">{formErrors.employee_id}</span>}
                        </div>
                    </div>
                    
                    <div className="col-md-6">
                        <div className='form-group'>
                          <label htmlFor="name">Location</label>
                          <input
                            className='form-control'
                            type="text"
                            id="location_id"
                            name="location_id"
                            value={formData.location_id}
                            onChange={handleChange}
                          />
                          {formErrors.location_id && <span className="text-danger error">{formErrors.location_id}</span>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className='form-group'>
                          <label htmlFor="name">Password</label>
                          <input
                            className='form-control'
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                          />
                          {formErrors.password && <span className="text-danger error">{formErrors.password}</span>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className='form-group'>
                          <label htmlFor="name">Vouchers</label>
                          <input
                            className='form-control'
                            type="number"
                            id="vouchers"
                            name="vouchers"
                            value={formData.vouchers}
                            onChange={handleChange}
                          />
                          {formErrors.vouchers && <span className="text-danger error">{formErrors.vouchers}</span>}
                        </div>
                    </div>
                    <div className="col-md-6">
                      <div className='form-group'>
                        <label htmlFor="name">Station</label>
                        <select className="form-control" name="station_id" onChange={handleChange}>
                          <option value="">Select Station</option>
                            {stations.map((option) => (
                              <option key={option.station_id} value={option.station_id}>
                                {option.station_name}
                              </option>
                            ))}
                        </select>
                        {formErrors.station_id && <span className="text-danger error">{formErrors.station_id}</span>}
                      </div>
                    </div>
                    <div className="col-md-6">
                        <div className='form-group'>
                          <label htmlFor="name">Profile</label>
                          <input
                            className='form-control'
                            type="file"
                            id="profile"
                            name="profile"
                            onChange={handleFileUpload}
                          />
                          {formErrors.profile && <span className="text-danger error">{formErrors.profile}</span>}
                        </div>
                    </div>
                    {formErrors.error_message && <div className="col-md-12 text-danger error mb-3">{formErrors.error_message}</div>}
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

export default CreateAttendant;