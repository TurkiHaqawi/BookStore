import "./BuyPage.css"
import {  useEffect, useState } from "react"
import axios from 'axios'

function BuyPage() {

    const path = localStorage.getItem("path")
    const items = localStorage.getItem("items")
    const [book, setBook] = useState({})

    // console.log(path)
    // console.log(items)

    useEffect(() => {
        const getBook = async () => {
            const res = await axios.get("/books/" + path)
            setBook(res.data)
        }
        
        getBook()
    }, [path])
    return (
        <div className="buyPage">
            <h1>You want to Buy This Book: <span className="buyBook">{book.title}</span> </h1>

            <div className="bookInvoice">
                <h2>Book Information</h2>

                <div className="table">
                    <header className="col-section">
                        <div>Book Name</div>
                        <div> Author</div>
                        <div> Quantity</div>
                        <div> Price</div>
                    </header>
                    <div className="row-section">
                        <div>{book.title}</div>
                        <div>{book.author}</div>
                        <div>{items}</div>
                        <div>{book.price}</div>
                    </div>
                </div>
            </div>

            <button className="paymentBTN">Continue to Payment</button>
        </div>
    )
}

export default BuyPage
