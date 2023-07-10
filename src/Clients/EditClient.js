import React, { useEffect,useState } from 'react';
import { useNavigate,useParams,Link } from 'react-router-dom';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { toast } from 'react-toastify';
import axios from 'axios';

import PageLoader from '../PageLoader';

const EditClient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    client_id:id,
    client_name: '',
    address: '',
    contact_name:'',
    contact_no:'',
    active_vouchers:'',
    used_vouchers:'',
    last_order_date:'',
    last_order_amount:''
  });
    
  useEffect(() => {
    const fetchClient = async (client_id) => {
      setLoading(true);
        try {
            const headers = {
                'Content-Type': 'application/json',
                Authorization: 'Token '+localStorage.getItem("token"),
            };
            const response = await axios.get('client/'+client_id+'/', { headers });
            setFormData(response.data);
            setSelectedDate(new Date(response.data.last_order_date));
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };
    fetchClient(id);
  }, []);

  const [formErrors, setFormErrors] = useState({
    client_name: '',
    address: '',
    contact_name:'',
    contact_no:'',
    active_vouchers:'',
    used_vouchers:'',
    last_order_date:'',
    last_order_amount:''
  });
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    formData.last_order_date = date?.toISOString().slice(0, 10);
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
    const { client_name, address,contact_name,contact_no,active_vouchers,used_vouchers,last_order_date,last_order_amount } = formData;
    const errors = {};

    if (client_name.trim() === '') {
      errors.client_name = 'This fields is required';
    }
    if (address.trim() === '') {
      errors.address = 'This fields is required';
    }
    if (contact_name.trim() === '') {
      errors.contact_name = 'This fields is required';
    }
    if (contact_no.trim() === '') {
      errors.contact_no = 'This fields is required';
    }
    if (active_vouchers === '') {
      errors.active_vouchers = 'This fields is required';
    }
    if (used_vouchers === '') {
      errors.used_vouchers = 'This fields is required';
    }
    if (last_order_date.trim() === '') {
      errors.last_order_date = 'This fields is required';
    }
    if (last_order_amount === '') {
      errors.last_order_amount = 'This fields is required';
    }
  
  
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Token '+localStorage.getItem("token"),
        };
        setLoading(true);
        axios
        .put('client/'+id+'/', formData, { headers })
        .then((response) => {
          console.log(response.status);
          var res = response.data;
          if(res.status == 'Data Updated'){
              toast.success('Record updated successfully');
              navigate("/clients");
          }else{
            toast.error('Something went wrong');
          }
        })

        .catch((error) => {
          // Handle any errors
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
            <legend className="pl-0">Edit Client</legend>
              <form className="p-3 form-area" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-12">
                        <div className='form-group'>
                          <label htmlFor="name">Client Name</label>
                          <input
                            className='form-control'
                            type="text"
                            id="client_name"
                            name="client_name"
                            value={formData.client_name}
                            onChange={handleChange}
                          />
                          {formErrors.client_name && <span className="text-danger error">{formErrors.client_name}</span>}
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className='form-group'>
                          <label htmlFor="name">Address</label>
                          <textarea
                            className='form-control'
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                          ></textarea>
                          {formErrors.address && <span className="text-danger error">{formErrors.address}</span>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className='form-group'>
                          <label htmlFor="name">Contact Name</label>
                          <input
                            className='form-control'
                            type="text"
                            id="contact_name"
                            name="contact_name"
                            value={formData.contact_name}
                            onChange={handleChange}
                          />
                          {formErrors.contact_name && <span className="text-danger error">{formErrors.contact_name}</span>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className='form-group'>
                          <label htmlFor="name">Contact Number</label>
                          <input
                            className='form-control'
                            type="text"
                            id="contact_no"
                            name="contact_no"
                            value={formData.contact_no}
                            onChange={handleChange}
                          />
                          {formErrors.contact_no && <span className="text-danger error">{formErrors.contact_no}</span>}
                        </div>
                    </div>
                    <div className="col-md-6">
                      <div className='form-group'>
                        <label htmlFor="name">Active Vouchers</label>
                        <input
                          className='form-control'
                          type="number"
                          id="active_vouchers"
                          name="active_vouchers"
                          value={formData.active_vouchers}
                          onChange={handleChange}
                        />
                        {formErrors.active_vouchers && <span className="text-danger error">{formErrors.active_vouchers}</span>}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className='form-group'>
                        <label htmlFor="name">Used Vouchers</label>
                        <input
                          className='form-control'
                          type="number"
                          id="used_vouchers"
                          name="used_vouchers"
                          value={formData.used_vouchers}
                          onChange={handleChange}
                        />
                        {formErrors.used_vouchers && <span className="text-danger error">{formErrors.used_vouchers}</span>}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className='form-group'>
                        <label htmlFor="name">Last Order Date</label>
                        <div>
                          <DatePicker className='form-control' selected={selectedDate} onChange={handleDateChange} />
                        </div>
                        {formErrors.last_order_date && <span className="text-danger error">{formErrors.last_order_date}</span>}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className='form-group'>
                        <label htmlFor="name">Last Order Number</label>
                        <input
                          className='form-control'
                          type="number"
                          id="last_order_amount"
                          name="last_order_amount"
                          value={formData.last_order_amount}
                          onChange={handleChange}
                        />
                        {formErrors.last_order_amount && <span className="text-danger error">{formErrors.last_order_amount}</span>}
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

export default EditClient;