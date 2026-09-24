import { Branches, CompanyTable, Email, Hours, Reach } from "../../components/layout/DocParts";
import { branches, company, pickupHoldMinutes } from "../../lib/site";
import { PaymentMarks } from "../../components/ui/PaymentMarks";
import type { LegalDoc } from "./types";

export const preInformation: LegalDoc = {
  key: "preInformation",
  name: "Pre-Information Form",
  lines: ["Pre-Information", <em key="e" className="text-amber italic">Form.</em>],
  intro: (
    <>
      Read before every order placed in the Koordinat Coffee app — what you are buying, how you pay, how you collect
      it and what your rights are.
    </>
  ),
  sections: [
    {
      id: "purpose",
      title: "Purpose",
      body: (
        <p>
          This Pre-Information Form has been prepared under Article 5 of the Distance Contracts Regulation and the
          Consumer Protection Law No. 6502 to inform the Buyer before placing an order through the{" "}
          <strong>Koordinat Coffee</strong> mobile application (the “App”). The Buyer reads and confirms this form
          before confirming the order.
        </p>
      ),
    },
    { id: "seller", title: "Seller", body: <CompanyTable /> },
    {
      id: "buyer",
      title: "Buyer",
      body: (
        <p>
          The Buyer is the person who creates an account in the App and places an order. The Buyer’s name, e-mail
          address and (if provided) phone number are taken from the account details in the App and shown in the order
          summary.
        </p>
      ),
    },
    {
      id: "products",
      title: "Key characteristics of the products",
      body: (
        <p>
          The products are the coffee and other drink and food items listed on the menu in the App, prepared to order.
          The name, size, selected extras (milk type, syrup, etc.), quantity and unit price of each product are shown on
          the order confirmation screen and in the order summary.
        </p>
      ),
    },
    {
      id: "price",
      title: "Price and payment",
      body: (
        <ul>
          <li>
            All prices are in Turkish lira and are sales prices <strong>including VAT</strong>.
          </li>
          <li>
            The total amount of the order, including all taxes, is shown on the confirmation screen. No delivery or
            shipping fee is charged for pickup orders.
          </li>
          <li>
            Payment is taken <strong>in advance</strong> by credit or debit card (Visa, Mastercard, Troy) through the
            licensed payment institution <strong>PayTR Ödeme ve Elektronik Para Kuruluşu A.Ş.</strong>, with 3D Secure
            verification.
          </li>
          <li>Card details are never seen or stored by the Seller; they are processed directly on PayTR’s secure page.</li>
        </ul>
      ),
    },
    {
      id: "delivery",
      title: "Delivery",
      body: (
        <ul>
          <li>
            Orders are handed over <strong>in store (pickup)</strong> at the Koordinat branch shown in the order
            summary: <Branches />. There is no home delivery or shipping.
          </li>
          <li>
            Preparation starts once the payment is approved, and the Buyer is notified in the App when the order is
            ready. The estimated preparation time is shown on the order screen.
          </li>
          <li>
            Ready orders are held in store for <strong>{pickupHoldMinutes} minutes</strong> from the ready notification.
            Details: <a href="/pickup/">Pickup Terms</a>.
          </li>
        </ul>
      ),
    },
    {
      id: "withdrawal",
      title: "Right of withdrawal",
      body: (
        <>
          <p>
            Under Article 15(1)(c) of the Distance Contracts Regulation,{" "}
            <strong>
              the right of withdrawal does not apply to contracts for the supply of goods that are liable to deteriorate
              rapidly or expire.
            </strong>{" "}
            Drinks and food prepared to order fall within this exception.
          </p>
          <p>
            However, the Buyer may cancel the order <strong>before preparation begins</strong>, in the App or by
            contacting the Seller, and receive a full refund. The Buyer’s rights under Law No. 6502 in the event of a
            wrong, incomplete or defective product are reserved. Details:{" "}
            <a href="/cancellation-and-refunds/">Cancellation &amp; Refunds</a>.
          </p>
        </>
      ),
    },
    {
      id: "complaints",
      title: "Complaints and disputes",
      body: (
        <p>
          The Buyer may submit complaints through the Seller’s contact details above. In disputes, the Consumer
          Arbitration Committees and Consumer Courts at the Buyer’s place of residence or where the transaction took
          place are competent, within the monetary limits announced each year by the Ministry of Trade.
        </p>
      ),
    },
    {
      id: "confirmation",
      title: "Confirmation",
      body: (
        <p>
          Before completing the order, the Buyer confirms on the payment screen of the App that they have read,
          understood and electronically accepted this Pre-Information Form and the{" "}
          <a href="/distance-sales-agreement/">Distance Sales Agreement</a>. Placing the order creates an obligation to
          pay. A copy of the form and the agreement is stored with the order record and sent to the Buyer by e-mail on
          request.
        </p>
      ),
    },
  ],
};

