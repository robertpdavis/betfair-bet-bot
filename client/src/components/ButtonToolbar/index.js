import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="w-100 p-0.2 footer">
      <div className="container text-center mb-5">
        <h4>
          Copyright 2022
        </h4>
      </div>
    </footer>
  );
};

export default Footer;
