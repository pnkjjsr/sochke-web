import React, { Component, Fragment } from "react";

import "common/styles/context.scss";

export default class cookies extends Component {
  render() {
    const mainClass = "context";
    return (
      <Fragment>
        <div className="container">
          <div className={mainClass}>
            <div className={`${mainClass}__header`}>
              <h1>Privacy policy</h1>
            </div>

            <section className={`${mainClass}__section`}>
              <p>
                We are committed to safeguarding the privacy of our website
                visitors; this policy sets out how we will treat your personal
                information.
                <br />
                Our website uses cookies. We will ask you to consent to our use
                of cookies in accordance with the terms of this policy when you
                first visit our website. / By using our website and agreeing to
                this policy, you consent to our use of cookies in accordance
                with the terms of this policy.
              </p>
            </section>

            {/* <section className={`${mainClass}__section`}>
              <h2>Credit</h2>
              <p>This document was created using an SEQ Legal template.</p>
            </section> */}

            <section className={`${mainClass}__section`}>
              <h2>What information do we collect?</h2>
              <b>
                We may collect, store and use the following kinds of personal
                information:
              </b>
              <ul>
                <li>
                  information about your computer and about your visits to and
                  use of this website (including your IP address, geographical
                  location, browser type and version, operating system, referral
                  source, length of visit, page views, website navigation);
                </li>
                <li>
                  information that you provide to us for the purpose of
                  subscribing to our website services, email notifications
                  and/or newsletters (including but not limited to name, email
                  address and postal address);]
                </li>
                <li>any other information that you choose to send to us.</li>
              </ul>
              <p>
                Before you disclose to us the personal information of another
                person, you must obtain that person’s consent to both the
                disclosure and the processing of that personal information in
                accordance with the terms of this privacy policy.
              </p>
            </section>

            <section className={`${mainClass}__section`}>
              <h2>Using your personal information</h2>

              <p>
                Personal information submitted to us via this website will be
                used for the purposes specified in this privacy policy or in
                relevant parts of the website.
              </p>

              <b>We may use your personal information to:</b>
              <ul>
                <li>administer the website;</li>
                <li>
                  send you email notifications which you have specifically
                  requested;
                </li>
                <li>
                  send you our newsletter and other marketing communications
                  relating to our business or the businesses of
                  carefully-selected third parties which we think may be of
                  interest to you, by post or, where you have specifically
                  agreed to this, by email or similar technology (and you can
                  inform us at any time if you no longer require marketing
                  communications);
                </li>
                <li>
                  provide third parties with statistical information about our
                  users – but this information will not be used to identify any
                  individual user;
                </li>
                <li>
                  deal with enquiries and complaints made by or about you
                  relating to the website;
                </li>
                <li>keep the website secure and prevent fraud;</li>
                <li>
                  verify compliance with the terms and conditions governing the
                  use of the website.
                </li>
              </ul>

              <p>
                We will not, without your express consent, provide your personal
                information to any third parties for the purpose of direct
                marketing.
              </p>
            </section>

            <section className={`${mainClass}__section`}>
              <h2>Disclosures</h2>

              <p>
                We may disclose your personal information to any of our
                employees, officers, agents, suppliers or subcontractors insofar
                as reasonably necessary for the purposes set out in this privacy
                policy.
                <br />
                We may disclose your personal information to any member of our
                group of companies (this means our subsidiaries, our ultimate
                holding company and all its subsidiaries) insofar as reasonably
                necessary for the purposes set out in this privacy policy.
              </p>

              <b>In addition, we may disclose your personal information:</b>
              <ul>
                <li>to the extent that we are required to do so by law;</li>
                <li>
                  in connection with any ongoing or prospective legal
                  proceedings;
                </li>
                <li>
                  in order to establish, exercise or defend our legal rights
                  (including providing information to others for the purposes of
                  fraud prevention and reducing credit risk);
                </li>
                <li>
                  to the purchaser (or prospective purchaser) of any business or
                  asset that we are (or are contemplating) selling; and
                </li>
                <li>
                  to any person who we reasonably believe may apply to a court
                  or other competent authority for disclosure of that personal
                  information where, in our reasonable opinion, such court or
                  authority would be reasonably likely to order disclosure of
                  that personal information.
                </li>
              </ul>
              <p>
                Except as provided in this privacy policy, we will not provide
                your information to third parties.
              </p>
            </section>

            <section className={`${mainClass}__section`}>
              <h2>International data transfers</h2>
              <p>
                Information that we collect may be stored and processed in and
                transferred between any of the countries in which we operate in
                order to enable us to use the information in accordance with
                this privacy policy.
                <br />
                Information which you provide may be transferred to countries
                (including the United States) which do not have data protection
                laws equivalent to those in force in the European Economic Area.
                <br />
                You expressly agree to such transfers of personal information.
              </p>
            </section>

            <section className={`${mainClass}__section`}>
              <h2>Security of your personal information</h2>

              <p>
                We will take reasonable technical and organisational precautions
                to prevent the loss, misuse or alteration of your personal
                information.
                <br />
                We will store all the personal information you provide on our
                secure (password- and firewall-protected) servers.
                <br />
                You acknowledge that the transmission of information over the
                internet is inherently insecure, and we cannot guarantee the
                security of data sent over the internet.
              </p>
            </section>

            <section className={`${mainClass}__section`}>
              <h2>Policy amendments</h2>
              <p>
                We may update this privacy policy from time to time by posting a
                new version on our website. You should check this page
                occasionally to ensure you are happy with any changes.
              </p>
            </section>

            <section className={`${mainClass}__section`}>
              <h2>Your rights</h2>
              <p>
                You may instruct us to provide you with any personal information
                we hold about you. Provision of such information will be subject
                to the supply of appropriate evidence of your identity (for this
                purpose, we will usually accept a photocopy of your passport
                certified by a solicitor or bank plus an original copy of a
                utility bill showing your current address).
                <br />
                We may withhold such personal information to the extent
                permitted by law.
              </p>
            </section>

            <section className={`${mainClass}__section`}>
              <h2>Third party websites</h2>
              <p>
                The website contains links to other websites. We are not
                responsible for the privacy policies or practices of third party
                websites.
              </p>
            </section>

            <section className={`${mainClass}__section`}>
              <h2>Updating information</h2>
              <p>
                We may revise these terms of use from time to time. Revised
                terms of use will apply to the use of our website from the date
                of publication of the revised terms of use on our website.
              </p>
            </section>

            <section className={`${mainClass}__section`}>
              <h2>Assignment</h2>
              <p>
                Please let us know if the personal information which we hold
                about you needs to be corrected or updated.
              </p>
            </section>

            <section className={`${mainClass}__section`}>
              <h2>Contact</h2>
              <p>
                If you have any questions about this privacy policy or our
                treatment of your personal information, please use the contact
                form.
              </p>
            </section>

            <section className={`${mainClass}__section`}>
              <h2>Data controller</h2>
              <p>
                The data controller responsible in respect of the information
                collected on this website is [company/business name].
                <br />
                {/* Our data protection registration number is Z6496700 */}
              </p>
            </section>

            <section className={`${mainClass}__section`}>
              <h2>Entire agreement</h2>
              <p>
                Subject to the first paragraph of Section [8], these terms of
                use, together with our privacy policy, constitute the entire
                agreement between you and us in relation to your use of our
                website and supersede all previous agreements in respect of your
                use of our website.
              </p>
            </section>

            <section className={`${mainClass}__section`}>
              <h2>Law and jurisdiction</h2>
              <p>
                These terms of use will be governed by and construed in
                accordance with English law, and any disputes relating to these
                terms of use will be subject to the exclusive jurisdiction of
                the courts of England and Wales.
                <br />
                We are committed to safeguarding the privacy of our website
                visitors; this policy sets out how we will treat your personal
                information.
              </p>
            </section>
          </div>
        </div>
      </Fragment>
    );
  }
}
