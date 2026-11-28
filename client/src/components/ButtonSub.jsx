function ButtonSub({ isSubmitting, loading, noLoading }) {
  const style = "text-white bg-purple-800 py-3 w-full rounded-xl";

  return (
    <button
      type="submit"
      className={`${isSubmitting ? `${style} opacity-40 cursor-not-allowed` : `${style} cursor-pointer hover:bg-purple-900 transition`}`}
      disabled={isSubmitting}
    >
      {isSubmitting ? loading : noLoading}
    </button>
  );
}

export default ButtonSub;
