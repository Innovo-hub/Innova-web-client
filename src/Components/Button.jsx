/* eslint-disable react/prop-types */
function Button({ ButtonText }) {
  return (
    <>
      <button className="bg-main-color text-btn-text-color px-6 py-2">
        {ButtonText}
      </button>
    </>
  );
}

export default Button;
