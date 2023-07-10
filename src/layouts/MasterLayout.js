import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from 'react-router-dom';
const MasterLayout = ({ component: Component, ...rest }) => {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="content-wrapper">
        <Outlet />
      </div>
    </>
    // <Route
    //   {...rest}
    //   render={(props) => (
    //     <>
    //       <Header />
    //       <Sidebar />
    //       <div className="content-wrapper">
    //         <Component {...props} />
    //       </div>
    //     </>
    //   )}
    // />
  );
};
// class MasterLayout extends React.Component {
//   render(){
//     return (
//       <>
//         <Header />
//         <Sidebar />
//         <div className="content-wrapper">
//         <main>{this.props.children}</main>
//         </div>
//       </>
//     )
//   }
// }
export default MasterLayout;