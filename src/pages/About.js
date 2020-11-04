import React from "react";

const About = () => {
  return (
    <div className="bg-gray-900 text-white h-screen">
      <div className="pt-24 container mx-auto prose ">
        <h1>About This Project</h1>
        <p>
          This is a Full-Stack Trello clone. Here's a link to a video that goes
          over how it was built{" "}
        </p>
        <h2>Tech Stack:</h2>
        <ul>
          <li>React.js</li>
          <li>TailwindCSS</li>
          <li>AWS Amplify (GraphQL API+ Auth)</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
