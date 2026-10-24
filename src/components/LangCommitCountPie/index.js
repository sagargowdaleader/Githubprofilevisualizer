import {PieChart, Pie, Legend, Cell} from 'recharts'

const COLORS = [
  'Orange',
  'Pink',
  '#F2637F',
  '#0088FE',
  'yellow',
  '#00C49F',
  'purple',
]

const LanguageCommitCountPie = props => {
  const {langCommitCount} = props

  return (
    <PieChart width={330} height={200}>
      <Pie
        cx="40%"
        cy="50%"
        data={langCommitCount}
        startAngle={0}
        endAngle={360}
        innerRadius="40%"
        outerRadius="70%"
        dataKey="value"
        nameKey="name"
      >
        {langCommitCount.map((entry, index) => (
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

export default LanguageCommitCountPie
