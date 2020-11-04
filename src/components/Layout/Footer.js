import React from "react";

const Footer = () => {
  return (
    <footer className="w-full text-center absolute bottom-0 pb-5 text-white">
      Built using{" "}
      <a
        className="text-blue-500 hover:text-blue-600"
        href="https://aws.amazon.com/amplify/"
      >
        {" "}
        AWS Amplify
      </a>
      ,{" "}
      <a
        className="text-blue-500  hover:text-blue-600"
        href="https://reactjs.org/"
      >
        React{" "}
      </a>{" "}
      and{" "}
      <a
        className="text-blue-500  hover:text-blue-600"
        href="https://tailwindcss.com/"
      >
        TailwindCSS
      </a>
    </footer>
  );
};

export default Footer;
