import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  return (
    <div className="header">
      <div className="seachSection">
        <div className="__search">
          <div className="search">
            <form>
              <input
                type="text"
                name="name"
                className="inputSearch"
                autoComplete="off"
                required
                onChange={(e) => setTitle(e.target.value)}
              />
              <label htmlFor="name" className="label_name">
                <span className="content_name">Enter the book title</span>
              </label>
              <Link to={`/?titleSearch=${title}`} className="link">
                <button className="btnSearch">Search by Book Title</button>
              </Link>
            </form>
          </div>
          <div className="search">
            <form>
              <input
                type="text"
                name="name"
                className="inputSearch"
                autoComplete="off"
                required
                onChange={(e) => setAuthor(e.target.value)}
              />
              <label htmlFor="name" className="label_name">
                <span className="content_name">Enter the book auther</span>
              </label>
              <Link to={`/?authorSearch=${author}`} className="link">
                <button className="btnSearch">Search by Book Author</button>
              </Link>
            </form>
          </div>
        </div>
      </div>
      <div className="imgSection">
        <img src="images/bookImg.jpg" alt="" className="img" />
      </div>
    </div>
  );
}

export default Header;
