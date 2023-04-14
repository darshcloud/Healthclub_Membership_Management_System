import {useEffect, useState} from "react";
import axios from "axios";
import {Routes, Route} from 'react-router-dom'
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import {Outlet} from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { Table, Button, Alert } from 'react-bootstrap';
import MemberNav from "./MemberNav";

export const Enroll = () => {
  const [trainings, setTrainings] = useState([]);
  const [enrollmentMsg, setEnrollmentMsg] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('http://127.0.0.1:8000/api/viewtrainings/', 
          { headers: {'Content-Type': 'application/json',
          'Authorization' : `token ${localStorage.getItem('token')}`,
          "Access-Control-Allow-Origin": "*"}
        });
        setTrainings(data);
      } catch (e) {
        console.log('not auth')
      }
    })();
  }, []);

  const handleEnroll = async (trainingId) => {
    try {
      
      
      const response = await axios.post('http://127.0.0.1:8000/api/signupfortraining/',  { "training_id": trainingId }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${localStorage.getItem('token')}`,
          "Access-Control-Allow-Origin": "*"
        }
      });
      setEnrollmentMsg('Enrolled in training successfully!');
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        setEnrollmentMsg('');
      }, 2000);
    } 
    catch (e) {
      console.log(e);
      //setError('Failed to enroll in training. Please try again.');
      setError(e.response.data["error"]);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        setError('');
      }, 2000);
    }
  };
    return (
      <div>
        <div className="d-flex justify-content-md-center mt-3">
          <div className="row side-row">
            {trainings.length ? (
              <Table striped bordered hover className="react-bootstrap-table" id="dataTable">
                <thead>
                  <tr>
                    <th>Training Name</th>
                    <th>Instructor Name</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    {localStorage.getItem('user_type') === 'Member' && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {trainings.map((training) => (
                    <tr key={training.id}>
                      <td>{training.training_type}</td>
                      <td>{training.instructor_name}</td>
                      <td>{new Date(training.start_time).toLocaleString()}</td>
                      <td>{new Date(training.end_time).toLocaleString()}</td>
                      {localStorage.getItem('user_type') === 'Member' && (
                        <td>
                          {training.current_capacity < training.max_capacity ? (
                            <Button variant="success" onClick={() => handleEnroll(training.training_id)}>Enroll</Button>
                          ) : (
                            <Button variant="danger" disabled>Max Capacity</Button>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <Alert variant="warning" id="empty-trainings-message">No trainings available.</Alert>
            )}
          </div>
        </div>
        <Container className="mt-3">
          {((enrollmentMsg !== '') || (error !== '')) && (
            <>
              {error !== '' &&
                <Alert variant="danger" onClose={() => setError('')} dismissible>
                  {error}
                </Alert>
              }
              {enrollmentMsg !== '' &&
                <Alert variant="success" onClose={() => setEnrollmentMsg('')} dismissible>
                  {enrollmentMsg}
                </Alert>
              }
            </>
          )}
        </Container>
      </div>
    );
    


  

}