import "./Style.css";
import React, { useState } from 'react';

const MemberReg = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [member_name, setMemberName] = useState("");
  const [phone_num, setPhoneNum] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [reg_date, setRegDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('http://localhost:5000/api/AddMember', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          member_name: member_name,
          phone_num: phone_num,
          email: email,
          address: address,
          gender: gender,
          reg_date: reg_date
        }),
      });
      if (response.ok) {
        setSubmitStatus('success');
        // Clear form fields
        setMemberName("");
        setPhoneNum("");
        setEmail("");
        setAddress("");
        setGender("");
        setRegDate("");
        
        // Reset button after 3 seconds
        setTimeout(() => {
          setSubmitStatus(null);
          setIsSubmitting(false);
        }, 3000);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      
      // Reset button after 3 seconds
      setTimeout(() => {
        setSubmitStatus(null);
        setIsSubmitting(false);
      }, 3000);
    }
  };

  return (
    <div>
      <body className="position-relative vh-100">
      <div className="top-left-icons">
      <div className="top-left-icons">
        <div className="icon-container" data-tooltip="Home">
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="black" className="bi bi-house-fill" viewBox="0 0 16 16">
              <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z"/>
              <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z"/>
          </svg>
        </div>
        <div className="icon-container" data-tooltip="Show Members">
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="black" className="bi bi-people-fill" viewBox="0 0 16 16">
            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
          </svg>
        </div>
      </div>
      </div>
        <div className="position-absolute top-50 start-50 translate-middle bg-white bg-opacity-75 p-5 rounded shadow text-center">
          <h1 className="font-bookman pb-4">Register Member</h1>

          <form className="row g-3 needs-validation" onSubmit={handleSubmit} noValidate>
            <div className="col-md-6">
              <label className="form-label">Member Name</label>
              <input type="text" className="form-control" value={member_name} onChange={(e) => setMemberName(e.target.value)} required/>
            </div>
            <div className="col-md-6">
              <label className="form-label">Phone Number</label>
              <input type="tel" className="form-control" value={phone_num} onChange={(e) => setPhoneNum(e.target.value)} required/>
            </div>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="col-md-6">
              <label className="form-label">Gender</label>
              <select className="form-select" value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="col-md-12">
              <label className="form-label">Address</label>
              <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)}/>
            </div>
            <div className="col-12">
              <button className={`btn ${submitStatus === 'success' ? 'btn-success': submitStatus === 'error'? 'btn-danger' : 'btn-primary'} position-relative`} type="submit" disabled={isSubmitting}>
                {submitStatus === 'success' ? (
                  <>
                    Added Successfully
                  </>
                ) : submitStatus === 'error' ? (
                  <>
                    Couldn't Add Member
                  </>
                ) : (
                  'Add Member'
                )}
              </button>
            </div>
          </form>
        </div>
      </body>
    </div>
  );
};

export default MemberReg;