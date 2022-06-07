import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import bookImg from './book.jpeg'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import BookFormModal from './BookFormModal';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showForm: false
    }
  }

  /* DONE: Make a GET request to your API to fetch all the books from the database  */
  componentDidMount = async () => {
    try {
      const config = {
        method: 'get',
        baseURL: process.env.REACT_APP_SERVER,
        url: '/books'
      }
      const response = await axios(config);
      this.setState({
        books: response.data
      })
    } catch (error) {
      console.error(error);
      this.setState({
        errorMessage: `Status Code: ${error.response.status}: ${error.response.data}`
      })
    }
  }

  createBook = async (newBook) => {
    try {
      const config = {
        method: 'post',
        baseURL: process.env.REACT_APP_SERVER,
        url: '/books/',
        data: newBook
      }
      const response = await axios(config);
      const newBooksArray = [...this.state.books, response.data]
      this.setState({
        books: newBooksArray
      })
    } catch (error) {
      console.error(error);
      this.setState({
        errorMessage: `Status Code: ${error.response.status}: ${error.response.data}`
      })
    }
  }

  deleteBook = async (bookToBeDeleted) => {
    try {
      const proceed = window.confirm(`do you want to delete ${bookToBeDeleted.title}?`);
      
      let newBooks = this.state.books.filter(book => book._id !== bookToBeDeleted._id);
      this.setState({
        books: newBooks,
        errorMessage: ''
      });

      if (proceed) {
        const config = {
          method: 'delete',
          baseURL: process.env.REACT_APP_SERVER,
          url: `/books/${bookToBeDeleted._id}`,
        };
        await axios(config);
      }
    } catch (error) {
      console.error('Error in BestBooks deleteBook:', error);
      this.setState({
        errorMessage: `Status Code: ${error.response.status}: ${error.response.data}`
      })
    }
  }


  closeBookFormModal = () => this.setState({ showForm: false });

  render() {
    /* DONE: render all the books in a Carousel */
    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        <Button onClick={() => this.setState({ showForm: true })}>Add a Book</Button>

        {/* conditional rendering */}
        {this.state.showForm &&
          <BookFormModal
            showForm={this.state.showForm}
            closeBookFormModal={this.closeBookFormModal}
            createBook={this.createBook}
          />}

        {this.state.books.length ? (
          <Carousel>
            {this.state.books.map(book => (
              <Carousel.Item>
                <Image
                  className="w-100"
                  src={bookImg}
                  alt={book.title}
                />
                <Carousel.Caption>
                  <h2 className="carousel-text">{book.title}</h2>
                  <p className="carousel-text">{book.description}</p>
                  <p className="carousel-text">Status: {book.status}</p>
                  <Button onClick={() => this.deleteBook(book)}>Delete</Button>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <h3>No Books Found :(</h3>
        )}
      </>
    )
  }
}

export default BestBooks;
