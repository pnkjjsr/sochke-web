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
              <h1>Terms &amp; conditions</h1>
            </div>

            <section className={`${mainClass}__section`}>
              <h2>Introduction</h2>
              <p>
                These terms of use govern your use of our website; by using our
                website, you agree to these terms of use in full. If you
                disagree with these terms of use or any part of these terms of
                use, you must not use our website.
                <br />
                Our website uses cookies. By using our website and agreeing to
                these terms of use, you consent to our use of cookies in
                accordance with the terms of our cookies policy.
              </p>
            </section>

            {/* <section className={`${mainClass}__section`}>
              <h2>Credit</h2>
              <p>This document was created using an SEQ Legal template.</p>
            </section> */}

            <section className={`${mainClass}__section`}>
              <h2>Licence to use website</h2>
              <p>
                Unless otherwise stated, we or our licensors own the
                intellectual property rights in the website and material on the
                website. Subject to the licence below, all these intellectual
                property rights are reserved.
                <br />
                You may view, download for caching purposes only, and print
                pages from the website for your own personal use, subject to the
                restrictions set out below and elsewhere in these terms of use.
              </p>

              <b>You must not:</b>
              <ul>
                <li>
                  republish material from this website (including republication
                  on another website);
                </li>
                <li>sell, rent or sub-license material from the website;</li>
                <li>show any material from the website in public;</li>
                <li>
                  reproduce, duplicate, copy or otherwise exploit material on
                  our website for a commercial purpose;
                </li>
                <li>
                  edit or otherwise modify any material on the website; or
                </li>
                <li>
                  redistribute material from this website except for content
                  specifically and expressly made available for redistribution
                  (such as our newsletter).
                </li>
              </ul>

              <p>
                Where content is specifically made available for redistribution,
                it may only be redistributed within your organisation.
              </p>
            </section>

            <section className={`${mainClass}__section`}>
              <h2>Acceptable use</h2>
              <p>
                You must not use our website in any way that causes, or may
                cause, damage to the website or impairment of the availability
                or accessibility of the website; or in any way which is
                unlawful, illegal, fraudulent or harmful, or in connection with
                any unlawful, illegal, fraudulent or harmful purpose or
                activity.
                <br />
                You must not use our website to copy, store, host, transmit,
                send, use, publish or distribute any material which consists of
                (or is linked to) any spyware, computer virus, Trojan horse,
                worm, keystroke logger, rootkit or other malicious computer
                software.
                <br />
                You must not conduct any systematic or automated data collection
                activities (including, without limitation, scraping, data
                mining, data extraction and data harvesting) on or in relation
                to our website without our express written consent.
                <br />
                You must not use our website for any purposes related to
                marketing without our express written consent.
              </p>
            </section>

            <section className={`${mainClass}__section`}>
              <h2>Restricted access</h2>
              <p>
                Access to certain areas of our website is restricted. We reserve
                the right to restrict access to other areas of our website, or
                indeed our whole website, at our discretion.
                <br />
                If we provide you with a user ID and password to enable you to
                access restricted areas of our website or other content or
                services, you must ensure that the password is kept
                confidential.
                <br />
                You must notify us in writing immediately if you become aware of
                any unauthorised use of your account or password.
                <br />
                You are responsible for any activity on our website arising out
                of any failure to keep your password confidential and may be
                held liable for any losses arising out of such a failure.
                <br />
                You must not use any other person’s user ID and password to
                access our website.
                <br />
                We may disable your user ID and password at any time in our sole
                discretion with or without notice or explanation.
              </p>
            </section>

            <section className={`${mainClass}__section`}>
              <h2>User content</h2>
              <p>
                In these terms of use, “your content” means material (including,
                without limitation, text, images, audio material, video material
                and audio-visual material) that you submit to our website, for
                whatever purpose.
                <br />
                You grant to us a worldwide, irrevocable, non-exclusive,
                royalty-free licence to use, reproduce, adapt, publish,
                translate and distribute your content in any existing or future
                media. You also grant to us the right to sub-license these
                rights and the right to bring an action for infringement of
                these rights.
                <br />
                You warrant and represent that your content will comply with
                these terms of use.
                <br />
                Your content must not be illegal or unlawful, must not infringe
                any third party’s legal rights and must not be capable of giving
                rise to legal action whether against you or us or a third party
                (in each case under any applicable law).
                <br />
                You must not submit any content to the website that is or has
                ever been the subject of any threatened or actual legal
                proceedings or other similar complaint.
                <br />
                We reserve the right to edit or remove any material submitted to
                our website, or stored on our servers, or hosted or published
                upon our website.
              </p>
            </section>

            <section className={`${mainClass}__section`}>
              <h2>Limited warranties</h2>

              <p>
                We do not warrant the completeness or accuracy of the
                information published on this website; nor do we commit to
                ensuring that the website remains available or that the material
                on the website is kept up to date.
                <br />
                To the maximum extent permitted by applicable law, we exclude
                all representations, warranties and conditions relating to this
                website and the use of this website (including, without
                limitation, any warranties implied by law in respect of
                satisfactory quality, fitness for purpose and/or the use of
                reasonable care and skill).
              </p>
            </section>

            <section className={`${mainClass}__section`}>
              <h2>Limitations and exclusions of liability</h2>
              <p>
                Nothing in these terms of use will: (a) limit or exclude our or
                your liability for death or personal injury resulting from
                negligence; (b) limit or exclude our or your liability for fraud
                or fraudulent misrepresentation; (c) limit any of our or your
                liabilities in any way that is not permitted under applicable
                law; or (d) exclude any of our or your liabilities that may not
                be excluded under applicable law.
                <br />
                The limitations and exclusions of liability set out in this
                Section and elsewhere in these terms of use: (a) are subject to
                the preceding paragraph; and (b) govern all liabilities arising
                under these terms of use or in relation to the subject matter of
                these terms of use, including liabilities arising in contract,
                in tort (including negligence) and for breach of statutory duty.
              </p>
            </section>

            <section className={`${mainClass}__section`}>
              <h2>Indemnity</h2>
              <p>
                You hereby indemnify us and undertake to keep us indemnified
                against any losses, damages, costs, liabilities and expenses
                (including, without limitation, legal expenses and any amounts
                paid by us to a third party in settlement of a claim or dispute
                on the advice of our legal advisers) incurred or suffered by us
                arising out of any breach by you of any provision of these terms
                of use, or arising out of any claim that you have breached any
                provision of these terms of use.
              </p>
            </section>

            <section className={`${mainClass}__section`}>
              <h2>Breaches of these terms of use</h2>
              <p>
                Without prejudice to our other rights under these terms of use,
                if you breach these terms of use in any way, we may take such
                action as we deem appropriate to deal with the breach, including
                suspending your access to the website, prohibiting you from
                accessing the website, blocking computers using your IP address
                from accessing the website, contacting your internet service
                provider to request that they block your access to the website
                and/or bringing court proceedings against you.
              </p>
            </section>

            <section className={`${mainClass}__section`}>
              <h2>Variation</h2>
              <p>
                We may revise these terms of use from time to time. Revised
                terms of use will apply to the use of our website from the date
                of publication of the revised terms of use on our website.
              </p>
            </section>

            <section className={`${mainClass}__section`}>
              <h2>Assignment</h2>
              <p>
                We may transfer, sub-contract or otherwise deal with our rights
                and/or obligations under these terms of use without notifying
                you or obtaining your consent.
                <br />
                You may not transfer, sub-contract or otherwise deal with your
                rights and/or obligations under these terms of use.
              </p>
            </section>

            <section className={`${mainClass}__section`}>
              <h2>Severability</h2>
              <p>
                If a provision of these terms of use is determined by any court
                or other competent authority to be unlawful and/or
                unenforceable, the other provisions will continue in effect. If
                any unlawful and/or unenforceable provision would be lawful or
                enforceable if part of it were deleted, that part will be deemed
                to be deleted, and the rest of the provision will continue in
                effect.
              </p>
            </section>

            <section className={`${mainClass}__section`}>
              <h2>Exclusion of third party rights</h2>
              <p>
                These terms of use are for the benefit of you and us, and are
                not intended to benefit any third party or be enforceable by any
                third party. The exercise of our and your rights in relation to
                these terms of use is not subject to the consent of any third
                party.
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
