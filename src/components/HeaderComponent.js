import React, {Component} from 'react';
import { Navbar,NavbarBrand,Nav,NavbarToggler,Collapse,NavItem, Jumbotron ,
Modal,ModalHeader,ModalBody,Form,FormGroup,Input,Button,Label} from 'reactstrap';
import '../App.css'
import {NavLink} from 'react-router-dom';

class Header extends Component{
	constructor(props){
		super(props);
		this.state = {
			isNavOpen : false,
			isModalOpen : false
		}
		this.toggleNav = this.toggleNav.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
	}
	toggleNav(){
		this.setState({
			isNavOpen : !this.state.isNavOpen
		});
	}
	handleLogin(event){
		this.toggleModal();
		alert("Username : " + this.username.value + "Password: " + this.password.value
			+ " Remember: " + this.remember.checked);
		event.preventDefault();
	}
	toggleModal(){
		this.setState({
			isModalOpen : !this.state.isModalOpen
		})
	}
	render(){
		return(
			<React.Fragment>
				<Navbar dark expand="md">
			      <div className="container">
			      <NavbarToggler onClick={this.toggleNav} />
			        <NavbarBrand className="mr-auto" href = '/'> 
						<img src="assets/images/logo.png" height="30" width="41" alt="logo" />
			        </NavbarBrand>
			        <Collapse isOpen={this.state.isNavOpen} navbar>
			        <Nav navbar>
						<NavItem>
							<NavLink className="nav-link" to="/home">
							<span className="fa fa-home fa-lg"></span>Home
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink className="nav-link" to="/aboutus">
							<span className="fa fa-info fa-lg"></span>About us
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink className="nav-link" to="/menu">
							<span className="fa fa-list fa-lg"></span>Menu
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink className="nav-link" to="/contactus">
							<span className="fa fa-address-card fa-lg"></span>Contact us
							</NavLink>
						</NavItem>
			        </Nav>
			        <Nav className="ml-auto" navbar>
			        <NavItem>
						<Button outline onClick={this.toggleModal} >
						<span className="fa fa-sign-in fa-lg"></span>Login
						</Button>						
			        </NavItem></Nav>
			        </Collapse>
			      </div> 
			     </Navbar>
			     <Jumbotron>
			     	<div className="container">
			     		<div className="row row-header">
			     			<div className="col-12 col-sm-6">
			     				<h1> Restorante Con Fusion </h1>
			     				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et vel, 
			     				quam ea possimus molestiae expedita! Amet placeat assumenda deleniti 
			     				doloribus, sequi eum ab inventore obcaecati aut, illum, ea, molestiae alias.</p>
			     			</div>
			     		</div>
			     	</div>
			     </Jumbotron>
			     <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}> 
			     	<ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
					<ModalBody>
						<Form onSubmit={this.handleLogin}>
						<FormGroup>
						<Label htmlfor="username">Username</Label>
						<Input type="text" id="username" name="username"
						innerRef={(input) => this.username=input} />
						</FormGroup>
						<FormGroup>
						<Label htmlfor="password">Password</Label>
						<Input type="password" id="password" name="password"
						innerRef={(input) => this.password=input} />
						</FormGroup>
						<FormGroup check>
						<Label check>
						<Input type="checkbox" name="remember"
						innerRef={(input) => this.remember = input} />
						Remember me
						</Label>
						</FormGroup>
						<Button type="submit" value="submit" className="primary">Login</Button>  
					</Form>
					</ModalBody>	
			     </Modal>
			</React.Fragment>
			);
		}
	}
export default Header;