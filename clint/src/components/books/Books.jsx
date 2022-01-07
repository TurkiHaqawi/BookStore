import "./Books.css"
import Book from '../book/Book'

function Books( {books} ) {
    return (
        <div className="books">
            {books.map((b, index) => (
                <Book book={b} key={index}/>
            ))}
        </div>
    )
}

export default Books
