import { Overlay } from './Modal.styled';

export default function Modal(props) {
  return (
    <Overlay
      className="overlay"
      onClick={props.onClick}
      onKeyDown={e => {
        if (e.key === 'Escape') console.log(e.key);
      }}
    >
      <div className="modal">
        <img src={props.src} alt="" onClick={e => e.stopPropagation()} />
      </div>
    </Overlay>
  );
}
