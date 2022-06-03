import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import bookImg from './book.jpeg'
import axios from 'axios';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

 /* DONE: Make a GET request to your API to fetch all the books from the database  */
  componentDidMount = async () => {
    try {
      const config = {
        method: 'get',
        baseURL: process.env.REACT_APP_SERVER,
        url: './books'
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
  render() {
    /* DONE: render all the books in a Carousel */
    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

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
