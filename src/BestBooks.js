import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import bookImg from './book.jpeg'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import BookFormModal from './BookFormModal';
import { withAuth0 } from '@auth0/auth0-react';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showForm: false,
      bookToBeUpdated: null
    }
  }

  /* DONE: Make a GET request to your API to fetch all the books from the database  */
  componentDidMount = async () => {
    try {
      if (this.props.auth0.isAuthenticated) {
      const res = await this.props.auth0.getIdTokenClaims();
        const jwt = res.__raw;
        console.log('token: ', jwt);

        const config = {
          headers: { "Authorization": `Bearer ${jwt}` }, 
          method: 'get',
          baseURL: process.env.REACT_APP_SERVER,
          url: '/books'
        };
        
        const response = await axios(config);
        console.log(response.data);
        this.setState({
          books: response.data
        })
      }
      } catch (error) {
        console.error(error);
      }
  }

  createBook = async (newBook) => {
    try {
      if (this.props.auth0.isAuthenticated) {
        const res = await this.props.auth0.getIdTokenClaims();
        const jwt = res.__raw;
        console.log('token: ', jwt);

      const config = {
        headers: { "Authorization": `Bearer ${jwt}` }, 
        method: 'post',
        baseURL: process.env.REACT_APP_SERVER,
        url: '/books/',
        data: newBook
      }
      const response = await axios(config);
      console.log(response.data);
      const newBooksArray = [...this.state.books, response.data]
      this.setState({ books: newBooksArray });
      }
    } catch (error) {
      console.error(error);
    }
  }

  deleteBook = async (bookToBeDeleted) => {
    try {
      const proceed = window.confirm(`do you want to delete ${bookToBeDeleted.title}?`);

      if (proceed && this.props.auth0.isAuthenticated) {
        const res = await this.props.auth0.getIdTokenClaims();
        const jwt = res.__raw;
        console.log('token: ', jwt);

        const config = {
          headers: { "Authorization": `Bearer ${jwt}` },
          method: 'delete',
          baseURL: process.env.REACT_APP_SERVER,
          url: `/books/${bookToBeDeleted._id}`
        };
        const response = await axios(config);
        console.log(response.data);

        const newBooks = this.state.books.filter(book => book._id !== bookToBeDeleted._id);
      this.setState({ books: newBooks });
      }
      }catch(error){
        console.error(error);
    }
  }

  updateBook = async (updatedBook) => {
    try {
      if (this.props.auth0.isAuthenticated) {
        const res = await this.props.auth0.getIdTokenClaims();
        const jwt = res.__raw;
        console.log('token: ', jwt);

      const config = {
        headers: { "Authorization": `Bearer ${jwt}` }, 
        method: 'put',
        baseURL: process.env.REACT_APP_SERVER,
        url: `/books/${updatedBook._id}`,
        data: updatedBook
      };  
       console.log(config); 
       const updatedBookResult = await axios(config);
       console.log(updatedBookResult.data);

      let updatedBooks = this.state.books.map(book => {
        if (book._id === updatedBookResult.data._id) {
          return updatedBookResult;
        } else {
          return book;
        }
      });

      this.setState({
        books: updatedBooks
      });
    }
    } catch (error) {
      console.error('Error in BestBooks updateBook:', error);
     
    }
  }


  CloseError = () => this.setState({ errorMessage: '' });
  closeBookFormModal = () => this.setState({ showForm: false });
  selectBookToUpdate = (bookToBeUpdated) => this.setState({ bookToBeUpdated, showForm: true });

  render() {
    /* DONE: render all the books in a Carousel */
    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.showForm &&
          <BookFormModal
            showForm={this.state.showForm}
            closeBookFormModal={this.closeBookFormModal}
            createBook={this.createBook}
            bookToBeUpdated={this.state.bookToBeUpdated}
            updateBook={this.updateBook}
          />}

    {this.state.books.length > 0 ? (
                <Carousel id="height">
                  {this.state.books.map(book => (
                    <Carousel.Item key={book._id}>
                      <Image
                        id="image"
                        className="w-100"
                        src={bookImg}
                        alt={book.title}
                      />
                      <Carousel.Caption id="carousel-text">
                        <h2 className="carousel-text">{book.title}</h2>
                        <p className="carousel-text">{book.description}</p>
                        <p className="carousel-text">Status: {book.status}</p>
                        <Button onClick={() => this.setState({ showForm: true })}>Add a Book</Button>
                        <Button onClick={() => this.selectBookToUpdate(book)}>Update</Button>
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

export default withAuth0(BestBooks);
