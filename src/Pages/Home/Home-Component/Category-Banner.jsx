import Slide1 from '../../../assets/Products/slide11.png';
import Slide2 from '../../../assets/Products/slide2.png';
import Slide3 from '../../../assets/Products/slide3.png';
import Categorieslist from './Categories-list';
function CategoryBanner() {
  return (
    <div className="grid lg:grid-cols-4 grid-cols-1 lg:px-8 px-4 mt-8 gap-8">
      <div className="col-span-1 w-full">
        <Categorieslist />
      </div>
      <div className="lg:col-span-2 col-span-1 space-y-6">
        <img src={Slide1} className="w-full rounded-lg h-64" />
        <div className="relative w-full group ">
          <img src={Slide2} className="lg:flex w-full hidden rounded-lg h-64" />

          {/* Absolute div with blur effect */}
          <div className="px-3 absolute inset-0 w-1/2 backdrop-blur-sm shadow-md bg-white/30 left-10 top-8 bottom-8 rounded-lg lg:flex hidden flex-col items-start justify-center transition-opacity">

            <h2 className="font-bold text-2xl">Explore Hand crafted Products</h2>
            <h2 className="font-bold text-lg">Feel Free Shopping</h2>
          </div>
        </div>

      </div>
      <div className="col-span-1">
        <img src={Slide3} className="lg:flex w-full hidden h-[90%]" />
      </div>
    </div>
  )
}

export default CategoryBanner