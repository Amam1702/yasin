import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';

const Sidebar = () => {
  return (
    <aside className="main-sidebar sidebar-dark-primary">
    <Link to="/" className="brand-link">
      {/* <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style="opacity: .8"> */}
      <img src={Logo} className="brand-image" />
      <span className="brand-text font-weight-light h4">Conex</span>
    </Link>
    <div className="sidebar">
      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <li className="nav-item">
            <div className="nav-link">
              <i className="nav-icon fas fa-chevron-right"></i>
              <p>
                Users
                <i className="right fas fa-angle-left"></i>
              </p>
            </div>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <Link to="clients/create" className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>New</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="clients" className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>Existing</p>
                </Link>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <div className="nav-link">
              <i className="nav-icon fas fa-chevron-right"></i>
              <p>
                Vouchers
                <i className="right fas fa-angle-left"></i>
              </p>
            </div>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <Link to="vouchers/create" className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>New</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="vouchers" className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>Existing</p>
                </Link>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <div className="nav-link">
              <i className="nav-icon fas fa-chevron-right"></i>
              <p>
                Stations
                <i className="right fas fa-angle-left"></i>
              </p>
            </div>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <Link to="stations/create" className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>New</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="stations" className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>Existing</p>
                </Link>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <div className="nav-link">
              <i className="nav-icon fas fa-chevron-right"></i>
              <p>
                Attendants
                <i className="right fas fa-angle-left"></i>
              </p>
            </div>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <Link to="attendants/create" className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>New</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="attendants" className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>Existing</p>
                </Link>
              </li>
            </ul>
          </li>
          {/* <li className="nav-item">
            <Link href="pages/widgets.html" className="nav-link">
              <i className="nav-icon fas fa-th"></i>
              <p>
                Widgets
                <span className="right badge badge-danger">New</span>
              </p>
            </Link>
          </li> */}
        </ul>
      </nav>
    </div>
  </aside>
  );
};

export default Sidebar;