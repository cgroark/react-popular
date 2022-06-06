import React from 'react';
import PropTypes from 'prop-types';
import {fetchPopularRepos}  from '../utils/api';
import { is } from 'css-select';
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa'


function LanguagesNav({selected, onUpdateLanguage}){
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
    return(
        <ul className="flex-center">
            {languages.map((each, index) => (
                    <li 
                    key={each}> 
                        <button className="btn-clear nav-link" 
                            onClick={() => onUpdateLanguage(each) }
                            style={each === selected ? {color: 'rgb(187, 46, 31)'} : null}
                        >
                            {each}
                        </button>
                    </li>
            ))
            }
        </ul>
    )
}

LanguagesNav.propTypes ={
    selected: PropTypes.string.isRequired,
    onUpdateLanguage: PropTypes.func.isRequired
}

function ReposGrid({repos}){
    return(
        <ul className="grid space-around">
            {/* <pre>{JSON.stringify(repos, null, 2)}</pre> */}
            {repos.map((each, index) => {
                const {name, owner, html_url, stargazers_count, forks, open_issues} = each
                const {login, avatar_url} = owner
                return(
                    <li key={html_url} className='repo bg-light'>
            <h4 className='header-lg center-text'>
              #{index + 1}
            </h4>
            <img
              className='avatar'
              src={avatar_url}
              alt={`Avatar for ${login}`}
            />
            <h2 className='center-text'>
              <a className='link' href={html_url}>{login}</a>
            </h2>
            <ul className='card-list'>
              <li>
                <FaUser color='rgb(255, 191, 116)' size={22} />
                <a href={`https://github.com/${login}`}>
                  {login}
                </a>
              </li>
              <li>
                <FaStar color='rgb(255, 215, 0)' size={22} />
                {stargazers_count.toLocaleString()} stars
              </li>
              <li>
                <FaCodeBranch color='rgb(129, 195, 245)' size={22} />
                {forks.toLocaleString()} forks
              </li>
              <li>
                <FaExclamationTriangle color='rgb(241, 138, 147)' size={22} />
                {open_issues.toLocaleString()} open
              </li>
            </ul>
          </li>
                )
            })}
        </ul>
    )
}

ReposGrid.propTypes ={
    repos: PropTypes.array.isRequired
}

class Popular extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedLanguage: 'All',
            repos: {},
            error: null

        }
    }
    componentDidMount =() => {
        this.updateLanguage(this.state.selectedLanguage)
    }
    updateLanguage = (selectedLanguage) => {
        this.setState({
            selectedLanguage,
            error: null
        })
        if(!this.state.repos[selectedLanguage]){
            fetchPopularRepos(selectedLanguage)
                .then((data) => {
                    //update new repos based on existing state. instead of passing setState an object, we pass it a function and destrucutre this.state.repos as {repos}
                    this.setState((repos) => ({
                        repos: {
                            ...repos,
                            [selectedLanguage]: data
                        }
                    }))
                })
                .catch((error) => {
                    console.warn('error fetching repos:', error)
                    this.setState({
                        error: 'error fetching repos'
                    })
                })
        }
    }
    isLoading = () => {
        const {selectedLanguage, repos, error} = this.state;
        return !repos[selectedLanguage] && error === null
    }
    render(){
        const {selectedLanguage, repos, error} = this.state;

        return(
            <React.Fragment>
                <LanguagesNav selected={selectedLanguage} onUpdateLanguage={this.updateLanguage}/>
                {
                    this.isLoading() && <p>LOADING</p>
                }
                {
                    error && <p>{error}</p>
                }
                {
                    repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]}/>
                }
            </React.Fragment>

        )
        
    }
        
}

export default Popular;


  