import { Li } from './ImageGalleryItem.styled';

export default function ImageGalleryItem(props) {
  return (
    <Li
      className="gallery-item"
      onClick={() => {
        props.onClick(props.largeImageURL);
      }}
    >
      <img src={props.src} alt="" />
    </Li>
  );
}
