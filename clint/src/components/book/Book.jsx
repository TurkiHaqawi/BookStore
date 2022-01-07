import "./Book.css"
import {Link} from 'react-router-dom'

function Book({book}) {

    const FP = "http://localhost:5000/images/"
    return (
        <div className="book">
            <img src={FP + book.bookPhoto} alt="" className="bookImg" />

            <div className="bookInfo">
                <Link to={`/book/${book._id}`} className="link">
                    <h2 className="bookTitle">{book.title}</h2>
                </Link>
                <span>Author:  
                        <Link to={`/?authorSearch=${book.author}`} className="link">
                            <span className="bookAuthor">{book.author}</span>
                        </Link>
                </span>
                <span className="bookPrice">Price: {book.price}</span>
                <span className="bookQ">Quantity: {book.quantity}</span>
            </div>

            
            <Link to={`/book/${book._id}`} className="bookBtn link">
                <p>Show</p>
            </Link>
        </div>
    )
}

export default Book
