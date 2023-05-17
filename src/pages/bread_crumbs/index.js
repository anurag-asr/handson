import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb } from "antd";

const BreadCrumb = () => {
  const location = useLocation();
  const breadCrumbView = () => {
    const { pathname } = location;
    const pathnames = pathname.split("/").filter((item) => item);
    const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
    return (
      <div>
        <Breadcrumb>
          {pathnames.length > 0 ? (
            <Breadcrumb.Item>
              <Link to="/">Home</Link>
            </Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          )}
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;
            return isLast ? (
              <Breadcrumb.Item key={Math.random()}>
                {capitalize(name)}
              </Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item key={Math.random()}>
                <Link to={`${routeTo}`}>{capitalize(name)}</Link>
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
      </div>
    );
  };

  return <>{breadCrumbView()}</>;
};

export default BreadCrumb;
// const routes = [
//   { path: '/', title: 'Home' },
//   { path: '/about', title: 'About' },
//   { path: '/contact', title: 'Contact' },
// ];

// import React from 'react';
// import { Breadcrumb } from 'antd';
// import { Link } from 'react-router-dom';

// const Breadcrumbs = ({ routes }) => {
//   return (
//     <Breadcrumb>
//       {routes.map((route, index) => (
//         <Breadcrumb.Item key={index}>
//           {route.path ? (
//             <Link to={route.path}>{route.title}</Link>
//           ) : (
//             route.title
//           )}
//         </Breadcrumb.Item>
//       ))}
//     </Breadcrumb>
//   );
// };

// export default Breadcrumbs;
