import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getGithubRepos } from "../../actions/profile";
import { FaStar } from "react-icons/fa6";
import { RiShareBoxLine } from "react-icons/ri";

function Github({ githubUsername, getGithubRepos, repos }) {
  useEffect(() => {
    getGithubRepos(githubUsername);
  }, []);

  return (
    <>
      <div className="w-full mt-3">
        {repos === null ? (
          
          <Spinner />
        ) : (
          repos.map((repo, i) => (
            <div className="" key={repo.id}>
              <div className="flex items-center justify-between w-full ">
                <h4 className="text-lg transition-all duration-300 hover:underline ">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {repo.name} <RiShareBoxLine className="inline opacity-50" /> 
                  </a>
                </h4>

                <div>
                  <ul>
                    <li className="flex items-center text-lg">
                      <FaStar className="text-yellow-300" />{" "}
                      {repo.stargazers_count}
                    </li>
                  </ul>
                </div>
              </div>
              {i !== repos.length - 1 && (
                <hr className="mt-2 mb-2 opacity-25" />
              )}
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
