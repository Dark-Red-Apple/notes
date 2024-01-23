import React from "react";
import User from "./User";
import userList from "./usersList";

const Section = () => {
  return (
    <section className="post-wrapper">
      <h2>our users post</h2>
      <ul className="posts-list">
        {userList.map((user, index) => (
          <User
            userName={user.name}
            city={user.address.city}
            email={user.email}
            key={index}
          />
        ))}
      </ul>
    </section>
  );
};

export default Section;
