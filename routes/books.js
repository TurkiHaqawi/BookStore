const router = require("express").Router()
const Book = require("../models/Book")
const jwt = require("jsonwebtoken")

// VERIFY FUNC
const verify = (req,res,next) => {
    const authHeaders = req.headers['authorization']
    if(authHeaders) {
        const token = authHeaders.split(' ')[1]
        
        jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
            if(err) {
                res.status(403).json("Token is not valid")
            }
            
            req.user = payload;
            next();
        }) 
    }else {
        res.status(401).json("you are not authonticated")
    }
}

// CREATE BOOK
router.post("/", verify, async (req, res) => {
    const newBook = new Book(req.body);
    try {
        const savedBook = await newBook.save()
        res.status(200).json(savedBook)
    } catch (err) {
        res.status(500).json(err)
    }
})


// UPDATE BOOK
router.put("/:id", verify, async (req,res) => {
    if(req.body.username === req.user.username) {
        try {
            const updatedBook = await Book.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, {new: true})
            res.status(200).json(updatedBook)
        } catch (err) {
            res.status(401).json("There is not Book with this Id")
        }
    } else {
        res.status(500).json("somthing wrong!...")
    }
})


//DELETE BOOK
router.delete("/:id", verify, async (req,res) => {
    if(req.body.username === req.user.username) {
        const book = await Book.findById(req.params.id)
        try {
            await book.delete()
            res.status(200).json("The Book has been deleted successfuly...")
        } catch (err) {
            res.status(401).json("There is not Book with this Id to deleted!")
        }
    } else {
        res.status(500).json("somthing wrong!...")
    }
})


// GET BOOK
router.get("/:id", async (req,res) => {
    try {
        const book = await Book.findById(req.params.id)
        res.status(200).json(book)
    
    } catch (err) {
        res.status(500).json(err)
    }
})


// QUERY
router.get("/", async (req,res) => {
    const title = req.query.titleSearch;
    const author = req.query.authorSearch;
    
    try {
        let books;
        if(title) {
            books = await Book.find({ title })
        } else if (author) {
            books = await Book.find({ author })
        }
        else {
            books = await Book.find()
        }

        res.status(200).json(books)
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router;