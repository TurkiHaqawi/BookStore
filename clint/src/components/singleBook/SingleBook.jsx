import "./SingleBook.css";
import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../../context/Context";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";

function SingleBook() {
  const FP = "http://localhost:8080/images/";

  const location = useLocation();
  const path = location.pathname.split("/")[2];
  localStorage.setItem("path", path);
  const [book, setBook] = useState({});
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updatedMode, setUpdatedMode] = useState(false);
  const [deletedMode, setDeletedMode] = useState(false);
  const [bookNumber, setBookNumber] = useState(1);
  localStorage.setItem("items", bookNumber);
  const [buy, setBuy] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  let decodeToken = "";
  const navigation = useNavigate();

  if (user) {
    decodeToken = jwt_decode(user.accessToken);
  }

  useEffect(() => {
    const getBook = async () => {
      const res = await axios.get("/books/" + path);
      setBook(res.data);
      setLoading(true);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };

    getBook();
  }, [path]);

  const handelUpdate = async () => {
    try {
      await axios.put("/books/" + path, {
        username: decodeToken.username,
        title,
        desc,
      });
      window.location.reload();
      setUpdatedMode(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelet = async () => {
    try {
      await axios.delete("/books/" + path, {
        data: { username: decodeToken.username },
      });
      navigation("/");
      setDeletedMode(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleBuy = () => {
    if (user) {
      setBuy(true);
    } else {
      navigation("/login");
    }
  };

  const handleContinue = async () => {
    if (book.quantity > bookNumber) {
      let quantity = book.quantity - bookNumber;
      await axios.put("/books/" + path, {
        username: decodeToken.username,
        quantity,
      });
      navigation("/buyPage");
    } else {
      setBuy(false);
      setError(true);
    }
  };

  return (
    <>
      {loading ? (
        <div className="singleBook">
          <div>
            <img src={FP + book.bookPhoto} alt="" className="singleImg" />

            {updatedMode ? (
              <input
                type="text"
                className="titleInput"
                value={title}
                autoFocus
                onChange={(e) => setTitle(e.target.value)}
              />
            ) : (
              <h1 className="singleBookTitle">{book.title}</h1>
            )}

            <div className="singleInfo">
              <div>
                <p className="singleBookAuthor">
                  Author: <span className="bookAuthor">{book.author}</span>
                </p>
              </div>

              {book.username === decodeToken?.username ? (
                <div className="singleBookEdit">
                  <i
                    className="singleBookIcon far fa-edit"
                    onClick={() => setUpdatedMode(true)}
                  ></i>
                  <i
                    className="singleBookIcon far fa-trash-alt"
                    onClick={() => setDeletedMode(true)}
                  ></i>
                </div>
              ) : (
                <div className="IncDecBook">
                  <i
                    className="IncDec inc fas fa-plus"
                    onClick={() => setBookNumber(bookNumber + 1)}
                  ></i>
                  <div
                    className="bookValue"
                    onChange={(e) => setBookNumber(e.target.value)}
                  >
                    {bookNumber}
                  </div>
                  <i
                    className="IncDec dec fas fa-minus"
                    onClick={() => setBookNumber(bookNumber - 1)}
                  ></i>
                </div>
              )}
            </div>
            {updatedMode ? (
              <textarea
                className="descInput"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            ) : (
              <div className="singleBookDesc">
                <p>{book.desc}</p>
              </div>
            )}

            {book.username === decodeToken?.username ? null : (
              <button className="singleBTN buyBTN" onClick={handleBuy}>
                Buy
              </button>
            )}

            {updatedMode ? (
              <>
                <button className="singleBTN update" onClick={handelUpdate}>
                  Update
                </button>
                <button
                  className="singleBTN"
                  onClick={() => setUpdatedMode(false)}
                >
                  Cancel
                </button>
              </>
            ) : null}

            {deletedMode ? (
              <div className="popup">
                <div className="content">Are you sure to delete this Book?</div>

                <button
                  className="popupBtn"
                  onClick={() => setDeletedMode(false)}
                >
                  Cancecl
                </button>
                <button className="popupBtn delete" onClick={handleDelet}>
                  Delete
                </button>
              </div>
            ) : // <></>
            null}

            {buy && (
              <div className="popup">
                <div className="content">Are you sure to Buy this Book?</div>

                <button className="popupBtn" onClick={() => setBuy(false)}>
                  Cancecl
                </button>
                <button className="popupBtn continue" onClick={handleContinue}>
                  Yes, Continue
                </button>
              </div>
            )}

            {error && (
              <div className="popup">
                <div className="content">
                  We are sorry, there is not enough quantity of this book at the
                  moment
                </div>

                <button className="popupBtn" onClick={() => setError(false)}>
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default SingleBook;
