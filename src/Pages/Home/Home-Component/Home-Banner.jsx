function HomeBanner() {
  return (
    <>
    <div className="flex justify-between items-center bg-main-color py-6 px-16">
        <input className="rounded-3xl px-4 outline-none lg:w-1/2 w-full py-2" placeholder="Search anything.." />
        <h3 className="text-white hidden lg:block">Free exploring products</h3>
        <h3 className="text-white hidden lg:block">100% secure payments</h3>
    </div>
    </>
  )
}

export default HomeBanner