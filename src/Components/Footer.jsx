import { Link } from "react-router-dom"
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function Footer() {
  return (
    <div className="lg:grid hidden lg:grid-cols-4 grid-cols-2 bg-[#262626] px-16 py-10 text-white">
        <div className="flex flex-col space-y-4">
            <h2 className="text-2xl font-bold">INNOVA HUB</h2>
            <p>Handmade Products made with<br></br>
            love and hard work</p>
        </div>
        <div className="flex flex-col space-y-2">
            <Link to={`/`}>Home</Link>
            <Link to={``}>Categories</Link>
            <Link>Contact</Link>
            <Link>About</Link>
        </div>
        <div className="flex flex-col space-y-2">
            <Link><NavigateNextIcon /></Link>
            <Link><NavigateNextIcon /></Link>
            <Link><NavigateNextIcon /></Link>
            <Link><NavigateNextIcon /></Link>
        </div>
        <div className="flex flex-col space-y-2">
            <h2>Feel Free to talk with us!</h2>
            <input className="rounded-md px-2 py-1 text-black outline-none" placeholder="User@Example.com"/>
            <button className="text-white rounded-lg w-1/2 py-1 bg-main-color">Send</button>
        </div>
    </div>
  )
}

export default Footer