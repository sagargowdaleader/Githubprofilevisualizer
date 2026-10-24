import {PieChart, Pie, Legend, Cell} from 'recharts'

const COLORS = [
  'Pink',
  '#00C49F',
  '#FFBB28',
  '#0088FE',
  '#F2637F',
  'Orange',
  'purple',
]

const RepoCommitCountPie = props => {
  const {repoCommitCount} = props

  return (
    <PieChart width={330} height={250}>
      <Pie
        cx="35%"
        cy="50%"
        data={repoCommitCount}
        startAngle={0}
        endAngle={360}
        innerRadius="40%"
        outerRadius="70%"
        dataKey="value"
        nameKey="name"
      >
        {repoCommitCount.map((entry, index) => (
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

export default RepoCommitCountPie