export const distanceSales: LegalDoc = {
  key: "distanceSales",
  name: "Distance Sales Agreement",
  lines: ["Distance Sales", <em key="e" className="text-amber italic">Agreement.</em>],
  intro: <>The agreement between you and {company.tradeName} for every order placed in the Koordinat Coffee app.</>,
  sections: [
    {
      id: "parties",
      title: "Parties",
      body: (
        <>
          <h3>1.1 Seller</h3>
          <CompanyTable />
          <h3>1.2 Buyer</h3>
          <p>
            The person who creates an account and places an order in the Koordinat Coffee mobile application (the
            “App”). The Buyer’s name, e-mail address and (if provided) phone number are taken from the account details in
            the App at the time of the order.
          </p>
        </>
      ),
    },
    {
      id: "subject",
      title: "Subject",
      body: (
        <p>
          This agreement sets out the rights and obligations of the parties, under the Consumer Protection Law No. 6502
          and the Distance Contracts Regulation, regarding the sale and delivery of the products ordered electronically
          by the Buyer through the App, whose characteristics and sales price are shown on the order screen.
        </p>
      ),
    },
    {
      id: "price",
      title: "Products, price and payment",
      body: (
        <>
          <p>
            3.1 The type, quantity, selected extras, unit price and VAT-inclusive total of the products are shown on the
            order confirmation screen and in the order summary; this information forms an integral part of this
            agreement.
          </p>
          <p>3.2 Prices are in Turkish lira and include VAT. No additional delivery fee is charged for pickup orders.</p>
          <p>
            3.3 Payment is made in advance by credit or debit card through PayTR Ödeme ve Elektronik Para Kuruluşu A.Ş.,
            with 3D Secure verification. The Seller does not see or store the Buyer’s card details.
          </p>
          <p>
            3.4 The financial document for the order (receipt or e-Archive invoice) is provided at handover or sent to
            the Buyer’s e-mail address in accordance with the legislation.
          </p>
        </>
      ),
    },
    {
      id: "delivery",
      title: "Delivery",
      body: (
        <>
          <p>
            4.1 The products are handed over to the Buyer at the Seller’s branch shown in the order summary (pickup):{" "}
            <Branches />. There is no home delivery or shipping.
          </p>
          <p>
            4.2 Preparation starts when the payment is approved. The Buyer is notified in the App when the order is
            ready. Handover takes place on presentation of the order number shown in the App.
          </p>
          <p>
            4.3 Ready orders are held in store for {pickupHoldMinutes} minutes from the ready notification. Because the
            products are perishable, freshness cannot be guaranteed for orders not collected within this period, and no
            refund is made in that case. Force majeure and delays caused by the Seller are reserved.
          </p>
          <p>
            4.4 If the Seller finds that an order cannot be prepared for any reason (item sold out, technical fault,
            store closed, etc.), it informs the Buyer immediately and refunds the full amount to the card used for
            payment within 14 days at the latest.
          </p>
        </>
      ),
    },
    {
      id: "withdrawal",
      title: "Right of withdrawal",
      body: (
        <>
          <p>
            5.1 Under Article 15(1)(c) of the Distance Contracts Regulation, the right of withdrawal does not apply to
            contracts for goods that are liable to deteriorate rapidly or expire. The products are drinks and food
            prepared to order and therefore fall within this exception.
          </p>
          <p>
            5.2 Nevertheless, the Buyer may cancel the order <strong>before preparation begins</strong>, in the App or
            through the Seller’s contact channels. In that case the full amount is refunded to the card used for payment
            within 14 days of the cancellation at the latest.
          </p>
        </>
      ),
    },
    {
      id: "defects",
      title: "Defective or wrong products",
      body: (
        <>
          <p>
            6.1 If the product handed over differs from what was ordered, is incomplete or defective, the Buyer reports
            this to the staff at handover or to the Seller’s contact channels as soon as possible.
          </p>
          <p>
            6.2 Under Article 11 of Law No. 6502, the Buyer may request replacement with a non-defective product, a
            refund, or a price reduction proportionate to the defect. Refunds are made to the card used for payment.
          </p>
        </>
      ),
    },
    {
      id: "refunds",
      title: "Refund procedure",
      body: (
        <p>
          Refunds are made to the card used for payment through PayTR. The time for the refund to appear on the card
          depends on the Buyer’s bank (usually 2–10 business days). As no instalments are used, the refund is made in a
          single transaction.
        </p>
      ),
    },
    {
      id: "general",
      title: "General provisions",
      body: (
        <>
          <p>
            8.1 The Buyer confirms that, before ordering, they read the Pre-Information Form, were informed of the key
            characteristics of the products, the sales price, the payment and delivery terms and the exception to the
            right of withdrawal, and accepted these electronically.
          </p>
          <p>
            8.2 The Seller is not obliged to prepare the order if the card is found to have been used unlawfully by
            someone other than the cardholder, or if the bank does not approve the payment.
          </p>
          <p>
            8.3 The Seller reserves the right to change the menu, prices and campaigns in the App. Confirmed orders are
            completed at the price valid at the time of confirmation.
          </p>
        </>
      ),
    },
    {
      id: "data",
      title: "Personal data",
      body: (
        <p>
          The Buyer’s personal data is processed as described in the <a href="/kvkk/">KVKK Privacy Notice</a> and the{" "}
          <a href="/privacy/">Privacy Policy</a>.
        </p>
      ),
    },
    {
      id: "disputes",
      title: "Disputes",
      body: (
        <p>
          For disputes arising from this agreement, the Consumer Arbitration Committees at the Buyer’s place of residence
          or where the transaction took place are competent within the monetary limits announced each year by the
          Ministry of Trade, and the Consumer Courts for disputes above those limits.
        </p>
      ),
    },
    {
      id: "effect",
      title: "Entry into force",
      body: (
        <p>
          The Buyer is deemed to have accepted all terms of this agreement when confirming the order and completing the
          payment. The agreement is concluded electronically on the order date; a copy is stored with the order record
          and sent to the Buyer by e-mail on request.
        </p>
      ),
    },
  ],
};

