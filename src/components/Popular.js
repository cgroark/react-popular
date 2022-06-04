import React from 'react';

class Popular extends React.Component{
    render(){
        const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

        return(
            <ul className="flex-center">
                {languages.map((each, index) => (
                        <li 
                        key={each}> 
                            <button className="btn-clear nav-link">
                                {each}
                            </button>
                        </li>
                ))
                }
            </ul>
        )
    }
}

export default Popular;