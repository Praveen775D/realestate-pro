import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Contact(){

  return(

    <>

      <Navbar/>

      <div className="container mx-auto py-20">

        <h1 className="text-5xl font-bold">

          Contact Us
          

        </h1>
        <h4>
            Name: Rammurthi <br/>
            Email: rammurthi@example.com
            Mobile: 7288010038
            
        </h4>

      </div>

      <Footer/>

    </>

  );

}

export default Contact;