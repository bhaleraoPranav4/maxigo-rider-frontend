import { useLanguage } from "./LanguageContext";
import "./PrivacySecurity.css";

function PrivacySecurity({ setActiveTab, onLogout }) {
  const { language } = useLanguage();

  const translations = {
    en: {
      accountSecurityLabel: "ACCOUNT SECURITY",
      title: "Privacy & Security",
      subtitle: "Manage your privacy, security and personal data",
      protectTitle: "Protect your MaxiGo account",
      protectText: "Keep your login details private and use only official MaxiGo services when sharing account information.",
      accountSecurityBadge: "Account Security",
      accountSecurity: "Account Security",
      accountSecuritySub: "Important information for your rider account",
      mobileNumber: "Mobile Number",
      mobileText: "Your registered mobile number can be used for account verification and login.",
      otpVerification: "OTP Verification",
      otpText: "OTP verification helps confirm that the account is being accessed by the registered rider.",
      loginCredentials: "Login Credentials",
      credentialsText: "Never share your OTP, PIN, password or other account credentials with anyone.",
      verified: "Verified",
      active: "Active",
      personalData: "Personal Data",
      personalDataSub: "Information collected to provide and manage rider services",
      profileInformation: "Profile Information",
      profileDetails: "Name, mobile number and email",
      location: "Location",
      locationDetails: "Used when required for delivery and navigation",
      vehicleDetails: "Vehicle Details",
      vehicleDetailsInfo: "Vehicle type and registration information",
      bankDetails: "Bank Details",
      bankDetailsInfo: "Used for rider earnings settlement",
      kycInformation: "KYC Information",
      kycDetails: "Aadhaar and PAN where required for verification",
      deliveryInformation: "Delivery Information",
      deliveryDetails: "Orders, pickups and delivery history",
      locationPrivacy: "Location Privacy",
      locationPrivacySub: "How location information is used during rider activity",
      deliveryLocation: "Delivery Location",
      locationText: "Location may be used while you are working as a rider to support order assignment, pickup, navigation and delivery tracking.",
      locationNote: "Location permission should only be requested when the rider functionality requires it.",
      dataProtection: "Data Protection",
      dataProtectionSub: "How your information should be protected",
      dataRule1: "Personal information should only be accessed for legitimate MaxiGo services and authorized purposes.",
      dataRule2: "Sensitive KYC and banking information should be protected using appropriate access controls.",
      dataRule3: "MaxiGo should not sell personal data. Any actual third-party sharing must be disclosed in the published Privacy Policy.",
      dataRule4: "Data retention and deletion should follow the published Privacy Policy and applicable legal requirements.",
      privacyPolicy: "Privacy Policy",
      privacyPolicySub: "Read the full MaxiGo privacy policy",
      viewPrivacy: "View Privacy Policy",
      privacyActionSub: "Review how MaxiGo handles your personal information",
      terms: "Terms & Conditions",
      termsSub: "Review the rules and conditions for using MaxiGo Rider",
      deleteAccount: "Delete Account",
      deleteText: "Request deletion of your MaxiGo Rider account and associated personal data.",
      deleteNote: "Some information may need to be retained where required by law, fraud prevention, financial records or other legitimate obligations.",
      requestDeletion: "Request Account Deletion",
      privacyQuestions: "Privacy Questions?",
      privacyQuestionsText: "Contact the MaxiGo privacy team for questions about your personal information.",
      contactPrivacy: "Contact Privacy Team",
      logout: "Logout",
      version: "MaxiGo Rider • Privacy & Security • Version 1.0.0",
      confirmDelete: "Are you sure you want to request deletion of your MaxiGo Rider account?",
      deletionReceived: "Account deletion request received. Connect this action to your secure backend account-deletion endpoint before production launch.",
      privacyEmail: "privacy@yourdomain.com",
      privacyUrl: "https://yourdomain.com/privacy-policy",
      termsUrl: "https://yourdomain.com/terms"
    },

    hi: {
      accountSecurityLabel: "खाता सुरक्षा",
      title: "गोपनीयता और सुरक्षा",
      subtitle: "अपनी गोपनीयता, सुरक्षा और व्यक्तिगत डेटा प्रबंधित करें",
      protectTitle: "अपने MaxiGo खाते को सुरक्षित रखें",
      protectText: "अपने लॉगिन विवरण निजी रखें और खाता जानकारी साझा करते समय केवल आधिकारिक MaxiGo सेवाओं का उपयोग करें।",
      accountSecurityBadge: "खाता सुरक्षा",
      accountSecurity: "खाता सुरक्षा",
      accountSecuritySub: "आपके राइडर खाते के लिए महत्वपूर्ण जानकारी",
      mobileNumber: "मोबाइल नंबर",
      mobileText: "आपके पंजीकृत मोबाइल नंबर का उपयोग खाता सत्यापन और लॉगिन के लिए किया जा सकता है।",
      otpVerification: "OTP सत्यापन",
      otpText: "OTP सत्यापन यह सुनिश्चित करने में मदद करता है कि खाते का उपयोग पंजीकृत राइडर द्वारा किया जा रहा है।",
      loginCredentials: "लॉगिन विवरण",
      credentialsText: "अपना OTP, PIN, पासवर्ड या अन्य खाता विवरण किसी के साथ साझा न करें।",
      verified: "✓ सत्यापित",
      active: "✓ सक्रिय",
      personalData: "व्यक्तिगत डेटा",
      personalDataSub: "आपके राइडर खाते से संबंधित जानकारी",
      profileInformation: "प्रोफ़ाइल जानकारी",
      profileDetails: "नाम, मोबाइल नंबर और ईमेल",
      location: "लोकेशन",
      locationDetails: "डिलीवरी और नेविगेशन के लिए आवश्यक होने पर उपयोग",
      vehicleDetails: "वाहन विवरण",
      vehicleDetailsInfo: "वाहन का प्रकार और पंजीकरण जानकारी",
      bankDetails: "बैंक विवरण",
      bankDetailsInfo: "राइडर की कमाई के भुगतान के लिए उपयोग",
      kycInformation: "KYC जानकारी",
      kycDetails: "सत्यापन के लिए आवश्यक होने पर आधार और PAN",
      deliveryInformation: "डिलीवरी जानकारी",
      deliveryDetails: "ऑर्डर, पिकअप और डिलीवरी इतिहास",
      locationPrivacy: "लोकेशन गोपनीयता",
      locationPrivacySub: "समझें कि राइडर लोकेशन का उपयोग कब किया जा सकता है",
      deliveryLocation: "डिलीवरी लोकेशन",
      locationText: "ऑर्डर असाइनमेंट, पिकअप, नेविगेशन और डिलीवरी ट्रैकिंग के लिए राइडर के रूप में काम करते समय लोकेशन का उपयोग किया जा सकता है।",
      locationNote: "लोकेशन अनुमति केवल तभी मांगी जानी चाहिए जब राइडर सुविधा के लिए इसकी आवश्यकता हो।",
      dataProtection: "डेटा सुरक्षा",
      dataProtectionSub: "महत्वपूर्ण गोपनीयता और सुरक्षा सिद्धांत",
      dataRule1: "व्यक्तिगत जानकारी का उपयोग केवल वैध MaxiGo सेवाओं और अधिकृत उद्देश्यों के लिए होना चाहिए।",
      dataRule2: "संवेदनशील KYC और बैंकिंग जानकारी को उचित एक्सेस नियंत्रण से सुरक्षित रखा जाना चाहिए।",
      dataRule3: "MaxiGo को व्यक्तिगत डेटा नहीं बेचना चाहिए। वास्तविक तृतीय-पक्ष साझा करने की जानकारी प्रकाशित Privacy Policy में दी जानी चाहिए।",
      dataRule4: "डेटा संग्रहण और हटाने की प्रक्रिया प्रकाशित Privacy Policy और लागू कानूनी आवश्यकताओं के अनुसार होनी चाहिए।",
      privacyPolicy: "गोपनीयता नीति",
      privacyPolicySub: "जानें कि MaxiGo राइडर जानकारी को कैसे संभालता है",
      viewPrivacy: "Privacy Policy देखें",
      privacyActionSub: "डेटा संग्रह, उपयोग, साझा करना, संग्रहण और हटाना",
      terms: "नियम और शर्तें",
      termsSub: "MaxiGo Rider के नियम और शर्तें पढ़ें",
      deleteAccount: "खाता हटाएं",
      deleteText: "अपने MaxiGo Rider खाते और संबंधित व्यक्तिगत डेटा को हटाने का अनुरोध करें।",
      deleteNote: "कानून, धोखाधड़ी रोकथाम, वित्तीय रिकॉर्ड या अन्य वैध दायित्वों के कारण कुछ जानकारी रखी जा सकती है।",
      requestDeletion: "खाता हटाने का अनुरोध",
      privacyQuestions: "गोपनीयता से जुड़े प्रश्न?",
      privacyQuestionsText: "अपनी व्यक्तिगत जानकारी से जुड़े प्रश्नों के लिए MaxiGo privacy team से संपर्क करें।",
      contactPrivacy: "Privacy Team से संपर्क करें",
      logout: "↪ MaxiGo से लॉगआउट",
      version: "MaxiGo Rider • गोपनीयता और सुरक्षा • Version 1.0.0",
      confirmDelete: "क्या आप वाकई अपने MaxiGo Rider खाते को हटाने का अनुरोध करना चाहते हैं?",
      deletionReceived: "खाता हटाने का अनुरोध प्राप्त हुआ। Production launch से पहले इसे secure backend account-deletion endpoint से जोड़ें।",
      privacyEmail: "privacy@yourdomain.com",
      privacyUrl: "https://yourdomain.com/privacy-policy",
      termsUrl: "https://yourdomain.com/terms"
    },

    mr: {
      accountSecurityLabel: "खाते सुरक्षा",
      title: "गोपनीयता आणि सुरक्षा",
      subtitle: "तुमची गोपनीयता, सुरक्षा आणि वैयक्तिक डेटा व्यवस्थापित करा",
      protectTitle: "तुमचे MaxiGo खाते सुरक्षित ठेवा",
      protectText: "तुमची लॉगिन माहिती गोपनीय ठेवा आणि खाते माहिती शेअर करताना फक्त अधिकृत MaxiGo सेवा वापरा.",
      accountSecurityBadge: "खाते सुरक्षा",
      accountSecurity: "खाते सुरक्षा",
      accountSecuritySub: "तुमच्या रायडर खात्यासाठी महत्त्वाची माहिती",
      mobileNumber: "मोबाईल नंबर",
      mobileText: "तुमच्या नोंदणीकृत मोबाईल नंबरचा वापर खाते पडताळणी आणि लॉगिनसाठी केला जाऊ शकतो.",
      otpVerification: "OTP पडताळणी",
      otpText: "OTP पडताळणीमुळे खाते नोंदणीकृत रायडरच वापरत आहे याची खात्री करण्यात मदत होते.",
      loginCredentials: "लॉगिन माहिती",
      credentialsText: "तुमचा OTP, PIN, पासवर्ड किंवा इतर खाते माहिती कोणासोबतही शेअर करू नका.",
      verified: "✓ पडताळलेले",
      active: "✓ सक्रिय",
      personalData: "वैयक्तिक डेटा",
      personalDataSub: "तुमच्या रायडर खात्याशी संबंधित माहिती",
      profileInformation: "प्रोफाइल माहिती",
      profileDetails: "नाव, मोबाईल नंबर आणि ईमेल",
      location: "लोकेशन",
      locationDetails: "डिलिव्हरी आणि नेव्हिगेशनसाठी आवश्यकतेनुसार वापर",
      vehicleDetails: "वाहनाची माहिती",
      vehicleDetailsInfo: "वाहनाचा प्रकार आणि नोंदणी माहिती",
      bankDetails: "बँक तपशील",
      bankDetailsInfo: "रायडरच्या कमाईच्या सेटलमेंटसाठी वापर",
      kycInformation: "KYC माहिती",
      kycDetails: "पडताळणीसाठी आवश्यक असल्यास आधार आणि PAN",
      deliveryInformation: "डिलिव्हरी माहिती",
      deliveryDetails: "ऑर्डर्स, पिकअप आणि डिलिव्हरी इतिहास",
      locationPrivacy: "लोकेशन गोपनीयता",
      locationPrivacySub: "रायडर लोकेशन कधी वापरले जाऊ शकते ते समजून घ्या",
      deliveryLocation: "डिलिव्हरी लोकेशन",
      locationText: "ऑर्डर असाइनमेंट, पिकअप, नेव्हिगेशन आणि डिलिव्हरी ट्रॅकिंगसाठी रायडर म्हणून काम करताना लोकेशन वापरले जाऊ शकते.",
      locationNote: "रायडर सुविधेसाठी आवश्यक असल्यासच लोकेशन permission मागितली जावी.",
      dataProtection: "डेटा संरक्षण",
      dataProtectionSub: "महत्त्वाची गोपनीयता आणि सुरक्षा तत्त्वे",
      dataRule1: "वैयक्तिक माहितीचा वापर फक्त वैध MaxiGo सेवा आणि अधिकृत उद्देशांसाठी केला पाहिजे.",
      dataRule2: "संवेदनशील KYC आणि बँकिंग माहिती योग्य access control वापरून सुरक्षित ठेवली पाहिजे.",
      dataRule3: "MaxiGo ने वैयक्तिक डेटा विकू नये. प्रत्यक्ष तृतीय-पक्ष sharing प्रकाशित Privacy Policy मध्ये स्पष्ट केले पाहिजे.",
      dataRule4: "डेटा retention आणि deletion प्रकाशित Privacy Policy आणि लागू कायदेशीर आवश्यकतांनुसार असावे.",
      privacyPolicy: "गोपनीयता धोरण",
      privacyPolicySub: "MaxiGo रायडर माहिती कशी हाताळते ते वाचा",
      viewPrivacy: "Privacy Policy पहा",
      privacyActionSub: "डेटा संकलन, वापर, sharing, retention आणि deletion",
      terms: "अटी आणि शर्ती",
      termsSub: "MaxiGo Rider च्या अटी आणि शर्ती वाचा",
      deleteAccount: "खाते हटवा",
      deleteText: "तुमचे MaxiGo Rider खाते आणि संबंधित वैयक्तिक डेटा हटवण्याची विनंती करा.",
      deleteNote: "कायदा, फसवणूक प्रतिबंध, आर्थिक नोंदी किंवा इतर वैध कारणांमुळे काही माहिती ठेवली जाऊ शकते.",
      requestDeletion: "खाते हटवण्याची विनंती",
      privacyQuestions: "गोपनीयतेबाबत प्रश्न?",
      privacyQuestionsText: "तुमच्या वैयक्तिक माहितीबाबत प्रश्न असल्यास MaxiGo privacy team शी संपर्क साधा.",
      contactPrivacy: "Privacy Team शी संपर्क करा",
      logout: "↪ MaxiGo मधून लॉगआउट",
      version: "MaxiGo Rider • गोपनीयता आणि सुरक्षा • Version 1.0.0",
      confirmDelete: "तुमच्या MaxiGo Rider खात्याच्या deletion ची विनंती करायची आहे का?",
      deletionReceived: "खाते हटवण्याची विनंती प्राप्त झाली. Production launch पूर्वी हे secure backend account-deletion endpoint शी जोडा.",
      privacyEmail: "privacy@yourdomain.com",
      privacyUrl: "https://yourdomain.com/privacy-policy",
      termsUrl: "https://yourdomain.com/terms"
    }
  };

  const t = (key) =>
    translations[language]?.[key] ||
    translations.en[key] ||
    key;

  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      t("confirmDelete")
    );

    if (!confirmed) return;

    alert(
      t("deletionReceived")
    );
  };

  const openPolicy = () => {
    window.open(
      t("privacyUrl"),
      "_blank",
      "noopener,noreferrer"
    );
  };

  const openTerms = () => {
    window.open(
      t("termsUrl"),
      "_blank",
      "noopener,noreferrer"
    );
  };

  const contactPrivacy = () => {
    window.location.href =
      `mailto:${t("privacyEmail")}`;
  };

  return (
    <section className="privacy-security-page">
      {/* HEADER */}
      <div className="privacy-header">
        <button
          type="button"
          className="privacy-back-btn"
          onClick={() => setActiveTab("profile")}
          aria-label="Back to profile"
        >
          ←
        </button>

        <div className="privacy-header-text">
          <div className="privacy-label">🔐 {t("accountSecurityLabel")}</div>

          <h1>{t("title")}</h1>

          <p>
            {t("subtitle")}
          </p>
        </div>
      </div>

      {/* SECURITY STATUS */}
      <div className="security-status-card">
        <div className="security-status-icon">🛡️</div>

        <div className="security-status-content">
          <h2>{t("protectTitle")}</h2>

          <p>
            Keep your login details private and use only official
            MaxiGo services when sharing account information.
          </p>
        </div>

        <div className="security-badge">
          <span>✓</span>
          Account Security
        </div>
      </div>

      {/* ACCOUNT SECURITY */}
      <div className="privacy-card">
        <div className="privacy-card-header">
          <div className="privacy-icon blue">🔑</div>

          <div>
            <h2>{t("accountSecurity")}</h2>
            <p>{t("accountSecuritySub")}</p>
          </div>
        </div>

        <div className="security-list">
          <div className="security-item">
            <div className="security-item-icon">📱</div>

            <div className="security-item-content">
              <strong>{t("mobileNumber")}</strong>
              <span>
                Your registered mobile number can be used for
                account verification and login.
              </span>
            </div>

            <div className="verified-small">{t("verified")}</div>
          </div>

          <div className="security-item">
            <div className="security-item-icon">🔢</div>

            <div className="security-item-content">
              <strong>{t("otpVerification")}</strong>
              <span>
                OTP verification helps confirm that the account
                is being accessed by the registered rider.
              </span>
            </div>

            <div className="verified-small">{t("active")}</div>
          </div>

          <div className="security-item">
            <div className="security-item-icon">🔒</div>

            <div className="security-item-content">
              <strong>{t("loginCredentials")}</strong>
              <span>
                Never share your OTP, PIN, password or other
                account credentials with anyone.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* PERSONAL DATA */}
      <div className="privacy-card">
        <div className="privacy-card-header">
          <div className="privacy-icon green">👤</div>

          <div>
            <h2>{t("personalData")}</h2>
            <p>{t("personalDataSub")}</p>
          </div>
        </div>

        <div className="data-grid">
          <div className="data-box">
            <span>👤</span>
            <strong>{t("profileInformation")}</strong>
            <small>{t("profileDetails")}</small>
          </div>

          <div className="data-box">
            <span>📍</span>
            <strong>{t("location")}</strong>
            <small>{t("locationDetails")}</small>
          </div>

          <div className="data-box">
            <span>🛵</span>
            <strong>{t("vehicleDetails")}</strong>
            <small>{t("vehicleDetailsInfo")}</small>
          </div>

          <div className="data-box">
            <span>🏦</span>
            <strong>{t("bankDetails")}</strong>
            <small>{t("bankDetailsInfo")}</small>
          </div>

          <div className="data-box">
            <span>🪪</span>
            <strong>{t("kycInformation")}</strong>
            <small>{t("kycDetails")}</small>
          </div>

          <div className="data-box">
            <span>📦</span>
            <strong>{t("deliveryInformation")}</strong>
            <small>{t("deliveryDetails")}</small>
          </div>
        </div>
      </div>

      {/* LOCATION */}
      <div className="privacy-card">
        <div className="privacy-card-header">
          <div className="privacy-icon orange">📍</div>

          <div>
            <h2>{t("locationPrivacy")}</h2>
            <p>{t("locationPrivacySub")}</p>
          </div>
        </div>

        <div className="location-info">
          <div className="location-info-icon">📍</div>

          <div>
            <strong>{t("deliveryLocation")}</strong>

            <p>
              Location may be used while you are working as a
              rider to support order assignment, pickup,
              navigation and delivery tracking.
            </p>

            <small>
              Location permission should only be requested when
              the rider functionality requires it.
            </small>
          </div>
        </div>
      </div>

      {/* DATA PROTECTION */}
      <div className="privacy-card">
        <div className="privacy-card-header">
          <div className="privacy-icon purple">🛡️</div>

          <div>
            <h2>{t("dataProtection")}</h2>
            <p>{t("dataProtectionSub")}</p>
          </div>
        </div>

        <div className="protection-list">
          <div>
            <span>✓</span>
            <p>
              Personal information should only be accessed for
              legitimate MaxiGo services and authorized purposes.
            </p>
          </div>

          <div>
            <span>✓</span>
            <p>
              Sensitive KYC and banking information should be
              protected using appropriate access controls.
            </p>
          </div>

          <div>
            <span>✓</span>
            <p>
              MaxiGo should not sell personal data. Any actual
              third-party sharing must be disclosed in the
              published Privacy Policy.
            </p>
          </div>

          <div>
            <span>✓</span>
            <p>
              Data retention and deletion should follow the
              published Privacy Policy and applicable legal
              requirements.
            </p>
          </div>
        </div>
      </div>

      {/* PRIVACY POLICY */}
      <div className="privacy-card">
        <div className="privacy-card-header">
          <div className="privacy-icon green">📄</div>

          <div>
            <h2>{t("privacyPolicy")}</h2>
            <p>{t("privacyPolicySub")}</p>
          </div>
        </div>

        <button
          type="button"
          className="privacy-action"
          onClick={openPolicy}
        >
          <div className="action-leading-icon">📄</div>

          <div className="privacy-action-content">
            <strong>{t("viewPrivacy")}</strong>
            <span>
              {t("privacyActionSub")}
            </span>
          </div>

          <span className="action-arrow">→</span>
        </button>
      </div>

      {/* TERMS */}
      <div className="privacy-card">
        <button
          type="button"
          className="privacy-action"
          onClick={openTerms}
        >
          <div className="action-leading-icon">📑</div>

          <div className="privacy-action-content">
            <strong>{t("terms")}</strong>
            <span>{t("termsSub")}</span>
          </div>

          <span className="action-arrow">→</span>
        </button>
      </div>

      {/* ACCOUNT DELETION */}
      <div className="delete-card">
        <div className="delete-icon">🗑️</div>

        <div className="delete-content">
          <h2>{t("deleteAccount")}</h2>

          <p>
            Request deletion of your MaxiGo Rider account and
            associated personal data.
          </p>

          <small>
            Some information may need to be retained where
            required by law, fraud prevention, financial records
            or other legitimate obligations.
          </small>
        </div>

        <button
          type="button"
          className="delete-account-btn"
          onClick={handleDeleteAccount}
        >
          {t("requestDeletion")}
        </button>
      </div>

      {/* PRIVACY SUPPORT */}
      <div className="privacy-support">
        <div className="privacy-support-icon">💬</div>

        <div className="privacy-support-content">
          <h3>{t("privacyQuestions")}</h3>

          <p>
            Contact the MaxiGo privacy team for questions about
            your personal information.
          </p>
        </div>

        <button type="button" onClick={contactPrivacy}>
          {t("contactPrivacy")}
        </button>
      </div>

      {/* LOGOUT */}
      <button
        type="button"
        className="privacy-logout"
        onClick={onLogout}
      >
        {t("logout")}
      </button>

      <div className="privacy-footer">
        {t("version")}
      </div>
    </section>
  );
}

export default PrivacySecurity;
