import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class BookFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.bookToBeUpdated?._id || null,
      title: this.props.bookToBeUpdated?.title || '',
      description: this.props.bookToBeUpdated?.description || '',
      status: this.props.bookToBeUpdated?.status || 'RECOMMENDED TO ME',
      method: this.props.bookToBeUpdated ? 'put' : 'post',
      formTitle: this.props.bookToBeUpdated ? 'Update this book' : 'Add book to my favourite List'
    }
  }
  handleNewBookSubmit = (event) => {
    event.preventDefault();
    const book = {
      _id: this.props.bookToBeUpdated?._id || null,
      title: this.state.title,
      description: this.state.description,
      status: this.state.status
    };

    if (this.state.method === 'put') {
      this.props.updateBook(book);
    }else{
      this.props.createBook(book);
    }
    this.props.closeBookFormModal();
  }



  render() {
    return (
      <Modal show={this.props.showForm} onHide={this.props.closeBookFormModal}>
        <Modal.Header closeButton>
          <Modal.Title>{this.state.formTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleNewBookSubmit}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Book Title</Form.Label>
              <Form.Control type="text" placeholder="Book Title Goes Here"
                onChange={(event) => this.setState({ title: event.target.value })}
                defaultValue={this.state.title}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Book Description</Form.Label>
              <Form.Control type='text' placeholder='book description'
                onChange={(event) => this.setState({ description: event.target.value })}
                defaultValue={this.state.description}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="status">
              <Form.Label>Book Status</Form.Label>
              <Form.Control as='select'
                onChange={(event) => this.setState({ status: event.target.value })}
                defaultValue={this.state.status}
              >
                <option value="LIFE-CHANGING">LIFE-CHANGING</option>
                <option value="FAVOURITE FIVE">FAVOURITE FIVE</option>
                <option value="RECOMMENDED TO ME">RECOMMENDED TO ME</option>
                <option value="ROMANTIC NOVEL">ROMANTIC NOVEL</option>
                <option value="POETRY">POETRY</option>
              </Form.Control>
            </Form.Group>

            <Button type="submit">Update a Book</Button>
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
