
function InputField({ type, placeholder, value, image, nameImage, onChange }) {
    return (
        <div className="relative">
            <input
                type={type}
                placeholder={placeholder}
                className="py-3 px-10 w-full rounded-xl ring-purple-300 ring-1 outline-none focus:ring-purple-500"
                value={value} onChange={onChange} />

            <img
                src={image}
                alt={nameImage}
                className="absolute left-3 top-4 w-4"
            />
        </div>
    )
}

export default InputField;