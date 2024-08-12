import React from 'react';
import Layout from '../components/Layout'; // Adjust the import path as needed

const Home = () => {
  return (
    <Layout>
      <h1>Welcome to the Home Page</h1>
      <p className="lead mt-4">
        This is the main page of the application. You can navigate to different parts of the app using the menu.
      </p>
    </Layout>
  );
};

export default Home;
