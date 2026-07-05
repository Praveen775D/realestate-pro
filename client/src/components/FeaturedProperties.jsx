import { useEffect, useState } from "react";

import { getFeaturedProperties } from "../services/propertyService";

import PropertyCard from "./PropertyCard";
import Loading from "./Loading";

function FeaturedProperties() {

  const [properties, setProperties] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchFeaturedProperties();

  }, []);

  const fetchFeaturedProperties = async () => {

    try {

      const data = await getFeaturedProperties();

      if (Array.isArray(data)) {

        setProperties(data);

      } else {

        setProperties(data.properties || []);

      }

    }

    catch (error) {

      console.log(error);

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <section className="max-w-7xl mx-auto px-6 py-20">

      <div className="text-center mb-12">

        <h2 className="text-4xl font-bold">

          Featured Properties

        </h2>

        <p className="text-gray-500 mt-3">

          Explore our hand-picked premium properties.

        </p>

      </div>

      {

        loading ?

          <Loading />

          :

          properties.length === 0 ?

            <div className="text-center text-gray-500">

              No Featured Properties

            </div>

            :

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              {

                properties.map((property) => (

                  <PropertyCard

                    key={property._id}

                    property={property}

                  />

                ))

              }

            </div>

      }

    </section>

  );

}

export default FeaturedProperties;