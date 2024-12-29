import "./Style.css";
import React from 'react'

export default function Home() {
  return (
    <div>
      <div className="position-relative vh-100">
        <nav class="d-flex justify-content-center align-items-center top-fixed navbar navbar-expand-lg">
            <h1 className="font-bookman">Bookers Corner</h1>
        </nav>
        <div className="position-absolute top-50 start-50 translate-middle bg-white bg-opacity-75 p-5 rounded shadow text-center">
            <h1 className="font-bookman">Contents</h1>
            <ul className="list-unstyled">
            <li className="font-bookman pb-4">Home</li>
            <li className="font-bookman pb-4">User Registration</li>
            <li className="font-bookman pb-4">Book Registration</li>
            <li className="font-bookman ">Book Borrowing</li>
            </ul>
        </div>

        </div>
    </div>
  )
}
