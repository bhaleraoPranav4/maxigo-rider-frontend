import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageContext";
import {
  getRiderProfile,
  getRiderDashboard,
} from "./api";
import "./Profile.css";

function Profile({ setActiveTab, onLogout }) {

  const languageContext = useLanguage();
  const contextLanguage = languageContext?.language || "en";
  const contextSetLanguage = languageContext?.setLanguage;

  const [language, setLocalLanguage] = useState(
    () => localStorage.getItem("maxigoRiderLanguage") || contextLanguage
  );

  const [showLanguage, setShowLanguage] = useState(false);

  const translations = {
    en: {
      riderAccount: "RIDER ACCOUNT",
      myProfile: "My Profile",
      manageAccount: "Manage your MaxiGo rider account",
      verified: "Verified",
      pendingVerification: "Verification Pending",
      rejectedVerification: "Verification Rejected",
      activeRider: "Active Rider",
      joined: "Joined",
      riderRating: "Rider Rating",
      deliveries: "Deliveries",
      completed: "Completed",
      vehicle: "Vehicle",
      totalEarnings: "Total Earnings",
      personalInformation: "Personal Information",
      registeredDetails: "Your registered account details",
      fullName: "Full Name",
      mobileNumber: "Mobile Number",
      emailAddress: "Email Address",
      address: "Address",
      notAdded: "Not added",
      vehicleInformation: "Vehicle Information",
      vehicleDetails: "Your delivery vehicle details",
      vehicleType: "Vehicle Type",
      vehicleNumber: "Vehicle Number",
      active: "Active",
      bankAccount: "Bank Account",
      bankPurpose: "Used for your MaxiGo delivery earnings",
      accountDetailsProtected: "Account details are securely protected",
      bankVerified: "Verified",
      account: "Account",
      manageRiderAccount: "Manage your rider account",
      myEarnings: "My Earnings",
      viewDeliveryEarnings: "View your delivery earnings",
      myOrders: "My Orders",
      viewDeliveryHistory: "View your delivery history",
      notifications: "Notifications",
      manageNotificationPreferences: "Manage notification preferences",
      language: "Language",
      privacySecurity: "Privacy & Security",
      manageAccountSecurity: "Manage account security",
      needHelp: "Need help?",
      supportText: "Our support team is here to help you with your deliveries.",
      contactSupport: "Contact Support",
      chooseLanguage: "Choose Language",
      logout: "Logout from MaxiGo",
      version: "MaxiGo Rider • Version 1.0.0",
      english: "English",
      hindi: "हिन्दी",
      marathi: "मराठी",
      recently: "Recently",
      bike: "Bike"
    },
    hi: {
      riderAccount: "राइडर अकाउंट",
      myProfile: "मेरी प्रोफ़ाइल",
      manageAccount: "अपना MaxiGo राइडर अकाउंट मैनेज करें",
      verified: "सत्यापित",
      pendingVerification: "वेरिफिकेशन लंबित",
      rejectedVerification: "वेरिफिकेशन अस्वीकृत",
      activeRider: "सक्रिय राइडर",
      joined: "जुड़े",
      riderRating: "राइडर रेटिंग",
      deliveries: "डिलीवरी",
      completed: "पूर्ण",
      vehicle: "वाहन",
      totalEarnings: "कुल कमाई",
      personalInformation: "व्यक्तिगत जानकारी",
      registeredDetails: "आपके रजिस्टर्ड अकाउंट की जानकारी",
      fullName: "पूरा नाम",
      mobileNumber: "मोबाइल नंबर",
      emailAddress: "ईमेल पता",
      address: "पता",
      notAdded: "जोड़ा नहीं गया",
      vehicleInformation: "वाहन की जानकारी",
      vehicleDetails: "आपके डिलीवरी वाहन की जानकारी",
      vehicleType: "वाहन का प्रकार",
      vehicleNumber: "वाहन नंबर",
      active: "सक्रिय",
      bankAccount: "बैंक अकाउंट",
      bankPurpose: "MaxiGo डिलीवरी कमाई के लिए उपयोग किया जाता है",
      accountDetailsProtected: "अकाउंट की जानकारी सुरक्षित है",
      bankVerified: "सत्यापित",
      account: "अकाउंट",
      manageRiderAccount: "अपना राइडर अकाउंट मैनेज करें",
      myEarnings: "मेरी कमाई",
      viewDeliveryEarnings: "अपनी डिलीवरी कमाई देखें",
      myOrders: "मेरे ऑर्डर",
      viewDeliveryHistory: "अपना डिलीवरी इतिहास देखें",
      notifications: "नोटिफिकेशन",
      manageNotificationPreferences: "नोटिफिकेशन की सेटिंग मैनेज करें",
      language: "भाषा",
      privacySecurity: "प्राइवेसी और सिक्योरिटी",
      manageAccountSecurity: "अकाउंट सिक्योरिटी मैनेज करें",
      needHelp: "मदद चाहिए?",
      supportText: "हमारी सपोर्ट टीम आपकी डिलीवरी में मदद करने के लिए मौजूद है।",
      contactSupport: "सपोर्ट से संपर्क करें",
      chooseLanguage: "भाषा चुनें",
      logout: "MaxiGo से लॉगआउट",
      version: "MaxiGo Rider • वर्ज़न 1.0.0",
      english: "English",
      hindi: "हिन्दी",
      marathi: "मराठी",
      recently: "हाल ही में",
      bike: "बाइक"
    },
    mr: {
      riderAccount: "रायडर अकाउंट",
      myProfile: "माझी प्रोफाइल",
      manageAccount: "तुमचे MaxiGo रायडर अकाउंट व्यवस्थापित करा",
      verified: "पडताळलेले",
      pendingVerification: "पडताळणी प्रलंबित",
      rejectedVerification: "पडताळणी नाकारली",
      activeRider: "सक्रिय रायडर",
      joined: "जॉईन झाले",
      riderRating: "रायडर रेटिंग",
      deliveries: "डिलिव्हरी",
      completed: "पूर्ण",
      vehicle: "वाहन",
      totalEarnings: "एकूण कमाई",
      personalInformation: "वैयक्तिक माहिती",
      registeredDetails: "तुमच्या नोंदणीकृत अकाउंटची माहिती",
      fullName: "पूर्ण नाव",
      mobileNumber: "मोबाईल नंबर",
      emailAddress: "ईमेल पत्ता",
      address: "पत्ता",
      notAdded: "जोडलेले नाही",
      vehicleInformation: "वाहनाची माहिती",
      vehicleDetails: "तुमच्या डिलिव्हरी वाहनाची माहिती",
      vehicleType: "वाहनाचा प्रकार",
      vehicleNumber: "वाहन नंबर",
      active: "सक्रिय",
      bankAccount: "बँक अकाउंट",
      bankPurpose: "MaxiGo डिलिव्हरी कमाईसाठी वापरले जाते",
      accountDetailsProtected: "अकाउंटची माहिती सुरक्षित आहे",
      bankVerified: "पडताळलेले",
      account: "अकाउंट",
      manageRiderAccount: "तुमचे रायडर अकाउंट व्यवस्थापित करा",
      myEarnings: "माझी कमाई",
      viewDeliveryEarnings: "तुमची डिलिव्हरी कमाई पहा",
      myOrders: "माझे ऑर्डर्स",
      viewDeliveryHistory: "तुमचा डिलिव्हरी इतिहास पहा",
      notifications: "नोटिफिकेशन्स",
      manageNotificationPreferences: "नोटिफिकेशन सेटिंग व्यवस्थापित करा",
      language: "भाषा",
      privacySecurity: "प्रायव्हसी आणि सिक्युरिटी",
      manageAccountSecurity: "अकाउंट सिक्युरिटी व्यवस्थापित करा",
      needHelp: "मदत हवी आहे?",
      supportText: "तुमच्या डिलिव्हरीसाठी आमची सपोर्ट टीम मदतीसाठी उपलब्ध आहे.",
      contactSupport: "सपोर्टशी संपर्क करा",
      chooseLanguage: "भाषा निवडा",
      logout: "MaxiGo मधून लॉगआउट",
      version: "MaxiGo Rider • आवृत्ती 1.0.0",
      english: "English",
      hindi: "हिन्दी",
      marathi: "मराठी",
      recently: "अलीकडे",
      bike: "बाईक"
    }
  };

  const tr = (key) =>
    translations[language]?.[key] || translations.en[key] || key;

  const languageLabel =
    language === "hi" ? tr("hindi") :
    language === "mr" ? tr("marathi") :
    tr("english");

  useEffect(() => {
    if (
      contextLanguage &&
      contextLanguage !== language &&
      !localStorage.getItem("maxigoRiderLanguage")
    ) {
      setLocalLanguage(contextLanguage);
    }
  }, [contextLanguage, language]);

  const chooseLanguage = (value) => {
    setLocalLanguage(value);
    localStorage.setItem("maxigoRiderLanguage", value);

    if (typeof contextSetLanguage === "function") {
      contextSetLanguage(value);
    }

    setShowLanguage(false);
  };

  const [rider, setRider] = useState(null);
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const loadProfile = async () => {
      const savedProfile =
        localStorage.getItem(
          "maxigoRiderProfile"
        );

      let saved = {};

      if (savedProfile) {
        try {
          saved = JSON.parse(
            savedProfile
          );
        } catch (error) {
          console.error(
            "Profile loading error:",
            error
          );
        }
      }

      try {
        const response =
          await getRiderProfile();

        const merged = {
          ...saved,
          ...response,
          fullName:
            response?.name ||
            saved?.fullName ||
            saved?.name ||
            "Rider",
          name:
            response?.name ||
            saved?.name ||
            saved?.fullName ||
            "Rider",
          mobile:
            response?.mobile ??
            saved?.mobile ??
            "",
          email:
            response?.email ??
            saved?.email ??
            "",
          vehicleType:
            response?.vehicleType ??
            saved?.vehicleType ??
            "Bike",
          vehicleNumber:
            response?.vehicleNumber ??
            saved?.vehicleNumber ??
            "",
          licenseNumber:
            response?.licenseNumber ??
            saved?.licenseNumber ??
            "",
          availabilityStatus:
            response?.availabilityStatus ??
            saved?.availabilityStatus ??
            "OFFLINE",
          verificationStatus:
            response?.verificationStatus ??
            saved?.verificationStatus ??
            "PENDING",
          address:
            saved?.address || "",
          bankName:
            saved?.bankName || "",
          accountHolderName:
            saved?.accountHolderName ||
            "",
          accountNumber:
            saved?.accountNumber || "",
          ifsc:
            saved?.ifsc || "",
        };

        if (cancelled) return;

        setRider(merged);

        localStorage.setItem(
          "maxigoRiderProfile",
          JSON.stringify(merged)
        );

        if (
          String(
            merged.verificationStatus ||
              ""
          ).toUpperCase() ===
          "VERIFIED"
        ) {
          try {
            const dashboardResponse =
              await getRiderDashboard();

            if (!cancelled) {
              setDashboard(
                dashboardResponse || null
              );
            }
          } catch (dashboardError) {
            console.warn(
              "Profile dashboard load skipped:",
              dashboardError
            );

            if (!cancelled) {
              setDashboard(null);
            }
          }
        }
      } catch (error) {
        console.error(
          "Rider profile API error:",
          error
        );

        if (!cancelled) {
          setRider(
            Object.keys(saved).length
              ? saved
              : null
          );
        }
      }
    };

    loadProfile();

    return () => {
      cancelled = true;
    };
  }, []);

  const profile = rider || {
    fullName: "Rider",
    mobile: "",
    email: "",
    address: "",
    vehicleType: "Bike",
    vehicleNumber: "",
    joinedDate: tr("recently"),
  };

  const getInitials = (name) => {
    if (!name) return "R";

    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <section className="profile-page">

      {/* =========================================
          PROFILE HEADER
      ========================================= */}

      <div className="profile-page-heading">
        <div>
          <div className="profile-label">
            {`👤 ${tr("riderAccount")}`}
          </div>

          <h1>{tr("myProfile")}</h1>

          <p>
            {tr("manageAccount")}
          </p>
        </div>
      </div>

      {/* =========================================
          MAIN PROFILE CARD
      ========================================= */}

      <div className="profile-main-card">

        <div className="profile-avatar">
          {getInitials(profile.fullName)}
        </div>

        <div className="profile-main-info">
          <div className="profile-name-row">
            <h2>{profile.fullName}</h2>

            <span className="verified-badge">
              ✓{" "}
              {String(
                profile.verificationStatus ||
                  "PENDING"
              ).toUpperCase() ===
              "VERIFIED"
                ? tr("verified")
                : String(
                    profile.verificationStatus ||
                      "PENDING"
                  ).toUpperCase() ===
                  "REJECTED"
                ? tr("rejectedVerification")
                : tr("pendingVerification")}
            </span>
          </div>

          <p className="profile-mobile">
            📱 +91 {profile.mobile}
          </p>

          <div className="profile-member">
            <span>
              {String(
                profile.availabilityStatus ||
                  "OFFLINE"
              ).toUpperCase() ===
              "ONLINE"
                ? "🟢"
                : "⚪"}{" "}
              {tr("activeRider")}
            </span>

            <span>
              📅 {tr("joined")} {profile.joinedDate}
            </span>
          </div>
        </div>

        <div className="profile-rating">
          <span className="rating-star">★</span>

          <strong>4.8</strong>

          <small>{tr("riderRating")}</small>
        </div>

      </div>

      {/* =========================================
          QUICK STATS
      ========================================= */}

      <div className="profile-stats">

        <div className="profile-stat-card">
          <div className="profile-stat-icon orange">
            📦
          </div>

          <div>
            <span>{tr("deliveries")}</span>
            <strong>
              {dashboard?.totalOrders ?? 0}
            </strong>
          </div>
        </div>

        <div className="profile-stat-card">
          <div className="profile-stat-icon green">
            ✓
          </div>

          <div>
            <span>{tr("completed")}</span>
            <strong>
              {dashboard?.completedOrders ?? 0}
            </strong>
          </div>
        </div>

        <div className="profile-stat-card">
          <div className="profile-stat-icon blue">
            🛵
          </div>

          <div>
            <span>{tr("vehicle")}</span>
            <strong>
              {profile.vehicleType === "Bike" ? tr("bike") : profile.vehicleType || tr("bike")}
            </strong>
          </div>
        </div>

        <div className="profile-stat-card">
          <div className="profile-stat-icon purple">
            💰
          </div>

          <div>
            <span>{tr("totalEarnings")}</span>
            <strong>
              ₹
              {Number(
                dashboard?.totalEarnings || 0
              ).toLocaleString("en-IN")}
            </strong>
          </div>
        </div>

      </div>

      {/* =========================================
          PERSONAL INFORMATION
      ========================================= */}

      <div className="profile-section-card">

        <div className="profile-section-header">
          <div className="section-title-icon">
            👤
          </div>

          <div>
            <h2>{tr("personalInformation")}</h2>

            <p>
              {tr("registeredDetails")}
            </p>
          </div>
        </div>

        <div className="profile-info-grid">

          <div className="profile-info-item">
            <span>{tr("fullName")}</span>
            <strong>
              {profile.fullName || tr("notAdded")}
            </strong>
          </div>

          <div className="profile-info-item">
            <span>{tr("mobileNumber")}</span>
            <strong>
              {profile.mobile
                ? `+91 ${profile.mobile}`
                : "Not added"}
            </strong>
          </div>

          <div className="profile-info-item">
            <span>{tr("emailAddress")}</span>
            <strong>
              {profile.email || tr("notAdded")}
            </strong>
          </div>

          <div className="profile-info-item">
            <span>{tr("address")}</span>
            <strong>
              {profile.address || tr("notAdded")}
            </strong>
          </div>

        </div>

      </div>

      {/* =========================================
          VEHICLE INFORMATION
      ========================================= */}

      <div className="profile-section-card">

        <div className="profile-section-header">

          <div className="section-title-icon vehicle-icon">
            🛵
          </div>

          <div>
            <h2>{tr("vehicleInformation")}</h2>

            <p>
              {tr("vehicleDetails")}
            </p>
          </div>

        </div>

        <div className="vehicle-profile-card">

          <div className="vehicle-big-icon">
            {profile.vehicleType === "Bike"
              ? "🏍️"
              : profile.vehicleType === "Scooter"
              ? "🛵"
              : "🚗"}
          </div>

          <div className="vehicle-details">

            <span>{tr("vehicleType")}</span>

            <strong>
              {profile.vehicleType === "Bike" ? tr("bike") : profile.vehicleType || tr("bike")}
            </strong>

            <small>
              {tr("vehicleNumber")}:{" "}
              {profile.vehicleNumber || tr("notAdded")}
            </small>

          </div>

          <div className="vehicle-status">
            <span>●</span>
            {tr("active")}
          </div>

        </div>

      </div>

      {/* =========================================
          BANK DETAILS
      ========================================= */}

      <div className="profile-section-card">

        <div className="profile-section-header">

          <div className="section-title-icon bank-icon">
            🏦
          </div>

          <div>
            <h2>{tr("bankAccount")}</h2>

            <p>
              {tr("bankPurpose")}
            </p>
          </div>

        </div>

        <div className="bank-profile-card">

          <div className="bank-left">

            <div className="bank-icon-box">
              🏦
            </div>

            <div>
              <strong>
                {profile.bankName ||
                  "Bank Account"}
              </strong>

              <span>
                {tr("accountDetailsProtected")}
              </span>

              <small>
                ••••••••••••
              </small>
            </div>

          </div>

          <div className="bank-verified">
            <span>✓</span>
            {tr("bankVerified")}
          </div>

        </div>

      </div>

      {/* =========================================
          ACCOUNT ACTIONS
      ========================================= */}

      <div className="profile-section-card">

        <div className="profile-section-header">

          <div className="section-title-icon settings-icon">
            ⚙️
          </div>

          <div>
            <h2>{tr("account")}</h2>

            <p>
              {tr("manageRiderAccount")}
            </p>
          </div>

        </div>

        <div className="profile-actions">

          <button
            className="profile-action"
            onClick={() =>
              setActiveTab("earnings")
            }
          >
            <div className="action-icon orange-action">
              💰
            </div>

            <div>
              <strong>
                {tr("myEarnings")}
              </strong>

              <span>
                {tr("viewDeliveryEarnings")}
              </span>
            </div>

            <span className="action-arrow">
              →
            </span>
          </button>

          <button
            className="profile-action"
            onClick={() =>
              setActiveTab("orders")
            }
          >
            <div className="action-icon blue-action">
              📦
            </div>

            <div>
              <strong>
                {tr("myOrders")}
              </strong>

              <span>
                {tr("viewDeliveryHistory")}
              </span>
            </div>

            <span className="action-arrow">
              →
            </span>
          </button>

          <button className="profile-action">

            <div className="action-icon purple-action">
              🔔
            </div>

            <div>
              <strong>
                {tr("notifications")}
              </strong>

              <span>
                {tr("manageNotificationPreferences")}
              </span>
            </div>

            <span className="action-arrow">
              →
            </span>

          </button>



                   <button
            className="profile-action"
            onClick={() => setShowLanguage(true)}
          >
            <div className="action-icon language-action">
              🌐
            </div>

            <div>
              <strong>{tr("language")}</strong>

              <span>{languageLabel}</span>
            </div>

            <span className="action-arrow">
              →
            </span>
          </button>


<button
  className="profile-action"
  onClick={() => setActiveTab("privacy")}
>
  <div className="action-icon green-action">
    🔒
  </div>

  <div>
    <strong>
      {tr("privacySecurity")}
    </strong>

    <span>
      {tr("manageAccountSecurity")}
    </span>
  </div>

  <span className="action-arrow">
    →
  </span>
</button>

        </div>

      </div>

      {/* =========================================
          SUPPORT
      ========================================= */}

      <div className="profile-support-card">

        <div className="support-icon">
          💬
        </div>

        <div className="support-content">
          <h3>
            {tr("needHelp")}
          </h3>

          <p>
            {tr("supportText")}
          </p>
        </div>

        <button>
          {tr("contactSupport")}
        </button>

      </div>

      {/* =========================================
          LANGUAGE MODAL
      ========================================= */}

      {showLanguage && (
        <div
          className="profile-language-overlay"
          onClick={() => setShowLanguage(false)}
        >
          <div
            className="profile-language-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="profile-language-header">
              <div>
                <p>{tr("language")}</p>
                <h2>{tr("chooseLanguage")}</h2>
              </div>

              <button
                className="profile-language-close"
                onClick={() => setShowLanguage(false)}
                aria-label="Close language selector"
              >
                ×
              </button>
            </div>

            <button
              className={`profile-language-option ${
                language === "en" ? "selected" : ""
              }`}
              onClick={() => chooseLanguage("en")}
            >
              <span className="language-option-flag">🇬🇧</span>
              <strong>{tr("english")}</strong>
              {language === "en" && <b>✓</b>}
            </button>

            <button
              className={`profile-language-option ${
                language === "hi" ? "selected" : ""
              }`}
              onClick={() => chooseLanguage("hi")}
            >
              <span className="language-option-flag">🇮🇳</span>
              <strong>{tr("hindi")}</strong>
              {language === "hi" && <b>✓</b>}
            </button>

            <button
              className={`profile-language-option ${
                language === "mr" ? "selected" : ""
              }`}
              onClick={() => chooseLanguage("mr")}
            >
              <span className="language-option-flag">🇮🇳</span>
              <strong>{tr("marathi")}</strong>
              {language === "mr" && <b>✓</b>}
            </button>
          </div>
        </div>
      )}


      {/* =========================================
          LOGOUT
      ========================================= */}

      <button
        className="profile-logout"
        onClick={onLogout}
      >
        <span>↪</span>
        {tr("logout")}
      </button>

      <div className="profile-version">
        {tr("version")}
      </div>

    </section>
  );
}

export default Profile;