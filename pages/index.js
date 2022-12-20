import React from "react";
import { getPosts } from "../redux/actions/fooActions";
import { wrapper } from "../redux";
import Layout from "../components/layout";
import { checkServerSideCookie } from "../redux/actions/authActions";

const Index = ({ foo, token }) => {
  return (
    <Layout isAuthenticated={token}>
      <div>{JSON.stringify(foo)}</div>
      <div>Prop from getServerSideProps</div>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    checkServerSideCookie(context);
    const token = context.store.getState().authentication.token;
    await context.store.dispatch(getPosts());
    const foo = context.store.getState().foo.foo;
    return {
      props: {
        foo,
        token,
      },
    };
  }
);

export default Index;