export const cancellation: LegalDoc = {
  key: "cancellation",
  name: "Cancellation & Refunds",
  lines: ["Cancellation", <em key="e" className="text-amber italic">&amp; refunds.</em>],
  intro: <>What happens if you change your mind, or if something is not right with your order.</>,
  summary: (
    <>
      Cancel before we start preparing and you get the full amount back. Once preparation has started it cannot be
      cancelled — it is fresh food. If you receive a wrong, incomplete or faulty product, we remake it or refund it.
    </>
  ),
  sections: [
    {
      id: "cancel",
      title: "Cancelling an order",
      body: (
        <ul>
          <li>
            <strong>Before preparation starts:</strong> cancel from the order screen in the App or by contacting us. The
            full amount you paid is refunded.
          </li>
          <li>
            <strong>After preparation has started:</strong> products are made fresh, to order, so cancellation is not
            possible.
          </li>
          <li>
            <strong>Cancelled by us:</strong> if we cannot prepare your order — for example an item is sold out, there
            is a technical fault or the store is closed — we let you know and refund the full amount.
          </li>
        </ul>
      ),
    },
    {
      id: "withdrawal",
      title: "Right of withdrawal",
      body: (
        <p>
          Under Article 15(1)(c) of the Distance Contracts Regulation, the <strong>right of withdrawal does not apply</strong>{" "}
          to contracts for goods that are liable to deteriorate rapidly or expire. Our drinks and food prepared to order
          fall within this exception. The cancellation option above is offered by us voluntarily, despite this legal
          exception.
        </p>
      ),
    },
    {
      id: "faulty",
      title: "Wrong, incomplete or faulty products",
      body: (
        <>
          <p>
            If the product you received is different from what you ordered, incomplete or faulty, please tell our staff
            at handover or write to <Email /> as soon as possible. Under Article 11 of the Consumer Protection Law No.
            6502, at your choice we will:
          </p>
          <ul>
            <li>prepare the product again free of charge, or</li>
            <li>refund the product price to the card you paid with, or</li>
            <li>give a discount proportionate to the defect.</li>
          </ul>
        </>
      ),
    },
    {
      id: "uncollected",
      title: "Orders not collected",
      body: (
        <p>
          Ready orders are held in store for {pickupHoldMinutes} minutes from the ready notification. Because the
          products are perishable, no refund is made for orders not collected within this period. If you let us know you
          are running late, we will hold your order as long as we reasonably can.
        </p>
      ),
    },
    {
      id: "timing",
      title: "Refund process and timing",
      body: (
        <>
          <table>
            <thead>
              <tr>
                <th>Step</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Reviewing your refund request</td>
                <td>Within 2 business days</td>
              </tr>
              <tr>
                <td>Starting the refund</td>
                <td>Within 14 days of approval (usually the same day)</td>
              </tr>
              <tr>
                <td>Amount appearing on your card</td>
                <td>Usually 2–10 business days, depending on your bank</td>
              </tr>
            </tbody>
          </table>
          <p>
            Refunds are made only to the card used for payment, through PayTR. We do not refund in cash or to another
            account. For debit cards the amount returns to your account; for credit cards it returns to your card limit.
          </p>
        </>
      ),
    },
    {
      id: "contact",
      title: "Contact",
      body: (
        <p>
          For cancellation and refund requests: <Reach />. Please include your order number.
        </p>
      ),
    },
  ],
};

