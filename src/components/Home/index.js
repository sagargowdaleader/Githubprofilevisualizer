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
    isError: false,
    errorMsg: '',
    apiStatus: apiStatusConstants.initial,
  }

  getGitHubUserProfileDetails = async username => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
      profileDetails: null,
      isError: false,
      errorMsg: '',
    })

    const url = `https://apis2.ccbp.in/gpv/profile-details/${username}?api_key=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`

    try {
      const response = await fetch(url)

      if (!response.ok) {
        this.setState({
          apiStatus: apiStatusConstants.failure,
        })
        return
      }

      const data = await response.json()

      if (!data || !data.login) {
        this.setState({
          apiStatus: apiStatusConstants.failure,
        })
        return
      }

      const updatedData = {
        avatarUrl: data.avatar_url,
        bio: data.bio,
        blog: data.blog,
        company: data.company,
        followers: data.followers,
        following: data.following,
        location: data.location,
        login: data.login,
        name: data.name,
        publicRepos: data.public_repos,
      }

      this.setState({
        profileDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } catch (error) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickSearch = () => {
    const {username} = this.context

    if (!username || username.trim() === '') {
      this.setState({
        isError: true,
        errorMsg: 'Enter the valid github username',
        profileDetails: null,
        apiStatus: apiStatusConstants.initial,
      })
      return
    }

    this.getGitHubUserProfileDetails(username.trim())
  }

  renderGithubDetailsOfProfile = () => {
    const {profileDetails} = this.state

    if (!profileDetails) {
      return null
    }

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
    } = profileDetails

    return (
      <div className="repo-item">
        <div className="profileDetailsContainer">
          <img src={avatarUrl} alt={name || login} className="avatar-url" />

          <h1 className="name">{name || login}</h1>
          <p className="login">{login}</p>

          <p className="bio-heading">BIO</p>
          <p className="bio">{bio || 'No bio available'}</p>

          <div className="followers-following-public-container">
            <div className="followers-container">
              <p className="followers">{followers ?? 0}</p>
              <p className="followers-heading">FOLLOWERS</p>
            </div>

            <hr className="hor-line" />

            <div className="following-container">
              <p className="followers">{following ?? 0}</p>
              <p className="followers-heading">FOLLOWING</p>
            </div>

            <hr className="hor-line" />

            <div className="pubic-repos-container">
              <p className="followers">{publicRepos ?? 0}</p>
              <p className="followers-heading">PUBLIC REPOS</p>
            </div>
          </div>

          <div className="bottom-container">
            <div className="company-container">
              <p className="company-heading">Company</p>
              <div className="companyUrl">
                <RiBuildingLine className="icon-style" />
                <p className="company">{company || 'Not available'}</p>
              </div>
            </div>

            <div className="company-container">
              <p className="company-heading">Location</p>
              <div className="companyUrl">
                <IoLocationOutline className="icon-style" />
                <p className="company">{location || 'Not available'}</p>
              </div>
            </div>

            <div className="company-container">
              <p className="company-heading">Blog</p>
              <div className="companyUrl">
                <IoMdLink className="icon-style" />

                {blog ? (
                  <a
                    href={blog}
                    className="company"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {blog}
                  </a>
                ) : (
                  <p className="company">Not available</p>
                )}
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

      <p className="errorName">Something went wrong. Please try again</p>

      <button className="tryButton" type="button" onClick={this.onClickSearch}>
        Try Again
      </button>
    </div>
  )

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#3B82F6" height={50} width={50} />
    </div>
  )

  renderHomeView = () => (
    <div>
      <h1 className="heading">GitHub Profile Visualizer</h1>

      <img
        src="https://res.cloudinary.com/ddsn9feta/image/upload/v1718599647/Group_21x-mobileview_iyuarb.png"
        alt="gitHub profile visualizer home page"
        className="homeImage"
      />
    </div>
  )

  renderGithubProfilesDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderGithubDetailsOfProfile()

      case apiStatusConstants.failure:
        return this.renderFailureView()

      case apiStatusConstants.inProgress:
        return this.renderLoaderView()

      default:
        return this.renderHomeView()
    }
  }

  render() {
    const {isError, errorMsg} = this.state
    const {username, changeUserName} = this.context

    return (
      <>
        <Header />

        <div className="home-container">
          <div className="input-container">
            <input
              type="search"
              placeholder="Enter github username"
              className="input-search-style"
              value={username}
              onChange={event => {
                changeUserName(event.target.value)

                if (isError) {
                  this.setState({
                    isError: false,
                    errorMsg: '',
                  })
                }
              }}
            />

            <div className="search-icon-container">
              <button
                type="button"
                onClick={this.onClickSearch}
                className="search-button"
                data-testid="searchButton"
              >
                <HiOutlineSearch className="search-icon" />
              </button>
            </div>
          </div>

          {isError && <p className="inputErrorMsg">{errorMsg}</p>}

          {this.renderGithubProfilesDetails()}
        </div>
      </>
    )
  }
}

Home.contextType = UsernameContext

export default Home
