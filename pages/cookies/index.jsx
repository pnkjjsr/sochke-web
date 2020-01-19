import React, { Component, Fragment } from "react";

import "./style.scss";

export default class cookies extends Component {
  render() {
    const mainClass = "context";
    return (
      <Fragment>
        <div className="container">
          <div className={mainClass}>
            <div className={`${mainClass}__header`}>
              <h1>Cookies Policy</h1>
            </div>

            <section className={`${mainClass}__section`}>
              <h2>Introduction</h2>
              <p>
                <b>Our website uses cookies.</b>
                <br />
                We will ask you to consent to our use of cookies in accordance
                with the terms of this policy when you first visit our website.
                / By using our website and agreeing to this policy, you consent
                to our use of cookies in accordance with the terms of this
                policy.
              </p>
            </section>

            {/* <section className={`${mainClass}__section`}>
              <h2>Credit</h2>
              <p>This document was created using an SEQ Legal template.</p>
            </section> */}

            <section className={`${mainClass}__section`}>
              <h2>About cookies</h2>
              <p>
                A cookie is a file containing an identifier (a string of letters
                and numbers) that is sent by a web server to a web browser and
                is stored by the browser. The identifier is then sent back to
                the server each time the browser requests a page from the
                server.
                <br />
                Cookies can be used by web servers to identity and track users
                as they navigate different pages on a website and identify users
                returning to a website.
                <br />
                Cookies may be either “persistent” cookies or “session” cookies.
                <br />
                A persistent cookie consists of a text file sent by a web server
                to a web browser, which will be stored by the browser and will
                remain valid until its set expiry date (unless deleted by the
                user before the expiry date).
                <br />A session cookie, on the other hand, will expire at the
                end of the user session, when the web browser is closed.
              </p>
            </section>

            <section className={`${mainClass}__section`}>
              <h2>Our cookies</h2>
              <p>
                We use both session cookies and persistent cookies on this
                website.
              </p>

              <ul>
                <li>
                  <b>PHPSESSID</b> – We will use this session cookie to identify
                  your unique session on the website session.
                </li>
                <li>
                  <b>SESS</b> – We will use this session cookie to ensure that
                  you are recognised when you move from page to page within the
                  site and that any information you have entered is remembered.
                </li>
                <li>
                  <b>wp-settings</b> - 1, wordpress_ 2, wordpress_logged_in_ 2,
                  wordpress_test_ 2 – We will use these session and persistent
                  cookies for a logged in user mainly for admin purposes.
                </li>
              </ul>
            </section>

            <section className={`${mainClass}__section`}>
              <h2>Third party and analytics cookies</h2>
              <p>
                When you use our website, you may also be sent third party
                cookies.
              </p>

              <b>
                Our service providers may send you cookies. They may use the
                information they obtain from your use of their cookies:
              </b>
              <ul>
                <li>to track your browser across multiple websites;</li>
                <li>to build a profile of your web surfing; and</li>
                <li>
                  to enable sharing functionality to social networks including
                  including but not limited to Facebook, Twitter, Google+ and
                  Linkedin.
                </li>
              </ul>

              <b>Third parties may send to you the following cookies:</b>
              <ul>
                <li>
                  __qca – We will use this persistent cookie to use your
                  computer’s IP address, pixel code, referring HTTP location,
                  current HTTP location, search string, time of the access,
                  browser’s time, any searches made on the applicable website,
                  and other statistics in order to facilitate sharing
                  functionality to external sites including but not limited to
                  Facebook, Twitter, Google+ and Linkedin. Lasts: 5 years
                </li>
                <li>
                  _twitter_sess, auth_token, auth_token_session, guest_id,
                  remember_checked, secure_session, twid, twll – We will use
                  these persistent and session cookies to facilitate sharing
                  functionality to external sites including but not limited to
                  Facebook, Twitter, Google+ and Linkedin.
                </li>
                <li>
                  Nid, Pref – Google tracking and safe browsing cookies.
                  Google’s NID and PREF cookies are set by browsers to protect
                  users against known intrusive sites. If you arrive at one of
                  these sites it allows your browser to take action or notify
                  you. Users can stop these cookies being set by turning off
                  their browser’s ‘safe browsing’ mode.
                </li>

                <li>
                  In addition, we use Google Analytics to analyse the use of
                  this website. Google Analytics generates statistical and other
                  information about website use by means of cookies, which are
                  stored on users’ computers. The information generated relating
                  to our website is used to create reports about the use of the
                  website. Google will store this information. Google’s privacy
                  policy is available at:
                  http://www.google.com/policies/privacy/.
                </li>
              </ul>

              <b>
                Third parties may send to you the following cookies relating to
                the use of Google Analytics:
              </b>
              <ul>
                <li>
                  __utma – We will use this persistent cookie to keep track the
                  number of times a visitor has been to the site, when their
                  first visit was, and when their last visit occurred.
                </li>
                <li>
                  __utma & __utmb – We will use these session cookies to
                  calculate how long a visit takes. __utmb takes a timestamp of
                  the exact moment in time when a visitor enters a site, while
                  __utmc takes a timestamp of the exact moment in time when a
                  visitor leaves a site. __utmb expires at the end of the
                  session. __utmc lasts 30 minutes before expiring.
                </li>
                <li>
                  __utmv – We will use this persistent, lifetime cookie to
                  classify the visitor within Google Analytics.
                </li>
                <li>
                  __utmz – We will use this persistent cookie to keep track of
                  where the visitor came from, what search engine they used,
                  what link they clicked on, what keyword they used, and where
                  they were in the world when they accessed the website. It
                  expires in 6 months.
                </li>
              </ul>
            </section>

            <section className={`${mainClass}__section`}>
              <h2>Cookies and personal information</h2>
              <p>
                Cookies do not contain any information that personally
                identifies you, but personal information that we store about you
                may be linked, by us, to the information stored in and obtained
                from cookies.
              </p>
            </section>

            <section className={`${mainClass}__section`}>
              <h2>Blocking cookies</h2>
              <b>
                Most browsers allow you to refuse to accept cookies. For
                example:
              </b>
              <ul>
                <li>
                  in Internet Explorer (version 9) you can block cookies using
                  the cookie handling override settings available by clicking
                  “Tools”, “Internet Options”, “Privacy” and then “Advanced”;
                </li>
                <li>
                  in Firefox (version 16) you can block all cookies by clicking
                  “Tools”, “Options”, “Privacy”, selecting “Use custom settings
                  for history” from the drop-down menu, and unticking “Accept
                  cookies from sites”; and
                </li>
                <li>
                  in Chrome (version 23), you can block all cookies by accessing
                  the “Customise and control” menu, and clicking “Settings”,
                  “Show advanced settings” and “Content settings”, and then
                  selecting “Block sites from setting any data” under the
                  “Cookies” heading.
                </li>
              </ul>

              <p>
                Blocking all cookies will, however, have a negative impact upon
                the usability of many websites.
                <br />
                If you block cookies, you will not be able to use all the
                features on this website.
              </p>
            </section>

            <section className={`${mainClass}__section`}>
              <h2>Deleting cookies</h2>
              <b>
                You can also delete cookies already stored on your computer. For
                example:
              </b>
              <ul>
                <li>
                  in Internet Explorer (version 9), you must manually delete
                  cookie files (you can find instructions for doing so at
                  http://support.microsoft.com/kb/278835);
                </li>
                <li>
                  in Firefox (version 16), you can delete cookies by clicking
                  “Tools”, “Options”, “Privacy” and then “Show Cookies”, and
                  then clicking “Remove All Cookies”; and
                </li>
                <li>
                  in Chrome (version 23), you can delete all cookies by
                  accessing the “Customise and control” menu, and clicking
                  “Settings”, “Show advanced settings” and “Clear browsing
                  data”, and then selecting “Delete cookies and other site and
                  plug-in data” before clicking “Clear browsing data”.
                </li>
              </ul>

              <p>
                Again, doing this may have a negative impact on the usability of
                many websites.
              </p>
            </section>
          </div>
        </div>
      </Fragment>
    );
  }
}
