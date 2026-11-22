import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import lock from "../assets/lock.png";

function InPasswordField({ type, placeholder, value, Function, icon, onChange }) {
    return (
        <div className="relative">
            <input
                type={type}
                placeholder={placeholder}
                className="py-3 px-10 w-full rounded-xl ring-purple-300 ring-1 outline-none focus:ring-purple-500 [&::-ms-reveal]:hidden"
                value={value} onChange={onChange} />

            <img
                src={lock}
                alt="lock"
                className="absolute left-3 top-4 w-4"
            />
            <button onClick={Function} type="button">
                <FontAwesomeIcon
                    icon={icon}
                    className="absolute right-3 top-4 cursor-pointer text-gray-500"
                />
            </button>

        </div>)
}

export default InPasswordField;