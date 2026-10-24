import {PieChart, Pie, Legend, Cell} from 'recharts'

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  'Pink',
  '#F2637F',
  'Orange',
  'purple',
]

const LanguageRepoCountPie = props => {
  const {langRepoCount} = props

  return (
    <PieChart width={330} height={200}>
      <Pie
        cx="40%"
        cy="50%"
        data={langRepoCount}
        startAngle={0}
        endAngle={360}
        innerRadius="40%"
        outerRadius="70%"
        dataKey="value"
        nameKey="name"
      >
        {langRepoCount.map((entry, index) => (
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

export default LanguageRepoCountPie
