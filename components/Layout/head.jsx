import React, { Fragment } from "react";
import NextHead from "next/head";
import { string } from "prop-types";
import { connect } from "react-redux";

const defaultOGURL = "https://www.sochke.com";
const defaultOGImage =
  "https://firebasestorage.googleapis.com/v0/b/sochke-web.appspot.com/o/cdn%2Fintro%2Fsochke.jpg?alt=media";
const defaultDescription =
  "Sochke | SochKeApp, a political networking platform to enable citizens contribute societal issues, connect political leaders digitally & build a healthy democracy.";

const Header = (props) => (
  <Fragment>
    <NextHead>
      <meta charSet="UTF-8" />
      <title>{props.title}</title>
      <meta name="description" content={props.desc} />
      <meta name="keywords" content={props.keyword}></meta>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="google-site-verification"
        content="X_UAViRRJK8KBMJtpV6wJmolpk-h5vIn8ooaBt7AHL0"
      />

      <link rel="icon" sizes="192x192" href="/static/touch-icon.png" />
      <link rel="apple-touch-icon" href="/static/touch-icon.png" />
      <link rel="mask-icon" href="/static/favicon-mask.svg" color="#49B882" />
      <link rel="icon" href="/static/favicon.ico" />
      <link rel="manifest" href="static/manifest.json" />

      <meta property="og:url" content={props.url || defaultOGURL} />
      <meta property="og:title" content={props.title || ""} />
      <meta
        property="og:description"
        content={props.desc || defaultDescription}
      />
      <meta name="twitter:site" content={props.url || defaultOGURL} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={props.ogImage || defaultOGImage} />
      <meta property="og:image" content={props.ogImage || defaultOGImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="theme-color" content="#000088" />
      <meta name="apple-mobile-web-app-capable" content="black-translucent" />
    </NextHead>

    <noscript>
      <div className="alert  alert-warning">
        <h4>Warning!</h4>
        <h5>Javascript is disabled for this website.</h5>
        <p>Javascript is required to use this website.</p>
        <p>
          {`You won't be able to navigate in this website until you activate javascript.`}
        </p>
      </div>
    </noscript>
  </Fragment>
);

class Head extends React.Component {
  componentDidMount() {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker
          .register("/service-worker.js", { scope: "/" })
          .then(function (registration) {
            // console.log("SW registered: ", registration);
          })
          .catch(function (registrationError) {
            // console.log("SW registration failed: ", registrationError);
          });
      });
    }
  }

  render() {
    const { pageTitle, layout } = this.props;
    let newPageTitle = pageTitle;

    if (pageTitle == "/") {
      newPageTitle = "Home";
    }

    return (
      <Header
        title={layout.title}
        pageTitle={newPageTitle}
        desc={layout.desc}
        ogImage={layout.ogImage}
      />
    );
  }
}

Head.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string,
};

export default connect((state) => state)(Head);
