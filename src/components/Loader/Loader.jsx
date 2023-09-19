import { ThreeDots } from 'react-loader-spinner';
import { Loaderwrapper } from './Loader.styled';

export default function Loader() {
  return (
    <ThreeDots
      height="80"
      width="80"
      radius="9"
      color="#14eee3"
      ariaLabel="three-dots-loading"
      wrapperStyle={{ display: 'inline-block', textAlign: 'center' }}
      wrapperClassName=""
      visible={true}
    />
  );
}
