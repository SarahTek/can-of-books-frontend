import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class BookFormModal extends React.Component {
  handleNewBookSubmit=(event) => {
    event.preventDefault();
    const newBook = {
      title: event.target.title.value,
      description: event.target.description.value,
      status: event.target.status.value
    };
    console.log(newBook);
    this.props.createBook(newBook);
    this.props.closeBookFormModal();
  }
  render() {
    return (
      <Modal show={this.props.showForm} onHide={this.props.closeBookFormModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add a New Book To Your Favs</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleNewBookSubmit}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Book Title</Form.Label>
              <Form.Control type="text" placeholder="Book Title Goes Here" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Book Description</Form.Label>
              <Form.Control type='text' placeholder='book description'/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="status">
              <Form.Label>Book Status</Form.Label>
              <Form.Control as='select'>
                <option value="LIFE-CHANGING">LIFE-CHANGING</option>
                <option value="FAVOURITE FIVE">FAVOURITE FIVE</option>
                <option value="RECOMMENDED TO ME">RECOMMENDED TO ME</option>
                <option value="ROMANTIC NOVEL">ROMANTIC NOVEL</option>
                <option value="POETRY">POETRY</option>
              </Form.Control>
            </Form.Group>

            <Button type="submit">Add a New Book</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.closeBookFormModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default BookFormModal;