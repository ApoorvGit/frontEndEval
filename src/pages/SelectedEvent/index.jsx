import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BigBox from '../../components/BigBox';

export default function HomePage() {
  const { id } = useParams();
  return (
    <div className="homepage">
      <Header />
      <BigBox id={id} />
      <Footer />
    </div>
  );
}
