import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageContext";
import {
  getRiderProfile,
  getRiderDashboard,
  getAvailableOrders,
  getRiderActiveAssignments,
  getRiderOrder,
  updateRiderAvailability,
  updateRiderLocation,
  acceptRiderOrder,
  pickupRiderOrder,
  startRiderDelivery,
  markRiderDelivered,
} from "./api";
import "./RiderDashboard.css";
import PrivacySecurity from "./PrivacySecurity";

import Earnings from "./Earnings";
import Orders from "./Orders";
import Profile from "./Profile";

function RiderDashboard({ rider: riderProp, setRider, onLogout }) {


  const { language } = useLanguage();

  const dashboardTranslations = {
    en: {
      verification: "MaxiGo Rider Verification",
      takeSelfie: "Take a selfie to go online",
      selfieHelp: "For rider safety verification, capture your selfie before receiving delivery orders.",
      openingCamera: "Opening camera...",
      cameraRequired: "Camera access is required. Please allow camera permission and try again.",
      cameraNotReady: "Camera is not ready yet. Please wait a moment.",
      captureFirst: "Please capture your selfie first.",
      cancel: "Cancel",
      captureSelfie: "Capture Selfie",
      retake: "Retake",
      verifyOnline: "Verify & Go Online",
      goodDay: "Good day",
      readyDeliver: "Ready to deliver with MaxiGo?",
      youreOnline: "You're Online",
      youreOffline: "You're Offline",
      youAreOnline: "You are online",
      youAreOffline: "You are offline",
      receiveNearby: "You can now receive nearby delivery orders.",
      goOnlineStart: "Go online to start receiving delivery orders.",
      goOffline: "Go Offline",
      goOnline: "Go Online",
      todaysEarnings: "Today's Earnings",
      completedOrders: "Completed Orders",
      vehicle: "Vehicle",
      availableOrders: "Available Orders",
      nearbyOrders: "Nearby delivery orders",
      goOnlineReceive: "Go online to receive orders",
      turnOnStatus: "Turn on your online status to start receiving orders.",
      noNewOrders: "No new orders",
      stayOnline: "Stay online. New orders will appear here.",
      pickup: "PICKUP",
      delivery: "DELIVERY",
      deliveryRoute: "Delivery Route",
      routeHelp: "Pickup the order from the hotel/store, then deliver it to the customer.",
      hotelStore: "HOTEL / STORE",
      pickupLocation: "Pickup Location",
      customer: "CUSTOMER",
      deliveryLocation: "Delivery Location",
      totalDistance: "Total Distance",
      earn: "Earn",
      acceptOrder: "Accept Order",
      markPicked: "Mark Picked Up",
      startDelivery: "Start Delivery",
      markDelivered: "Mark Delivered",
      home: "Home",
      orders: "Orders",
      earnings: "Earnings",
      profile: "Profile",
      yourLocation: "Your Location",
      onDelivery: "ON DELIVERY",
      accepted: "ACCEPTED",
      pickedUp: "PICKED UP"
    },
    hi: {
      verification: "MaxiGo राइडर वेरिफिकेशन",
      takeSelfie: "ऑनलाइन जाने के लिए सेल्फी लें",
      selfieHelp: "राइडर सुरक्षा के लिए डिलीवरी ऑर्डर प्राप्त करने से पहले सेल्फी लें।",
      openingCamera: "कैमरा खुल रहा है...",
      cameraRequired: "कैमरा एक्सेस जरूरी है। कैमरा परमिशन दें और फिर प्रयास करें।",
      cameraNotReady: "कैमरा अभी तैयार नहीं है। कृपया थोड़ा इंतजार करें।",
      captureFirst: "कृपया पहले अपनी सेल्फी लें।",
      cancel: "रद्द करें",
      captureSelfie: "सेल्फी लें",
      retake: "दोबारा लें",
      verifyOnline: "वेरिफाई करें और ऑनलाइन जाएँ",
      goodDay: "नमस्ते",
      readyDeliver: "MaxiGo के साथ डिलीवरी के लिए तैयार हैं?",
      youreOnline: "आप ऑनलाइन हैं",
      youreOffline: "आप ऑफलाइन हैं",
      youAreOnline: "आप ऑनलाइन हैं",
      youAreOffline: "आप ऑफलाइन हैं",
      receiveNearby: "अब आप आसपास के डिलीवरी ऑर्डर प्राप्त कर सकते हैं।",
      goOnlineStart: "डिलीवरी ऑर्डर प्राप्त करने के लिए ऑनलाइन जाएँ।",
      goOffline: "ऑफलाइन जाएँ",
      goOnline: "ऑनलाइन जाएँ",
      todaysEarnings: "आज की कमाई",
      completedOrders: "पूरे किए गए ऑर्डर",
      vehicle: "वाहन",
      availableOrders: "उपलब्ध ऑर्डर",
      nearbyOrders: "आसपास के डिलीवरी ऑर्डर",
      goOnlineReceive: "ऑर्डर पाने के लिए ऑनलाइन जाएँ",
      turnOnStatus: "ऑर्डर प्राप्त करने के लिए अपना ऑनलाइन स्टेटस ऑन करें।",
      noNewOrders: "कोई नया ऑर्डर नहीं",
      stayOnline: "ऑनलाइन रहें। नए ऑर्डर यहाँ दिखाई देंगे।",
      pickup: "पिकअप",
      delivery: "डिलीवरी",
      deliveryRoute: "डिलीवरी रूट",
      routeHelp: "होटल/स्टोर से ऑर्डर पिकअप करें और फिर ग्राहक तक पहुँचाएँ।",
      hotelStore: "होटल / स्टोर",
      pickupLocation: "पिकअप लोकेशन",
      customer: "ग्राहक",
      deliveryLocation: "डिलीवरी लोकेशन",
      totalDistance: "कुल दूरी",
      earn: "कमाई",
      acceptOrder: "ऑर्डर स्वीकार करें",
      markPicked: "पिकअप पूरा करें",
      startDelivery: "डिलीवरी शुरू करें",
      markDelivered: "डिलीवरी पूरी करें",
      home: "होम",
      orders: "ऑर्डर",
      earnings: "कमाई",
      profile: "प्रोफाइल",
      yourLocation: "आपकी लोकेशन",
      onDelivery: "डिलीवरी पर",
      accepted: "स्वीकार किया गया",
      pickedUp: "पिकअप हो गया"
    },
    mr: {
      verification: "MaxiGo रायडर पडताळणी",
      takeSelfie: "ऑनलाइन जाण्यासाठी सेल्फी घ्या",
      selfieHelp: "रायडर सुरक्षिततेसाठी डिलिव्हरी ऑर्डर मिळण्यापूर्वी सेल्फी घ्या.",
      openingCamera: "कॅमेरा उघडत आहे...",
      cameraRequired: "कॅमेरा प्रवेश आवश्यक आहे. कॅमेरा परवानगी द्या आणि पुन्हा प्रयत्न करा.",
      cameraNotReady: "कॅमेरा अजून तयार नाही. कृपया थोडा वेळ थांबा.",
      captureFirst: "कृपया आधी सेल्फी घ्या.",
      cancel: "रद्द करा",
      captureSelfie: "सेल्फी घ्या",
      retake: "पुन्हा घ्या",
      verifyOnline: "पडताळा आणि ऑनलाइन जा",
      goodDay: "नमस्कार",
      readyDeliver: "MaxiGo सोबत डिलिव्हरीसाठी तयार आहात?",
      youreOnline: "तुम्ही ऑनलाइन आहात",
      youreOffline: "तुम्ही ऑफलाइन आहात",
      youAreOnline: "तुम्ही ऑनलाइन आहात",
      youAreOffline: "तुम्ही ऑफलाइन आहात",
      receiveNearby: "आता तुम्हाला जवळचे डिलिव्हरी ऑर्डर मिळू शकतात.",
      goOnlineStart: "डिलिव्हरी ऑर्डर मिळवण्यासाठी ऑनलाइन जा.",
      goOffline: "ऑफलाइन जा",
      goOnline: "ऑनलाइन जा",
      todaysEarnings: "आजची कमाई",
      completedOrders: "पूर्ण झालेले ऑर्डर",
      vehicle: "वाहन",
      availableOrders: "उपलब्ध ऑर्डर्स",
      nearbyOrders: "जवळचे डिलिव्हरी ऑर्डर",
      goOnlineReceive: "ऑर्डर मिळवण्यासाठी ऑनलाइन जा",
      turnOnStatus: "ऑर्डर मिळवण्यासाठी ऑनलाइन स्टेटस सुरू करा.",
      noNewOrders: "नवीन ऑर्डर नाहीत",
      stayOnline: "ऑनलाइन राहा. नवीन ऑर्डर्स येथे दिसतील.",
      pickup: "पिकअप",
      delivery: "डिलिव्हरी",
      deliveryRoute: "डिलिव्हरी मार्ग",
      routeHelp: "हॉटेल/स्टोअरमधून ऑर्डर पिकअप करा आणि नंतर ग्राहकाला पोहोचवा.",
      hotelStore: "हॉटेल / स्टोअर",
      pickupLocation: "पिकअप लोकेशन",
      customer: "ग्राहक",
      deliveryLocation: "डिलिव्हरी लोकेशन",
      totalDistance: "एकूण अंतर",
      earn: "कमाई",
      acceptOrder: "ऑर्डर स्वीकारा",
      markPicked: "पिकअप पूर्ण करा",
      startDelivery: "डिलिव्हरी सुरू करा",
      markDelivered: "डिलिव्हरी पूर्ण करा",
      home: "होम",
      orders: "ऑर्डर्स",
      earnings: "कमाई",
      profile: "प्रोफाइल",
      yourLocation: "तुमची लोकेशन",
      onDelivery: "डिलिव्हरीवर",
      accepted: "स्वीकारले",
      pickedUp: "पिकअप झाले"
    }
  };

  const tr = (key) =>
    dashboardTranslations[language]?.[key] ||
    dashboardTranslations.en[key] ||
    key;


  /* =====================================================
     RIDER PROFILE
     ===================================================== */

  const [rider, setLocalRider] = useState(() => {
    try {
      const saved =
        localStorage.getItem("maxigoRiderProfile");

      if (saved) {
        return JSON.parse(saved);
      }

      return riderProp || {};

    } catch (error) {

      console.error(
        "Unable to load rider profile:",
        error
      );

      return riderProp || {};
    }
  });


  /* =====================================================
     DASHBOARD BACKEND DATA
     ===================================================== */

  const [dashboardData, setDashboardData] = useState(null);
  const [backendLoading, setBackendLoading] = useState(true);

  /* =====================================================
     ONLINE STATUS
     ===================================================== */

  const [online, setOnline] = useState(
    riderProp?.status === "ONLINE" ||
    rider?.status === "ONLINE" ||
    rider?.availabilityStatus === "ONLINE"
  );


  /* =====================================================
     ACTIVE TAB
     ===================================================== */

  const [activeTab, setActiveTab] =
    useState("home");

  /* =====================================================
     SELFIE VERIFICATION
     ===================================================== */

  const [showSelfieModal, setShowSelfieModal] = useState(false);
  const [selfieStream, setSelfieStream] = useState(null);
  const [selfiePreview, setSelfiePreview] = useState(() => {
    try {
      return localStorage.getItem("maxigoRiderSelfie") || "";
    } catch {
      return "";
    }
  });
  const [selfieCaptured, setSelfieCaptured] = useState(!!selfiePreview);
  const [cameraLoading, setCameraLoading] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const stopSelfieCamera = () => {
    if (selfieStream) {
      selfieStream.getTracks().forEach((track) => track.stop());
      setSelfieStream(null);
    }
  };

  const openSelfieModal = async () => {
    setShowSelfieModal(true);
    setSelfieCaptured(false);
    setCameraError("");
    setCameraLoading(true);

    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error("Camera is not supported in this browser.");
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 720 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      setSelfieStream(stream);

      requestAnimationFrame(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(() => {});
        }
      });
    } catch (error) {
      console.error("Unable to access camera:", error);
      setCameraError(
        "Camera access is required. Please allow camera permission and try again."
      );
    } finally {
      setCameraLoading(false);
    }
  };

  const captureSelfie = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas || video.readyState < 2) {
      setCameraError("Camera is not ready yet. Please wait a moment.");
      return;
    }

    const size = Math.min(video.videoWidth || 720, video.videoHeight || 720);
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const sourceSize = Math.min(video.videoWidth, video.videoHeight);
    const sx = (video.videoWidth - sourceSize) / 2;
    const sy = (video.videoHeight - sourceSize) / 2;

    ctx.drawImage(
      video,
      sx,
      sy,
      sourceSize,
      sourceSize,
      0,
      0,
      size,
      size
    );

    const image = canvas.toDataURL("image/jpeg", 0.82);
    setSelfiePreview(image);
    setSelfieCaptured(true);

    try {
      localStorage.setItem("maxigoRiderSelfie", image);
    } catch (error) {
      console.warn("Could not save selfie locally:", error);
    }

    stopSelfieCamera();
  };

  const retakeSelfie = async () => {
    setSelfieCaptured(false);
    setSelfiePreview("");
    setCameraError("");
    try {
      localStorage.removeItem("maxigoRiderSelfie");
    } catch {}
    await openSelfieModal();
  };

  const cancelSelfieVerification = () => {
    stopSelfieCamera();
    setShowSelfieModal(false);
    setSelfieCaptured(false);
    setCameraError("");
  };

  const confirmSelfieAndGoOnline = async () => {
    if (!selfiePreview) {
      setCameraError("Please capture your selfie first.");
      return;
    }

    try {
      if (
        navigator.geolocation
      ) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              await updateRiderLocation(
                position.coords.latitude,
                position.coords.longitude
              );
            } catch (locationError) {
              console.warn(
                "Rider location update failed:",
                locationError
              );
            }
          },
          () => {},
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 30000,
          }
        );
      }

      const response =
        await updateRiderAvailability(
          "ONLINE"
        );

      const updatedRider = {
        ...rider,
        ...response,
        status:
          response?.availabilityStatus ||
          "ONLINE",
        availabilityStatus:
          response?.availabilityStatus ||
          "ONLINE",
        selfieVerified: true,
        selfieVerifiedAt:
          new Date().toISOString(),
      };

      setOnline(true);

      // Start a live online-session timer for the Earnings screen.
      try {
        localStorage.setItem(
          "maxigoRiderOnlineSince",
          String(Date.now())
        );
        localStorage.setItem(
          "maxigoRiderAvailabilityStatus",
          "ONLINE"
        );
      } catch (storageError) {
        console.warn(
          "Online session storage update failed:",
          storageError
        );
      }

      saveRider(updatedRider);
      setShowSelfieModal(false);
      setSelfieCaptured(true);
      stopSelfieCamera();

      try {
        const availableResponse =
          await getAvailableOrders();

        setOrders(
          availableResponse
            .map(
              normalizeAvailableOrder
            )
            .filter(Boolean)
        );
      } catch (refreshError) {
        console.error(
          "Unable to load available orders:",
          refreshError
        );
      }

      try {
        const dashboardResponse =
          await getRiderDashboard();

        setDashboardData(
          dashboardResponse
        );
      } catch (dashboardError) {
        console.error(
          "Unable to load rider dashboard:",
          dashboardError
        );
      }
    } catch (error) {
      console.error(
        "Go online failed:",
        error
      );

      setCameraError(
        error?.message ||
          "Unable to go online."
      );
    }
  };

  useEffect(() => {
    return () => {
      if (selfieStream) {
        selfieStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [selfieStream]);


  /* =====================================================
     ORDERS
     ===================================================== */

  const [orders, setOrders] = useState([]);


  /* =====================================================
     KEEP RIDER PROP UPDATED
     ===================================================== */

  useEffect(() => {

    if (riderProp) {

      setLocalRider(riderProp);

      setOnline(
        riderProp.status === "ONLINE"
      );
    }

  }, [riderProp]);


  /* =====================================================
     BACKEND ORDER NORMALIZATION
     ===================================================== */

  const normalizeAvailableOrder = (item) => {
    if (!item) return null;

    const orderId =
      item.orderId ??
      item.id ??
      null;

    const orderNumber =
      item.orderNumber ??
      orderId ??
      "—";

    const items = Array.isArray(item.items)
      ? item.items
      : [];

    const itemText =
      items.length > 0
        ? `${items.reduce(
            (sum, current) =>
              sum + Number(current?.quantity || 0),
            0
          )} Items`
        : "Items";

    return {
      id: String(orderId),
      orderNumber: String(orderNumber),
      restaurant:
        item.storeName ||
        "Store",
      customer:
        item.customerName ||
        "Customer",
      items: itemText,
      amount:
        Number(item.totalAmount || 0),
      pickup:
        item.storeAddress ||
        "Pickup Location",
      delivery: [
        item.deliveryArea,
        item.deliveryLandmark,
        item.deliveryCity,
        item.deliveryState,
        item.deliveryPincode,
      ]
        .filter(Boolean)
        .join(", ") ||
        "Delivery Location",
      status:
        "NEW",
      distance:
        item.distanceKm != null
          ? `${Number(item.distanceKm).toFixed(1)} km`
          : "—",
      totalDistance:
        item.distanceKm != null
          ? `${Number(item.distanceKm).toFixed(1)} km`
          : "—",
      earning:
        Number(item.deliveryFee || 0),
      pickupLatitude:
        item.storeLatitude ?? null,
      pickupLongitude:
        item.storeLongitude ?? null,
      deliveryLatitude:
        item.deliveryLatitude ?? null,
      deliveryLongitude:
        item.deliveryLongitude ?? null,
      customerMobile:
        item.customerMobile || "",
    };
  };

  const normalizeDetailedOrder = (item) => {
    if (!item) return null;

    const orderId = item.orderId ?? item.id ?? null;
    const orderStatus = String(
      item.orderStatus || item.deliveryStatus || ""
    ).toUpperCase();

    let status = "NEW";

    if (orderStatus === "DELIVERED") {
      status = "DELIVERED";
    } else if (orderStatus === "OUT_FOR_DELIVERY") {
      status = "OUT_FOR_DELIVERY";
    } else if (orderStatus === "PICKED_UP") {
      status = "PICKED";
    } else if (
      orderStatus === "ACCEPTED" ||
      orderStatus === "ASSIGNED"
    ) {
      status = "ACCEPTED";
    }

    const items = Array.isArray(item.items)
      ? item.items
      : [];

    const itemText =
      items.length > 0
        ? `${items.reduce(
            (sum, current) =>
              sum + Number(current?.quantity || 0),
            0
          )} Items`
        : "Items";

    const delivery = [
      item.deliveryHouseNo,
      item.deliveryArea,
      item.deliveryLandmark,
      item.deliveryCity,
      item.deliveryState,
      item.deliveryPincode,
    ]
      .filter(Boolean)
      .join(", ") || "Delivery Location";

    return {
      id: String(orderId),
      orderNumber: item.orderNumber ?? orderId,
      restaurant: item.storeName || "Store",
      customer: item.customerName || "Customer",
      items: itemText,
      amount: Number(item.totalAmount || 0),
      pickup: item.storeAddress || "Pickup Location",
      delivery,
      status,
      distance: "—",
      totalDistance: "—",
      earning: Number(item.deliveryFee || 0),
      pickupLatitude: item.storeLatitude ?? null,
      pickupLongitude: item.storeLongitude ?? null,
      deliveryLatitude: item.deliveryLatitude ?? null,
      deliveryLongitude: item.deliveryLongitude ?? null,
      customerMobile: item.customerMobile || "",
    };
  };

  const mergeAssignmentIntoOrder = (
    previous,
    response
  ) => {
    if (!response) return previous;

    const rawStatus = String(
      response.deliveryStatus ||
        response.orderStatus ||
        ""
    ).toUpperCase();

    let status = previous?.status || "NEW";

    if (
      rawStatus === "DELIVERED"
    ) {
      status = "DELIVERED";
    } else if (
      rawStatus === "OUT_FOR_DELIVERY"
    ) {
      status = "OUT_FOR_DELIVERY";
    } else if (
      rawStatus === "PICKED_UP"
    ) {
      status = "PICKED";
    } else if (
      rawStatus === "ACCEPTED" ||
      rawStatus === "ASSIGNED"
    ) {
      status = "ACCEPTED";
    }

    const deliveryAddress = [
      response.deliveryHouseNo,
      response.deliveryArea,
      response.deliveryLandmark,
      response.deliveryCity,
      response.deliveryState,
      response.deliveryPincode,
    ]
      .filter(Boolean)
      .join(", ");

    return {
      ...(previous || {}),
      id: String(
        response.orderId ??
          previous?.id ??
          ""
      ),
      orderNumber:
        response.orderNumber ??
        previous?.orderNumber ??
        response.orderId,
      restaurant:
        response.storeName ||
        previous?.restaurant ||
        "Store",
      customer:
        response.customerName ||
        previous?.customer ||
        "Customer",
      amount:
        Number(
          response.totalAmount ??
            previous?.amount ??
            0
        ),
      pickup:
        response.storeAddress ||
        previous?.pickup ||
        "Pickup Location",
      delivery:
        deliveryAddress ||
        previous?.delivery ||
        "Delivery Location",
      status,
      distance:
        previous?.distance || "—",
      totalDistance:
        previous?.totalDistance ||
        "—",
      earning:
        Number(
          response.deliveryFee ??
            previous?.earning ??
            0
        ),
      pickupLatitude:
        response.storeLatitude ??
        previous?.pickupLatitude ??
        null,
      pickupLongitude:
        response.storeLongitude ??
        previous?.pickupLongitude ??
        null,
      // Customer exact GPS is locked until pickup is completed.
      deliveryLatitude:
        (status === "PICKED" ||
          status === "OUT_FOR_DELIVERY" ||
          status === "DELIVERED")
          ? (response.deliveryLatitude ??
              previous?.deliveryLatitude ??
              null)
          : null,
      deliveryLongitude:
        (status === "PICKED" ||
          status === "OUT_FOR_DELIVERY" ||
          status === "DELIVERED")
          ? (response.deliveryLongitude ??
              previous?.deliveryLongitude ??
              null)
          : null,
      customerMobile:
        response.customerMobile ||
        previous?.customerMobile ||
        "",
    };
  };

  /* =====================================================
     LOAD RIDER BACKEND DATA
     ===================================================== */

  const loadBackendData = async () => {
    setBackendLoading(true);

    try {
      const profileResponse =
        await getRiderProfile();

      const savedProfileRaw =
        localStorage.getItem(
          "maxigoRiderProfile"
        );

      let savedProfile = {};

      try {
        savedProfile = savedProfileRaw
          ? JSON.parse(savedProfileRaw)
          : {};
      } catch {
        savedProfile = {};
      }

      const mergedProfile = {
        ...savedProfile,
        ...profileResponse,
        userId:
          profileResponse?.userId ??
          savedProfile?.userId,
        fullName:
          profileResponse?.name ||
          savedProfile?.fullName ||
          "Rider",
        name:
          profileResponse?.name ||
          savedProfile?.name ||
          "Rider",
        mobile:
          profileResponse?.mobile ||
          savedProfile?.mobile ||
          "",
        email:
          profileResponse?.email ??
          savedProfile?.email ??
          "",
        vehicleType:
          profileResponse?.vehicleType ??
          savedProfile?.vehicleType ??
          "Bike",
        vehicleNumber:
          profileResponse?.vehicleNumber ??
          savedProfile?.vehicleNumber ??
          "",
        licenseNumber:
          profileResponse?.licenseNumber ??
          savedProfile?.licenseNumber ??
          "",
        latitude:
          profileResponse?.latitude ??
          savedProfile?.latitude ??
          null,
        longitude:
          profileResponse?.longitude ??
          savedProfile?.longitude ??
          null,
        availabilityStatus:
          profileResponse?.availabilityStatus ??
          savedProfile?.availabilityStatus ??
          "OFFLINE",
        verificationStatus:
          profileResponse?.verificationStatus ??
          savedProfile?.verificationStatus ??
          "PENDING",
        status:
          profileResponse?.availabilityStatus ??
          savedProfile?.status ??
          "OFFLINE",
      };

      saveRider(mergedProfile);

      const currentOnline =
        String(
          mergedProfile.availabilityStatus ||
            mergedProfile.status ||
            ""
        ).toUpperCase() === "ONLINE";

      setOnline(currentOnline);

      const verified =
        String(
          mergedProfile.verificationStatus ||
            ""
        ).toUpperCase() === "VERIFIED";

      if (verified) {
        const dashboardPromise =
          getRiderDashboard();

        const availablePromise =
          currentOnline
            ? getAvailableOrders()
            : Promise.resolve([]);

        const activePromise =
          getRiderActiveAssignments();

        const [
          dashboardResponse,
          availableResponse,
          activeAssignments,
        ] = await Promise.all([
          dashboardPromise,
          availablePromise,
          activePromise,
        ]);

        setDashboardData(
          dashboardResponse || null
        );

        const normalizedAvailable =
          (Array.isArray(
            availableResponse
          )
            ? availableResponse
            : []
          )
            .map(
              normalizeAvailableOrder
            )
            .filter(Boolean);

        const activeList =
          Array.isArray(activeAssignments)
            ? activeAssignments
            : [];

        const activeDetails =
          await Promise.all(
            activeList.map(
              (assignment) =>
                assignment?.orderId
                  ? getRiderOrder(
                      assignment.orderId
                    ).catch(() => null)
                  : null
            )
          );

        const normalizedActive =
          activeDetails
            .map(
              normalizeDetailedOrder
            )
            .filter(Boolean);

        const mergedOrders = [
          ...normalizedActive,
          ...normalizedAvailable.filter(
            (available) =>
              !normalizedActive.some(
                (active) =>
                  String(active.id) ===
                  String(available.id)
              )
          ),
        ];

        setOrders(
          mergedOrders
        );
      } else {
        setDashboardData(null);
        setOrders([]);
      }
    } catch (error) {
      console.error(
        "Rider dashboard API error:",
        error
      );

      if (
        error?.message ===
        "Rider profile not found"
      ) {
        localStorage.removeItem(
          "maxigoRiderRegistered"
        );
      }

      setDashboardData(null);
      setOrders([]);
    } finally {
      setBackendLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("maxigoRiderToken")) {
      loadBackendData();
    } else {
      setBackendLoading(false);
    }
  }, []);

  /* =====================================================
     SAVE RIDER
     ===================================================== */

  const saveRider = (updatedRider) => {

    setLocalRider(updatedRider);

    localStorage.setItem(
      "maxigoRiderProfile",
      JSON.stringify(updatedRider)
    );

    /*
      Keep old key also for compatibility
    */

    localStorage.setItem(
      "maxigoRider",
      JSON.stringify(updatedRider)
    );

    if (setRider) {
      setRider(updatedRider);
    }
  };


  /* =====================================================
     TOGGLE ONLINE
     ===================================================== */

  const toggleOnline = async () => {
    if (backendLoading) {
      return;
    }

    if (online) {
      try {
        const response =
          await updateRiderAvailability(
            "OFFLINE"
          );

        const updatedRider = {
          ...rider,
          ...response,
          availabilityStatus:
            response?.availabilityStatus ||
            "OFFLINE",
          status:
            response?.availabilityStatus ||
            "OFFLINE",
        };

        setOnline(false);

        // Close the current online session.
        try {
          localStorage.removeItem(
            "maxigoRiderOnlineSince"
          );
          localStorage.setItem(
            "maxigoRiderAvailabilityStatus",
            "OFFLINE"
          );
        } catch (storageError) {
          console.warn(
            "Online session storage update failed:",
            storageError
          );
        }

        saveRider(updatedRider);
        setOrders([]);
      } catch (error) {
        console.error(
          "Go offline failed:",
          error
        );

        alert(
          error?.message ||
            "Unable to go offline."
        );
      }

      return;
    }

    if (
      String(
        rider?.verificationStatus || ""
      ).toUpperCase() !== "VERIFIED"
    ) {
      alert(
        "Rider verification is pending. You can go online after Admin verification."
      );
      return;
    }

    openSelfieModal();
  };


  /* =====================================================
     GET CURRENT GPS LOCATION
     ===================================================== */

  const getCurrentRiderLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(
          new Error(
            "Location is not supported by this browser."
          )
        );
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
          });
        },
        (error) => {
          let message =
            "Unable to get your current location.";

          if (error?.code === 1) {
            message =
              "Location permission is required. Please allow location access and try again.";
          } else if (error?.code === 2) {
            message =
              "Your current location is unavailable. Please turn on GPS/location and try again.";
          } else if (error?.code === 3) {
            message =
              "Location request timed out. Please try again.";
          }

          reject(new Error(message));
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0,
        }
      );
    });
  };


  /* =====================================================
     UPDATE ORDER STATUS
     ===================================================== */

  const updateOrderStatus = async (
    id,
    status
  ) => {
    try {
      const orderId = Number(id);
      let response = null;

      if (status === "ACCEPTED") {
        response =
          await acceptRiderOrder(orderId);
      } else if (status === "PICKED") {
        // Pickup can happen only after reaching the exact store GPS location.
        const location =
          await getCurrentRiderLocation();

        response =
          await pickupRiderOrder(
            orderId,
            location.latitude,
            location.longitude
          );
      } else if (
        status === "OUT_FOR_DELIVERY"
      ) {
        response =
          await startRiderDelivery(orderId);
      } else if (
        status === "DELIVERED"
      ) {
        // Delivery can happen only after reaching the exact customer GPS location.
        const location =
          await getCurrentRiderLocation();

        response =
          await markRiderDelivered(
            orderId,
            location.latitude,
            location.longitude
          );
      }

      if (!response) {
        return;
      }

      setOrders((previousOrders) =>
        previousOrders
          .map((order) =>
            String(order.id) ===
            String(id)
              ? mergeAssignmentIntoOrder(
                  order,
                  response
                )
              : order
          )
          .filter(
            (order) =>
              order.status !==
              "DELIVERED"
          )
      );

      if (status === "DELIVERED") {
        try {
          const dashboardResponse =
            await getRiderDashboard();

          setDashboardData(
            dashboardResponse || null
          );
        } catch (dashboardError) {
          console.error(
            "Dashboard refresh failed:",
            dashboardError
          );
        }
      }
    } catch (error) {
      console.error(
        "Delivery action failed:",
        error
      );

      alert(
        error?.message ||
          "Unable to update order status."
      );
    }
  };


  /* =====================================================
     OPEN PICKUP / DELIVERY LOCATION
     ===================================================== */

  const openLocation = (order, type) => {
    if (!order) return;

    const isPickup = type === "pickup";

    if (
      !isPickup &&
      order.status !== "PICKED" &&
      order.status !== "OUT_FOR_DELIVERY" &&
      order.status !== "DELIVERED"
    ) {
      alert(
        "Customer exact location unlocks after pickup."
      );
      return;
    }

    const latitude = isPickup
      ? order.pickupLatitude
      : order.deliveryLatitude;

    const longitude = isPickup
      ? order.pickupLongitude
      : order.deliveryLongitude;

    const address = isPickup
      ? order.pickup
      : order.delivery;

    let mapsUrl = "";

    // Prefer exact coordinates from backend.
    if (
      latitude !== null &&
      latitude !== undefined &&
      longitude !== null &&
      longitude !== undefined &&
      Number.isFinite(Number(latitude)) &&
      Number.isFinite(Number(longitude))
    ) {
      mapsUrl =
        `https://www.google.com/maps/search/?api=1&query=` +
        `${encodeURIComponent(`${latitude},${longitude}`)}`;
    } else if (address) {
      // Fallback to address when coordinates are not available.
      mapsUrl =
        `https://www.google.com/maps/search/?api=1&query=` +
        `${encodeURIComponent(address)}`;
    } else {
      alert(
        isPickup
          ? "Store location is not available."
          : "Customer location is not available."
      );
      return;
    }

    window.open(
      mapsUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };


  /* =====================================================
     OPEN STORE -> CUSTOMER ROUTE
     ===================================================== */

  const openDeliveryRoute = (order) => {
    if (!order) return;

    if (
      order.status !== "PICKED" &&
      order.status !== "OUT_FOR_DELIVERY" &&
      order.status !== "DELIVERED"
    ) {
      alert(
        "Customer exact location unlocks after pickup."
      );
      return;
    }

    const pickupLat = Number(order.pickupLatitude);
    const pickupLng = Number(order.pickupLongitude);
    const deliveryLat = Number(order.deliveryLatitude);
    const deliveryLng = Number(order.deliveryLongitude);

    let mapsUrl = "";

    if (
      Number.isFinite(pickupLat) &&
      Number.isFinite(pickupLng) &&
      Number.isFinite(deliveryLat) &&
      Number.isFinite(deliveryLng)
    ) {
      mapsUrl =
        `https://www.google.com/maps/dir/?api=1` +
        `&origin=${encodeURIComponent(`${pickupLat},${pickupLng}`)}` +
        `&destination=${encodeURIComponent(`${deliveryLat},${deliveryLng}`)}` +
        `&travelmode=driving`;
    } else if (order.pickup && order.delivery) {
      mapsUrl =
        `https://www.google.com/maps/dir/?api=1` +
        `&origin=${encodeURIComponent(order.pickup)}` +
        `&destination=${encodeURIComponent(order.delivery)}` +
        `&travelmode=driving`;
    } else {
      alert("Store or customer location is not available.");
      return;
    }

    window.open(
      mapsUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };


  /* =====================================================
     START NAVIGATION TO CUSTOMER
     ===================================================== */

  const navigateToCustomer = (order) => {
    if (!order) return;

    if (
      order.status !== "PICKED" &&
      order.status !== "OUT_FOR_DELIVERY" &&
      order.status !== "DELIVERED"
    ) {
      alert(
        "Customer exact location unlocks after pickup."
      );
      return;
    }

    const deliveryLat = Number(order.deliveryLatitude);
    const deliveryLng = Number(order.deliveryLongitude);

    let mapsUrl = "";

    if (
      Number.isFinite(deliveryLat) &&
      Number.isFinite(deliveryLng)
    ) {
      mapsUrl =
        `https://www.google.com/maps/dir/?api=1` +
        `&destination=${encodeURIComponent(`${deliveryLat},${deliveryLng}`)}` +
        `&travelmode=driving`;
    } else if (order.delivery) {
      mapsUrl =
        `https://www.google.com/maps/dir/?api=1` +
        `&destination=${encodeURIComponent(order.delivery)}` +
        `&travelmode=driving`;
    } else {
      alert("Customer location is not available.");
      return;
    }

    window.open(
      mapsUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };


  /* =====================================================
     COMPLETED ORDERS
     ===================================================== */

  const completedOrders =
    orders.filter(
      (order) =>
        order.status === "DELIVERED"
    );


  /* =====================================================
     AVAILABLE ORDERS
     ===================================================== */

  const availableOrders =
    orders.filter(
      (order) =>
        order.status !== "DELIVERED" &&
        order.status !== "CANCELLED"
    );


  /* =====================================================
     DELIVERY EARNINGS
     ===================================================== */

  const deliveryEarnings =
    Number(
      dashboardData?.totalEarnings || 0
    );


  /* =====================================================
     TODAY EARNINGS
     ===================================================== */

  const todayEarnings =
    Number(
      dashboardData?.todayEarnings || 0
    );


  /* =====================================================
     TOTAL COMPLETED ORDERS
     ===================================================== */

  const completedOrderCount =
    Number(
      dashboardData?.completedOrders ??
        completedOrders.length
    );


  /* =====================================================
     TODAY COMPLETED ORDERS
     ===================================================== */

  const todayCompletedOrderCount =
    Number(
      dashboardData?.todayCompletedOrders ??
        0
    );


  /* =====================================================
     FIRST NAME
     ===================================================== */

  const firstName =
    rider?.fullName
      ?.trim()
      ?.split(" ")[0] ||
    "Rider";


  /* =====================================================
     RENDER
     ===================================================== */

  return (

    <div className="dashboard-page">


      {/* =================================================
          HEADER
          ================================================= */}

      <header className="dashboard-header">

        <div className="dashboard-logo">
          <img
            src="/maxigo-rider-logo.png"
            alt="MaxiGo Rider"
            style={{
              width: "190px",
              height: "auto",
              maxHeight: "52px",
              objectFit: "contain",
              display: "block",
            }}
          />
        </div>


        <div className="header-right">

          <div className="header-location">
            📍{" "}
            {rider?.address ||
              tr("yourLocation")}
          </div>


          <button
            className="profile-mini"
            onClick={() =>
              setActiveTab("profile")
            }
          >

            <span>
              👤
            </span>

            <strong>
              {firstName}
            </strong>

          </button>

        </div>

      </header>


      {/* =================================================
          SELFIE VERIFICATION MODAL
          ================================================= */}

      {showSelfieModal && (
        <div className="selfie-modal-overlay">
          <div className="selfie-modal">

            <div className="selfie-modal-header">
              <div>
                <p className="selfie-modal-kicker">{tr("verification")}</p>
                <h2>{tr("takeSelfie")}</h2>
                <p>
                  {tr("selfieHelp")}
                </p>
              </div>

              <button
                type="button"
                className="selfie-close-btn"
                onClick={cancelSelfieVerification}
                aria-label="Close selfie verification"
              >
                ×
              </button>
            </div>

            <div className="selfie-camera-wrap">
              {selfieCaptured && selfiePreview ? (
                <img
                  src={selfiePreview}
                  alt="Captured rider selfie"
                  className="selfie-preview"
                />
              ) : (
                <video
                  ref={videoRef}
                  className="selfie-video"
                  autoPlay
                  playsInline
                  muted
                />
              )}

              {cameraLoading && (
                <div className="selfie-camera-message">
                  {tr("openingCamera")}
                </div>
              )}

              {!cameraLoading && cameraError && (
                <div className="selfie-camera-error">
                  {cameraError}
                </div>
              )}
            </div>

            <canvas ref={canvasRef} className="selfie-hidden-canvas" />

            <div className="selfie-modal-actions">
              {!selfieCaptured ? (
                <>
                  <button
                    type="button"
                    className="selfie-secondary-btn"
                    onClick={cancelSelfieVerification}
                  >
                    {tr("cancel")}
                  </button>

                  <button
                    type="button"
                    className="selfie-primary-btn"
                    onClick={captureSelfie}
                    disabled={cameraLoading || !!cameraError}
                  >
                    📸 {tr("captureSelfie")}
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className="selfie-secondary-btn"
                    onClick={retakeSelfie}
                  >
                    {tr("retake")}
                  </button>

                  <button
                    type="button"
                    className="selfie-primary-btn"
                    onClick={confirmSelfieAndGoOnline}
                  >
                    ✓ {tr("verifyOnline")}
                  </button>
                </>
              )}
            </div>

          </div>
        </div>
      )}

      {/* =================================================
          MAIN
          ================================================= */}

      <main className="dashboard-main">


        {/* =================================================
            HOME
            ================================================= */}

        {activeTab === "home" && (

          <>


            {/* WELCOME */}

            <section className="welcome-section">

              <div>

                <p className="welcome-small">
                  {tr("goodDay")} 👋
                </p>

                <h1>
                  Hello, {firstName}!
                </h1>

                <p>
                  {tr("readyDeliver")}
                </p>

              </div>


              {/* ONLINE CONTROL */}

              <div className="online-control">

                <span>

                  {online
                    ? tr("youreOnline")
                    : tr("youreOffline")}

                </span>


                <button
                  className={`online-toggle ${
                    online
                      ? "online"
                      : ""
                  }`}
                  onClick={toggleOnline}
                  aria-label="Toggle online status"
                >

                  <span className="toggle-circle"></span>

                </button>

              </div>

            </section>



            {/* STATUS */}

            <div
              className={`status-banner ${
                online
                  ? "status-online"
                  : "status-offline"
              }`}
            >

              <div className="status-icon">

                {online
                  ? "🟢"
                  : "⚪"}

              </div>


              <div>

                <strong>

                  {online
                    ? tr("youAreOnline")
                    : tr("youAreOffline")}

                </strong>


                <p>

                  {online
                    ? tr("receiveNearby")
                    : tr("goOnlineStart")}

                </p>

              </div>


              <button
                onClick={toggleOnline}
              >

                {online
                  ? tr("goOffline")
                  : tr("goOnline")}

              </button>

            </div>



            {/* STATS */}

            <section className="stats-grid">


              {/* EARNINGS */}

              <div
                className="stat-card"
                onClick={() =>
                  setActiveTab(
                    "earnings"
                  )
                }
                style={{
                  cursor: "pointer",
                }}
              >

                <div className="stat-icon">
                  💰
                </div>

                <div>

                  <p>
                    {tr("todaysEarnings")}
                  </p>

                  <h2>
                    ₹{todayEarnings.toLocaleString("en-IN")}
                  </h2>

                </div>

              </div>



              {/* ORDERS */}

              <div
                className="stat-card"
                onClick={() =>
                  setActiveTab("orders")
                }
                style={{
                  cursor: "pointer",
                }}
              >

                <div className="stat-icon">
                  📦
                </div>

                <div>

                  <p>
                    {tr("completedOrders")}
                  </p>

                  <h2>
                    {completedOrderCount}
                  </h2>

                </div>

              </div>



              {/* VEHICLE */}

              <div className="stat-card">

                <div className="stat-icon">
                  🛵
                </div>

                <div>

                  <p>
                    {tr("vehicle")}
                  </p>

                  <h2>
                    {rider?.vehicleType ||
                      "Bike"}
                  </h2>

                </div>

              </div>

            </section>



            {/* AVAILABLE ORDERS */}

            <section className="orders-section">

              <div className="section-title">

                <div>

                  <h2>
                    {tr("availableOrders")}
                  </h2>

                  <p>
                    {tr("nearbyOrders")}
                  </p>

                </div>


                <span className="order-count">
                  {availableOrders.length}
                </span>

              </div>



              {/* OFFLINE */}

              {!online && (

                <div className="offline-message">

                  <div>
                    🔒
                  </div>

                  <div>

                    <strong>
                      {tr("goOnlineReceive")}
                    </strong>

                    <p>
                      {tr("turnOnStatus")}
                    </p>

                  </div>

                </div>

              )}



              {/* ONLINE ORDERS */}

              {online &&
                availableOrders.length === 0 && (

                <div className="offline-message">

                  <div>
                    🎉
                  </div>

                  <div>

                    <strong>
                      {tr("noNewOrders")}
                    </strong>

                    <p>
                      {tr("stayOnline")}
                    </p>

                  </div>

                </div>

              )}



              {online &&
                availableOrders.map(
                  (order) => (

                    <div
                      className="order-card"
                      key={order.id}
                    >


                      {/* ORDER TOP */}

                      <div className="order-top">

                        <div>

                          <span className="order-id">
                            #{order.id}
                          </span>

                          <h3>
                            {order.restaurant}
                          </h3>

                          <p>
                            {order.customer}
                            {" • "}
                            {order.items}
                          </p>

                        </div>


                        <div className="order-amount">
                          ₹{order.amount}
                        </div>

                      </div>



                      {/* ROUTE */}

                      <div className="route">


                        {/* PICKUP */}

                        <div className="route-row">

                          <div className="route-dot pickup">
                            P
                          </div>

                          <div>

                            <small>
                              {tr("pickup")}
                            </small>

                            <p>
                              {order.pickup}
                            </p>

                          </div>

                        </div>


                        <div className="route-line"></div>


                        {/* DELIVERY - CUSTOMER LOCATION IS LOCKED UNTIL PICKUP */}

                        <div className="route-row">

                          <div className="route-dot delivery">
                            D
                          </div>

                          <div>

                            <small>
                              {tr("delivery")}
                            </small>

                            <p>
                              {(order.status === "PICKED" ||
                                order.status === "OUT_FOR_DELIVERY")
                                ? order.delivery
                                : "Customer location unlocks after pickup."}
                            </p>

                          </div>

                        </div>

                      </div>



                      {/* ACCEPTED ORDER - LOCATION CONTROLS */}

                      {order.status !== "NEW" &&
                        order.status !== "DELIVERED" &&
                        order.status !== "CANCELLED" && (

                        <div className="accepted-location-panel">

                          <div className="accepted-location-heading">
                            <div>
                              <strong>{tr("deliveryRoute")}</strong>
                              <p>
                                {tr("routeHelp")}
                              </p>
                            </div>

                            <span className="accepted-location-badge">
                              {order.status === "ACCEPTED"
                                ? tr("accepted")
                                : order.status === "PICKED"
                                ? tr("pickedUp")
                                : tr("onDelivery")}
                            </span>
                          </div>


                          <div className="location-action-grid">

                            <button
                              type="button"
                              className="location-action pickup-location"
                              onClick={() =>
                                openLocation(order, "pickup")
                              }
                            >
                              <span className="location-action-icon">
                                🏪
                              </span>

                              <span className="location-action-text">
                                <small>
                                  {tr("hotelStore")}
                                </small>

                                <strong>
                                  {tr("pickupLocation")}
                                </strong>

                                <em>
                                  📍 {order.pickup}
                                </em>
                              </span>

                              <span className="location-action-arrow">
                                ↗
                              </span>
                            </button>


                            {
                              (order.status === "PICKED" ||
                                order.status === "OUT_FOR_DELIVERY") && (
                                <button
                                  type="button"
                                  className="location-action delivery-location"
                                  onClick={() =>
                                    openLocation(order, "delivery")
                                  }
                                >
                                  <span className="location-action-icon">
                                    📦
                                  </span>

                                  <span className="location-action-text">
                                    <small>
                                      {tr("customer")}
                                    </small>

                                    <strong>
                                      {tr("deliveryLocation")}
                                    </strong>

                                    <em>
                                      📍 {order.delivery}
                                    </em>
                                  </span>

                                  <span className="location-action-arrow">
                                    ↗
                                  </span>
                                </button>
                              )
                            }

                          </div>


                          {(order.status === "PICKED" ||
                            order.status === "OUT_FOR_DELIVERY") && (
                            <div className="route-navigation-actions">

                              <button
                                type="button"
                                className="route-map-btn"
                                onClick={() =>
                                  openDeliveryRoute(order)
                                }
                              >
                                🗺️
                                <span>View Route</span>
                              </button>

                              <button
                                type="button"
                                className="route-navigate-btn"
                                onClick={() =>
                                  navigateToCustomer(order)
                                }
                              >
                                🚗
                                <span>Navigate to Customer</span>
                              </button>

                            </div>
                          )}

                        </div>

                      )}



                      {/* ORDER INFO */}

                      <div className="order-info">

                        <span className="total-distance-pill">
                          📍 Total Distance{" "}
                          {order.totalDistance ||
                            order.distance ||
                            "0 km"}
                        </span>

                        <span>
                          💰 Earn ₹
                          {order.earning}
                        </span>

                        <span>
                          {order.status}
                        </span>

                      </div>



                      {/* ACTION BUTTON */}

                      <div className="order-actions">


                        {order.status ===
                          "NEW" && (

                          <button
                            className="accept-btn"
                            onClick={() =>
                              updateOrderStatus(
                                order.id,
                                "ACCEPTED"
                              )
                            }
                          >
                            {tr("acceptOrder")}
                          </button>

                        )}



                        {order.status ===
                          "ACCEPTED" && (

                          <button
                            className="accept-btn"
                            onClick={() =>
                              updateOrderStatus(
                                order.id,
                                "PICKED"
                              )
                            }
                          >
                            {tr("markPicked")}
                          </button>

                        )}



                        {order.status ===
                          "PICKED" && (

                          <button
                            className="accept-btn"
                            onClick={() =>
                              updateOrderStatus(
                                order.id,
                                "OUT_FOR_DELIVERY"
                              )
                            }
                          >
                            {tr("startDelivery")}
                          </button>

                        )}



                        {order.status ===
                          "OUT_FOR_DELIVERY" && (

                          <button
                            className="accept-btn"
                            onClick={() =>
                              updateOrderStatus(
                                order.id,
                                "DELIVERED"
                              )
                            }
                          >
                            ✓ {tr("markDelivered")}
                          </button>

                        )}

                      </div>

                    </div>

                  )
                )}

            </section>

          </>

        )}



        {/* =================================================
            ORDERS COMPONENT
            ================================================= */}

        {activeTab === "orders" && (

          <Orders />

        )}



        {/* =================================================
            EARNINGS COMPONENT
            ================================================= */}

        {activeTab === "earnings" && (

          <Earnings
            onBack={() =>
              setActiveTab("home")
            }
          />

        )}



        {/* =================================================
            PROFILE COMPONENT
            ================================================= */}

        {activeTab === "profile" && (

          <Profile
            rider={rider}
            online={online}
            setActiveTab={setActiveTab}
            onLogout={onLogout}
          />

        )}

      

                {/* =================================================
            PRIVACY & SECURITY COMPONENT
            ================================================= */}

        {activeTab === "privacy" && (
          <PrivacySecurity
            setActiveTab={setActiveTab}
            onLogout={onLogout}
          />
        )}


        </main>

      {/* =================================================
          BOTTOM NAVIGATION
          ================================================= */}

      <nav className="bottom-nav">


        {/* HOME */}

        <button
          className={
            activeTab === "home"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveTab("home")
          }
        >

          <span>
            🏠
          </span>

          {tr("home")}

        </button>



        {/* ORDERS */}

        <button
          className={
            activeTab === "orders"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveTab("orders")
          }
        >

          <span>
            📦
          </span>

          {tr("orders")}

        </button>



        {/* EARNINGS */}

        <button
          className={
            activeTab === "earnings"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveTab("earnings")
          }
        >

          <span>
            💰
          </span>

          {tr("earnings")}

        </button>



        {/* PROFILE */}

        <button
          className={
            activeTab === "profile"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveTab("profile")
          }
        >

          <span>
            👤
          </span>

          {tr("profile")}

        </button>

      </nav>

    </div>

  );
}

export default RiderDashboard;
