import ImageGalleryItem from 'components/ImageGalleryItem';
import { Ul } from './ImageGallery.styled';

export default function ImageGallery(props) {
  return (
    <Ul className="gallery">
      {props.images.map(img => {
        return (
          <ImageGalleryItem
            src={img.webformatURL}
            key={img.id}
            largeImageURL={img.largeImageURL}
            onClick={props.onClick}
          />
        );
      })}
    </Ul>
  );
}
