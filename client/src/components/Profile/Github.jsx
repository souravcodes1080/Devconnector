import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getGithubRepos } from "../../actions/profile";
function Github({ githubUsername, getGithubRepos, repos }) {
  useEffect(() => {
    getGithubRepos(githubUsername);
  }, []);

  return (
    <>
      <div className="profile-github">
        <h2 className="text-primary my-1">
          <i className="fab fa-github"></i> Github Repository
        </h2>
        {repos === null ? (
          <Spinner />
        ) : (
          repos.map((repo) => (
            <div className="repo bg-white p-1 my-1" key={repo.id}>
              <div>
                <h4>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {repo.name}
                  </a>
                </h4>
                <p>
                 {repo.description ? repo.description : <i>No description available.</i>}
                </p>
              </div>
              <div>
                <ul>
                  <li className="badge badge-primary" style={{paddingLeft:"10px", paddingRight:"10px"}}>
                    Stars: {repo.stargazers_count}
                  </li>
                  <li className="badge badge-dark" style={{paddingLeft:"10px", paddingRight:"10px"}}>
                    Watchers: {repo.watchers_count}
                  </li>
                  <li className="badge badge-light" style={{paddingLeft:"10px", paddingRight:"10px"}}>
                    Forks: {repo.forks_count}
                  </li>
                </ul>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

Github.propTypes = {
  githubUsername: PropTypes.string.isRequired,
  getGithubRepos: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});

export default connect(mapStateToProps, { getGithubRepos })(Github);
