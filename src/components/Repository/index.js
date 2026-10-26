import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import RepositoryCard from '../RepositoryCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Repository extends Component {
  state = {
    repositoriesList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    const {username} = this.props

    if (username) {
      this.getGitHubUserRepositoryDetails()
    }
  }

  getGitHubUserRepositoryDetails = async () => {
    const {username} = this.props

    if (!username) {
      return
    }

    this.setState({apiStatus: apiStatusConstants.inProgress})

    const url = `https://apis2.ccbp.in/gpv/repos/${username}?api_key=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`

    try {
      const response = await fetch(url, {method: 'GET'})

      if (!response.ok) {
        this.setState({apiStatus: apiStatusConstants.failure})
        return
      }

      const data = await response.json()
      const updatedData = (Array.isArray(data) ? data : []).map(eachItem => ({
        ...eachItem,
        createdAt: eachItem.created_at,
        defaultBranch: eachItem.default_branch,
        forksCount: eachItem.forks_count,
        fullName: eachItem.full_name,
        htmlUrl: eachItem.html_url,
        languageUrl: eachItem.languages_url,
        nodeId: eachItem.node_id,
        openIssues: eachItem.open_issues,
        openIssuesCount: eachItem.open_issues_count,
        pushedAt: eachItem.pushed_at,
        stargazersCount: eachItem.stargazers_count,
        subscriptionUrl: eachItem.subscription_url,
        updatedAt: eachItem.updated_at,
        watchersCount: eachItem.watchers_count,
        webCommitSignOffRequired: eachItem.web_commit_signoff_required,
        languages: Array.isArray(eachItem.languages) ? eachItem.languages : [],
      }))

      this.setState({
        repositoriesList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } catch {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickTryAgain = () => {
    this.getGitHubUserRepositoryDetails()
  }

  renderRepositoriesSuccessView = () => {
    const {repositoriesList} = this.state

    if (repositoriesList.length === 0) {
      return (
        <div className="noDataRepoAnalysisContainer">
          <img
            src="https://res.cloudinary.com/ddsn9feta/image/upload/v1719653254/Layer_3_1_jxjnnu.png"
            alt="no repositories"
            className="no-data-image"
          />
          <h1 className="noDataHeading">No Repositories Found!</h1>
        </div>
      )
    }

    const owner = repositoriesList[0].owner || {}
    const {login, avatar_url: avatarUrl} = owner

    return (
      <div className="repositories-success-container">
        {login && (
          <div className="repository-owner-container">
            <img src={avatarUrl} alt={login} className="repoAvatarUrl" />
            <h1 className="ownerLoginHeading">{login}</h1>
          </div>
        )}

        <h1 className="repositorySuccessHeading">Repositories</h1>

        <div className="repositorySuccessListContainer">
          {repositoriesList.map(eachRepository => (
            <RepositoryCard
              repositoryDetails={eachRepository}
              key={eachRepository.id}
            />
          ))}
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
        Try again
      </button>
    </div>
  )

  renderLoaderView = () => (
    <div className="repository-loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#3B82F6" height={50} width={50} />
    </div>
  )

  renderGitRepositoryDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoriesSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  renderNoDataFound = () => (
    <div className="noDataFoundContainer">
      <img
        src="https://res.cloudinary.com/ddsn9feta/image/upload/v1718949987/Repository-NoDataFound-2x_dzw1h2.png"
        alt="empty repositories"
        className="repo-no-data-img"
      />
      <h1 className="repo-no-data-heading">No Data Found</h1>
      <p className="repo-no-data-desc">
        GitHub Username is empty, please provide a valid username for
        Repositories
      </p>
      <Link to="/">
        <button type="button" className="goto-home-button">
          Go to Home
        </button>
      </Link>
    </div>
  )

  render() {
    const {username} = this.props

    return (
      <>
        <Header />
        <div className="repositoriesContainer">
          {username === ''
            ? this.renderNoDataFound()
            : this.renderGitRepositoryDetails()}
        </div>
      </>
    )
  }
}

export default Repository
