import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Navbar,
  NavLink,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import { TDispatch } from '~store';
import { logout } from '~store/actions/AuthAction';

const HomeNavigation: FC = () => {
  const { auth } = useSelector<TRootReducers, TRootReducers>(state => state);

  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch<TDispatch>();

  const toggle = () => setIsOpen(!isOpen);

  const onClickLogout = async () => {
    await dispatch(logout());
    window.location.href = '/home';
  };

  return (
    <header className="mb-4">
      <Navbar expand="md">
        <NavbarBrand href="/home">E-Learning Web</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="flex-grow-1" navbar>
            {auth.status === 'authenticated' && (
              <>
                <NavItem>
                  <NavLink tag={Link} to="/home/subjects?page=1">Subjects</NavLink>
                </NavItem>
                <UncontrolledDropdown className="ml-md-auto" nav inNavbar>
                  <DropdownToggle nav caret>
                    {auth.student?.first_name}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem tag={Link} to="/home/student">
                      Account
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={onClickLogout} className="text-white">
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </>
            )}
            {auth.status === 'not-authenticated' && (
              <NavItem className="ml-md-auto">
                <NavLink tag={Link} to="/home/login">Login</NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </header>
  );
};

export default HomeNavigation;
