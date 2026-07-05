import {

LineChart,

Line,

XAxis,

YAxis,

Tooltip,

CartesianGrid,

ResponsiveContainer

} from "recharts";

function AnalyticsChart({

data

}){

return(

<div className="bg-white rounded-2xl shadow p-6">

<h2 className="text-xl font-bold mb-6">

Monthly Analytics

</h2>

<div className="h-80">

<ResponsiveContainer>

<LineChart data={data}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="month"/>

<YAxis/>

<Tooltip/>

<Line

type="monotone"

dataKey="properties"

stroke="#2563eb"

strokeWidth={3}

/>

</LineChart>

</ResponsiveContainer>

</div>

</div>

);

}

export default AnalyticsChart;