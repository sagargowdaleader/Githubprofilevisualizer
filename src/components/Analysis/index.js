import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import LinearChart from '../LinearChart'
import LanguageRepoCountPie from '../LangRepoCountPie'
import LanguageCommitCountPie from '../LangCommitCountPie'
import RepoCommitCountPie from '../RepoCommitCountPie'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Analysis extends Component {
  state = {
    analysisList: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    const {username} = this.props

    if (username !== '') {
      this.getGitHubUserAnalysisDetails()
    }
  }

  descendingSort = (first, second) => {
    const firstValue = first.commits ?? first.value ?? 0
    const secondValue = second.commits ?? second.value ?? 0

    return secondValue - firstValue
  }

  getGitHubUserAnalysisDetails = async () => {
    const {username} = this.props

    if (!username) {
      return
    }

    this.setState({apiStatus: apiStatusConstants.inProgress})

    const url = `https://apis2.ccbp.in/gpv/profile-summary/${username}?api_key=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`

    try {
      const response = await fetch(url, {method: 'GET'})

      if (!response.ok) {
        this.setState({apiStatus: apiStatusConstants.failure})
        return
      }

      const data = await response.json()

      if (!data || !data.user) {
        this.setState({apiStatus: apiStatusConstants.failure})
        return
      }

      this.setState({
        analysisList: data,
        apiStatus: apiStatusConstants.success,
      })
    } catch {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickTryAgain = () => {
    this.getGitHubUserAnalysisDetails()
  }

  renderAnalysisSuccessView = () => {
    const {analysisList} = this.state
    const {
      user,
      quarterCommitCount = {},
      langRepoCount = {},
      langCommitCount = {},
      repoCommitCount = {},
    } = analysisList

    if (!user) {
      return null
    }

    const quarterCommitData = Object.keys(quarterCommitCount).map(key => ({
      name: key,
      commits: quarterCommitCount[key],
    }))

    const langRepoData = Object.keys(langRepoCount).map(key => ({
      name: key,
      value: langRepoCount[key],
    }))

    const langCommitData = Object.keys(langCommitCount).map(key => ({
      name: key,
      value: langCommitCount[key],
    }))

    const repoCommitData = Object.keys(repoCommitCount)
      .map(key => ({
        name: key,
        value: repoCommitCount[key],
      }))
      .sort(this.descendingSort)
      .slice(0, 10)

    const {avatarUrl, login} = user

    return (
      <div className="AnalysisSuccessViewContainer">
        <div className="analysisHeadingContainer">
          <h4 className="analysis">{login}</h4>
          <img src={avatarUrl} alt={login} className="repoAvatarUrl" />
        </div>

        <div className="linearChartContainer">
          {/* Removed descendingSort so chronological order/quarter names are preserved */}
          <LinearChart quarterCommitCount={quarterCommitData} />
        </div>

        <div className="langRepoCommitCountContainer">
          <div className="pielanguageCountContainer">
            <h3 className="pieLangCountHeadingRep">Language Per Repos</h3>
            <LanguageRepoCountPie
              langRepoCount={langRepoData.sort(this.descendingSort)}
            />
          </div>

          <div className="pielCommitanguageCountContainer">
            <h4 className="pieLangCountHeading">Language Per Commits</h4>
            <LanguageCommitCountPie
              langCommitCount={langCommitData.sort(this.descendingSort)}
            />
          </div>
        </div>

        <div className="repoCommitDescContainer">
          <div className="repoCommitContainer">
            <h2 className="repoCommitHeading">Commits Per Repo (Top 10)</h2>
            <RepoCommitCountPie repoCommitCount={repoCommitData} />
          </div>
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="analysisFailureContainer">
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
    <div className="analysis-loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#3B82F6" height={50} width={50} />
    </div>
  )

  renderGitAnalysisDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderAnalysisSuccessView()
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
        alt="empty analysis"
        className="analysis-no-data-img"
      />
      <h1 className="analysis-no-data-heading">No Data Found</h1>
      <p className="analysis-no-data-desc">
        GitHub Username is empty, please provide a valid username for Analysis.
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
        <div className="analysisContainer">
          {username === '' ? (
            this.renderNoDataFound()
          ) : (
            <div className="testcaseContainer">
              <h1 className="analysisTestHeading">Analysis</h1>
              {this.renderGitAnalysisDetails()}
            </div>
          )}
        </div>
      </>
    )
  }
}

export default Analysis
