"use client";

import { useDispatch } from "react-redux";

import { removeFromCart } from "@/redux/cartSlice";

interface PopupProps {
  close: () => void;
  removeitem: string | null;
}

const Popup = ({
  close,
  removeitem,
}: PopupProps) => {
  const dispatch = useDispatch();

  const removeCart = () => {
    if (removeitem !== null) {
      dispatch(removeFromCart(removeitem));
    }

    close();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
      
      {/* Popup Box */}
      <div className="bg-white rounded-2xl p-8 w-[90%] max-w-md shadow-2xl">
        
        <p className="text-xl font-semibold text-center mb-8">
          Do You Want to Remove From Cart?
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-5">
          
          <button
            onClick={removeCart}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-all duration-300"
          >
            Confirm
          </button>

          <button
            onClick={close}
            className="bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-lg transition-all duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
