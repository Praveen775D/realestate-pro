import {

PieChart,

Pie,

Cell,

Tooltip,

ResponsiveContainer

} from "recharts";

const COLORS=[

"#2563eb",

"#16a34a",

"#ea580c",

"#9333ea",

"#dc2626"

];

function PieAnalytics({

data

}){

return(

<div className="bg-white rounded-2xl shadow p-6">

<h2 className="text-xl font-bold mb-6">

Property Types

</h2>

<div className="h-72">

<ResponsiveContainer>

<PieChart>

<Pie

data={data}

dataKey="value"

label

>

{

data.map((entry,index)=>(

<Cell

key={index}

fill={COLORS[index%COLORS.length]}

/>

))

}

</Pie>

<Tooltip/>

</PieChart>

</ResponsiveContainer>

</div>

</div>

);

}

export default PieAnalytics;