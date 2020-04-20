import React from "react";
import { Typography } from "antd";
import PageLayout from "../../components/Layout/PageLayout";

import "./privacy.css";

const { Title, Text } = Typography;

function Privacy() {
  return (
    <PageLayout>
      <div className="centered">
        <Title level={2}>Privacy Policy</Title>
      </div>
      <div className="container">
        <Text>
          VoloSpesa is committed to protecting the privacy of all users of our
          website VoloSpesa.org, or mobile applications (together, the "Sites").
          Please read the following privacy policy that explains how we use and
          protect your information. We'll be the "data controller" of the
          information you provide to us. <br />
          1. Contact Details If you have any queries or requests concerning this
          privacy policy or how we handle your data more generally, please get
          in touch with us using the following details. By contacting our
          general customer services team at: support@volospesa.org <br />
          2. How We Collect Your Information: We collect your personal
          information when you interact with us or use our services, such as
          when you use our Sites to place an order. We also look at how visitors
          use our Sites, to help us improve our services and optimise customer
          experience. We collect information: when you create an account with us
          or you change your account settings; when you place an order with us
          and during the order process (including for payment and order
          delivery); when you contact us directly via email, phone, post,
          message or via our chat function; and when you browse and use our
          Sites (before and after you create an account with us).
          <br />
          3. Information We Collect From You: As part of our commitment to the
          privacy of our customers and visitors to our Sites more generally, we
          want to be clear about the sorts of information we will collect from
          you. When you visit the Sites or make a VoloSpesa order through the
          Sites, We also collect information about your usage of the Sites and
          information about you from any messages you post to the Sites or when
          you contact us or provide us with feedback, including via e-mail,
          letter, phone or chat function. If you contact us by phone, we record
          the call for training and service improvement purposes, and make notes
          in relation to your call. <br />
          4. Use Of Your Information: We will only process the data we collect
          about you if there is a reason for doing so, and if that reason is
          permitted under data protection law. We will have a lawful basis for
          processing your information: if we need to process your information in
          order to provide you with the service you have requested or to enter
          into a contract; we have your consent; we have a justifiable reason
          for processing your data; or we are under a legal obligation to do so.
          <br />
          5. VoloSpesa For Business: We also process your information to
          determine whether you may be interested in hearing about our VoloSpesa
          for Business service and, if your employer signs up for VoloSpesa for
          Business, to make this service available to you. <br />
          6. Cookies: You can set your browser to refuse all or some browser
          cookies, or to alert you when websites set or access cookies. If you
          disable or refuse cookies, please note that some parts of the Site may
          become inaccessible or not function properly. <br />
          7. Direct Marketing Where you have given your consent or where we have
          a justifiable reason for doing so (and are permitted to do so by law)
          we will use your information to let you know about our other products
          and services that may be of interest to you and we may contact you to
          do so by email or phone. <br />
          8. Automated Decision Making We conduct fraud checks on all customers.
          Where we believe we may detect fraudulent activity we may block you
          from placing an order and using our Sites. <br />
          9. Retention Of Your Information We will not retain your information
          for any longer than we think is necessary. <br />
          10. Disclosure Of Your Information The information we collect about
          you will be transferred to and stored on our servers located within
          the EU. We are very careful and transparent about who else your
          information is shared with. <br />
          11. Security We adopt robust technologies and policies to ensure the
          personal security of whoever visits the Site.
          <br />
          12. Your Rights Under data protection law, you may have a number of
          rights concerning the data we hold about you. If you wish to exercise
          any of these rights, please contact our Data Protection Officer using
          the contact details set out above. For additional information on your
          rights please contact your data protection authority and see below.
          <br />
          13. Changes To Our Privacy Policy Any changes to our privacy policy
          will be posted to the Sites and, where appropriate, we will notify you
          of the changes for example by email or push notification. This privacy
          policy was last updated: 20/04/2020 <br />
          14. Complaints If you’re not satisfied with our response to any
          complaint or believe our processing of your information does not
          comply with data protection law, you can make a complaint to the
          Information Commissioner’s Office (ICO) using the following details:
          Website: volospesa.org
        </Text>
      </div>
    </PageLayout>
  );
}

export default Privacy;
