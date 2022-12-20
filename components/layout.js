import React, { useEffect } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { deauthenticate, reauthenticate } from "../redux/actions/authActions";

const Layout = ({ children, isAuthenticated }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(reauthenticate(isAuthenticated));
    }
  }, []);
  return (
    <>
      <div>
        <div>
          <ul>
            <li>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            {!isAuthenticated && (
              <li>
                <Link href="/signin">
                  <a>Sign In</a>
                </Link>
              </li>
            )}

            {isAuthenticated && (
              <li onClick={() => dispatch(deauthenticate())}>
                <a>Sign Out</a>
              </li>
            )}

            <li>
              <Link href="/whoami">
                <a>Who Am I</a>
              </Link>
            </li>
          </ul>
        </div>

        <div className="has-text-centered">{children}</div>
      </div>
    </>
  );
};

export default Layout;
