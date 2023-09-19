import { ButtonMore } from './Button.styled';

export default function Button(props) {
  return <ButtonMore onClick={props.onClick}>Load more</ButtonMore>;
}