export const pickup: LegalDoc = {
  key: "pickup",
  name: "Pickup Terms",
  lines: ["Pickup", <em key="e" className="text-amber italic">terms.</em>],
  intro: <>Every app order is collected at the counter — here is how it works.</>,
  summary: <>Order in the app, pay by card, get a notification when it is ready, show your order number at the counter.</>,
  sections: [
    {
      id: "method",
      title: "Delivery method",
      body: (
        <p>
          All orders placed in the Koordinat Coffee app are handed over <strong>in store (pickup)</strong> at one of our
          two branches in Samandağ. We do{" "}
          <strong>not</strong> offer shipping, courier or home delivery.
        </p>
      ),
    },
    {
      id: "point",
      title: "Pickup points",
      body: (
        <>
          <table>
            <tbody>
              {branches.map((b) => (
                <tr key={b.id}>
                  <th scope="row">
                    Branch {b.n} · {b.area}
                  </th>
                  <td>
                    {b.name}
                    <br />
                    {b.full}
                    <br />
                    <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer">
                      Open in Google Maps
                    </a>
                  </td>
                </tr>
              ))}
              <tr>
                <th scope="row">Opening hours</th>
                <td>
                  <Hours />
                </td>
              </tr>
              <tr>
                <th scope="row">Contact</th>
                <td>
                  <Reach />
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            Orders are accepted only while the branch is open. The branch that prepares your order is shown in the order
            summary in the App.
          </p>
        </>
      ),
    },
    {
      id: "preparation",
      title: "Preparation time",
      body: (
        <p>
          Your order is prepared once your bank has approved the payment. The estimated preparation time is shown in the
          App when you order; depending on how busy we are it is usually 5–15 minutes. You receive a notification in the
          App when your order is ready.
        </p>
      ),
    },
    {
      id: "collecting",
      title: "Collecting your order",
      body: (
        <ul>
          <li>
            Show the <strong>order number</strong> in the App to our staff to collect your order.
          </li>
          <li>If someone else is collecting for you, simply share the order number with them.</li>
          <li>
            Ready orders are held in store for <strong>{pickupHoldMinutes} minutes</strong> from the ready notification.
          </li>
        </ul>
      ),
    },
    {
      id: "fees",
      title: "Delivery fee",
      body: (
        <p>
          No delivery or service fee is charged for pickup orders. You pay the total of the VAT-inclusive menu prices.
        </p>
      ),
    },
    {
      id: "late",
      title: "Late or uncollected orders",
      body: (
        <p>
          For uncollected orders and refund terms, see <a href="/cancellation-and-refunds/">Cancellation &amp; Refunds</a>.
        </p>
      ),
    },
  ],
};

