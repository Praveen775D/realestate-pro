import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import {

getPropertyById,

updateProperty

} from "../services/propertyService";

import ImageUploader from "../components/ImageUploader";

import { uploadImages } from "../services/uploadService";

function EditProperty(){

const { id } = useParams();

const navigate = useNavigate();

const [loading,setLoading]=useState(false);

const [images,setImages]=useState([]);

const [formData,setFormData]=useState({

title:"",

propertyType:"Apartment",

category:"Sale",

area:"",

pricePerSqft:"",

totalPrice:"",

description:"",

status:"Available",

featured:false,

address:"",

city:"",

state:"",

pincode:"",

latitude:"",

longitude:"",

googleMap:"",

phone:"",

email:"",

video:"",

amenities:"",

nearbyPlaces:""

});

useEffect(()=>{

loadProperty();

},[]);

const loadProperty=async()=>{

const data=await getPropertyById(id);

const property=data.property || data;

setFormData({

title:property.title,

propertyType:property.propertyType,

category:property.category,

area:property.area,

pricePerSqft:property.pricePerSqft,

totalPrice:property.totalPrice,

description:property.description,

status:property.status,

featured:property.featured,

address:property.location?.address,

city:property.location?.city,

state:property.location?.state,

pincode:property.location?.pincode,

latitude:property.location?.latitude,

longitude:property.location?.longitude,

googleMap:property.location?.googleMap,

phone:property.office?.phone,

email:property.office?.email,

video:property.video,

amenities:property.amenities?.join(","),

nearbyPlaces:property.nearbyPlaces?.join(",")

});

};

const handleChange=(e)=>{

const{name,value,type,checked}=e.target;

setFormData({

...formData,

[name]:

type==="checkbox"

?checked

:value

});

};
useEffect(() => {

  if (formData.area && formData.pricePerSqft) {

    setFormData((prev) => ({

      ...prev,

      totalPrice:
        Number(prev.area) *
        Number(prev.pricePerSqft),

    }));

  }

}, [

  formData.area,

  formData.pricePerSqft,

]);

const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    setLoading(true);

    let uploadedImages = [];

    if (images.length > 0) {

      const uploadResponse =
        await uploadImages(images);

      uploadedImages =
        uploadResponse.images.map(
          (img) => img.url
        );

    }

    const payload = {

      title: formData.title,

      propertyType:
        formData.propertyType,

      category:
        formData.category,

      area:
        Number(formData.area),

      pricePerSqft:
        Number(formData.pricePerSqft),

      totalPrice:
        Number(formData.totalPrice),

      description:
        formData.description,

      status:
        formData.status,

      featured:
        formData.featured,

      video:
        formData.video,

      images:
        uploadedImages,

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

        phone:
          formData.phone,

        email:
          formData.email

      },

      location: {

        address:
          formData.address,

        city:
          formData.city,

        state:
          formData.state,

        pincode:
          formData.pincode,

        latitude:
          formData.latitude,

        longitude:
          formData.longitude,

        googleMap:
          formData.googleMap

      }

    };

    await updateProperty(id, payload);

    alert("Property Updated Successfully");

    navigate("/properties");

  }

  catch (error) {

    console.log(error);

    alert("Update Failed");

  }

  finally {

    setLoading(false);

  }

};
return (

<div className="max-w-7xl mx-auto">

<div className="mb-8">

<h1 className="text-4xl font-bold">

Edit Property

</h1>

<p className="text-gray-500">

Update Property Information

</p>

</div>

<form

onSubmit={handleSubmit}

className="space-y-8"

>

<div className="bg-white rounded-2xl shadow p-8">

<h2 className="text-2xl font-bold mb-6">

Basic Information

</h2>

<div className="grid grid-cols-2 gap-6">

<input

name="title"

value={formData.title}

onChange={handleChange}

placeholder="Title"

className="border rounded-xl p-3"

/>

<select

name="propertyType"

value={formData.propertyType}

onChange={handleChange}

className="border rounded-xl p-3"

>

<option>Apartment</option>

<option>Villa</option>

<option>House</option>

<option>Plot</option>

<option>Commercial</option>

</select>

<select

name="category"

value={formData.category}

onChange={handleChange}

className="border rounded-xl p-3"

>

<option>Sale</option>

<option>Rent</option>

</select>

<select

name="status"

value={formData.status}

onChange={handleChange}

className="border rounded-xl p-3"

>

<option>Available</option>

<option>Sold</option>

<option>Booked</option>

</select>

</div>

</div>
<div className="bg-white rounded-2xl shadow p-8">

<h2 className="text-2xl font-bold mb-6">

Pricing

</h2>

<div className="grid grid-cols-3 gap-5">

<input

type="number"

name="area"

value={formData.area}

onChange={handleChange}

placeholder="Area"

className="border rounded-xl p-3"

/>

<input

type="number"

name="pricePerSqft"

value={formData.pricePerSqft}

onChange={handleChange}

placeholder="Price Per Sqft"

className="border rounded-xl p-3"

/>

<input

readOnly

value={formData.totalPrice}

className="bg-gray-100 rounded-xl p-3"

/>

</div>

</div>
<div className="bg-white rounded-2xl shadow p-8">

<h2 className="text-2xl font-bold mb-6">

Description

</h2>

<textarea

rows="6"

name="description"

value={formData.description}

onChange={handleChange}

className="border rounded-xl p-4 w-full"

/>

</div>
<div className="bg-white rounded-2xl shadow p-8">

<h2 className="text-2xl font-bold mb-6">

Upload Images

</h2>

<ImageUploader

images={images}

setImages={setImages}

/>

</div>
<div className="text-center">

<button

type="submit"

disabled={loading}

className="bg-green-600 hover:bg-green-700 text-white px-12 py-4 rounded-xl text-xl"

>

{

loading

?

"Updating..."

:

"Update Property"

}

</button>

</div>

</form>

</div>

);

}

export default EditProperty;