import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Languages from '../Languages'
import Contributors from '../Contributors'
import Piechart from '../Piechart'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RepositoryItemDetails extends Component {
  state = {
    repositoryItemDetailsList: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getGitHubUserRepositoryItemDetails()
  }

  getGitHubUserRepositoryItemDetails = async () => {
    const {username, repoName} = this.props

    this.setState({apiStatus: apiStatusConstants.inProgress})

    const url = `REACT_APP_KEY=your_actual_token_here`

    try {
      const response = await fetch(url)

      if (!response.ok) {
        this.setState({apiStatus: apiStatusConstants.failure})
        return
      }

      const data = await response.json()

      const updatedData = {
        name: data.name,
        description: data.description,
        languages: Array.isArray(data.languages) ? data.languages : [],
        stargazersCount: data.stargazers_count,
        forksCount: data.forks_count,
        watchersCount: data.watchers_count,
        issuesCount: data.open_issues_count,
        contributors: Array.isArray(data.contributors)
          ? data.contributors.map(contributor => ({
              id: contributor.id,
              avatarUrl: contributor.avatar_url,
              login: contributor.login,
              contribution:
                contributor.contributions ?? contributor.contribution,
            }))
          : [],
        owner: data.owner || {},
      }

      this.setState({
        repositoryItemDetailsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } catch {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickTryAgain = () => {
    this.getGitHubUserRepositoryItemDetails()
  }

  renderSuccessView = () => {
    const {repositoryItemDetailsList} = this.state

    const {
      name,
      description,
      languages,
      stargazersCount,
      forksCount,
      watchersCount,
      issuesCount,
      contributors,
      owner,
    } = repositoryItemDetailsList

    return (
      <div data-testid="repoItem" className="repo-item">
        <h1 className="heading">Repositories</h1>

        <div className="repoItemDetailsContainer">
          <div className="repositoryItemContainer1">
            <div className="repoHeaderContainer">
              <h1 className="repoItemHeading">{name}</h1>
              <img
                src={owner.avatar_url}
                alt={owner.login}
                className="repoAvatarUrl"
              />
            </div>

            <p className="repoItemDesc">{description}</p>

            <div className="languagesListContainer">
              {languages.map((language, index) => (
                <Languages
                  key={language.name}
                  languageDetails={language}
                  index={index}
                />
              ))}
            </div>

            <div className="repoCountContainer">
              <div className="starContainer">
                <img
                  src="https://res.cloudinary.com/ddsn9feta/image/upload/v1719294440/Star_-_16px.1_cpjsj4.png"
                  alt="star"
                  className="start-image"
                />
                <p className="repoItemStar">{stargazersCount}</p>
              </div>

              <div className="forksContainer">
                <img
                  src="https://res.cloudinary.com/ddsn9feta/image/upload/v1719294440/Git_3_w5zp4b.png"
                  alt="git"
                  className="git-image"
                />
                <p className="repoItemForks">{forksCount}</p>
              </div>
            </div>

            <div className="commit-issues-count-container">
              <div className="repo-item-counts-container">
                <p className="repo-item-count-heading">Watchers Counts</p>
                <p className="repo-item-counts">{watchersCount}</p>
              </div>

              <div className="repo-item-counts-container">
                <p className="repo-item-count-heading">Issues Counts</p>
                <p className="repo-item-counts">{issuesCount}</p>
              </div>
            </div>

            <div className="contributors-container">
              <h1 className="contributors-heading">Contributors</h1>
              <p className="contributors-desc">{contributors.length} Members</p>

              <div className="contributors-images-container">
                {contributors.map(contributor => (
                  <Contributors
                    contributorDetails={contributor}
                    key={contributor.id}
                  />
                ))}
              </div>
            </div>

            <div className="pieChart-container">
              <h1 className="pieChart-language-heading">Languages</h1>
              <Piechart pieLanguages={languages} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="repositoryFailureContainer">
      <img
        src="https://res.cloudinary.com/ddsn9feta/image/upload/v1718604995/Group_7522_f4ueqy.png"
        alt="failure view"
        className="error-view"
      />
      <p className="errorName">Something went wrong. Please try again</p>
      <button
        className="tryButton"
        type="button"
        onClick={this.onClickTryAgain}
      >
        Try Again
      </button>
    </div>
  )

  renderLoaderView = () => (
    <div className="repository-loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#3B82F6" height={50} width={50} />
    </div>
  )

  renderGitRepositoryItemDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="repositoriesContainer">
          {this.renderGitRepositoryItemDetails()}
        </div>
      </>
    )
  }
}

export default RepositoryItemDetails