export const payment: LegalDoc = {
  key: "payment",
  name: "Payment & Security",
  lines: ["Payment", <em key="e" className="text-amber italic">&amp; security.</em>],
  intro: <>How card payments work in the Koordinat Coffee app, and how your card details are protected.</>,
  summary: <>We never see or store your card. Payments run on PayTR, with a 3D Secure code from your bank every time.</>,
  sections: [
    {
      id: "methods",
      title: "Payment methods",
      body: (
        <>
          <p>You can pay for orders in the Koordinat Coffee app with:</p>
          <ul>
            <li>Credit cards (Visa, Mastercard, Troy)</li>
            <li>Debit cards (Visa, Mastercard, Troy — must be enabled for online shopping)</li>
          </ul>
          <p>
            Payments are taken in Turkish lira as a <strong>single payment</strong>. Instalments are not offered.
          </p>
          <PaymentMarks className="pt-2" label="Accepted cards and payment infrastructure" />
        </>
      ),
    },
    {
      id: "paytr",
      title: "Payment infrastructure: PayTR",
      body: (
        <p>
          Payments are taken through <strong>PayTR Ödeme ve Elektronik Para Kuruluşu A.Ş.</strong>, a payment and
          electronic money institution licensed by the Central Bank of the Republic of Türkiye. At the payment step,
          PayTR’s secure payment page opens inside the App and you enter your card details directly on that page.
        </p>
      ),
    },
    {
      id: "protection",
      title: "How your card details are protected",
      body: (
        <ul>
          <li>
            <strong>We never see or store your card details.</strong> The card number, expiry date and security code
            (CVV) are processed only by PayTR, in line with PCI-DSS security standards.
          </li>
          <li>
            <strong>3D Secure:</strong> every payment is verified with a one-time code (SMS) sent by your bank.
          </li>
          <li>
            <strong>Encrypted connection:</strong> all communication between the App, our servers and the payment page is
            encrypted with SSL/TLS.
          </li>
          <li>
            <strong>Server-side verification:</strong> an order is treated as paid only after the signed payment
            notification sent by PayTR to our server has been verified.
          </li>
        </ul>
      ),
    },
    {
      id: "after",
      title: "After payment",
      body: (
        <p>
          Once your payment is approved, your order is prepared and the order summary is shown in the App. If the payment
          is not approved, nothing is taken from your card and no order is created. Occasionally a pre-authorisation may
          appear briefly; your bank removes pre-authorisations for unapproved transactions automatically.
        </p>
      ),
    },
    {
      id: "refunds",
      title: "Refunds",
      body: (
        <p>
          See <a href="/cancellation-and-refunds/">Cancellation &amp; Refunds</a>. Refunds are made only to the card used
          for payment.
        </p>
      ),
    },
    {
      id: "suspicious",
      title: "Reporting a suspicious transaction",
      body: (
        <p>
          If you think your card was used without your knowledge, contact your bank immediately and write to us at{" "}
          <Email />.
        </p>
      ),
    },
  ],
};
