import CountUp from "react-countup";

function StatCard({

title,

value,

icon,

color

}){

return(

<div className="bg-white rounded-2xl shadow-lg p-6">

<div className="flex justify-between items-center">

<div>

<p className="text-gray-500">

{title}

</p>

<h1 className="text-4xl font-bold mt-3">

<CountUp

end={value}

duration={2}

/>

</h1>

</div>

<div

className={`text-5xl ${color}`}

>

{icon}

</div>

</div>

</div>

);

}

export default StatCard;