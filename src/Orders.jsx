import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageContext";
import {
  getMyOrders,
  getRiderOrder,
  acceptRiderOrder,
  pickupRiderOrder,
  startRiderDelivery,
  markRiderDelivered,
} from "./api";
import "./Orders.css";

function Orders() {
  const { language } = useLanguage();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filter, setFilter] = useState("ALL");

  const translations = {
    en: {
      riderOrders: "RIDER ORDERS",
      myOrders: "My Orders",
      manageTrack:
        "Manage your deliveries and track your earning journey.",
      totalOrders: "Total Orders",
      active: "Active",
      completed: "Completed",
      totalEarned: "Total Earned",
      deliveryHistory: "Delivery History",
      assignedOrders:
        "View and manage all your assigned orders.",
      all: "All",
      new: "New",
      accepted: "Accepted",
      pickedUp: "Picked Up",
      delivery: "Delivery",
      noOrders: "No orders found",
      noOrdersCategory:
        "There are no orders available in this category.",
      viewAllOrders: "View All Orders",
      orderValue: "Order Value",
      yourEarning: "Your Earning",
      totalDistance: "Total Distance",
      received: "Received",
      pickup: "Pickup",
      deliveryLocation: "Delivery",
      acceptOrder: "✓ Accept Order",
      viewDetails: "View Details",
      pickupOrder: "📦 Pickup Order",
      navigation: "Navigation",
      startDelivery: "🛵 Start Delivery",
      customerDetails: "Customer Details",
      markDelivered: "✓ Mark Delivered",
      callCustomer: "Call Customer",
      deliveryCompleted: "Delivery Completed",
      addedToEarnings: "added to your earnings",
      keepDelivering: "Keep delivering with MaxiGo!",
      footerText:
        "Accept nearby orders, complete deliveries and increase your daily earnings.",
      statusNew: "NEW",
      statusAccepted: "ACCEPTED",
      statusPicked: "PICKED UP",
      statusCompleted: "COMPLETED",
    },

    hi: {
      riderOrders: "राइडर ऑर्डर्स",
      myOrders: "मेरे ऑर्डर्स",
      manageTrack:
        "अपनी डिलीवरी संभालें और कमाई की प्रगति देखें।",
      totalOrders: "कुल ऑर्डर",
      active: "सक्रिय",
      completed: "पूर्ण",
      totalEarned: "कुल कमाई",
      deliveryHistory: "डिलीवरी इतिहास",
      assignedOrders:
        "अपने सभी असाइन किए गए ऑर्डर देखें और संभालें।",
      all: "सभी",
      new: "नए",
      accepted: "स्वीकार किए गए",
      pickedUp: "पिकअप किए गए",
      delivery: "डिलीवरी",
      noOrders: "कोई ऑर्डर नहीं मिला",
      noOrdersCategory:
        "इस श्रेणी में कोई ऑर्डर उपलब्ध नहीं है।",
      viewAllOrders: "सभी ऑर्डर देखें",
      orderValue: "ऑर्डर मूल्य",
      yourEarning: "आपकी कमाई",
      totalDistance: "कुल दूरी",
      received: "प्राप्त",
      pickup: "पिकअप",
      deliveryLocation: "डिलीवरी",
      acceptOrder: "✓ ऑर्डर स्वीकार करें",
      viewDetails: "विवरण देखें",
      pickupOrder: "📦 ऑर्डर पिकअप करें",
      navigation: "नेविगेशन",
      startDelivery: "🛵 डिलीवरी शुरू करें",
      customerDetails: "ग्राहक विवरण",
      markDelivered: "✓ डिलीवरी पूर्ण करें",
      callCustomer: "ग्राहक को कॉल करें",
      deliveryCompleted: "डिलीवरी पूर्ण",
      addedToEarnings:
        "आपकी कमाई में जोड़ दिए गए",
      keepDelivering: "MaxiGo के साथ डिलीवरी करते रहें!",
      footerText:
        "पास के ऑर्डर स्वीकार करें, डिलीवरी पूरी करें और अपनी दैनिक कमाई बढ़ाएं।",
      statusNew: "नया",
      statusAccepted: "स्वीकार किया",
      statusPicked: "पिकअप किया",
      statusCompleted: "पूर्ण",
    },

    mr: {
      riderOrders: "रायडर ऑर्डर्स",
      myOrders: "माझ्या ऑर्डर्स",
      manageTrack:
        "तुमच्या डिलिव्हरी व्यवस्थापित करा आणि कमाईची प्रगती पहा.",
      totalOrders: "एकूण ऑर्डर्स",
      active: "सक्रिय",
      completed: "पूर्ण",
      totalEarned: "एकूण कमाई",
      deliveryHistory: "डिलिव्हरी इतिहास",
      assignedOrders:
        "तुमचे सर्व दिलेले ऑर्डर्स पहा आणि व्यवस्थापित करा.",
      all: "सर्व",
      new: "नवीन",
      accepted: "स्वीकारलेले",
      pickedUp: "पिकअप केलेले",
      delivery: "डिलिव्हरी",
      noOrders: "ऑर्डर सापडली नाही",
      noOrdersCategory:
        "या श्रेणीमध्ये कोणतेही ऑर्डर उपलब्ध नाहीत.",
      viewAllOrders: "सर्व ऑर्डर्स पहा",
      orderValue: "ऑर्डरची किंमत",
      yourEarning: "तुमची कमाई",
      totalDistance: "एकूण अंतर",
      received: "प्राप्त",
      pickup: "पिकअप",
      deliveryLocation: "डिलिव्हरी",
      acceptOrder: "✓ ऑर्डर स्वीकारा",
      viewDetails: "तपशील पहा",
      pickupOrder: "📦 ऑर्डर पिकअप करा",
      navigation: "नेव्हिगेशन",
      startDelivery: "🛵 डिलिव्हरी सुरू करा",
      customerDetails: "ग्राहक तपशील",
      markDelivered: "✓ डिलिव्हरी पूर्ण करा",
      callCustomer: "ग्राहकाला कॉल करा",
      deliveryCompleted: "डिलिव्हरी पूर्ण",
      addedToEarnings:
        "तुमच्या कमाईत जोडले गेले",
      keepDelivering: "MaxiGo सोबत डिलिव्हरी करत रहा!",
      footerText:
        "जवळचे ऑर्डर्स स्वीकारा, डिलिव्हरी पूर्ण करा आणि तुमची रोजची कमाई वाढवा.",
      statusNew: "नवीन",
      statusAccepted: "स्वीकारले",
      statusPicked: "पिकअप केले",
      statusCompleted: "पूर्ण",
    },
  };

  const t = (key) =>
    translations[language]?.[key] ||
    translations.en[key] ||
    key;

  const normalizeAssignment = (item, details) => {
    const source = {
      ...(item || {}),
      ...(details || {}),
    };

    const rawStatus = String(
      source.deliveryStatus ||
        source.orderStatus ||
        ""
    ).toUpperCase();

    let status = "ACCEPTED";

    if (rawStatus === "DELIVERED") {
      status = "COMPLETED";
    } else if (rawStatus === "CANCELLED") {
      status = "CANCELLED";
    } else if (rawStatus === "OUT_FOR_DELIVERY") {
      status = "OUT_FOR_DELIVERY";
    } else if (rawStatus === "PICKED_UP") {
      status = "PICKED_UP";
    } else {
      status = "ACCEPTED";
    }

    const delivery = [
      source.deliveryHouseNo,
      source.deliveryArea,
      source.deliveryLandmark,
      source.deliveryCity,
      source.deliveryState,
      source.deliveryPincode,
    ]
      .filter(Boolean)
      .join(", ") || "Delivery Location";

    const itemList = Array.isArray(
      source.items
    )
      ? source.items
      : [];

    return {
      id: String(
        source.orderId ??
          source.id ??
          ""
      ),
      restaurant:
        source.storeName ||
        "Store",
      customer:
        source.customerName ||
        "Customer",
      amount:
        Number(
          source.totalAmount ||
            source.amount ||
            0
        ),
      earning:
        Number(
          source.deliveryFee ||
            source.earning ||
            0
        ),
      distance:
        "—",
      pickup:
        source.storeAddress ||
        "Pickup Location",
      delivery,
      status,
      time:
        source.assignedAt
          ? new Date(
              source.assignedAt
            ).toLocaleString(
              "en-IN",
              {
                day: "2-digit",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
              }
            )
          : "—",
      pickupLatitude:
        source.storeLatitude ??
        null,
      pickupLongitude:
        source.storeLongitude ??
        null,
      deliveryLatitude:
        source.deliveryLatitude ??
        null,
      deliveryLongitude:
        source.deliveryLongitude ??
        null,
      customerMobile:
        source.customerMobile ||
        source.deliveryMobile ||
        "",
      items:
        itemList.length > 0
          ? `${itemList.reduce(
              (sum, current) =>
                sum +
                Number(
                  current?.quantity ||
                    0
                ),
              0
            )} Items`
          : "Items",
    };
  };

  const loadOrders = async () => {
    setLoading(true);
    setError("");

    try {
      const assignmentResponse =
        await getMyOrders();

      const list = Array.isArray(
        assignmentResponse
      )
        ? assignmentResponse
        : [];

      const detailed = await Promise.all(
        list.map(async (item) => {
          if (!item?.orderId) {
            return normalizeAssignment(item);
          }

          try {
            const details =
              await getRiderOrder(
                item.orderId
              );

            return normalizeAssignment(
              item,
              details
            );
          } catch (detailError) {
            console.warn(
              "Order detail load failed:",
              detailError
            );

            return normalizeAssignment(
              item
            );
          }
        })
      );

      setOrders(detailed);
    } catch (loadError) {
      console.error(
        "Rider orders API error:",
        loadError
      );

      setOrders([]);

      if (loadError?.message) {
        setError(
          loadError.message
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateOrderStatus = async (
    id,
    newStatus
  ) => {
    try {
      const orderId = Number(id);
      let response = null;

      if (newStatus === "ACCEPTED") {
        response =
          await acceptRiderOrder(
            orderId
          );
      } else if (
        newStatus === "PICKED_UP"
      ) {
        response =
          await pickupRiderOrder(
            orderId
          );
      } else if (
        newStatus ===
        "OUT_FOR_DELIVERY"
      ) {
        response =
          await startRiderDelivery(
            orderId
          );
      } else if (
        newStatus ===
        "COMPLETED"
      ) {
        response =
          await markRiderDelivered(
            orderId
          );
      }

      if (!response) {
        return;
      }

      if (
        newStatus === "COMPLETED"
      ) {
        await loadOrders();
        return;
      }

      const normalized =
        normalizeAssignment(
          response
        );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          String(order.id) ===
          String(id)
            ? {
                ...order,
                ...normalized,
                status:
                  normalized.status ||
                  newStatus,
              }
            : order
        )
      );
    } catch (actionError) {
      console.error(
        "Rider order action failed:",
        actionError
      );

      alert(
        actionError?.message ||
          "Unable to update order."
      );
    }
  };

  const filteredOrders =
    filter === "ALL"
      ? orders
      : orders.filter((order) => order.status === filter);

  const totalOrders = orders.length;

  const completedOrders = orders.filter(
    (order) => order.status === "COMPLETED"
  ).length;

  const activeOrders = orders.filter(
    (order) =>
      order.status === "ACCEPTED" ||
      order.status === "PICKED_UP" ||
      order.status === "OUT_FOR_DELIVERY"
  ).length;

  const totalEarnings = orders
    .filter((order) => order.status === "COMPLETED")
    .reduce((total, order) => total + order.earning, 0);

  const getStatusLabel = (status) => {
    switch (status) {
      case "NEW":
        return t("statusNew");
      case "ACCEPTED":
        return t("statusAccepted");
      case "PICKED_UP":
        return t("statusPicked");
      case "OUT_FOR_DELIVERY":
        return t("delivery");
      case "COMPLETED":
        return t("statusCompleted");
      default:
        return status;
    }
  };

  return (
    <section className="orders-page">
      {/* PAGE HEADER */}
      <div className="orders-page-header">
        <div>
          <div className="orders-label">
            <span>🚚</span>
            {t("riderOrders")}
          </div>

          <h1>{t("myOrders")}</h1>

          <p>{t("manageTrack")}</p>
        </div>

        <div className="orders-header-icon">📦</div>
      </div>

      {/* STATS */}
      <div className="orders-stats">
        <div className="order-stat-card">
          <div className="stat-icon orange">📦</div>

          <div>
            <span>{t("totalOrders")}</span>
            <strong>{totalOrders}</strong>
          </div>
        </div>

        <div className="order-stat-card">
          <div className="stat-icon blue">🚚</div>

          <div>
            <span>{t("active")}</span>
            <strong>{activeOrders}</strong>
          </div>
        </div>

        <div className="order-stat-card">
          <div className="stat-icon green">✓</div>

          <div>
            <span>{t("completed")}</span>
            <strong>{completedOrders}</strong>
          </div>
        </div>

        <div className="order-stat-card">
          <div className="stat-icon purple">₹</div>

          <div>
            <span>{t("totalEarned")}</span>
            <strong>₹{totalEarnings}</strong>
          </div>
        </div>
      </div>

      {/* FILTER */}
      <div className="orders-toolbar">
        <div>
          <h2>{t("deliveryHistory")}</h2>
          <p>{t("assignedOrders")}</p>
        </div>

        <div className="order-filters">
          <button
            className={filter === "ALL" ? "active" : ""}
            onClick={() => setFilter("ALL")}
          >
            {t("all")}
          </button>

          <button
            className={filter === "NEW" ? "active" : ""}
            onClick={() => setFilter("NEW")}
          >
            {t("new")}
          </button>

          <button
            className={filter === "ACCEPTED" ? "active" : ""}
            onClick={() => setFilter("ACCEPTED")}
          >
            {t("accepted")}
          </button>

          <button
            className={filter === "PICKED_UP" ? "active" : ""}
            onClick={() => setFilter("PICKED_UP")}
          >
            {t("pickedUp")}
          </button>

          <button
            className={
              filter === "OUT_FOR_DELIVERY"
                ? "active"
                : ""
            }
            onClick={() =>
              setFilter("OUT_FOR_DELIVERY")
            }
          >
            {t("delivery")}
          </button>

          <button
            className={
              filter === "COMPLETED" ? "active" : ""
            }
            onClick={() => setFilter("COMPLETED")}
          >
            {t("completed")}
          </button>
        </div>
      </div>

      {/* ORDERS */}
      <div className="orders-list">
        {loading ? (
          <div className="orders-empty">
            <div className="empty-icon">⏳</div>
            <h3>Loading orders...</h3>
            <p>Please wait while your delivery history is loaded.</p>
          </div>
        ) : error && filteredOrders.length === 0 ? (
          <div className="orders-empty">
            <div className="empty-icon">ℹ️</div>
            <h3>{error}</h3>
            <p>{t("noOrdersCategory")}</p>
            <button onClick={loadOrders}>
              {t("viewAllOrders")}
            </button>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="orders-empty">
            <div className="empty-icon">📦</div>

            <h3>{t("noOrders")}</h3>

            <p>{t("noOrdersCategory")}</p>

            <button onClick={() => setFilter("ALL")}>
              {t("viewAllOrders")}
            </button>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              className={`order-card ${
                order.status === "NEW"
                  ? "new-order-card"
                  : ""
              }`}
              key={order.id}
            >
              {/* TOP */}
              <div className="order-top">
                <div>
                  <span className="order-id">
                    #{order.id}
                  </span>

                  <h3>{order.restaurant}</h3>

                  <p className="customer-name">
                    👤 {order.customer}
                  </p>
                </div>

                <span
                  className={`order-status status-${order.status.toLowerCase()}`}
                >
                  {getStatusLabel(order.status)}
                </span>
              </div>

              {/* INFO */}
              <div className="order-info-row">
                <div className="order-info">
                  <span className="info-icon">💰</span>

                  <div>
                    <small>{t("orderValue")}</small>
                    <strong>₹{order.amount}</strong>
                  </div>
                </div>

                <div className="order-info earning-info">
                  <span className="info-icon">🛵</span>

                  <div>
                    <small>{t("yourEarning")}</small>
                    <strong>₹{order.earning}</strong>
                  </div>
                </div>

                <div className="order-info">
                  <span className="info-icon">📍</span>

                  <div>
                    <small>{t("totalDistance")}</small>
                    <strong>{order.distance}</strong>
                  </div>
                </div>

                <div className="order-info">
                  <span className="info-icon">🕐</span>

                  <div>
                    <small>{t("received")}</small>
                    <strong>{order.time}</strong>
                  </div>
                </div>
              </div>

              {/* ROUTE */}
              <div className="order-route">
                <div className="route-item">
                  <span className="route-dot pickup-dot">
                    P
                  </span>

                  <div>
                    <small>{t("pickup")}</small>
                    <p>{order.pickup}</p>
                  </div>
                </div>

                <div className="route-line"></div>

                <div className="route-item">
                  <span className="route-dot delivery-dot">
                    D
                  </span>

                  <div>
                    <small>{t("deliveryLocation")}</small>
                    <p>{order.delivery}</p>
                  </div>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="order-actions">
                {order.status === "NEW" && (
                  <>
                    <button
                      className="accept-order-btn"
                      onClick={() =>
                        updateOrderStatus(
                          order.id,
                          "ACCEPTED"
                        )
                      }
                    >
                      {t("acceptOrder")}
                    </button>

                    <button className="secondary-order-btn">
                      {t("viewDetails")}
                    </button>
                  </>
                )}

                {order.status === "ACCEPTED" && (
                  <>
                    <button
                      className="pickup-order-btn"
                      onClick={() =>
                        updateOrderStatus(
                          order.id,
                          "PICKED_UP"
                        )
                      }
                    >
                      {t("pickupOrder")}
                    </button>

                    <button className="secondary-order-btn">
                      {t("navigation")}
                    </button>
                  </>
                )}

                {order.status === "PICKED_UP" && (
                  <>
                    <button
                      className="delivery-order-btn"
                      onClick={() =>
                        updateOrderStatus(
                          order.id,
                          "OUT_FOR_DELIVERY"
                        )
                      }
                    >
                      {t("startDelivery")}
                    </button>

                    <button className="secondary-order-btn">
                      {t("customerDetails")}
                    </button>
                  </>
                )}

                {order.status === "OUT_FOR_DELIVERY" && (
                  <>
                    <button
                      className="complete-order-btn"
                      onClick={() =>
                        updateOrderStatus(
                          order.id,
                          "COMPLETED"
                        )
                      }
                    >
                      {t("markDelivered")}
                    </button>

                    <button className="secondary-order-btn">
                      {t("callCustomer")}
                    </button>
                  </>
                )}

                {order.status === "COMPLETED" && (
                  <div className="completed-message">
                    <span>✓</span>

                    <div>
                      <strong>
                        {t("deliveryCompleted")}
                      </strong>

                      <small>
                        ₹{order.earning}{" "}
                        {t("addedToEarnings")}
                      </small>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* BOTTOM MESSAGE */}
      <div className="orders-footer-card">
        <div className="footer-icon">⚡</div>

        <div>
          <h3>{t("keepDelivering")}</h3>

          <p>{t("footerText")}</p>
        </div>
      </div>
    </section>
  );
}

export default Orders;