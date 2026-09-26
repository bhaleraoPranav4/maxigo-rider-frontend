import { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext();

const translations = {
  en: {
    profile: "Profile",
    personalInfo: "Personal Information",
    vehicleInfo: "Vehicle Information",
    bankAccount: "Bank Account",
    language: "Language",
    privacySecurity: "Privacy & Security",
    helpSupport: "Help & Support",
    logout: "Logout",

    chooseLanguage: "Choose Language",
    english: "English",
    hindi: "हिन्दी",
    marathi: "मराठी",
    save: "Save",
    cancel: "Cancel",

    home: "Home",
    orders: "Orders",
    earnings: "Earnings",
    goodDay: "Good day",
    readyToDeliver: "Ready to deliver with MaxiGo?",
    youAreOnline: "You're Online",
    youAreOffline: "You're Offline",
    goOnline: "Go Online",
    goOffline: "Go Offline",
    availableOrders: "Available Orders",
    nearbyOrders: "Nearby delivery orders",
    acceptOrder: "Accept Order",
    markPicked: "Mark Picked Up",
    startDelivery: "Start Delivery",
    markDelivered: "Mark Delivered",

    licenseNumber: "Driving License Number",
    licenseNumberPlaceholder: "MH1220230001234",
    licenseInvalid: "Please enter your driving license number.",
  },

  hi: {
    profile: "प्रोफ़ाइल",
    personalInfo: "व्यक्तिगत जानकारी",
    vehicleInfo: "वाहन की जानकारी",
    bankAccount: "बैंक खाता",
    language: "भाषा",
    privacySecurity: "गोपनीयता और सुरक्षा",
    helpSupport: "मदद और सहायता",
    logout: "लॉगआउट",

    chooseLanguage: "भाषा चुनें",
    english: "English",
    hindi: "हिन्दी",
    marathi: "मराठी",
    save: "सहेजें",
    cancel: "रद्द करें",

    home: "होम",
    orders: "ऑर्डर",
    earnings: "कमाई",
    goodDay: "नमस्ते",
    readyToDeliver:
      "MaxiGo के साथ डिलीवरी के लिए तैयार हैं?",
    youAreOnline: "आप ऑनलाइन हैं",
    youAreOffline: "आप ऑफलाइन हैं",
    goOnline: "ऑनलाइन जाएं",
    goOffline: "ऑफलाइन जाएं",
    availableOrders: "उपलब्ध ऑर्डर",
    nearbyOrders: "पास के डिलीवरी ऑर्डर",
    acceptOrder: "ऑर्डर स्वीकार करें",
    markPicked: "पिकअप किया गया",
    startDelivery: "डिलीवरी शुरू करें",
    markDelivered: "डिलीवर किया गया",

    licenseNumber: "ड्राइविंग लाइसेंस नंबर",
    licenseNumberPlaceholder: "MH1220230001234",
    licenseInvalid:
      "कृपया अपना ड्राइविंग लाइसेंस नंबर दर्ज करें।",
  },

  mr: {
    profile: "प्रोफाइल",
    personalInfo: "वैयक्तिक माहिती",
    vehicleInfo: "वाहनाची माहिती",
    bankAccount: "बँक खाते",
    language: "भाषा",
    privacySecurity: "गोपनीयता आणि सुरक्षा",
    helpSupport: "मदत आणि सहाय्य",
    logout: "लॉगआउट",

    chooseLanguage: "भाषा निवडा",
    english: "English",
    hindi: "हिन्दी",
    marathi: "मराठी",
    save: "जतन करा",
    cancel: "रद्द करा",

    home: "होम",
    orders: "ऑर्डर्स",
    earnings: "कमाई",
    goodDay: "नमस्कार",
    readyToDeliver:
      "MaxiGo सोबत डिलिव्हरीसाठी तयार आहात?",
    youAreOnline: "तुम्ही ऑनलाइन आहात",
    youAreOffline: "तुम्ही ऑफलाइन आहात",
    goOnline: "ऑनलाइन जा",
    goOffline: "ऑफलाइन जा",
    availableOrders: "उपलब्ध ऑर्डर्स",
    nearbyOrders: "जवळचे डिलिव्हरी ऑर्डर्स",
    acceptOrder: "ऑर्डर स्वीकारा",
    markPicked: "पिकअप केले",
    startDelivery: "डिलिव्हरी सुरू करा",
    markDelivered: "डिलिव्हरी पूर्ण",

    licenseNumber: "ड्रायव्हिंग लायसन्स नंबर",
    licenseNumberPlaceholder: "MH1220230001234",
    licenseInvalid:
      "कृपया तुमचा ड्रायव्हिंग लायसन्स नंबर टाका.",
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] =
    useState(() => {
      return (
        localStorage.getItem(
          "maxigoRiderLanguage"
        ) || "en"
      );
    });

  useEffect(() => {
    localStorage.setItem(
      "maxigoRiderLanguage",
      language
    );
  }, [language]);

  const t = (key) => {
    return (
      translations[language]?.[key] ??
      translations.en[key] ??
      key
    );
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
