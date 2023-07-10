import React, { useEffect, useState } from 'react';

import { useNavigate,Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { toast } from 'react-toastify';
import axios from 'axios';

import PageLoader from '../PageLoader';

const CreateVoucher = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    voucher_id: '',
    initial_amount: '',
    balance:'',
    start_date:'',
    end_date:'',
    status:'',
    client_id:''
  });
  const [formErrors, setFormErrors] = useState({
    initial_amount: '',
    initial_amount: '',
    balance:'',
    start_date:'',
    end_date:'',
    status:'',
    client_id:'',
    error_message:'',
  });
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    formData.start_date = date?.toISOString().slice(0, 10);
  };
  const handleEndDateChange = (date) => {
    setEndDate(date);
    formData.end_date = date?.toISOString().slice(0, 10);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { voucher_id, initial_amount, balance,start_date,end_date,status,client_id } = formData;
    const errors = {};
   
    if (voucher_id.trim() === '') {
      errors.voucher_id = 'This fields is required';
    }
    if (initial_amount.trim() === '') {
      errors.initial_amount = 'This fields is required';
    }
    if (balance.trim() === '') {
      errors.balance = 'This fields is required';
    }
    if(start_date.trim() === '') {
      errors.start_date = 'This fields is required';
    }
    if (end_date.trim() === '') {
      errors.end_date = 'This fields is required';
    }
    if (status.trim() === '') {
      errors.status = 'This fields is required';
    }
    if (client_id.trim() === '') {
      errors.client_id = 'This fields is required';
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
        .post('createVoucher/', {
          data:postData
        }, { headers })
        .then((response) => {
        
          var data = response.data;
          if(data[0] !== undefined){
            
            var is_created = false;
            Object.keys(data).forEach(function(k) {
              var itemData = data[k];
              Object.keys(data[k]).forEach(function(key) {
                if(itemData[key] == "created"){
                  is_created = true;
                }
              })
            });
            
            if(is_created){
              setLoading(false);
               toast.success('Record submitted successfully');
               navigate("/vouchers");
            }else{
              setLoading(false);
              const errors = {};
              let error_message = '';
              Object.keys(data).forEach(function(k) {
                var itemData = data[k];
                Object.keys(data[k]).forEach(function(key) {
                  Object.keys(itemData[key]).forEach(function(key2) {
                    // console.log(key2,itemData[key][key2]);
                    error_message += itemData[key][key2]+"\n";
                    console.log("error_message",error_message);
                    // if(errors[key2] === undefined){
                    //   errors[key2] = itemData[key][key2]+",";
                    // }else{
                    //   errors[key2] += itemData[key][key2]+",";
                    // }
                  })
                })
              });
              if(error_message != ''){
                errors.error_message = error_message;
                setFormErrors(errors);
              }
            }
          }
        })
        .catch((error) => {
          setFormErrors(errors);
          toast.error("Something went wrong. Try again");
        });
    }
  };

  const fetchClients = async () => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: 'Token '+localStorage.getItem("token"),
        };
        const response = await axios.get('clients/', { headers });
        setClients(response.data);
        setLoading(false);
    } catch (error) {
        setLoading(false);
    }
  };
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
                <Link to="/vouchers" className='btn btn-primary'><i className='fa fa-angle-left'></i> Back</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <fieldset className='form-fieldset'>
            <legend className="pl-0">New Voucher</legend>
              <form className="p-3 form-area" onSubmit={handleSubmit}>
                <div className="row">
                   
                    <div className="col-md-6">
                        <div className='form-group'>
                          <label htmlFor="name">Voucher ID</label>
                          <input
                            className='form-control'
                            type="text"
                            id="voucher_id"
                            name="voucher_id"
                            value={formData.voucher_id}
                            onChange={handleChange}
                          />
                          {formErrors.voucher_id && <span className="text-danger error">{formErrors.voucher_id}</span>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className='form-group'>
                          <label htmlFor="name">Initial Amount</label>
                          <input
                            className='form-control'
                            type="number"
                            id="initial_amount"
                            name="initial_amount"
                            value={formData.initial_amount}
                            onChange={handleChange}
                          />
                          {formErrors.initial_amount && <span className="text-danger error">{formErrors.initial_amount}</span>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className='form-group'>
                          <label htmlFor="name">Balance</label>
                          <input
                            className='form-control'
                            type="text"
                            id="balance"
                            name="balance"
                            value={formData.balance}
                            onChange={handleChange}
                          />
                          {formErrors.balance && <span className="text-danger error">{formErrors.balance}</span>}
                        </div>
                    </div>
                    
                    <div className="col-md-6">
                      <div className='form-group'>
                        <label htmlFor="name">Start Date</label>
                        <div>
                          <DatePicker className='form-control' selected={startDate} onChange={handleStartDateChange} />
                        </div>
                        {formErrors.start_date && <span className="text-danger error">{formErrors.start_date}</span>}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className='form-group'>
                        <label htmlFor="name">End Date</label>
                        <div>
                          <DatePicker className='form-control' selected={endDate} onChange={handleEndDateChange} />
                        </div>
                        {formErrors.end_date && <span className="text-danger error">{formErrors.end_date}</span>}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className='form-group'>
                        <label htmlFor="name">Status</label>
                        <select className="form-control" name="status" onChange={handleChange}>
                          <option value="">Select Status</option>
                          <option value="A">Active</option>
                          <option value="I">Inactive</option>
                          <option value="V">Void</option>
                        </select>
                        {formErrors.status && <span className="text-danger error">{formErrors.status}</span>}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className='form-group'>
                        <label htmlFor="name">Client</label>
                        <select className="form-control" name="client_id" onChange={handleChange}>
                          <option value="">Select Client</option>
                            {clients.map((option) => (
                              <option key={option.client_id} value={option.client_id}>
                                {option.client_name}
                              </option>
                            ))}
                        </select>
                        {formErrors.client_id && <span className="text-danger error">{formErrors.client_id}</span>}
                      </div>
                    </div>
                    {formErrors.error_message && <span className="col-md-12 text-danger error mb-3">{formErrors.error_message}</span>}
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

export default CreateVoucher;