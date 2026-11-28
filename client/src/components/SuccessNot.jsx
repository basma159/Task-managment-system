import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function SuccessNot({ text, successNot }) {
  return (
    <div role="status" aria-live="polite"
      className={`successNot absolute ${successNot ? "block" : "hidden"} bottom-10 right-4 bg-white shadow-2xl ring-1 ring-purple-900 rounded-xl p-2 z-50`}
    >
      <p className="flex justify-center items-center gap-3">
        <FontAwesomeIcon
          icon={faCheck}
          style={{
            backgroundColor: "purple",
            color: "white",
            borderRadius: "20px",
            padding: "7px",
          }}
        />
        {text}
      </p>
    </div>
  );
}

export default SuccessNot;
