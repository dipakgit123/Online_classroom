import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import html2canvas from 'html2canvas';
import React, { useEffect, useState } from 'react';
// import Dashboard from './Dashboard';

const Report = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showCard, setShowCard] = useState(false);
  const [showFeesReport, setShowFeesReport] = useState(false);
  const [showAddmissionReport, setShowAddmissionReport] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8081/students');
        if (!response.ok) throw new Error('Failed to fetch students');

        const data = await response.json();
        setStudents(data);
      } catch (err) {
        setError('Failed to fetch students');
        console.error(err);
      }
    };

    fetchStudents();
  }, []);

  const getReport = async () => {
    if (!selectedStudent) {
      alert('Please select a student');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch(`http://127.0.0.1:8081/students/${selectedStudent}`);
      if (!response.ok) throw new Error('Failed to fetch report');

      const data = await response.json();
      setReportData(data);
      setShowCard(false);
      setShowFeesReport(false);
      setShowAddmissionReport(false); // Resetting admission report visibility
    } catch (err) {
      setError(err.message);
      console.error('Error fetching report:', err);
    } finally {
      setLoading(false);
    }
  };

  const downloadIdCard = () => {
    const cardElement = document.getElementById('id-card');
    html2canvas(cardElement).then(canvas => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'id_card.png';
      link.click();
    });
  };

  const downloadFeesCard = () => {
    const cardElement = document.getElementById('fees-card');
    html2canvas(cardElement).then(canvas => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'id_fees_card.png';
      link.click();
    });
  };

  const downloadAdmissionReport = () => {
    const cardElement = document.getElementById('admission-card'); // Updated ID
    if (!cardElement) {
      console.error('Admission card element not found.');
      return;
    }

    html2canvas(cardElement).then(canvas => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'admission_card.png'; // Updated file name
      link.click();
    }).catch(err => {
      console.error('Error capturing the admission card:', err);
    });
  };

  return (
    <>
    {/* <Dashboard/> */}
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <h1 style={{ fontSize: '36px', color: '#333' }}>
          <i className="fa fa-chart-bar" style={{ marginRight: '10px' }}></i> Report
        </h1>
        <div style={{ backgroundColor: '#d4edda', borderColor: '#c3e6cb', color: '#155724', padding: '15px', fontSize: '16px', borderRadius: '4px', marginBottom: '30px', width: '80%', margin: '0 auto' }}>
          Here, you can view and print report.
        </div>
      </div>

      <div style={{ maxWidth: '80%', margin: '0 auto', borderRadius: '4px', border: '2px solid black', padding: '15px', marginTop: '20px' }}>
        <div style={{ backgroundColor: '#DEDEDE', color: 'black', padding: '15px', fontSize: '18px', textAlign: 'left', borderRadius: '4px', marginBottom: '20px', border: '1px solid grey', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <strong>View Report</strong>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="student-select" style={{ fontSize: '18px', marginRight: '10px' }}>View Report:</label>
          <select style={{ padding: '10px', width: '70%', fontSize: '16px', marginTop: '10px' }} onChange={(e) => setSelectedStudent(e.target.value)}>
            <option value="">--- Select a Student ---</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.firstname} {student.lastname}
              </option>
            ))}
          </select>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <button style={{ padding: '10px 20px', width: '20%', fontSize: '16px', marginLeft: 'auto', color: '#fff', backgroundColor: '#007bff', marginTop: '40px', border: 'none', borderRadius: '4px', cursor: 'pointer' }} onClick={getReport}>
              Get Report!
            </button>
          </div>
        </div>

        {loading && <p>Loading report...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {reportData && (
          <div style={{ marginTop: '20px' }}>
            <h3>Report for: {reportData.name}</h3>
            <p style={{ fontSize: '16px' }}><strong>Identity Card:</strong> <PictureAsPdfIcon /> <span onClick={() => { setShowCard(true);setShowFeesReport(false);setShowAddmissionReport(false);}} style={{ color: 'blue', cursor: 'pointer' }}>{reportData.enrollment_id}</span></p>
            <p style={{ fontSize: '16px' }}><strong>Fees Report:</strong> <PictureAsPdfIcon /> <span onClick={() => { setShowCard(false);setShowFeesReport(true);setShowAddmissionReport(false); }} style={{ color: 'blue', cursor: 'pointer' }}>{reportData.enrollment_id}</span></p>
            <p style={{ fontSize: '16px' }}><strong>Admission Details:</strong><PictureAsPdfIcon /> <span onClick={() => { setShowCard(false);setShowFeesReport(false);setShowAddmissionReport(true);}} style={{ color: 'blue', cursor: 'pointer' }}>{reportData.enrollment_id}</span></p>
            {/* Other fields */}
          </div>
        )}

        {/* Show the ID card when clicked */}
        {showCard && (
          <div id="id-card" style={{ marginTop: '20px', border: '2px solid green', borderRadius: '5px', padding: '15px', width: '60%', margin: '0 auto' }}>
            <h3>Student Identity Card</h3>
            <p><strong>Enrollment ID:</strong> {reportData.enrollment_id}</p>
            <p><strong>FirstName:</strong> {reportData.firstname}</p>
            <p><strong>LastName:</strong> {reportData.lastname}</p>
            <p><strong>Course:</strong> {reportData.course}</p>
            <p><strong>Duration:</strong> {reportData.duration}</p>
            <p><strong>Registration Date:</strong>{reportData.registrationDate}</p>
            <p><strong>Phone:</strong>{reportData.phone}</p>
            <p><strong>Email:</strong>{reportData.email}</p>
            {/* Add more fields here as needed */}
            <button onClick={downloadIdCard} style={{ padding: '10px', marginTop: '20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Download ID Card
            </button>
          </div>
        )}

        {/* Show the fees report when clicked */}
        {showFeesReport && (
          <div id="fees-card" style={{ marginTop: '20px', border: '2px solid blue', borderRadius: '5px', padding: '15px', width: '60%', margin: '0 auto' }}>
            <h3>Student Fees Report</h3>
            <p><strong>Total Fees:</strong> {reportData.feespayable}</p>
            <p><strong>Paid Amount:</strong> {reportData.feespaid}</p>
            <p><strong>Due Amount:</strong> {reportData.feesstatus}</p>
            {/* Add more fields as required */}
            <button onClick={downloadFeesCard} style={{ padding: '10px', marginTop: '20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Download Fees Report
            </button>
          </div>
        )}

        {/* Admission Report */}
        {showAddmissionReport && (
          <div id="admission-card" style={{ marginTop: '20px', border: '2px solid blue', borderRadius: '5px', padding: '15px', width: '60%', margin: '0 auto' }}>
            <h3>Admission Details</h3>
            <p><strong>Registration Date:</strong> {reportData.registrationDate}</p>
            <p><strong>Course:</strong> {reportData.course}</p>
            <p><strong>Batch:</strong> {reportData.batch}</p>
            <p><strong>Duration:</strong> {reportData.duration}</p>
            <p><strong>Address:</strong> {reportData.address}</p>
            <p><strong>City:</strong> {reportData.city}</p>
            <p><strong>State:</strong> {reportData.state}</p>
            <p><strong>Nationality:</strong> {reportData.nationality}</p>
            <button onClick={downloadAdmissionReport} style={{ padding: '10px', marginTop: '20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Download Admission Details
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Report;