import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {HiOutlineSearch} from 'react-icons/hi'
import {RiBuildingLine} from 'react-icons/ri'
import {IoLocationOutline} from 'react-icons/io5'
import {IoMdLink} from 'react-icons/io'
import UsernameContext from '../../context/UsernameContext'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    profileDetails: null,
    apiStatus: apiStatusConstants.initial,
    errorMsg: '',
  }

  getGitHubUserProfileDetails = async username => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
      errorMsg: '',
    })

    const apiUrl = `https://apis2.ccbp.in/gpv/profile-details/${username}?api_key=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`

    try {
      const response = await fetch(apiUrl)

      if (!response.ok) {
        this.setState({
          apiStatus: apiStatusConstants.failure,
          profileDetails: null,
        })
        return
      }

      const data = await response.json()

      const updatedData = {
        avatarUrl: data.avatar_url,
        bio: data.bio,
        blog: data.blog,
        company: data.company,
        createdAt: data.created_at,
        email: data.email,
        eventsUrl: data.events_url,
        followers: data.followers,
        followersUrl: data.followers_url,
        following: data.following,
        followingUrl: data.following_url,
        gistsUrl: data.gists_url,
        gravatarId: data.gravatar_id,
        hireable: data.hireable,
        htmlUrl: data.html_url,
        id: data.id,
        location: data.location,
        login: data.login,
        name: data.name,
        nodeId: data.node_id,
        organizationsUrl: data.organizations_url,
        publicGists: data.public_gists,
        receivedEventsUrl: data.received_events_url,
        reposUrl: data.repos_url,
        siteAdmin: data.site_admin,
        starredUrl: data.starred_url,
        subscriptionsUrl: data.subscriptions_url,
        twitterUsername: data.twitter_username,
        type: data.type,
        updatedAt: data.updated_at,
        url: data.url,
        publicRepos: data.public_repos,
      }

      this.setState({
        profileDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } catch (error) {
      this.setState({
        profileDetails: null,
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickSearch = username => {
    const trimmedUsername = username.trim()

    if (trimmedUsername === '') {
      this.setState({
        errorMsg: 'Enter a valid GitHub username.',
        profileDetails: null,
        apiStatus: apiStatusConstants.initial,
      })
      return
    }

    this.setState({errorMsg: ''})
    this.getGitHubUserProfileDetails(trimmedUsername)
  }

  onClickTryAgain = () => {
    const {username} = this.context

    if (username.trim() !== '') {
      this.getGitHubUserProfileDetails(username.trim())
    } else {
      this.setState({
        apiStatus: apiStatusConstants.initial,
        profileDetails: null,
        errorMsg: '',
      })
    }
  }

  renderGithubDetailsOfProfile = () => {
    const {profileDetails} = this.state

    const {
      avatarUrl,
      name,
      login,
      bio,
      blog,
      followers,
      following,
      publicRepos,
      company,
      location,
      organizationsUrl,
    } = profileDetails

    return (
      <div data-testid="repoItem" className="repo-item">
        <div className="profileDetailsContainer">
          <img src={avatarUrl} alt={name} className="avatar-url" />
          <p className="login">{login}</p>
          <h1 className="name">{name}</h1>

          <p className="bio">BIO</p>
          <p className="bio">{bio}</p>

          <p className="bio">Blog</p>
          <p className="bio">{blog}</p>

          <div className="followers-following-public-container">
            <div className="followers-container">
              <p className="followers">{followers}</p>
              <p className="followers-heading">FOLLOWERS</p>
            </div>

            <hr className="hor-line" />

            <div className="following-container">
              <p className="followers">{following}</p>
              <p className="followers-heading">FOLLOWING</p>
            </div>

            <hr className="hor-line" />

            <div className="pubic-repos-container">
              <p className="followers">{publicRepos}</p>
              <p className="followers-heading">PUBLIC REPOS</p>
            </div>
          </div>

          <div className="bottom-container">
            <div className="company-container">
              <p className="company-heading">Company</p>
              <div className="companyUrl">
                <RiBuildingLine className="icon-style" />
                <p className="company">{company}</p>
              </div>
            </div>

            <div className="company-container">
              <p className="company-heading">Location</p>
              <div className="companyUrl">
                <IoLocationOutline className="icon-style" />
                <p className="company">{location}</p>
              </div>
            </div>

            <div className="company-container">
              <p className="company-heading">Company Url</p>
              <div className="companyUrl">
                <IoMdLink className="icon-style" />
                <a href={organizationsUrl} className="company">
                  {organizationsUrl}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failureContainer">
      <h1 className="heading">GitHub Profile Visualizer</h1>
      <img
        src="https://res.cloudinary.com/ddsn9feta/image/upload/v1718604995/Group_7522_f4ueqy.png"
        alt="failure view"
        className="error-view"
      />
      <p className="errorName">Something went wrong. Please try again.</p>
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
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#3B82F6" height={50} width={50} />
    </div>
  )

  renderContent = () => {
    const {errorMsg, apiStatus, profileDetails} = this.state

    if (apiStatus === apiStatusConstants.inProgress) {
      return this.renderLoaderView()
    }

    if (apiStatus === apiStatusConstants.failure) {
      return this.renderFailureView()
    }

    if (errorMsg) {
      return <p className="inputErrorMsg">{errorMsg}</p>
    }

    if (apiStatus === apiStatusConstants.success && profileDetails) {
      return this.renderGithubDetailsOfProfile()
    }
    return (
      <div className="github-container">
        <h1 className="heading">GitHub Profile Visualizer</h1>
        <img
          src="https://res.cloudinary.com/ddsn9feta/image/upload/v1718599647/Group_21x-mobileview_iyuarb.png"
          alt="gitHub profile visualizer home page"
          className="homeImage"
        />
      </div>
    )
  }

  render() {
    const {username, changeUserName} = this.context

    return (
      <>
        <Header />
        <div className="home-container">
          <div className="input-container">
            <input
              type="search"
              placeholder="Enter GitHub username"
              className="input-search-style"
              value={username}
              onChange={event => changeUserName(event.target.value)}
            />

            <div className="search-icon-container">
              <button
                type="button"
                className="search-button"
                data-testid="searchButton"
                onClick={() => this.onClickSearch(username)}
              >
                <HiOutlineSearch className="search-icon" />
              </button>
            </div>
          </div>

          {this.renderContent()}
        </div>
      </>
    )
  }
}

Home.contextType = UsernameContext

export default Home
