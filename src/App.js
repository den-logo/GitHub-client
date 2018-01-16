import React, { Component } from 'react';
import { Header } from './components/Header.jsx';
import { UserNameInput } from './components/SearchInput.jsx';

class App extends Component {
	render(){
    return (
			<div >
				<Header />
	      <UserNameInput />
			</div>
    );
	}
}
export default App;
