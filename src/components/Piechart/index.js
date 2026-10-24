import {PieChart, Pie, Legend, Cell} from 'recharts'

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  'purple',
  'Pink',
  'Orange',
  'red',
]

const Piechart = props => {
  const {pieLanguages = []} = props

  return (
    <PieChart width={330} height={250}>
      <Pie
        cx="35%"
        cy="50%"
        data={pieLanguages}
        startAngle={0}
        endAngle={360}
        innerRadius="40%"
        outerRadius="70%"
        dataKey="value"
        nameKey="name"
      >
        {pieLanguages.map((entry, index) => (
          <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend
        iconType="square"
        layout="vertical"
        verticalAlign="middle"
        align="right"
      />
    </PieChart>
  )
}

export default Piechart
