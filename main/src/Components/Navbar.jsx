
import { PiBatteryVerticalEmptyBold } from "react-icons/pi";
import { MdBatteryFull } from "react-icons/md";
import useCartStore from "../Zustand/useCartStore";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const { cart } = useCartStore();
  const navigate = useNavigate();
  return (
    <nav className="navbar flex items-center justify-between p-4 bg-black text-white">
      <span className="text-bold cursor-pointer" onClick={()=> navigate('/')}>21 Gun Salute</span>
      <span onClick={() => navigate("/cart")} className="cursor-pointer flex items-center gap-2">

     {cart.length >0 ? <MdBatteryFull /> : <PiBatteryVerticalEmptyBold/>}
      </span>
    </nav>
  );
}
