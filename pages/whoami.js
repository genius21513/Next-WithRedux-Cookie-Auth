import React from "react";
import axios from "axios";
import { checkServerSideCookie } from "../redux/actions/authActions";
import Layout from "../components/layout";
import jwt from "jwt-decode";
import { wrapper } from "../redux";

const Whoami = ({ user, token }) => {
  return (
    <Layout title="Who Am I" isAuthenticated={token}>
      {(token && (
        <div>
          <h2>Who am i</h2>
          {JSON.stringify(user)}
        </div>
      )) ||
        "Please sign in"}
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    checkServerSideCookie(context);
    const token = context.store.getState().authentication.token;

    if (token) {
      const data = jwt(token);
      const response = await axios.get(
        `https://aqueous-meadow-07678.herokuapp.com/api/user/${data._id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            contentType: "application/json",
          },
        }
      );
      const user = response.data;
      return {
        props: {
          user,
          token,
        },
      };
    }
  }
);

export default Whoami;
