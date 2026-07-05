import { useEffect, useState } from "react";

import {
  getProperties,
} from "../services/propertyService";

import PropertyCard from "../components/PropertyCard";
import SearchBar from "../components/SearchBar";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";

function Properties() {

  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {

    const result = properties.filter((property) => {

      const keyword = search.toLowerCase();

      return (

        property.title?.toLowerCase().includes(keyword) ||

        property.location?.city?.toLowerCase().includes(keyword) ||

        property.location?.state?.toLowerCase().includes(keyword)

      );

    });

    setFilteredProperties(result);

  }, [search, properties]);

  const fetchProperties = async () => {

    try {

      const data = await getProperties();

      const propertyList = Array.isArray(data)
        ? data
        : data.properties || [];

      setProperties(propertyList);

      setFilteredProperties(propertyList);

    }

    catch (error) {

      console.log(error);

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div className="max-w-7xl mx-auto px-5 py-10">

      <div className="mb-10">

        <h1 className="text-4xl font-bold mb-3">

          Explore Properties

        </h1>

        <p className="text-gray-500">

          Find your dream property from our latest listings.

        </p>

      </div>

      <div className="mb-8">

        <SearchBar

          value={search}

          onChange={(e) =>

            setSearch(e.target.value)

          }

        />

      </div>

      {

        loading ?

          <Loading />

          :

          filteredProperties.length === 0 ?

            <EmptyState />

            :

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              {

                filteredProperties.map((property) => (

                  <PropertyCard

                    key={property._id}

                    property={property}

                  />

                ))

              }

            </div>

      }

    </div>

  );

}

export default Properties;