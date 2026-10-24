import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

const LinearChart = props => {
  const {quarterCommitCount} = props

  return (
    <LineChart
      width={330}
      height={200}
      data={quarterCommitCount}
      margin={{top: 5, right: 10, left: 0, bottom: 5}}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="quarterCommitCount"
        stroke="#8884d8"
        activeDot={{r: 8}}
      />
    </LineChart>
  )
}

export default LinearChart
