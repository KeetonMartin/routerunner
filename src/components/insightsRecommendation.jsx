import React, { Component } from "react";
import customCardData from "../customCardData.json";

class InsightsRecommendation extends Component {
  render() {
    const { image, title, badgeTexts, logo } = this.props;
    const badges = badgeTexts.map((txt) => (
      <div className="badge badge-primary">{txt}</div>
    ));
    return (
      <div className="card w-72 sm:w-96 shadow-xl bg-neutral opacity-100 ">
        <figure>
          <img className="object-cover h-48 w-96" src={image} alt={title} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          {badges}
          <div className="flex justify-between items-center"> {/* add justify-between class */}
            <div className="avatar mr-4">
              <div className="mask mask-squircle w-12 h-12">
                <img src={logo} alt={title} />
              </div>
            </div>
            {/* add other elements you want to align with the avatar */}
            {customCardData.find(
              (data) => data.name === title && data.application_link
            ) ? (
              <button className="btn btn-accent ml-auto">APPLy</button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default InsightsRecommendation;
