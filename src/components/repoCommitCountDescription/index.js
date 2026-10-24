import './index.css'

const RepoCommitCountDescription = props => {
  const {description, repoCommitCountDescriptions} = props

  return (
    <li className="repoCommitCountDescHeading">
      {repoCommitCountDescriptions[description]}
    </li>
  )
}
export default RepoCommitCountDescription
