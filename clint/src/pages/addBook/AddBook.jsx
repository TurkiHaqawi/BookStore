import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import "./AddBook.css";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

function AddBook() {
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [file, setFile] = useState(null);
  const addBookDecode = jwt_decode(user.accessToken);
  const navigation = useNavigate();

  const hnadleSubmit = async (e) => {
    e.preventDefault();
    const newBook = {
      username: addBookDecode.username,
      title,
      desc,
      author,
      price,
      quantity,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newBook.bookPhoto = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axios.post("/books", newBook);
      navigation(`/book/${res.data._id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="addBook">
      <h1>All Fields are Required</h1>

      <form className="bookForm" onSubmit={hnadleSubmit}>
        <label>User Name: </label>
        <input
          type="text"
          value={addBookDecode.username}
          className="input username"
          readOnly
        />
        <label>Book Title: </label>
        <input
          type="text"
          className="input"
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Book Description: </label>
        <textarea
          type="text"
          className="input"
          onChange={(e) => setDesc(e.target.value)}
        />
        <label>Book Author: </label>
        <input
          type="text"
          className="input"
          onChange={(e) => setAuthor(e.target.value)}
        />
        <label>Book Price: </label>
        <input
          type="number"
          className="input"
          onChange={(e) => setPrice(e.target.value)}
        />
        <label>Book Quantity: </label>
        <input
          type="number"
          className="input"
          onChange={(e) => setQuantity(e.target.value)}
        />

        <label htmlFor="inputFiel" className="inputFiel">
          <i className="fas fa-plus"></i>Add Book Photo
        </label>
        <input
          type="file"
          id="inputFiel"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />

        {file && <img src={URL.createObjectURL(file)} alt="" />}

        <button className="btnBook" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}

export default AddBook;
