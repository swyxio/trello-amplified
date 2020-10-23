import React from "react";

const Footer = () => {
  return (
    <footer className="w-full mx-auto absolute bottom-0 pb-5">
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
