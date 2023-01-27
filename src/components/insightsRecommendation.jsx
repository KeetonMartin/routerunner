import React, { Component } from 'react';

class InsightsRecommendation extends Component {
    render() {
        const { image, title, badgeTexts, logo } = this.props;
        const badges = badgeTexts.map((txt) => <div className="badge badge-primary">{txt}</div>);
        return (
            <div className="card w-72 sm:w-96 shadow-xl bg-neutral opacity-100 ">
                <figure><img className="object-cover h-48 w-96" src={image} alt={title} /></figure>
                <div className="card-body">
                    <h2 className="card-title">
                        {title}
                    </h2>
                    {/* <div className="badge badge-primary">{badge1Text}</div> */}
                    {badges}
                    {/* < BadgeTexts txts={badgeTexts}/> */}
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={logo} alt={title} />
                            {/* <img src={require("../assets/unitedLogo.jpg")} alt={item.carrier_lg} /> */}
                        </div>
                    </div>

                    {/* <p>{text}</p> */}
                    {/* <div className="card-actions justify-end">
            <div className="badge badge-outline">Fashion</div> 
            <div className="badge badge-outline">Products</div>
          </div> */}
                </div>
            </div>
        );
    }
}

export default InsightsRecommendation;
