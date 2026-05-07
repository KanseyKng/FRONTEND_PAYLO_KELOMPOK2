import { useNavigate } from 'react-router-dom';

interface Props {
  to?: string;
}

const BackButton = ({ to }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <i
      className="fa-solid fa-arrow-left text-white text-xl cursor-pointer hover:opacity-80"
      onClick={handleClick}
    />
  );
};

export default BackButton;