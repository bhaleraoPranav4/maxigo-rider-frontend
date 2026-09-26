import { useState } from "react";
import { useLanguage } from "./LanguageContext";
import {
  riderRegister,
  saveRiderAuth,
} from "./api";
import "./RiderRegistration.css";

function RiderRegistration({ onRegistrationSuccess }) {
  const { language } = useLanguage();

  const [step, setStep] = useState(1);

  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [pan, setPan] = useState("");
  const [address, setAddress] = useState("");

  const [vehicleType, setVehicleType] = useState("Bike");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");

  const [bankName, setBankName] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [confirmAccountNumber, setConfirmAccountNumber] =
    useState("");
  const [ifsc, setIfsc] = useState("");
  const [accountType, setAccountType] = useState("Savings");

  const [loading, setLoading] = useState(false);

  const translations = {
    en: {
      needHelp: "Need Help?",
      riderRegistration: "RIDER PARTNER REGISTRATION",
      becomeA: "Become a",
      maxigoRider: "MaxiGo Rider",
      description:
        "Join MaxiGo as a delivery partner and earn by delivering food, groceries and everyday essentials to customers.",

      earnMore: "Earn More",
      earnMoreText:
        "Get paid for every successful delivery.",

      flexibleWork: "Flexible Work",
      flexibleWorkText:
        "Choose when you want to go online.",

      moreOrders: "More Orders",
      moreOrdersText:
        "Get nearby delivery orders.",

      weeklyPayments: "Weekly Payments",
      weeklyPaymentsText:
        "Receive your earnings securely.",

      createRiderAccount: "Create Rider Account",
      riderDetails: "Rider Details",
      createAccountHelp:
        "Enter your mobile number to get started.",
      riderDetailsHelp:
        "Complete your personal, vehicle and bank details.",

      mobile: "Mobile",
      details: "Details",

      fullName: "Full Name",
      fullNamePlaceholder: "Enter your full name",

      mobileNumber: "Mobile Number",
      sendOtp: "Send OTP",

      enterOtp: "Enter OTP",
      verifyOtp: "Verify OTP",
      mobileVerified: "Mobile number verified",

      securityNote:
        "Your information is securely handled.",

      emailId: "Email ID",
      optional: "Optional",
      emailPlaceholder: "Enter email address",

      loginPin: "Login PIN",
      pinPlaceholder: "Create 6 digit PIN",
      pinHelp:
        "Use this PIN to login to your rider account.",

      aadhaar: "Aadhaar Number",
      aadhaarPlaceholder: "XXXX XXXX XXXX",

      pan: "PAN Number",
      panPlaceholder: "ABCDE1234F",

      address: "Complete Address",
      addressPlaceholder:
        "Enter your complete address",

      vehicleType: "Vehicle Type",
      bike: "Bike",
      scooter: "Scooter",
      cycle: "Cycle",
      electricBike: "Electric Bike",

      vehicleNumber: "Vehicle Number",
      vehicleNumberPlaceholder: "MH12AB1234",

      licenseNumber: "Driving License Number",
      licenseNumberPlaceholder: "MH1220230001234",

      bankDetails: "Bank Details",
      bankHelp:
        "Your delivery earnings will be transferred to this account.",

      bankName: "Bank Name",
      bankPlaceholder: "e.g. State Bank of India",

      accountHolder: "Account Holder Name",
      accountHolderPlaceholder:
        "Name as per bank account",

      accountType: "Account Type",
      savings: "Savings Account",
      current: "Current Account",

      accountNumber: "Account Number",
      accountNumberPlaceholder:
        "Enter bank account number",

      confirmAccount: "Confirm Account Number",
      confirmAccountPlaceholder:
        "Re-enter account number",

      ifsc: "IFSC Code",
      ifscPlaceholder: "SBIN0001234",
      ifscExample:
        "Example: SBIN0001234",

      creating: "Creating Account...",
      createAccount: "Create Rider Account",

      termsPrefix:
        "By registering, you agree to MaxiGo's",
      terms: "Terms & Conditions",
      and: "and",
      privacy: "Privacy Policy",

      invalidMobile:
        "Please enter a valid 10 digit Indian mobile number.",

      demoOtp: "Demo OTP: 123456",

      invalidOtp:
        "Invalid OTP. Use demo OTP 123456.",

      nameRequired:
        "Please enter full name.",

      otpRequired:
        "Please verify mobile OTP.",

      pinInvalid:
        "PIN must be exactly 6 digits.",

      aadhaarInvalid:
        "Please enter valid 12 digit Aadhaar number.",

      panInvalid:
        "Please enter valid PAN number.",

      addressRequired:
        "Please enter complete address.",

      vehicleRequired:
        "Please enter vehicle number.",

      licenseInvalid:
        "Please enter your driving license number.",

      bankRequired:
        "Please enter bank name.",

      accountHolderRequired:
        "Please enter account holder name.",

      accountInvalid:
        "Please enter a valid account number.",

      accountMismatch:
        "Account numbers do not match.",

      ifscInvalid:
        "Please enter a valid IFSC code.",

      registrationFailed:
        "Registration failed. Please try again.",
    },

    hi: {
      needHelp: "मदद चाहिए?",
      riderRegistration:
        "राइडर पार्टनर रजिस्ट्रेशन",
      becomeA: "बनें",
      maxigoRider: "MaxiGo राइडर",

      description:
        "MaxiGo के डिलीवरी पार्टनर बनें और ग्राहकों तक खाना, किराना और रोज़मर्रा की चीज़ें पहुँचाकर कमाएँ।",

      earnMore: "ज्यादा कमाएँ",
      earnMoreText:
        "हर सफल डिलीवरी के लिए भुगतान पाएँ।",

      flexibleWork: "लचीला काम",
      flexibleWorkText:
        "जब चाहें ऑनलाइन जाएँ।",

      moreOrders: "ज्यादा ऑर्डर",
      moreOrdersText:
        "पास के डिलीवरी ऑर्डर पाएँ।",

      weeklyPayments: "साप्ताहिक भुगतान",
      weeklyPaymentsText:
        "अपनी कमाई सुरक्षित रूप से प्राप्त करें।",

      createRiderAccount:
        "राइडर अकाउंट बनाएँ",

      riderDetails: "राइडर विवरण",

      createAccountHelp:
        "शुरू करने के लिए अपना मोबाइल नंबर दर्ज करें।",

      riderDetailsHelp:
        "अपनी व्यक्तिगत, वाहन और बैंक जानकारी पूरी करें।",

      mobile: "मोबाइल",
      details: "विवरण",

      fullName: "पूरा नाम",
      fullNamePlaceholder:
        "अपना पूरा नाम दर्ज करें",

      mobileNumber: "मोबाइल नंबर",
      sendOtp: "OTP भेजें",

      enterOtp: "OTP दर्ज करें",
      verifyOtp: "OTP सत्यापित करें",
      mobileVerified:
        "मोबाइल नंबर सत्यापित है",

      securityNote:
        "आपकी जानकारी सुरक्षित रूप से संभाली जाती है।",

      emailId: "ईमेल आईडी",
      optional: "वैकल्पिक",
      emailPlaceholder:
        "ईमेल पता दर्ज करें",

      loginPin: "लॉगिन PIN",
      pinPlaceholder:
        "6 अंकों का PIN बनाएँ",

      pinHelp:
        "अपने राइडर अकाउंट में लॉगिन करने के लिए यह PIN उपयोग करें।",

      aadhaar: "आधार नंबर",
      aadhaarPlaceholder:
        "XXXX XXXX XXXX",

      pan: "PAN नंबर",
      panPlaceholder:
        "ABCDE1234F",

      address: "पूरा पता",
      addressPlaceholder:
        "अपना पूरा पता दर्ज करें",

      vehicleType: "वाहन का प्रकार",
      bike: "बाइक",
      scooter: "स्कूटर",
      cycle: "साइकिल",
      electricBike: "इलेक्ट्रिक बाइक",

      vehicleNumber: "वाहन नंबर",
      vehicleNumberPlaceholder:
        "MH12AB1234",

      licenseNumber:
        "ड्राइविंग लाइसेंस नंबर",

      licenseNumberPlaceholder:
        "MH1220230001234",

      bankDetails: "बैंक विवरण",
      bankHelp:
        "आपकी डिलीवरी कमाई इस अकाउंट में ट्रांसफर की जाएगी।",

      bankName: "बैंक का नाम",
      bankPlaceholder:
        "जैसे: State Bank of India",

      accountHolder:
        "अकाउंट होल्डर का नाम",

      accountHolderPlaceholder:
        "बैंक अकाउंट के अनुसार नाम",

      accountType: "अकाउंट का प्रकार",
      savings: "सेविंग्स अकाउंट",
      current: "करंट अकाउंट",

      accountNumber: "अकाउंट नंबर",
      accountNumberPlaceholder:
        "बैंक अकाउंट नंबर दर्ज करें",

      confirmAccount:
        "अकाउंट नंबर की पुष्टि करें",

      confirmAccountPlaceholder:
        "अकाउंट नंबर फिर से दर्ज करें",

      ifsc: "IFSC कोड",
      ifscPlaceholder:
        "SBIN0001234",

      ifscExample:
        "उदाहरण: SBIN0001234",

      creating:
        "अकाउंट बनाया जा रहा है...",

      createAccount:
        "राइडर अकाउंट बनाएँ",

      termsPrefix:
        "रजिस्टर करके आप MaxiGo के",

      terms: "Terms & Conditions",
      and: "और",
      privacy: "Privacy Policy",

      invalidMobile:
        "कृपया सही 10 अंकों का भारतीय मोबाइल नंबर दर्ज करें।",

      demoOtp:
        "डेमो OTP: 123456",

      invalidOtp:
        "गलत OTP। डेमो OTP 123456 इस्तेमाल करें।",

      nameRequired:
        "कृपया पूरा नाम दर्ज करें।",

      otpRequired:
        "कृपया मोबाइल OTP सत्यापित करें।",

      pinInvalid:
        "PIN ठीक 6 अंकों का होना चाहिए।",

      aadhaarInvalid:
        "कृपया सही 12 अंकों का आधार नंबर दर्ज करें।",

      panInvalid:
        "कृपया सही PAN नंबर दर्ज करें।",

      addressRequired:
        "कृपया पूरा पता दर्ज करें।",

      vehicleRequired:
        "कृपया वाहन नंबर दर्ज करें।",

      licenseInvalid:
        "कृपया अपना ड्राइविंग लाइसेंस नंबर दर्ज करें।",

      bankRequired:
        "कृपया बैंक का नाम दर्ज करें।",

      accountHolderRequired:
        "कृपया अकाउंट होल्डर का नाम दर्ज करें।",

      accountInvalid:
        "कृपया सही अकाउंट नंबर दर्ज करें।",

      accountMismatch:
        "अकाउंट नंबर मेल नहीं खाते।",

      ifscInvalid:
        "कृपया सही IFSC कोड दर्ज करें।",

      registrationFailed:
        "रजिस्ट्रेशन विफल हुआ। कृपया फिर से प्रयास करें।",
    },

    mr: {
      needHelp: "मदत हवी आहे?",
      riderRegistration:
        "रायडर पार्टनर नोंदणी",

      becomeA: "बना",
      maxigoRider: "MaxiGo रायडर",

      description:
        "MaxiGo सोबत डिलिव्हरी पार्टनर बना आणि ग्राहकांना अन्न, किराणा व रोजच्या वस्तू पोहोचवून कमवा.",

      earnMore: "जास्त कमवा",
      earnMoreText:
        "प्रत्येक यशस्वी डिलिव्हरीसाठी पैसे मिळवा.",

      flexibleWork: "लवचिक काम",
      flexibleWorkText:
        "तुमच्या सोयीनुसार ऑनलाइन जा.",

      moreOrders: "जास्त ऑर्डर्स",
      moreOrdersText:
        "जवळचे डिलिव्हरी ऑर्डर्स मिळवा.",

      weeklyPayments: "साप्ताहिक पेमेंट",
      weeklyPaymentsText:
        "तुमची कमाई सुरक्षितपणे मिळवा.",

      createRiderAccount:
        "रायडर अकाउंट तयार करा",

      riderDetails: "रायडर माहिती",

      createAccountHelp:
        "सुरुवात करण्यासाठी तुमचा मोबाईल नंबर टाका.",

      riderDetailsHelp:
        "तुमची वैयक्तिक, वाहन आणि बँक माहिती पूर्ण करा.",

      mobile: "मोबाईल",
      details: "माहिती",

      fullName: "पूर्ण नाव",
      fullNamePlaceholder:
        "तुमचे पूर्ण नाव टाका",

      mobileNumber: "मोबाईल नंबर",
      sendOtp: "OTP पाठवा",

      enterOtp: "OTP टाका",
      verifyOtp: "OTP पडताळा",

      mobileVerified:
        "मोबाईल नंबर पडताळला आहे",

      securityNote:
        "तुमची माहिती सुरक्षितपणे हाताळली जाते.",

      emailId: "ईमेल आयडी",
      optional: "ऐच्छिक",
      emailPlaceholder:
        "ईमेल पत्ता टाका",

      loginPin: "लॉगिन PIN",
      pinPlaceholder:
        "6 अंकी PIN तयार करा",

      pinHelp:
        "रायडर अकाउंटमध्ये लॉगिन करण्यासाठी हा PIN वापरा.",

      aadhaar: "आधार नंबर",
      aadhaarPlaceholder:
        "XXXX XXXX XXXX",

      pan: "PAN नंबर",
      panPlaceholder:
        "ABCDE1234F",

      address: "पूर्ण पत्ता",
      addressPlaceholder:
        "तुमचा पूर्ण पत्ता टाका",

      vehicleType: "वाहनाचा प्रकार",
      bike: "बाईक",
      scooter: "स्कूटर",
      cycle: "सायकल",
      electricBike: "इलेक्ट्रिक बाईक",

      vehicleNumber: "वाहन नंबर",
      vehicleNumberPlaceholder:
        "MH12AB1234",

      licenseNumber:
        "ड्रायव्हिंग लायसन्स नंबर",

      licenseNumberPlaceholder:
        "MH1220230001234",

      bankDetails: "बँक माहिती",

      bankHelp:
        "तुमची डिलिव्हरी कमाई या अकाउंटमध्ये ट्रान्सफर केली जाईल.",

      bankName: "बँकेचे नाव",
      bankPlaceholder:
        "उदा. State Bank of India",

      accountHolder:
        "अकाउंट होल्डरचे नाव",

      accountHolderPlaceholder:
        "बँक अकाउंटप्रमाणे नाव",

      accountType: "अकाउंटचा प्रकार",
      savings: "सेव्हिंग्स अकाउंट",
      current: "करंट अकाउंट",

      accountNumber: "अकाउंट नंबर",

      accountNumberPlaceholder:
        "बँक अकाउंट नंबर टाका",

      confirmAccount:
        "अकाउंट नंबरची पुष्टी करा",

      confirmAccountPlaceholder:
        "अकाउंट नंबर पुन्हा टाका",

      ifsc: "IFSC कोड",
      ifscPlaceholder:
        "SBIN0001234",

      ifscExample:
        "उदाहरण: SBIN0001234",

      creating:
        "अकाउंट तयार होत आहे...",

      createAccount:
        "रायडर अकाउंट तयार करा",

      termsPrefix:
        "नोंदणी करून तुम्ही MaxiGo च्या",

      terms: "Terms & Conditions",
      and: "आणि",
      privacy: "Privacy Policy",

      invalidMobile:
        "कृपया योग्य 10 अंकी भारतीय मोबाईल नंबर टाका.",

      demoOtp:
        "डेमो OTP: 123456",

      invalidOtp:
        "अवैध OTP. डेमो OTP 123456 वापरा.",

      nameRequired:
        "कृपया पूर्ण नाव टाका.",

      otpRequired:
        "कृपया मोबाईल OTP पडताळा.",

      pinInvalid:
        "PIN नेमका 6 अंकी असावा.",

      aadhaarInvalid:
        "कृपया योग्य 12 अंकी आधार नंबर टाका.",

      panInvalid:
        "कृपया योग्य PAN नंबर टाका.",

      addressRequired:
        "कृपया पूर्ण पत्ता टाका.",

      vehicleRequired:
        "कृपया वाहन नंबर टाका.",

      licenseInvalid:
        "कृपया तुमचा ड्रायव्हिंग लायसन्स नंबर टाका.",

      bankRequired:
        "कृपया बँकेचे नाव टाका.",

      accountHolderRequired:
        "कृपया अकाउंट होल्डरचे नाव टाका.",

      accountInvalid:
        "कृपया योग्य अकाउंट नंबर टाका.",

      accountMismatch:
        "अकाउंट नंबर जुळत नाहीत.",

      ifscInvalid:
        "कृपया योग्य IFSC कोड टाका.",

      registrationFailed:
        "नोंदणी अयशस्वी झाली. कृपया पुन्हा प्रयत्न करा.",
    },
  };

  const tr = (key) =>
    translations[language]?.[key] ??
    translations.en[key] ??
    key;

  const sendOtp = () => {
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      alert(tr("invalidMobile"));
      return;
    }

    setOtpSent(true);
    alert(tr("demoOtp"));
  };

  const verifyOtp = () => {
    if (otp !== "123456") {
      alert(tr("invalidOtp"));
      return;
    }

    setOtpVerified(true);
    setStep(2);
  };

  const handleAadhaar = (value) => {
    const numbers = value
      .replace(/\D/g, "")
      .slice(0, 12);

    const formatted = numbers.replace(
      /(\d{4})(?=\d)/g,
      "$1 "
    );

    setAadhaar(formatted);
  };

  const handlePan = (value) => {
    const panValue = value
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, 10);

    setPan(panValue);
  };

  const handleVehicleNumber = (value) => {
    const vehicleValue = value
      .toUpperCase()
      .replace(/[^A-Z0-9 ]/g, "")
      .slice(0, 12);

    setVehicleNumber(vehicleValue);
  };

  const handleLicenseNumber = (value) => {
    const licenseValue = value
      .toUpperCase()
      .replace(/[^A-Z0-9-]/g, "")
      .slice(0, 20);

    setLicenseNumber(licenseValue);
  };

  const handleAccountNumber = (value) => {
    setAccountNumber(
      value.replace(/\D/g, "").slice(0, 18)
    );
  };

  const handleConfirmAccountNumber = (value) => {
    setConfirmAccountNumber(
      value.replace(/\D/g, "").slice(0, 18)
    );
  };

  const handleIfsc = (value) => {
    setIfsc(
      value
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, "")
        .slice(0, 11)
    );
  };

  const createAccount = async () => {
    if (!fullName.trim()) {
      alert(tr("nameRequired"));
      return;
    }

    if (!otpVerified) {
      alert(tr("otpRequired"));
      return;
    }

    if (!/^\d{6}$/.test(pin)) {
      alert(tr("pinInvalid"));
      return;
    }

    const aadhaarNumber = aadhaar.replace(
      /\s/g,
      ""
    );

    if (!/^\d{12}$/.test(aadhaarNumber)) {
      alert(tr("aadhaarInvalid"));
      return;
    }

    if (!/^[A-Z]{5}\d{4}[A-Z]$/.test(pan)) {
      alert(tr("panInvalid"));
      return;
    }

    if (!address.trim()) {
      alert(tr("addressRequired"));
      return;
    }

    if (!vehicleNumber.trim()) {
      alert(tr("vehicleRequired"));
      return;
    }

    if (!bankName.trim()) {
      alert(tr("bankRequired"));
      return;
    }

    if (!accountHolderName.trim()) {
      alert(tr("accountHolderRequired"));
      return;
    }

    if (
      accountNumber.length < 9 ||
      accountNumber.length > 18
    ) {
      alert(tr("accountInvalid"));
      return;
    }

    if (
      accountNumber !== confirmAccountNumber
    ) {
      alert(tr("accountMismatch"));
      return;
    }

    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc)) {
      alert(tr("ifscInvalid"));
      return;
    }

    setLoading(true);

    try {
      /* =========================
         BACKEND REGISTRATION
      ========================== */

      const payload = {
        name: fullName.trim(),
        mobile: mobile.trim(),
        email: email.trim() || null,
        password: pin,
        vehicleType: vehicleType,
        vehicleNumber:
          vehicleNumber.trim().toUpperCase(),
        licenseNumber:
          licenseNumber.trim()
            ? licenseNumber.trim().toUpperCase()
            : null,
      };

      console.log(
        "Rider Registration Payload:",
        payload
      );

      const response = await riderRegister(payload);

      console.log(
        "Rider Registration Response:",
        response
      );

      /* =========================
         SAVE AUTH DATA
      ========================== */

      saveRiderAuth(response);

      /* =========================
         SAVE FRONTEND PROFILE
         
         Note:
         Aadhaar, PAN, address and bank
         details are kept locally because
         current backend registration DTO
         does not accept these fields.
      ========================== */

      const riderProfile = {
        userId: response?.userId ?? null,
        name: response?.name ?? fullName,
        fullName: fullName,
        mobile:
          response?.mobile ?? mobile,
        email: email,
        address: address,

        aadhaar: aadhaarNumber,
        pan: pan,

        vehicleType: vehicleType,
        vehicleNumber: vehicleNumber,
        licenseNumber: licenseNumber,

        bankName: bankName,
        accountHolderName:
          accountHolderName,
        accountType: accountType,
        accountNumber: accountNumber,
        ifsc: ifsc,

        role: response?.role ?? "RIDER",
        joinedDate:
          new Date().toISOString(),
      };

      localStorage.setItem(
        "maxigoRiderProfile",
        JSON.stringify(riderProfile)
      );

      localStorage.setItem(
        "maxigoRiderRegistered",
        "true"
      );

      setLoading(false);

      if (
        typeof onRegistrationSuccess ===
        "function"
      ) {
        onRegistrationSuccess();
      }
    } catch (error) {
      console.error(
        "Rider Registration Error:",
        error
      );

      setLoading(false);

      alert(
        error?.message ||
          tr("registrationFailed")
      );
    }
  };

  return (
    <div className="registration-page">
      <header className="registration-header">
        <div className="mazigo-brand">
          <div className="mazigo-logo">
            <img
              src="/maxigo-store-logo.png"
              alt="MaxiGo"
            />
          </div>

          <div>
            <div className="mazigo-name">
              MaxiGo
            </div>

            <small>
              Rider Partner
            </small>
          </div>
        </div>

        <div className="header-help">
          {tr("needHelp")}
        </div>
      </header>

      <main className="registration-container">
        <section className="registration-left">
          <div className="partner-badge">
            🚴 {tr("riderRegistration")}
          </div>

          <h1>
            {tr("becomeA")}
            <span>
              {" "}
              {tr("maxigoRider")}
            </span>
          </h1>

          <p className="registration-description">
            {tr("description")}
          </p>

          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                💰
              </div>

              <div>
                <h3>
                  {tr("earnMore")}
                </h3>

                <p>
                  {tr("earnMoreText")}
                </p>
              </div>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                ⏰
              </div>

              <div>
                <h3>
                  {tr("flexibleWork")}
                </h3>

                <p>
                  {tr("flexibleWorkText")}
                </p>
              </div>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                📦
              </div>

              <div>
                <h3>
                  {tr("moreOrders")}
                </h3>

                <p>
                  {tr("moreOrdersText")}
                </p>
              </div>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                🏦
              </div>

              <div>
                <h3>
                  {tr("weeklyPayments")}
                </h3>

                <p>
                  {tr("weeklyPaymentsText")}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="registration-card">
          <div className="form-heading">
            <div>
              <h2>
                {step === 1
                  ? tr(
                      "createRiderAccount"
                    )
                  : tr("riderDetails")}
              </h2>

              <p>
                {step === 1
                  ? tr("createAccountHelp")
                  : tr("riderDetailsHelp")}
              </p>
            </div>

            <div className="step-number">
              {step}/2
            </div>
          </div>

          <div className="progress-container">
            <div
              className={`progress-step ${
                step >= 1 ? "active" : ""
              }`}
            >
              <span>1</span>
              {tr("mobile")}
            </div>

            <div className="progress-line"></div>

            <div
              className={`progress-step ${
                step >= 2 ? "active" : ""
              }`}
            >
              <span>2</span>
              {tr("details")}
            </div>
          </div>

          {/* =========================
              STEP 1
          ========================== */}

          {step === 1 && (
            <div className="registration-form">
              <div className="input-group">
                <label>
                  {tr("fullName")}{" "}
                  <b>*</b>
                </label>

                <input
                  type="text"
                  placeholder={tr(
                    "fullNamePlaceholder"
                  )}
                  value={fullName}
                  onChange={(e) =>
                    setFullName(
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="input-group">
                <label>
                  {tr("mobileNumber")}{" "}
                  <b>*</b>
                </label>

                <div className="mobile-input">
                  <span>+91</span>

                  <input
                    type="tel"
                    maxLength="10"
                    placeholder="9876543210"
                    value={mobile}
                    onChange={(e) =>
                      setMobile(
                        e.target.value.replace(
                          /\D/g,
                          ""
                        )
                      )
                    }
                  />
                </div>
              </div>

              {!otpSent ? (
                <button
                  type="button"
                  className="primary-button"
                  onClick={sendOtp}
                >
                  {tr("sendOtp")}
                  <span>→</span>
                </button>
              ) : (
                <>
                  <div className="otp-box">
                    <div className="input-group">
                      <label>
                        {tr("enterOtp")}
                      </label>

                      <input
                        type="text"
                        maxLength="6"
                        placeholder="123456"
                        value={otp}
                        onChange={(e) =>
                          setOtp(
                            e.target.value.replace(
                              /\D/g,
                              ""
                            )
                          )
                        }
                      />
                    </div>

                    <button
                      type="button"
                      className="verify-button"
                      onClick={verifyOtp}
                    >
                      {tr("verifyOtp")}
                    </button>
                  </div>

                  {otpVerified && (
                    <div className="success-message">
                      ✓{" "}
                      {tr(
                        "mobileVerified"
                      )}
                    </div>
                  )}
                </>
              )}

              <div className="security-note">
                🔒{" "}
                {tr("securityNote")}
              </div>
            </div>
          )}

          {/* =========================
              STEP 2
          ========================== */}

          {step === 2 && (
            <div className="registration-form">
              <div className="input-group">
                <label>
                  {tr("emailId")}{" "}
                  <small>
                    {tr("optional")}
                  </small>
                </label>

                <input
                  type="email"
                  placeholder={tr(
                    "emailPlaceholder"
                  )}
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="input-group">
                <label>
                  {tr("loginPin")}{" "}
                  <b>*</b>
                </label>

                <input
                  type="password"
                  inputMode="numeric"
                  maxLength="6"
                  placeholder={tr(
                    "pinPlaceholder"
                  )}
                  value={pin}
                  onChange={(e) =>
                    setPin(
                      e.target.value.replace(
                        /\D/g,
                        ""
                      )
                    )
                  }
                />

                <small className="field-help">
                  {tr("pinHelp")}
                </small>
              </div>

              <div className="input-group">
                <label>
                  {tr("aadhaar")}{" "}
                  <b>*</b>
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  placeholder={tr(
                    "aadhaarPlaceholder"
                  )}
                  value={aadhaar}
                  onChange={(e) =>
                    handleAadhaar(
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="input-group">
                <label>
                  {tr("pan")}{" "}
                  <b>*</b>
                </label>

                <input
                  type="text"
                  placeholder={tr(
                    "panPlaceholder"
                  )}
                  value={pan}
                  onChange={(e) =>
                    handlePan(
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="input-group">
                <label>
                  {tr("address")}{" "}
                  <b>*</b>
                </label>

                <textarea
                  rows="3"
                  placeholder={tr(
                    "addressPlaceholder"
                  )}
                  value={address}
                  onChange={(e) =>
                    setAddress(
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="input-group">
                <label>
                  {tr("vehicleType")}{" "}
                  <b>*</b>
                </label>

                <select
                  value={vehicleType}
                  onChange={(e) =>
                    setVehicleType(
                      e.target.value
                    )
                  }
                >
                  <option value="Bike">
                    🏍️ {tr("bike")}
                  </option>

                  <option value="Scooter">
                    🛵 {tr("scooter")}
                  </option>

                  <option value="Cycle">
                    🚲 {tr("cycle")}
                  </option>

                  <option value="Electric Bike">
                    ⚡{" "}
                    {tr("electricBike")}
                  </option>
                </select>
              </div>

              <div className="input-group">
                <label>
                  {tr("vehicleNumber")}{" "}
                  <b>*</b>
                </label>

                <input
                  type="text"
                  placeholder={tr(
                    "vehicleNumberPlaceholder"
                  )}
                  value={vehicleNumber}
                  onChange={(e) =>
                    handleVehicleNumber(
                      e.target.value
                    )
                  }
                />
              </div>

              {/* =========================
                  LICENSE NUMBER
              ========================== */}

              <div className="input-group">
                <label>
                  {tr("licenseNumber")}
                </label>

                <input
                  type="text"
                  placeholder={tr(
                    "licenseNumberPlaceholder"
                  )}
                  value={licenseNumber}
                  onChange={(e) =>
                    handleLicenseNumber(
                      e.target.value
                    )
                  }
                />
              </div>

              {/* =========================
                  BANK DETAILS
              ========================== */}

              <div className="bank-section">
                <div className="bank-section-header">
                  <div className="bank-section-icon">
                    🏦
                  </div>

                  <div>
                    <h3>
                      {tr("bankDetails")}
                    </h3>

                    <p>
                      {tr("bankHelp")}
                    </p>
                  </div>
                </div>

                <div className="input-group">
                  <label>
                    {tr("bankName")}{" "}
                    <b>*</b>
                  </label>

                  <input
                    type="text"
                    placeholder={tr(
                      "bankPlaceholder"
                    )}
                    value={bankName}
                    onChange={(e) =>
                      setBankName(
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="input-group">
                  <label>
                    {tr("accountHolder")}{" "}
                    <b>*</b>
                  </label>

                  <input
                    type="text"
                    placeholder={tr(
                      "accountHolderPlaceholder"
                    )}
                    value={
                      accountHolderName
                    }
                    onChange={(e) =>
                      setAccountHolderName(
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="input-group">
                  <label>
                    {tr("accountType")}{" "}
                    <b>*</b>
                  </label>

                  <select
                    value={accountType}
                    onChange={(e) =>
                      setAccountType(
                        e.target.value
                      )
                    }
                  >
                    <option value="Savings">
                      {tr("savings")}
                    </option>

                    <option value="Current">
                      {tr("current")}
                    </option>
                  </select>
                </div>

                <div className="input-group">
                  <label>
                    {tr("accountNumber")}{" "}
                    <b>*</b>
                  </label>

                  <input
                    type="password"
                    inputMode="numeric"
                    placeholder={tr(
                      "accountNumberPlaceholder"
                    )}
                    value={accountNumber}
                    onChange={(e) =>
                      handleAccountNumber(
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="input-group">
                  <label>
                    {tr("confirmAccount")}{" "}
                    <b>*</b>
                  </label>

                  <input
                    type="password"
                    inputMode="numeric"
                    placeholder={tr(
                      "confirmAccountPlaceholder"
                    )}
                    value={
                      confirmAccountNumber
                    }
                    onChange={(e) =>
                      handleConfirmAccountNumber(
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="input-group">
                  <label>
                    {tr("ifsc")}{" "}
                    <b>*</b>
                  </label>

                  <input
                    type="text"
                    placeholder={tr(
                      "ifscPlaceholder"
                    )}
                    maxLength="11"
                    value={ifsc}
                    onChange={(e) =>
                      handleIfsc(
                        e.target.value
                      )
                    }
                  />

                  <small className="field-help">
                    {tr("ifscExample")}
                  </small>
                </div>
              </div>

              <button
                type="button"
                className="primary-button create-button"
                onClick={createAccount}
                disabled={loading}
              >
                {loading
                  ? tr("creating")
                  : tr("createAccount")}

                {!loading && (
                  <span>✓</span>
                )}
              </button>

              <div className="terms-text">
                {tr("termsPrefix")}{" "}
                <b>{tr("terms")}</b>{" "}
                {tr("and")}{" "}
                <b>{tr("privacy")}</b>.
              </div>
            </div>
          )}
        </section>
      </main>

      <footer className="registration-footer">
        © 2026 MAXIGO
      </footer>
    </div>
  );
}

export default RiderRegistration;
