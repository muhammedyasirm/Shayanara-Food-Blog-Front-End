import React, {useState} from 'react'
import { XIcon, CloudUploadIcon } from "@heroicons/react/solid";
import axios from '../../axios/adminAxios';
import { useNavigate } from "react-router-dom";

const AddBanner = () => {

    const [imageFile, setImageFile] = useState(null);
    const [bannerName, setBannerName] = useState("");
    const [foodName, setFoodName] = useState("");
    const [hotelName, setHotelName] = useState("");
    const [offer, setOffer] = useState("");

    const navigate = useNavigate();

    const handleRecipeNameChange = (event) => {
        setBannerName(event.target.value);
    };

    const handlefoodNameChange = (event) => {
        setFoodName(event.target.value);
    };

    const handleImageUpload = (event) => {
        setImageFile(event.target.files[0]);
    };

    const handlehotelNameChange = (event) => {
        setHotelName(event.target.value);
    };  
    
    const handleOfferChange = (event) => {
        setOffer(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData();
        data.append("bannerName", bannerName);
        data.append("foodName", foodName);
        data.append("hotelName", hotelName);
        data.append("offer", offer);
        data.append("image",imageFile);

       axios.post("/admin/addBanner", data, {
        headers: {
            "Content-type": "multipart/form-data"
        }
       }).then((result) => {
        navigate("/admin/bannerTable");     
       })
    };


  return (
    <div>
      <form encType="multipart/form-data" onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="mb-6">
                <label htmlFor="recipe-name" className="block font-medium mb-1">
                    Banner Name
                </label>
                <input
                    id="banner-name"
                    type="text"
                    name="bannerName"
                    value={bannerName}
                    onChange={handleRecipeNameChange}
                    required
                    className="w-full rounded-md shadow-sm border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
            </div>
            <div className="mb-6">
                <label htmlFor="image" className="block font-medium mb-1">
                    Image
                </label>
                <div className="flex items-center">
                    <label htmlFor="image" className="cursor-pointer rounded-md font-medium py-2 px-4 bg-white border border-gray-300 hover:bg-gray-50">
                        <span className="text-blue-600 hover:text-blue-500">
                            <CloudUploadIcon className="h-6 w-6 mr-1" />
                            Select an image
                        </span>
                        <input
                            id="image"
                            name="image"
                            type="file"
                            className="hidden"
                            onChange={handleImageUpload}
                        />
                    </label>
                    {imageFile && (
                        <div className="flex items-center ml-2">
                            <img src={URL.createObjectURL(imageFile)} alt="Recipe" className="h-12 w-12 object-cover rounded-lg" />
                            <button onClick={() => setImageFile(null)} className="ml-2 rounded-md font-medium py-2 px-4 bg-white border border-gray-300 hover:bg-gray-50">
                                <span className="text-red-600 hover:text-red-500">
                                    <XIcon className="h-6 w-6" />
                                </span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className="mb-6">
                <label htmlFor="recipe-name" className="block font-medium mb-1">
                    Food Name
                </label>
                <input
                    id="food-name"
                    type="text"
                    name="foodName"
                    value={foodName}
                    onChange={handlefoodNameChange}
                    required
                    className="w-full rounded-md shadow-sm border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
            </div>

            <div className="mb-6">
                <label htmlFor="recipe-name" className="block font-medium mb-1">
                    Hotel Name
                </label>
                <input
                    id="hotel-name"
                    type="text"
                    name="hotelName"
                    value={hotelName}
                    onChange={handlehotelNameChange}
                    required
                    className="w-full rounded-md shadow-sm border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
            </div>

            <div className="mb-6">
                <label htmlFor="recipe-name" className="block font-medium mb-1">
                    Offer
                </label>
                <input
                    id="offer"
                    type="text"
                    name="offer"
                    value={offer}
                    onChange={handleOfferChange}
                    required
                    className="w-full rounded-md shadow-sm border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
            </div>
            
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-4"
                >
                    Submit
                </button>
            </div>
        </form>
    </div>
  )
}

export default AddBanner
