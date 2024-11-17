/* eslint-disable react/prop-types */
function MainButton({ ButtonText , className }) {
  return (
    <>
      <button className={className}>
        {ButtonText}
      </button>
    </>
  );
}

export default MainButton;
