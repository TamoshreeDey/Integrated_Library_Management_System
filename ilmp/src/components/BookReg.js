import "./Style.css";
import React, { useState } from 'react';

const BookReg = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [copies, setCopies] = useState(0);
  const [borrowers, setBorrowers] = useState(0);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('http://localhost:5000/api/AddBooks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookName: bookName,
          Author: author,
          Genre: genre,
          copies: copies,
          borrowers: borrowers
        }),
      });
      if (response.ok) {
        setSubmitStatus('success');
        // Clear form fields
        setBookName("");
        setAuthor("");
        setGenre("");
        setCopies(0);
        setBorrowers(0);
        
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
        <div className="icon-container" data-tooltip="Show Books">
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="black" className="bi bi-book-fill" viewBox="0 0 16 16">
            <path d="M8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"/>
          </svg>
        </div>
      </div>
      </div>
        <div className="position-absolute top-50 start-50 translate-middle bg-white bg-opacity-75 p-5 rounded shadow text-center">
              <h1 className="font-bookman">Register the books</h1>

            <form class="row g-3 needs-validation" onSubmit={handleSubmit} novalidate>
              <div class="col-md-6">
                <label class="form-label">Book Name</label>
                <input type="text" class="form-control" value={bookName} onChange={(e) => setBookName(e.target.value)} required/>
                
              </div>
              <div class="col-md-6">
                <label class="form-label">Author's Name</label>
                <input type="text" class="form-control" value={author} onChange={(e) => setAuthor(e.target.value)} required/>
              </div>
              <div class="col-md-6">
                <label class="form-label">Genre</label>
                <input type="text" class="form-control" value={genre} onChange={(e) => setGenre(e.target.value)} required/>
              </div>
              <div class="col-md-6">
                <label class="form-label">Copies</label>
                <input type="text" class="form-control" value={copies} onChange={(e) => setCopies(e.target.value)} required/>
              </div>
              <div class="col-12">
              <button className={`btn ${submitStatus === 'success' ? 'btn-success': submitStatus === 'error'? 'btn-danger' : 'btn-primary'} position-relative`} type="submit" disabled={isSubmitting}>
                {submitStatus === 'success' ? (
                <>
                  Added Successfully
                </>
                ) : submitStatus === 'error' ? (
                <>
                Couldn't Add Book
                </>
                ) : (
                'Add Book'
                )}
              </button>
              </div>
            </form>
          </div>
      </body>
    </div>
  );
};

export default BookReg;