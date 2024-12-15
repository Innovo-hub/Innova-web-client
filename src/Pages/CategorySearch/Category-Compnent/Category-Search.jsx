function CategorySearch({ name, from, to, location }) {
  return (
    <div className="bg-main-color rounded-b-2xl py-10 px-8">
      <div className="grid lg:grid-cols-3 grid-cols-1 lg:space-y-0 space-y-3">
        <div className="flex">
          <input
            className="rounded-2xl text-black outline-none p-2 "
            placeholder="Search by name"
          />
        </div>
        <div className="flex items-center gap-2">
          <label>from</label>
          <input
            className="rounded-2xl text-black outline-none p-2 w-1/2"
          />
          <label>to</label>
          <input
            className="rounded-2xl text-black outline-none p-2 w-1/2"
          />
        </div>
        <div className="flex items-center">
          <label>Location</label>
          <input className="rounded-2xl text-black outline-none" />
        </div>
      </div>
    </div>
  );
}

export default CategorySearch;
