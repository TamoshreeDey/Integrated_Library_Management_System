const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

// Configure CORS properly
app.use(cors({
    origin: 'http://localhost:3000', // React app's address
    methods: ['GET', 'POST'],
    credentials: true
}));

app.use(express.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '********',
    database: 'library_management'
});

// Connect to database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Helper function to format date as YYYYMMDD
function formatDate(date) {
    return date.toISOString().slice(0, 10).replace(/-/g, '');
}

// Helper function to generate bookId
async function generateBookId() {
    const today = formatDate(new Date());
    
    const query = `
        SELECT book_id 
        FROM book_registration 
        WHERE book_id LIKE ? 
        ORDER BY book_id DESC 
        LIMIT 1
    `;
    
    return new Promise((resolve, reject) => {
        db.query(query, [`BK_${today}_%`], (err, results) => {
            if (err) {
                reject(err);
                return;
            }
            
            let serialNumber = 1;
            if (results.length > 0) {
                const lastId = results[0].book_id;
                console.log('Last book ID:', lastId);
                serialNumber = parseInt(lastId.split('_')[2]) + 1;
            }
            
            const bookId = `BK_${today}_${serialNumber}`;
            resolve(bookId);
        });
    });
}

// GET endpoint for books with improved error handling and logging
app.get('/api/books', (req, res) => {
    console.log('Received request for books');
    
    const { book_id, book_name, author, genre, reg_date } = req.query;
    
    let query = 'SELECT * FROM book_registration WHERE 1=1';
    const params = [];

    if (book_id) {
        query += ' AND book_id = ?';
        params.push(book_id);
    }
    if (book_name) {
        query += ' AND book_name LIKE ?';
        params.push(`%${book_name}%`);
    }
    if (author) {
        query += ' AND author LIKE ?';
        params.push(`%${author}%`);
    }
    if (genre) {
        query += ' AND genre LIKE ?';
        params.push(`%${genre}%`);
    }
    if (reg_date) {
        query += ' AND DATE(reg_date) = ?';
        params.push(reg_date);
    }

    console.log('Executing query:', query);
    console.log('With parameters:', params);

    db.query(query, params, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ 
                success: false, 
                message: 'Error fetching books',
                error: err.message 
            });
        }
        console.log(`Found ${results.length} books`);
        return res.status(200).json({
            success: true,
            data: results
        });
    });
});

// POST endpoint for adding books with improved error handling
app.post('/api/AddBooks', async (req, res) => {
    console.log('Received request to add book:', req.body);

    try {
        const { bookName, Author, Genre, copies, borrowers } = req.body;

        // Input validation
        if (!bookName || !Author || !Genre) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: bookName, Author, and Genre are required'
            });
        }

        const bookId = await generateBookId();
        const regDate = new Date().toISOString().slice(0, 10);

        const query = `
            INSERT INTO book_registration (book_id, book_name, author, genre, reg_date, copies, borrowers)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(
            query,
            [bookId, bookName, Author, Genre, regDate, copies || 1, borrowers || 0],
            (err, results) => {
                if (err) {
                    console.error('Error adding book:', err);
                    return res.status(500).json({
                        success: false,
                        message: 'Error adding book to database',
                        error: err.message
                    });
                }
                
                console.log('Successfully added book:', bookId);
                return res.status(201).json({
                    success: true,
                    message: 'Book added successfully',
                    bookId: bookId,
                    affectedRows: results.affectedRows
                });
            }
        );
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

app.post('/api/AddMember', async (req, res) => {
    try {
        const { member_name, phone_num, email, address, gender } = req.body;
        
        // Get current date in YYYYMMDD format
        const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        
        // Create member_id by combining date and phone number
        const member_id = `${today}${phone_num}`;

        // Set registration date to current date
        const reg_date = new Date().toISOString().slice(0, 10);

        // Insert query
        const query = `
            INSERT INTO member_registration (
                member_id, 
                member_name, 
                phone_num, 
                email, 
                address, 
                gender, 
                reg_date, 
                borrowing, 
                Dew, 
                penulty
            ) VALUES (?, ?, ?, ?, ?, ?, ?, 0, 0, 0)
        `;

        // Execute the query
        db.query(
            query,
            [member_id, member_name, phone_num, email, address, gender, reg_date],
            (err, result) => {
                if (err) {
                    console.error('Error in member registration:', err);
                    return res.status(500).json({ 
                        error: 'Failed to register member', 
                        details: err.message 
                    });
                }

                res.status(200).json({ 
                    message: 'Member registered successfully', 
                    member_id: member_id 
                });
            }
        );

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ 
            error: 'Internal server error', 
            details: error.message 
        });
    }
});



// Global error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err.stack);
    res.status(500).json({ 
        success: false,
        message: 'Something broke!', 
        error: err.message 
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
