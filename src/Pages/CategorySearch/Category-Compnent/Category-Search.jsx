function CategorySearch({ name, from, to, location }) {
  return (
    <div className="bg-main-color rounded-br-[70px] py-10 w-full text-white">
      <div className="grid lg:grid-cols-3 grid-cols-1 lg:space-y-0 space-y-3 px-10">
        <div className="flex px-8">
          <input
            className="rounded-2xl text-black outline-none p-2 ps-5 w-full"
            placeholder="Search by name"
          />
        </div>
        <div className="flex items-center gap-6">
          <div className="flex justify-center items-center gap-2">
            <label>from</label>
            <input className="rounded-lg text-black outline-none p-2 w-1/2" />
          </div>
          <div className="flex justify-center items-center gap-2">
            <label>to</label>
            <input className="rounded-lg text-black outline-none p-2 w-1/2" />
          </div>
        </div>
        <div className="flex items-center space-x-2 ">
          <label>Location</label>
          <input className="rounded-lg text-black outline-none p-2 w-full" />
        </div>
      </div>
      <h2 className="text-center text-xl mt-6">Related Categories</h2>
    </div>
  );
}

export default CategorySearch;
