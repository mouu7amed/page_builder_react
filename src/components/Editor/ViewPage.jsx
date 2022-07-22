import React from "react";

const page = () => {
  return (
    <>
      <div data-gjs="navbar" class="navbar">
        <div class="navbar-container">
          <a href="/" class="navbar-brand"></a>
          <div id="ibni" class="navbar-burger">
            <div class="navbar-burger-line"></div>
            <div class="navbar-burger-line"></div>
            <div class="navbar-burger-line"></div>
          </div>
          <div data-gjs="navbar-items" class="navbar-items-c">
            <nav data-gjs="navbar-menu" class="navbar-menu">
              <a href="#" class="navbar-menu-link">
                Home
              </a>
              <a href="#" class="navbar-menu-link">
                About
              </a>
              <a href="#" class="navbar-menu-link">
                Contact
              </a>
            </nav>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="cell"></div>
        <div class="cell">
          <div id="ik2vm">Hello everyone!</div>
        </div>
      </div>
    </>
  );
};

export const ViewPage = () => {
  return page();
};
