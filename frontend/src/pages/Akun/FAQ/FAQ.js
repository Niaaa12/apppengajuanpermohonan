import React from 'react';
import '../../../styles.css';

const FAQ = () => {
  return (
    <div className="faq-container">
      <div className="collapse collapse-arrow">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title">How do I create an account?</div>
        <div className="collapse-content">
          Click the "Sign Up" button in the top right corner and follow the registration process.
        </div>
      </div>

      <div className="collapse collapse-arrow">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title">I forgot my password. What should I do?</div>
        <div className="collapse-content">
          Click on "Forgot Password" on the login page and follow the instructions sent to your email.
        </div>
      </div>

      <div className="collapse collapse-arrow">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title">How do I update my profile information?</div>
        <div className="collapse-content">
          Go to "My Account" settings and select "Edit Profile" to make changes.
        </div>
      </div>
    </div>
  );
};

export default FAQ;
