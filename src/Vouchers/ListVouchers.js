import React, { useEffect, useState,useRef } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import PageLoader from '../PageLoader';
import { toast } from 'react-toastify';
import axios from 'axios';
import CSVReader from 'react-csv-reader';
import { Button,Modal } from 'react-bootstrap';
import sampleCsv from './sample-csv.csv';
const ListVouchers = () => {
    const [records, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [csvKey, setCsvKey] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const csvImporRef = useRef(null);
    const [csvImportResponse, setCsvImportResponse] = useState({
      error_message:'',
      success_message:'',
    });
    const handleDownload = () => {
      const fileUrl = sampleCsv; // Replace with the actual file URL

      const link = document.createElement('a');
      link.href = fileUrl;
      link.setAttribute('download', 'sample-csv.csv'); // Replace with the desired filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    const handleOpenModal = () => {
      setShowModal(true);
    };

    const [csvData, setCsvData] = useState([]);
    const handleFileData = (data, fileInfo) => {
        const filteredData = data.map((row) =>
        Object.entries(row).reduce((acc, [key, value]) => {
          if (value.trim() !== '') {
            acc[key] = value;
          }
          return acc;
        }, {})
      );
      setCsvData(filteredData);
    };

    const handleCsvImport = () => {
      if(csvData.length == 0){
        toast.error("Please select the csv file to import");
      }else{
        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Token '+localStorage.getItem("token"),
        };

        setLoading(true);
        axios
        .post('createVoucher/', {
          data:csvData
        }, { headers })
        .then((response) => {
          var data = response.data;
          let error_message = '';
          let success_message = '';
          let import_response = {
            error_message:'',
            success_message:'',
          }
          setLoading(false);
          console.log(data);
          Object.keys(data).forEach(function(k) {
            var itemData = data[k];
            Object.keys(data[k]).forEach(function(key) {
              if(itemData[key] == 'created'){
                success_message +=  key+":"+itemData[key]+"<br>";
              }else{
                Object.keys(itemData[key]).forEach(function(key2) {
                  error_message += key+":"+itemData[key][key2]+"<br>";
                })
              }
            })
          });
          if(error_message != ''){
            import_response.error_message = error_message
          }
          if(success_message != ''){
            import_response.success_message = success_message
          }
          setCsvData([]);
          setCsvKey((prevKey) => prevKey + 1);
          setCsvImportResponse(import_response);
          fetchVouchers();
        })
        .catch((error) => {
          setLoading(false);
          toast.error("Something went wrong. Try again");
        });
      }
    };
    const handleCloseModal = () => {
      setShowModal(false);
    };
    const columns = [
      { name: 'Voucher ID', key: 'voucher_id' },
      { name: 'Initial Amount', key: 'initial_amount' },
      { name: 'Balance', key: 'balance' },
      { name: 'Last Used', key: 'last_used' },
      { name: 'Start Date', key: 'start_date' },
      { name: 'End Date', key: 'end_date' },
      { name: 'Status', key: 'status' },
    ];
    const fetchVouchers = async () => {
        try {
            setLoading(true);
            const headers = {
                'Content-Type': 'application/json',
                Authorization: 'Token '+localStorage.getItem("token"),
            };
            const response = await axios.get('vouchers/', { headers });
            setData(response.data);
            setLoading(false);
            
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };
    
    const deleteVoucher = (voucher_id) => {
     
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
              .delete('vouchers/'+voucher_id+'/', { headers })
              .then((response) => {
               
                var res = response.data;
                console.log(res);
                if(res.status == 'Voucher Deleted'){
                    toast.success('Voucher deleted successfully');
                    fetchVouchers();
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
        fetchVouchers();
    }, []);
  return (
    <div className="p-3">
      {loading &&<PageLoader />}
      <section className="content">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-4 offset-md-8 pr-0 text-right">
                <div className='btn-group'>
                  <button onClick={handleOpenModal} className='btn btn-warning mr-2'><i className='fa fa-file-csv'></i> Import CSV</button>
                  <Link to="/vouchers/create" className='btn btn-primary'><i className='fa fa-plus'></i> Add New</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <fieldset className='form-fieldset'>
            <legend className="pl-0">Vouchers</legend>
            <div className="records-list mt-3">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                        <th className="text-nowrap">Voucher ID</th>
                        <th className="text-nowrap">Initial Amount</th>
                        <th className="text-nowrap">Balance</th>
                        <th className="text-nowrap">Last Used</th>
                        <th className="text-nowrap">Start Date</th>
                        <th className="text-nowrap">End Date</th>
                        <th className="text-nowrap">Status</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {records ? (records.map((item) => (
                    <tr key={item.voucher_id}>
                        <td>{item.voucher_id}</td>
                        <td>{item.initial_amount}</td>
                        <td>{item.balance}</td>
                        <td className="text-nowrap">{item.last_used}</td>
                        <td className="text-nowrap">{item.start_date}</td>
                        <td className="text-nowrap">{item.end_date}</td>
                        <td>{item.status}</td>
                        <td>
                            <div className="btn-group">
                                <Link to={`/vouchers/edit/${item.voucher_id}`} className="btn btn-warning btn-sm mr-2"><i className="fa fa-edit"></i></Link>
                                <button onClick={() => deleteVoucher(item.voucher_id)} type='button' className="btn btn-danger btn-sm"><i className="fa fa-trash"></i></button>
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
      <Modal show={showModal} size="lg" onHide={handleCloseModal}>
        <Modal.Header>
          <Modal.Title>Import Voucher</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='text-right'>
                <button className='btn btn-outline-primary btn-sm' onClick={handleDownload}>Download Sample CSV file</button>
            </div>
            <div className='form-group'>
                <label>Import File</label>
                {/* <input type="file" name="csv_file" className='form-control' /> */}
                <CSVReader
                  key={csvKey}
                  ref={csvImporRef}
                  onFileLoaded={handleFileData}
                  parserOptions={{ header: true, skipEmptyLines: true }}
                />
            </div>
            <div className='import-response'>
            {csvImportResponse.error_message && <div className="text-danger mb-3" dangerouslySetInnerHTML={{ __html: csvImportResponse.error_message }}></div>}
            {csvImportResponse.success_message && <div className="text-success mb-3" dangerouslySetInnerHTML={{ __html: csvImportResponse.success_message }}></div>}
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCsvImport}>
            Import
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ListVouchers;