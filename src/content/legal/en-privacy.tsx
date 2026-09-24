import { Addr, CompanyTable, Email } from "../../components/layout/DocParts";
import { controllerIntro, controllerName } from "../../lib/site";
import type { LegalDoc } from "./types";

export const privacy: LegalDoc = {
  key: "privacy",
  name: "Privacy Policy",
  lines: ["Privacy", <em key="e" className="text-amber italic">policy.</em>],
  intro: <>What we collect on the website and in the Koordinat Coffee app, why, and how it is protected.</>,
  summary: (
    <>
      The website collects nothing about you. The app keeps only what it needs to run your account, orders and
      loyalty card — and we never see your card details.
    </>
  ),
  sections: [
    {
      id: "scope",
      title: "Scope",
      body: (
        <p>
          This Privacy Policy explains how {controllerIntro("en")} processes, stores and
          protects your personal data when you use the <strong>koordinatcoffee.com</strong> website (the “Site”) and the{" "}
          <strong>Koordinat Coffee</strong> mobile application (the “App”), in accordance with the Turkish Personal Data
          Protection Law No. 6698 (“KVKK”) and related legislation. We are the data controller under KVKK.
        </p>
      ),
    },
    {
      id: "collect",
      title: "Data we collect",
      body: (
        <>
          <h3>Website</h3>
          <p>
            The Site is for information only; it has no accounts, forms or payments. No cookies, analytics or advertising
            trackers are used. Our hosting provider may keep standard server logs — such as IP address, browser
            information and time of access — for a short period for security and to keep the service running.
          </p>
          <h3>Mobile app</h3>
          <ul>
            <li>
              <strong>Account details:</strong> first name, last name, e-mail address; optionally date of birth, gender
              and phone number.
            </li>
            <li>
              <strong>Order details:</strong> items ordered, amount, date and time, order status and handover details.
            </li>
            <li>
              <strong>Payment details:</strong> payment transaction number, amount, result (successful/failed) and refund
              records. <strong>We never see or store your card number, expiry date or CVV</strong>; these are processed
              only by the payment institution PayTR.
            </li>
            <li>
              <strong>Loyalty data:</strong> your coffee purchase records, stamp and reward counters and QR scans, so the
              Papağan loyalty card can work.
            </li>
            <li>
              <strong>Fortune &amp; entertainment data:</strong> the reading type you choose, the relationship status and
              topic you optionally enter, the generated readings; points, levels, game scores and invite code use.
            </li>
            <li>
              <strong>User content:</strong> reviews and comments you share.
            </li>
            <li>
              <strong>Technical data:</strong> session and authentication data, device push token, in-app interaction
              records and error logs.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "photos",
      title: "Fortune photos never leave your device",
      body: (
        <p>
          Photos you take or choose from your gallery for coffee-cup or palm readings are not sent anywhere; they are not
          uploaded to our servers or any third party and are not stored. The reading is generated automatically by
          artificial intelligence from limited text information, without the photo content, and is for entertainment
          only.
        </p>
      ),
    },
    {
      id: "purposes",
      title: "Why we use your data",
      body: (
        <p>
          We use your data to create and manage your account; to take, prepare and hand over your orders; to process
          payments and refunds; to issue financial documents; to run the loyalty programme; to produce the entertainment
          content you ask for; to keep the service secure and prevent fraud; to improve service quality; to send
          notifications; and to meet our legal obligations. For legal grounds and details, see the{" "}
          <a href="/kvkk/">KVKK Privacy Notice</a>.
        </p>
      ),
    },
    {
      id: "sharing",
      title: "Sharing",
      body: (
        <>
          <p>
            Your personal data is never sold, rented or shared with third parties for marketing. It is shared only as far
            as necessary to provide the service, with:
          </p>
          <ul>
            <li>
              <strong>PayTR Ödeme ve Elektronik Para Kuruluşu A.Ş.</strong> and banks (payment, 3D Secure verification,
              refunds and fraud prevention);
            </li>
            <li>cloud database and server infrastructure providers;</li>
            <li>an artificial-intelligence service provider (limited text information for readings only);</li>
            <li>push notification infrastructure (device push token);</li>
            <li>authentication providers (if you choose to sign in with Google or Apple);</li>
            <li>our accountant and competent public authorities (under tax law and other legal obligations).</li>
          </ul>
          <p>
            Some infrastructure providers may have servers abroad. Transfers abroad are made on the basis of the
            safeguards in Article 9 of KVKK and/or your explicit consent.
          </p>
        </>
      ),
    },
    {
      id: "retention",
      title: "How long we keep data",
      body: (
        <p>
          Account data is kept while your account is active. You can delete your account at any time in the App
          settings. Order, payment and financial records are kept for <strong>10 years</strong> as required by the Tax
          Procedure Law No. 213 and the Turkish Commercial Code No. 6102; these records are retained with restricted
          access for the legal period even after your account is deleted. Other data is deleted, destroyed or anonymised
          when the purpose of processing ends.
        </p>
      ),
    },
    {
      id: "security",
      title: "Security",
      body: (
        <p>
          Your data is encrypted in transit with SSL/TLS. On the server side we apply administrative and technical
          measures including access control, authorisation, row-level access rules and logging. Payments are processed on
          PayTR’s PCI-DSS compliant infrastructure.
        </p>
      ),
    },
    {
      id: "rights",
      title: "Your rights",
      body: (
        <p>
          To exercise your rights under Article 11 of KVKK (to request information, correction, deletion, to object,
          etc.), write to <Email /> or to <Addr />. Requests are answered free of charge within 30 days at the latest.
        </p>
      ),
    },
    {
      id: "children",
      title: "Children",
      body: (
        <p>
          The App is not intended for people under 18, and we do not knowingly collect personal data from this age group.
        </p>
      ),
    },
    {
      id: "changes",
      title: "Changes",
      body: (
        <p>
          This policy may be updated. The current version takes effect when it is published on this page; we will let you
          know in the App about significant changes.
        </p>
      ),
    },
    {
      id: "contact",
      title: "Contact",
      body: (
        <p>
          {controllerName} — <Addr /> — <Email />
        </p>
      ),
    },
  ],
};

export const kvkk: LegalDoc = {
  key: "kvkk",
  name: "KVKK Privacy Notice",
  lines: ["KVKK", <em key="e" className="text-amber italic">privacy notice.</em>],
  intro: <>Information notice under the Turkish Personal Data Protection Law No. 6698 (KVKK).</>,
  sections: [
    {
      id: "notice",
      title: "About this notice",
      body: (
        <p>
          This notice has been prepared by {controllerName}, as data controller, under Article 10 of the Personal Data
          Protection Law No. 6698 (“KVKK”) and the Communiqué on the Procedures and Principles for Fulfilling the
          Obligation to Inform.
        </p>
      ),
    },
    { id: "controller", title: "Data controller", body: <CompanyTable /> },
    {
      id: "categories",
      title: "Categories of personal data",
      body: (
        <>
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Identity</td>
                <td>First and last name; optionally date of birth and gender</td>
              </tr>
              <tr>
                <td>Contact</td>
                <td>E-mail address; optionally phone number</td>
              </tr>
              <tr>
                <td>Customer transactions</td>
                <td>
                  Order contents, amount, date and status; handover details; coffee purchase records; stamp, reward and
                  point data; QR scans; invite code use
                </td>
              </tr>
              <tr>
                <td>Finance</td>
                <td>
                  Payment transaction number, amount, payment and refund result, financial document details.{" "}
                  <em>Card number, expiry date and CVV are not processed by us; they are processed only by PayTR.</em>
                </td>
              </tr>
              <tr>
                <td>Entertainment (readings)</td>
                <td>Reading type chosen, optional relationship status and topic, generated readings</td>
              </tr>
              <tr>
                <td>User content</td>
                <td>Reviews and comments, game scores</td>
              </tr>
              <tr>
                <td>Transaction security</td>
                <td>Session and authentication data, device push token, in-app interaction records, error logs, IP address</td>
              </tr>
            </tbody>
          </table>
          <p>We do not aim to process special categories of personal data (KVKK Art. 6).</p>
        </>
      ),
    },
    {
      id: "purposes",
      title: "Purposes and legal grounds",
      body: (
        <ul>
          <li>
            Creating and managing accounts, authentication — <em>establishment and performance of a contract (Art. 5/2-c)</em>
          </li>
          <li>
            Taking, preparing and handing over orders; processing payments and refunds —{" "}
            <em>establishment and performance of a contract (Art. 5/2-c)</em>
          </li>
          <li>
            Issuing financial documents, keeping accounting and tax records — <em>legal obligation (Art. 5/2-ç)</em>
          </li>
          <li>
            Payment security and fraud prevention — <em>legitimate interest (Art. 5/2-f)</em> and{" "}
            <em>legal obligation (Art. 5/2-ç)</em>
          </li>
          <li>
            Running the loyalty programme — <em>performance of a contract (Art. 5/2-c)</em>
          </li>
          <li>
            Producing readings at your request — <em>explicit consent (Art. 5/1)</em> and{" "}
            <em>performance of a contract (Art. 5/2-c)</em>
          </li>
          <li>
            Service security, error detection and measuring service quality — <em>legitimate interest (Art. 5/2-f)</em>
          </li>
          <li>
            Necessary notifications about order status and account actions — <em>performance of a contract (Art. 5/2-c)</em>
          </li>
          <li>
            Campaign and marketing notifications — <em>explicit consent (Art. 5/1)</em>
          </li>
          <li>
            Responding to authorities and protecting rights in legal disputes — <em>legal obligation (Art. 5/2-ç)</em>,{" "}
            <em>establishment and protection of a right (Art. 5/2-e)</em>
          </li>
        </ul>
      ),
    },
    {
      id: "method",
      title: "How data is collected",
      body: (
        <p>
          Your personal data is collected electronically, by fully or partly automated means, when you create an account,
          order and pay, scan QR codes and use other features of the App; payment results are collected by electronic
          notification from PayTR.
        </p>
      ),
    },
    {
      id: "transfer",
      title: "Transfers",
      body: (
        <>
          <p>Limited to the purposes above, your personal data may be transferred to:</p>
          <ul>
            <li>
              <strong>PayTR Ödeme ve Elektronik Para Kuruluşu A.Ş.</strong> and the relevant banks, for payments and
              refunds;
            </li>
            <li>cloud database, server, notification and authentication infrastructure providers;</li>
            <li>an artificial-intelligence service provider, with limited text information, only to produce readings;</li>
            <li>our accountant and, where legally required, competent public institutions.</li>
          </ul>
          <p>
            Some infrastructure providers may have servers abroad; transfers abroad are made on the basis of the
            safeguards in KVKK Art. 9 and/or your explicit consent. Your data is never sold or shared for marketing.
          </p>
        </>
      ),
    },
    {
      id: "retention",
      title: "Retention periods",
      body: (
        <ul>
          <li>
            Account and loyalty data: while the account is active; deleted or anonymised within a reasonable technical
            period after the account is deleted.
          </li>
          <li>Order, payment and financial records: 10 years under the Tax Procedure Law and Turkish Commercial Code.</li>
          <li>
            Distance sales agreement and pre-information confirmation records: at least 3 years under the Distance
            Contracts Regulation.
          </li>
          <li>Reading photos: never stored on servers.</li>
        </ul>
      ),
    },
    {
      id: "rights",
      title: "Your rights (KVKK Art. 11)",
      body: (
        <p>
          By applying to the data controller you may: learn whether your personal data is processed and request
          information if so; learn the purpose of processing and whether it is used accordingly; know the third parties
          it is transferred to; request correction if it is incomplete or inaccurate; request deletion or destruction
          under KVKK Art. 7; request that these actions be notified to third parties it was transferred to; object to a
          result against you arising exclusively from automated analysis; and claim compensation for damage caused by
          unlawful processing.
        </p>
      ),
    },
    {
      id: "apply",
      title: "How to apply",
      body: (
        <p>
          Send your request in writing, with information verifying your identity, in line with the Communiqué on the
          Procedures and Principles of Application to the Data Controller, to <Email /> or to <Addr />. Your application
          is answered free of charge within 30 days at the latest. If your application is rejected or the answer is
          insufficient, you have the right to complain to the Personal Data Protection Board.
        </p>
      ),
    },
  ],
};

export const cookies: LegalDoc = {
  key: "cookies",
  name: "Cookie Policy",
  lines: ["Cookie", <em key="e" className="text-amber italic">policy.</em>],
  intro: <>Short, because there is not much to say.</>,
  summary: (
    <>
      koordinatcoffee.com does not use cookies. There are no analytics, advertising or social media trackers — so there
      is no cookie banner either.
    </>
  ),
  sections: [
    {
      id: "what",
      title: "What is a cookie?",
      body: (
        <p>
          Cookies are small text files that websites save in your browser. They can be used for sessions, remembering
          preferences, statistics or advertising.
        </p>
      ),
    },
    {
      id: "ours",
      title: "Cookies on this site",
      body: (
        <>
          <p>
            Our site is made of informational pages and <strong>sets no cookies</strong>. Fonts, images and videos are
            served from our own server; Google Analytics, Meta Pixel or similar third-party tracking tools are not used.
          </p>
          <p>
            To play the transition between pages, the site writes a single technical entry to your browser’s session
            storage and removes it as soon as the next page opens. It contains no personal data and is never sent to us or
            anyone else.
          </p>
        </>
      ),
    },
    {
      id: "third",
      title: "Third-party links",
      body: (
        <p>
          When you follow links to the App Store, Google Play, Google Maps, Instagram or Facebook, you are taken to those
          sites. Their cookie practices are subject to their own policies.
        </p>
      ),
    },
    {
      id: "app",
      title: "Mobile app",
      body: (
        <p>
          The Koordinat Coffee mobile app does not use browser cookies; session data is kept in your device’s secure
          (encrypted) storage. The PayTR payment page opened at the payment step may use cookies that are necessary for
          transaction security; these are subject to PayTR’s policies.
        </p>
      ),
    },
    {
      id: "changes",
      title: "Changes",
      body: (
        <p>
          If the site starts using cookies in future, this policy will be updated and your consent will be requested
          where required.
        </p>
      ),
    },
    {
      id: "contact",
      title: "Contact",
      body: (
        <p>
          Questions: <Email />
        </p>
      ),
    },
  ],
};

export const terms: LegalDoc = {
  key: "terms",
  name: "Terms of Use",
  lines: ["Terms", <em key="e" className="text-amber italic">of use.</em>],
  intro: <>The rules for using the Koordinat Coffee app and website.</>,
  sections: [
    {
      id: "acceptance",
      title: "Parties, subject and acceptance",
      body: (
        <p>
          These Terms of Use govern the use of the <strong>Koordinat Coffee</strong> mobile application (the “App”) and
          the koordinatcoffee.com website offered by {controllerName} (“we”). By downloading, creating an account in or
          using the App, you accept these Terms.
        </p>
      ),
    },
    {
      id: "service",
      title: "The service",
      body: (
        <p>
          The App offers menu browsing, <strong>ordering and card payment</strong> (pickup), a digital loyalty programme
          (Papağan), an entertainment readings module, mini games, a level/points system, announcements and notifications.
          Downloading and using the App is free; ordered products are charged at the prices shown on the menu. We reserve
          the right to change the scope of the App and campaign rules.
        </p>
      ),
    },
    {
      id: "orders",
      title: "Orders and payment",
      body: (
        <>
          <p>
            3.1 Orders placed in the App are subject to the <a href="/pre-information-form/">Pre-Information Form</a>, the{" "}
            <a href="/distance-sales-agreement/">Distance Sales Agreement</a>,{" "}
            <a href="/cancellation-and-refunds/">Cancellation &amp; Refunds</a> and the <a href="/pickup/">Pickup Terms</a>.
            These documents are presented for your confirmation on the payment screen before ordering.
          </p>
          <p>
            3.2 Payments are taken by credit or debit card through PayTR with 3D Secure. We never see or store your card
            details.
          </p>
          <p>
            3.3 Unauthorised use of someone else’s card, fake orders or attempts to abuse the payment system are
            prohibited; in such cases the order is cancelled, the account may be closed and legal action may be taken.
          </p>
        </>
      ),
    },
    {
      id: "account",
      title: "Account, age limit and security",
      body: (
        <p>
          You must create your account with accurate information that belongs to you. The App is not intended for people
          under 18; the readings module is only for users aged 18 and over. Each user may open only one account. You are
          responsible for the security of your account.
        </p>
      ),
    },
    {
      id: "loyalty",
      title: "Loyalty programme (Papağan)",
      body: (
        <p>
          Stamps are earned by scanning the current QR code at the counter on valid purchases in our store. QR codes are
          short-lived and single-use; attempts to mislead the system are prohibited. Stamps and rewards have no monetary
          value and cannot be exchanged for cash or transferred. Campaign rules are set by us and may change.
        </p>
      ),
    },
    {
      id: "readings",
      title: "Readings and entertainment",
      body: (
        <p>
          Readings are generated automatically by artificial intelligence and are for entertainment only; they make no
          claim to truth and are in no way medical, legal, financial or psychological advice. Reading photos never leave
          your device. Reading rights and credits have no monetary value and are non-refundable.
        </p>
      ),
    },
    {
      id: "content",
      title: "User content",
      body: (
        <p>
          You are responsible for ensuring the comments and reviews you share are lawful. Inappropriate content may be
          removed without notice.
        </p>
      ),
    },
    {
      id: "prohibited",
      title: "Prohibited behaviour",
      body: (
        <p>
          It is prohibited to use the App for unlawful purposes; to try to bypass its security; to reverse engineer it; to
          use bots or automation; to manipulate the QR, stamp, reward, order, payment, invite or game systems; or to use
          another person’s account or card without permission. In case of violation, gains are cancelled, the account may
          be closed and legal action may be taken.
        </p>
      ),
    },
    {
      id: "ip",
      title: "Intellectual property",
      body: (
        <p>
          Rights to the brands, logos, designs, texts, images and software on the Site and in the App belong to us or our
          licensors and may not be used without permission.
        </p>
      ),
    },
    {
      id: "liability",
      title: "Limitation of liability",
      body: (
        <p>
          The App is provided “as is”. To the extent permitted by law, we are not liable for third-party service
          outages, problems caused by devices or connections, or indirect damages. Mandatory consumer protection
          provisions and our liability for intent or gross negligence are reserved.
        </p>
      ),
    },
    {
      id: "deletion",
      title: "Deleting your account",
      body: (
        <p>
          You can delete your account at any time in the App settings. When the account is deleted, accumulated stamps,
          rewards, credits and points expire. Completed order and payment records are kept for the legal retention period.
        </p>
      ),
    },
    {
      id: "law",
      title: "Governing law and disputes",
      body: (
        <p>
          These Terms are governed by the laws of the Republic of Türkiye. The courts and enforcement offices of Hatay
          are competent for disputes. Consumers’ rights to apply to Consumer Arbitration Committees and Consumer Courts
          within the monetary limits are reserved.
        </p>
      ),
    },
    {
      id: "changes",
      title: "Changes and contact",
      body: (
        <p>
          We may update these Terms; the current version takes effect when published on this page. Questions: <Email />
        </p>
      ),
    },
  ],
};
