import React from 'react';
import Link from 'next/link';
import axios from 'axios';
import Layout from '../components/DataServiceLayout';

const Patients = props => (
  <Layout>
    <h1>What Batman TV Shows</h1>
    <ul>
      {props.shows.map(({show}) => (
        <li key={show.id}>
          <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
            <a>{show.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
);

Patients.getInitialProps = async () => {
  const response = await axios.get('https://api.tvmaze.com/search/shows', {
    params: {
      q: 'batman',
    },
  });
  const data = response.data;

  console.log(`Show data fetched. Count: ${data.length}`);

  return {
    shows: data,
  };
};

export default Patients;
