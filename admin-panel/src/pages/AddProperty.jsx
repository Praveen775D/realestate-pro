import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createProperty } from "../services/propertyService";
import { uploadImages } from "../services/uploadService";
import ImageUploader from "../components/ImageUploader";

function AddProperty() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [images, setImages] = useState([]);

  const [formData, setFormData] = useState({

    title: "",

    propertyType: "Apartment",

    category: "Sale",

    area: "",

    pricePerSqft: "",

    totalPrice: "",

    description: "",

    status: "Available",

    featured: false,

    address: "",

    city: "",

    state: "",

    pincode: "",

    latitude: "",

    longitude: "",

    googleMap: "",

    phone: "",

    email: "",

    video: "",

    amenities: "",

    nearbyPlaces: ""

  });

  useEffect(() => {

    if (
      formData.area &&
      formData.pricePerSqft
    ) {

      setFormData((prev) => ({

        ...prev,

        totalPrice:

          Number(prev.area) *
          Number(prev.pricePerSqft)

      }));

    }

  }, [

    formData.area,

    formData.pricePerSqft

  ]);

  const handleChange = (e) => {

    const {

      name,

      value,

      type,

      checked

    } = e.target;

    setFormData({

      ...formData,

      [name]:

        type === "checkbox"

          ? checked

          : value

    });

  };
  const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    setLoading(true);

    let uploadedImages = [];

    if (images.length > 0) {

      const uploadRes = await uploadImages(images);

      uploadedImages = uploadRes.images.map(

        img => img.url

      );

    }

    const payload = {

      title: formData.title,

      propertyType: formData.propertyType,

      category: formData.category,

      area: Number(formData.area),

      pricePerSqft: Number(formData.pricePerSqft),

      totalPrice: Number(formData.totalPrice),

      description: formData.description,

      status: formData.status,

      featured: formData.featured,

      images: uploadedImages,

      video: formData.video,

      amenities:

        formData.amenities

          .split(",")

          .map(item => item.trim())

          .filter(Boolean),

      nearbyPlaces:

        formData.nearbyPlaces

          .split(",")

          .map(item => item.trim())

          .filter(Boolean),

      office: {

        phone: formData.phone,

        email: formData.email

      },

      location: {

        address: formData.address,

        city: formData.city,

        state: formData.state,

        pincode: formData.pincode,

        latitude: formData.latitude,

        longitude: formData.longitude,

        googleMap: formData.googleMap

      }

    };

    await createProperty(payload);

    alert("Property Added Successfully");

    navigate("/properties");

  }

  catch (error) {
    console.log(error.response?.data);
    console.log(error);
  }

  finally {

    setLoading(false);

  }

};
return (

<div className="max-w-7xl mx-auto">

    <div className="mb-8">

        <h1 className="text-4xl font-bold">
            Add New Property
        </h1>

        <p className="text-gray-500 mt-2">
            Fill all property details carefully.
        </p>

    </div>

<form
onSubmit={handleSubmit}
className="space-y-8"
>

{/* ================= BASIC DETAILS ================= */}

<div className="bg-white rounded-2xl shadow p-8">

<h2 className="text-2xl font-bold mb-6">

Basic Information

</h2>

<div className="grid grid-cols-2 gap-6">

<div>

<label className="font-semibold">

Title

</label>

<input

type="text"

name="title"

value={formData.title}

onChange={handleChange}

required

className="w-full mt-2 border rounded-xl p-3"

/>

</div>

<div>

<label className="font-semibold">

Property Type

</label>

<select

name="propertyType"

value={formData.propertyType}

onChange={handleChange}

className="w-full mt-2 border rounded-xl p-3"

>

<option>Apartment</option>

<option>Villa</option>

<option>House</option>

<option>Plot</option>

<option>Commercial</option>

</select>

</div>

<div>

<label className="font-semibold">

Category

</label>

<select

name="category"

value={formData.category}

onChange={handleChange}

className="w-full mt-2 border rounded-xl p-3"

>

<option>Sale</option>

<option>Rent</option>

</select>

</div>

<div>

<label className="font-semibold">

Status

</label>

<select

name="status"

value={formData.status}

onChange={handleChange}

className="w-full mt-2 border rounded-xl p-3"

>

<option>Available</option>

<option>Sold</option>

<option>Booked</option>

</select>

</div>

</div>

</div>

{/* ================= PRICE ================= */}

<div className="bg-white rounded-2xl shadow p-8">

<h2 className="text-2xl font-bold mb-6">

Pricing

</h2>

<div className="grid grid-cols-3 gap-6">

<div>

<label>

Area (Sq.ft)

</label>

<input

type="number"

name="area"

value={formData.area}

onChange={handleChange}

className="w-full mt-2 border rounded-xl p-3"

/>

</div>

<div>

<label>

Price / Sq.ft

</label>

<input

type="number"

name="pricePerSqft"

value={formData.pricePerSqft}

onChange={handleChange}

className="w-full mt-2 border rounded-xl p-3"

/>

</div>

<div>

<label>

Total Price

</label>

<input

type="number"

readOnly

value={formData.totalPrice}

className="w-full mt-2 bg-gray-100 rounded-xl p-3"

/>

</div>

</div>

</div>

{/* ================= LOCATION ================= */}

<div className="bg-white rounded-2xl shadow p-8">

<h2 className="text-2xl font-bold mb-6">

Location

</h2>

<input

type="text"

name="address"

placeholder="Address"

value={formData.address}

onChange={handleChange}

className="border rounded-xl p-3 w-full mb-5"

/>

<div className="grid grid-cols-3 gap-5">

<input

type="text"

name="city"

placeholder="City"

value={formData.city}

onChange={handleChange}

className="border rounded-xl p-3"

/>

<input

type="text"

name="state"

placeholder="State"

value={formData.state}

onChange={handleChange}

className="border rounded-xl p-3"

/>

<input

type="text"

name="pincode"

placeholder="Pincode"

value={formData.pincode}

onChange={handleChange}

className="border rounded-xl p-3"

/>

</div>

<div className="grid grid-cols-2 gap-5 mt-5">

<input

type="text"

name="latitude"

placeholder="Latitude"

value={formData.latitude}

onChange={handleChange}

className="border rounded-xl p-3"

/>

<input

type="text"

name="longitude"

placeholder="Longitude"

value={formData.longitude}

onChange={handleChange}

className="border rounded-xl p-3"

/>

</div>

<input

type="text"

name="googleMap"

placeholder="Google Map URL"

value={formData.googleMap}

onChange={handleChange}

className="border rounded-xl p-3 w-full mt-5"

/>

</div>
{/* ================= DESCRIPTION ================= */}

<div className="bg-white rounded-2xl shadow p-8">

  <h2 className="text-2xl font-bold mb-6">
    Description
  </h2>

  <textarea
    rows="6"
    name="description"
    value={formData.description}
    onChange={handleChange}
    placeholder="Write complete property description..."
    className="w-full border rounded-xl p-4 resize-none"
  />

</div>

{/* ================= FEATURES ================= */}

<div className="bg-white rounded-2xl shadow p-8">

  <h2 className="text-2xl font-bold mb-6">
    Property Features
  </h2>

  <div className="grid grid-cols-2 gap-6">

    <div>

      <label className="font-semibold">
        Amenities
      </label>

      <input
        type="text"
        name="amenities"
        value={formData.amenities}
        onChange={handleChange}
        placeholder="Swimming Pool,Gym,Power Backup,Lift"
        className="border rounded-xl p-3 w-full mt-2"
      />

      <p className="text-sm text-gray-500 mt-2">
        Separate using commas.
      </p>

    </div>

    <div>

      <label className="font-semibold">
        Nearby Places
      </label>

      <input
        type="text"
        name="nearbyPlaces"
        value={formData.nearbyPlaces}
        onChange={handleChange}
        placeholder="Hospital,School,Metro,Mall"
        className="border rounded-xl p-3 w-full mt-2"
      />

      <p className="text-sm text-gray-500 mt-2">
        Separate using commas.
      </p>

    </div>

  </div>

  <div className="mt-8">

    <label className="flex items-center gap-4">

      <input
        type="checkbox"
        name="featured"
        checked={formData.featured}
        onChange={handleChange}
        className="w-5 h-5"
      />

      <span className="font-semibold">
        Featured Property
      </span>

    </label>

  </div>

</div>

{/* ================= OFFICE ================= */}

<div className="bg-white rounded-2xl shadow p-8">

  <h2 className="text-2xl font-bold mb-6">

    Office Contact

  </h2>

  <div className="grid grid-cols-2 gap-6">

    <input
      type="text"
      name="phone"
      placeholder="Phone Number"
      value={formData.phone}
      onChange={handleChange}
      className="border rounded-xl p-3"
    />

    <input
      type="email"
      name="email"
      placeholder="Office Email"
      value={formData.email}
      onChange={handleChange}
      className="border rounded-xl p-3"
    />

  </div>

</div>

{/* ================= IMAGES ================= */}

<div className="bg-white rounded-2xl shadow p-8">

  <h2 className="text-2xl font-bold mb-6">

    Upload Property Images

  </h2>

  <ImageUploader

    images={images}

    setImages={setImages}

  />

</div>

{/* ================= VIDEO ================= */}

<div className="bg-white rounded-2xl shadow p-8">

  <h2 className="text-2xl font-bold mb-6">

    Video

  </h2>

  <input

    type="text"

    name="video"

    value={formData.video}

    onChange={handleChange}

    placeholder="YouTube Video URL"

    className="w-full border rounded-xl p-3"

  />

</div>

{/* ================= BUTTON ================= */}

<div className="text-center pb-12">

  <button

    type="submit"

    disabled={loading}

    className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 rounded-xl text-xl font-bold transition"

  >

    {

      loading

      ?

      "Saving Property..."

      :

      "Save Property"

    }

  </button>

</div>

</form>

</div>

);

}

export default AddProperty;