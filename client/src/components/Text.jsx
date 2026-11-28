import { Link } from "react-router-dom";

function Text({ text, signText, signLink }) {
  return (
    <p className="text-center text-gray-600">
      {text}
      <Link to={signLink} className="text-purple-700 font-semibold ml-1">
        {signText}
      </Link>
    </p>
  );
}

export default Text;
