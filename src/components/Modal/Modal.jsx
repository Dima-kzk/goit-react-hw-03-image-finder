import { Component } from 'react';
import { Overlay } from './Modal.styled';

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyBoard);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyBoard);
  }

  handleKeyBoard = e => {
    if (e.key === 'Escape') this.props.toggleModal();
  };

  render() {
    return (
      <Overlay className="overlay" onClick={this.props.toggleModal}>
        <div className="modal">
          <img src={this.props.src} alt="" onClick={e => e.stopPropagation()} />
        </div>
      </Overlay>
    );
  }
}

export default Modal;
