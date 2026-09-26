import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "./LanguageContext";
import {
  getRiderEarnings,
  getRiderDeliveryHistory,
  getRiderOrder,
} from "./api";
import "./Earnings.css";

// MaxiGo rider payout rule:
// 1–3 KM = minimum ₹30
// 4 KM = ₹40, 5 KM = ₹50, 10 KM = ₹100
// Formula: MAX(₹30, distance × ₹10)
const calculateRiderPayout = (item) => {
  const storeLat = Number(
    item?.storeLatitude ?? item?.store?.latitude
  );
  const storeLng = Number(
    item?.storeLongitude ?? item?.store?.longitude
  );
  const customerLat = Number(
    item?.deliveryLatitude ??
      item?.deliveryAddress?.latitude
  );
  const customerLng = Number(
    item?.deliveryLongitude ??
      item?.deliveryAddress?.longitude
  );

  if (
    !Number.isFinite(storeLat) ||
    !Number.isFinite(storeLng) ||
    !Number.isFinite(customerLat) ||
    !Number.isFinite(customerLng)
  ) {
    return 30;
  }

  const toRadians = (value) =>
    (value * Math.PI) / 180;

  const earthRadiusKm = 6371;

  const latDistance = toRadians(
    customerLat - storeLat
  );
  const lonDistance = toRadians(
    customerLng - storeLng
  );

  const a =
    Math.sin(latDistance / 2) ** 2 +
    Math.cos(toRadians(storeLat)) *
      Math.cos(toRadians(customerLat)) *
      Math.sin(lonDistance / 2) ** 2;

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  const distanceKm =
    earthRadiusKm * c;

  return Number(
    Math.max(
      30,
      distanceKm * 10
    ).toFixed(2)
  );
};

const calculateDistanceKm = (item) => {
  const storeLat = Number(
    item?.storeLatitude ?? item?.store?.latitude
  );
  const storeLng = Number(
    item?.storeLongitude ?? item?.store?.longitude
  );
  const customerLat = Number(
    item?.deliveryLatitude ??
      item?.deliveryAddress?.latitude
  );
  const customerLng = Number(
    item?.deliveryLongitude ??
      item?.deliveryAddress?.longitude
  );

  if (
    !Number.isFinite(storeLat) ||
    !Number.isFinite(storeLng) ||
    !Number.isFinite(customerLat) ||
    !Number.isFinite(customerLng)
  ) {
    return 0;
  }

  const toRadians = (value) =>
    (value * Math.PI) / 180;

  const latDistance = toRadians(
    customerLat - storeLat
  );
  const lonDistance = toRadians(
    customerLng - storeLng
  );

  const a =
    Math.sin(latDistance / 2) ** 2 +
    Math.cos(toRadians(storeLat)) *
      Math.cos(toRadians(customerLat)) *
      Math.sin(lonDistance / 2) ** 2;

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return 6371 * c;
};

function Earnings({ onBack }) {
  const { t } = useLanguage();

  const [period, setPeriod] = useState("week");

  const uiText = {
    en: {
      earnings: "Earnings",
      trackDeliveryEarnings: "Track your delivery earnings",
      thisWeek: "This Week",
      thisMonth: "This Month",
      thisWeeksEarnings: "This Week's Earnings",
      thisMonthsEarnings: "This Month's Earnings",
      comparedToLastPeriod: "compared to last period",
      completedDeliveries: "Completed Deliveries",
      totalDistance: "Total Distance",
      onlineHours: "Online Hours",
      earningsOverview: "Earnings Overview",
      earningsPerformance: "Your earnings performance",
      earningsBreakdown: "Earnings Breakdown",
      whereMoneyCameFrom: "Where your money came from",
      deliveryEarnings: "Delivery Earnings",
      incentivesBonus: "Incentives & Bonus",
      surgeExtraPay: "Surge / Extra Pay",
      totalEarnings: "Total Earnings",
      nextPayout: "Next Payout",
      earningsTransferredAutomatically: "Your earnings will be transferred automatically.",
      expectedPayout: "Expected payout",
      recentEarnings: "Recent Earnings",
      latestCompletedDeliveries: "Your latest completed deliveries",
      viewAll: "View All",
      completed: "Completed",
      keepDelivering: "Keep delivering to earn more!",
      viewIncentives: "View Incentives →",
      viewBankDetails: "View Bank Details →",
      completedDeliveriesCount: "42 completed deliveries",
      weeklyPerformanceBonus: "Weekly performance bonus",
      highDemandDeliveries: "High demand deliveries",
      today: "Today",
    },
    hi: {
      earnings: "कमाई",
      trackDeliveryEarnings: "अपनी डिलीवरी कमाई देखें",
      thisWeek: "इस सप्ताह",
      thisMonth: "इस महीने",
      thisWeeksEarnings: "इस सप्ताह की कमाई",
      thisMonthsEarnings: "इस महीने की कमाई",
      comparedToLastPeriod: "पिछली अवधि की तुलना में",
      completedDeliveries: "पूरी की गई डिलीवरी",
      totalDistance: "कुल दूरी",
      onlineHours: "ऑनलाइन घंटे",
      earningsOverview: "कमाई का अवलोकन",
      earningsPerformance: "आपकी कमाई का प्रदर्शन",
      earningsBreakdown: "कमाई का विवरण",
      whereMoneyCameFrom: "आपकी कमाई कहाँ से हुई",
      deliveryEarnings: "डिलीवरी कमाई",
      incentivesBonus: "इंसेंटिव और बोनस",
      surgeExtraPay: "सर्ज / अतिरिक्त भुगतान",
      totalEarnings: "कुल कमाई",
      nextPayout: "अगला भुगतान",
      earningsTransferredAutomatically: "आपकी कमाई अपने आप ट्रांसफर की जाएगी।",
      expectedPayout: "अनुमानित भुगतान",
      recentEarnings: "हाल की कमाई",
      latestCompletedDeliveries: "आपकी हाल की पूरी की गई डिलीवरी",
      viewAll: "सभी देखें",
      completed: "पूर्ण",
      keepDelivering: "ज्यादा कमाने के लिए डिलीवरी करते रहें!",
      viewIncentives: "इंसेंटिव देखें →",
      viewBankDetails: "बैंक विवरण देखें →",
      completedDeliveriesCount: "42 पूरी की गई डिलीवरी",
      weeklyPerformanceBonus: "साप्ताहिक प्रदर्शन बोनस",
      highDemandDeliveries: "अधिक मांग वाली डिलीवरी",
      today: "आज",
    },
    mr: {
      earnings: "कमाई",
      trackDeliveryEarnings: "तुमची डिलिव्हरी कमाई पहा",
      thisWeek: "या आठवड्यात",
      thisMonth: "या महिन्यात",
      thisWeeksEarnings: "या आठवड्याची कमाई",
      thisMonthsEarnings: "या महिन्याची कमाई",
      comparedToLastPeriod: "मागील कालावधीच्या तुलनेत",
      completedDeliveries: "पूर्ण केलेल्या डिलिव्हरी",
      totalDistance: "एकूण अंतर",
      onlineHours: "ऑनलाइन तास",
      earningsOverview: "कमाईचा आढावा",
      earningsPerformance: "तुमच्या कमाईची कामगिरी",
      earningsBreakdown: "कमाईचा तपशील",
      whereMoneyCameFrom: "तुमची कमाई कुठून झाली",
      deliveryEarnings: "डिलिव्हरी कमाई",
      incentivesBonus: "इन्सेंटिव्ह आणि बोनस",
      surgeExtraPay: "सर्ज / अतिरिक्त पेमेंट",
      totalEarnings: "एकूण कमाई",
      nextPayout: "पुढील पेमेंट",
      earningsTransferredAutomatically: "तुमची कमाई आपोआप ट्रान्सफर केली जाईल.",
      expectedPayout: "अपेक्षित पेमेंट",
      recentEarnings: "अलीकडची कमाई",
      latestCompletedDeliveries: "तुमच्या अलीकडील पूर्ण झालेल्या डिलिव्हरी",
      viewAll: "सर्व पहा",
      completed: "पूर्ण",
      keepDelivering: "जास्त कमाई करण्यासाठी डिलिव्हरी करत रहा!",
      viewIncentives: "इन्सेंटिव्ह पहा →",
      viewBankDetails: "बँक तपशील पहा →",
      completedDeliveriesCount: "42 पूर्ण केलेल्या डिलिव्हरी",
      weeklyPerformanceBonus: "साप्ताहिक कामगिरी बोनस",
      highDemandDeliveries: "जास्त मागणीच्या डिलिव्हरी",
      today: "आज",
    },
  };

  const languageKey = localStorage.getItem("maxigoRiderLanguage") || "en";
  const tx = (key) =>
    uiText[languageKey]?.[key] || uiText.en[key] || key;

  // Use the central language context when available; fallback here keeps
  // Earnings working even before every translation key is added globally.
  const translate = (key) => {
    const contextText = t(key);
    return contextText === key ? tx(key) : contextText;
  };

  const [earningsData, setEarningsData] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadEarnings = async () => {
      setLoading(true);

      try {
        const [
          earningsResponse,
          historyResponse,
        ] = await Promise.all([
          getRiderEarnings(),
          getRiderDeliveryHistory(),
        ]);

        const historyList =
          Array.isArray(historyResponse)
            ? historyResponse
            : [];

        const detailedHistory =
          await Promise.all(
            historyList.map(async (item) => {
              const orderId =
                item?.orderId;

              if (!orderId) {
                return {
                  ...item,
                  riderEarning: 0,
                };
              }

              try {
                const details =
                  await getRiderOrder(
                    orderId
                  );

                const riderEarning =
                  calculateRiderPayout(
                    details
                  );

                return {
                  ...item,
                  ...details,
                  riderEarning,
                };
              } catch (detailError) {
                return {
                  ...item,
                  riderEarning: 30,
                };
              }
            })
          );

        if (!cancelled) {
          setEarningsData(
            earningsResponse || null
          );

          setHistory(
            detailedHistory
          );
        }
      } catch (error) {
        console.error(
          "Rider earnings API error:",
          error
        );

        if (!cancelled) {
          setEarningsData(null);
          setHistory([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadEarnings();

    return () => {
      cancelled = true;
    };
  }, []);

  const getOrderDate = (item) => {
    const value =
      item?.deliveredAt ||
      item?.assignedAt ||
      item?.updatedAt ||
      item?.placedAt;

    if (!value) {
      return null;
    }

    const date =
      new Date(value);

    return Number.isNaN(
      date.getTime()
    )
      ? null
      : date;
  };

  const startOfCurrentWeek = useMemo(() => {
    const today = new Date();
    const day = today.getDay();
    const diff =
      day === 0 ? -6 : 1 - day;

    const result =
      new Date(today);

    result.setHours(
      0,
      0,
      0,
      0
    );

    result.setDate(
      today.getDate() + diff
    );

    return result;
  }, []);

  const weeklyData = useMemo(() => {
    const result = [];

    const labels = [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun",
    ];

    for (let index = 0; index < 7; index++) {
      const day =
        new Date(
          startOfCurrentWeek
        );

      day.setDate(
        startOfCurrentWeek.getDate() +
          index
      );

      const nextDay =
        new Date(day);

      nextDay.setDate(
        day.getDate() + 1
      );

      const amount =
        history
          .filter((item) => {
            const orderDate =
              getOrderDate(item);

            return (
              orderDate &&
              orderDate >= day &&
              orderDate < nextDay &&
              String(
                item.deliveryStatus ||
                  item.orderStatus ||
                  ""
              ).toUpperCase() ===
                "DELIVERED"
            );
          })
          .reduce(
            (sum, item) =>
              sum +
              Number(
                item.riderEarning ||
                  0
              ),
            0
          );

      result.push({
        day: labels[index],
        amount,
      });
    }

    return result;
  }, [
    history,
    startOfCurrentWeek,
  ]);

  const monthlyData = useMemo(() => {
    const result = [];

    for (let index = 0; index < 4; index++) {
      const startDay =
        index === 0
          ? 1
          : index * 7 + 1;

      const endDay =
        index === 3
          ? 32
          : index * 7 + 8;

      const amount =
        history
          .filter((item) => {
            const orderDate =
              getOrderDate(item);

            if (!orderDate) {
              return false;
            }

            const current =
              new Date();

            return (
              orderDate.getFullYear() ===
                current.getFullYear() &&
              orderDate.getMonth() ===
                current.getMonth() &&
              orderDate.getDate() >=
                startDay &&
              orderDate.getDate() <
                endDay &&
              String(
                item.deliveryStatus ||
                  item.orderStatus ||
                  ""
              ).toUpperCase() ===
                "DELIVERED"
            );
          })
          .reduce(
            (sum, item) =>
              sum +
              Number(
                item.riderEarning ||
                  0
              ),
            0
          );

      result.push({
        day: `Week ${index + 1}`,
        amount,
      });
    }

    return result;
  }, [history]);

  const data =
    period === "week"
      ? weeklyData
      : monthlyData;

  const periodTotalEarnings =
    data.reduce(
      (sum, item) =>
        sum + Number(item.amount || 0),
      0
    );

  const backendTotalEarnings =
    Number(
      earningsData?.totalEarnings || 0
    );

  const totalEarnings =
    backendTotalEarnings > 0
      ? backendTotalEarnings
      : periodTotalEarnings;

  const completedDeliveries =
    history.filter(
      (historyItem) => {
        const orderDate =
          getOrderDate(
            historyItem
          );

        if (!orderDate) {
          return false;
        }

        const current =
          new Date();

        const isDelivered =
          String(
            historyItem.deliveryStatus ||
              historyItem.orderStatus ||
              ""
          ).toUpperCase() ===
          "DELIVERED";

        if (!isDelivered) {
          return false;
        }

        if (period === "week") {
          const monday =
            new Date(
              startOfCurrentWeek
            );

          const nextMonday =
            new Date(monday);

          nextMonday.setDate(
            monday.getDate() + 7
          );

          return (
            orderDate >= monday &&
            orderDate < nextMonday
          );
        }

        return (
          orderDate.getFullYear() ===
            current.getFullYear() &&
          orderDate.getMonth() ===
            current.getMonth()
        );
      }
    ).length;

  const maxAmount = Math.max(
    ...data.map(
      (item) => item.amount
    ),
    0
  );

  const recentHistory =
    history
      .filter(
        (item) =>
          String(
            item.deliveryStatus ||
              item.orderStatus ||
              ""
          ).toUpperCase() ===
          "DELIVERED"
      )
      .slice(0, 4);

  // Real distance available from the store's exact coordinates
  // to the customer's exact delivery coordinates for completed orders.
  const totalDistanceKm = useMemo(() => {
    return history
      .filter(
        (item) =>
          String(
            item?.deliveryStatus ||
              item?.orderStatus ||
              ""
          ).toUpperCase() === "DELIVERED"
      )
      .reduce(
        (sum, item) =>
          sum + calculateDistanceKm(item),
        0
      );
  }, [history]);

  // LIVE ONLINE TIME
  // Updates every second so the current online session keeps counting
  // without needing to refresh the Earnings page.
  const [liveNow, setLiveNow] = useState(Date.now());
  const [onlineSince, setOnlineSince] = useState(
    Number(
      localStorage.getItem(
        "maxigoRiderOnlineSince"
      )
    ) || 0
  );
  const [isCurrentlyOnline, setIsCurrentlyOnline] =
    useState(
      String(
        localStorage.getItem(
          "maxigoRiderAvailabilityStatus"
        ) || ""
      ).toUpperCase() === "ONLINE"
    );

  useEffect(() => {
    const updateLiveOnlineTime = () => {
      const status = String(
        localStorage.getItem(
          "maxigoRiderAvailabilityStatus"
        ) || ""
      ).toUpperCase();

      let since =
        Number(
          localStorage.getItem(
            "maxigoRiderOnlineSince"
          )
        ) || 0;

      // Safety fallback: if rider is ONLINE but the start timestamp is
      // missing, start a new live session from the current time.
      if (status === "ONLINE" && since <= 0) {
        since = Date.now();
        localStorage.setItem(
          "maxigoRiderOnlineSince",
          String(since)
        );
      }

      setLiveNow(Date.now());
      setOnlineSince(since);
      setIsCurrentlyOnline(status === "ONLINE");
    };

    updateLiveOnlineTime();

    const timer = setInterval(
      updateLiveOnlineTime,
      1000
    );

    return () => clearInterval(timer);
  }, []);

  const liveOnlineHours =
    isCurrentlyOnline && onlineSince > 0
      ? Math.max(
          0,
          (liveNow - onlineSince) /
            3600000
        )
      : 0;

  const formatHours = (hours) => {
    const totalMinutes = Math.floor(
      hours * 60
    );

    const h = Math.floor(
      totalMinutes / 60
    );

    const m = totalMinutes % 60;

    return `${h}h ${m}m`;
  };

  const formatHistoryTime = (
    item
  ) => {
    const date =
      getOrderDate(item);

    if (!date) {
      return "—";
    }

    return date.toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  return (
    <div className="earnings-page">

      {/* ================= HEADER ================= */}

      <div className="earnings-top">

        <div className="earnings-title">

          {onBack && (
            <button
              className="earnings-back"
              onClick={onBack}
            >
              ←
            </button>
          )}

          <div>
            <h1>{translate("earnings")}</h1>
            <p>
              Track your delivery earnings
            </p>
          </div>

        </div>

        <div className="earning-period">

          <button
            className={
              period === "week"
                ? "period-active"
                : ""
            }
            onClick={() => setPeriod("week")}
          >
            This Week
          </button>

          <button
            className={
              period === "month"
                ? "period-active"
                : ""
            }
            onClick={() => setPeriod("month")}
          >
            This Month
          </button>

        </div>

      </div>

      {/* ================= HERO ================= */}

      <div className="earning-hero">

        <div className="hero-left">

          <span>
            {period === "week"
              ? translate("thisWeeksEarnings")
              : translate("thisMonthsEarnings")}
          </span>

          <h2>
            ₹{periodTotalEarnings.toLocaleString("en-IN")}
          </h2>

          <div className="growth-badge">
            ↑ 12.8%
            <small>
              compared to last period
            </small>
          </div>

        </div>

        <div className="hero-money">
          ₹
        </div>

      </div>

      {/* ================= STAT CARDS ================= */}

      <div className="earning-stats">

        <div className="earning-stat-card">

          <div className="stat-icon orange">
            📦
          </div>

          <div>
            <span>
              {translate("completedDeliveries")}
            </span>

            <strong>
              {completedDeliveries}
            </strong>

            <small>
              {loading ? "..." : ""}
            </small>
          </div>

        </div>

        <div className="earning-stat-card">

          <div className="stat-icon blue">
            🛵
          </div>

          <div>
            <span>
              {translate("totalDistance")}
            </span>

            <strong>
              {totalDistanceKm.toFixed(2)} km
            </strong>

            <small>
              Store → Customer
            </small>
          </div>

        </div>

        <div className="earning-stat-card">

          <div className="stat-icon green">
            ⏱️
          </div>

          <div>
            <span>
              {translate("onlineHours")}
            </span>

            <strong>
              {formatHours(liveOnlineHours)}
            </strong>

            <small>
              Live online session
            </small>
          </div>

        </div>

      </div>

      {/* ================= CHART ================= */}

      <div className="earning-section chart-section">

        <div className="section-heading">

          <div>
            <h2>
              {translate("earningsOverview")}
            </h2>

            <p>
              {translate("earningsPerformance")}
            </p>
          </div>

          <div className="chart-total">
            ₹{periodTotalEarnings.toLocaleString("en-IN")}
          </div>

        </div>

        <div className="bar-chart">

          {data.map((item, index) => {

            const height =
              maxAmount === 0
                ? 0
                : (item.amount / maxAmount) * 100;

            return (
              <div
                className="chart-column"
                key={item.day}
              >

                <div className="bar-value">
                  {item.amount > 0
                    ? `₹${item.amount}`
                    : "—"}
                </div>

                <div className="bar-wrapper">

                  <div
                    className={
                      index ===
                      data.length - 2
                        ? "earning-bar highlighted"
                        : "earning-bar"
                    }
                    style={{
                      height: `${height}%`,
                    }}
                  ></div>

                </div>

                <span>
                  {item.day}
                </span>

              </div>
            );
          })}

        </div>

      </div>

      {/* ================= BREAKDOWN ================= */}

      <div className="earning-grid">

        {/* DELIVERY EARNINGS */}

        <div className="earning-section">

          <div className="section-heading">

            <div>
              <h2>
                {translate("earningsBreakdown")}
              </h2>

              <p>
                {translate("whereMoneyCameFrom")}
              </p>
            </div>

          </div>

          <div className="breakdown-list">

            <div className="breakdown-row">

              <div className="breakdown-info">

                <div className="breakdown-icon">
                  🛵
                </div>

                <div>
                  <strong>
                    {translate("deliveryEarnings")}
                  </strong>

                  <span>
                    {
                      completedDeliveries === 1
                        ? "1 completed delivery"
                        : `${completedDeliveries} completed deliveries`
                    }
                  </span>
                </div>

              </div>

              <strong className="amount">
                ₹{periodTotalEarnings.toLocaleString("en-IN")}
              </strong>

            </div>

            <div className="breakdown-row">

              <div className="breakdown-info">

                <div className="breakdown-icon">
                  🎁
                </div>

                <div>
                  <strong>
                    {translate("incentivesBonus")}
                  </strong>

                  <span>
                    {translate("weeklyPerformanceBonus")}
                  </span>
                </div>

              </div>

              <strong className="amount">
                ₹0
              </strong>

            </div>

            <div className="breakdown-row">

              <div className="breakdown-info">

                <div className="breakdown-icon">
                  💡
                </div>

                <div>
                  <strong>
                    {translate("surgeExtraPay")}
                  </strong>

                  <span>
                    {translate("highDemandDeliveries")}
                  </span>
                </div>

              </div>

              <strong className="amount">
                ₹0
              </strong>

            </div>

          </div>

          <div className="breakdown-total">

            <span>
              {translate("totalEarnings")}
            </span>

            <strong>
              ₹{periodTotalEarnings.toLocaleString("en-IN")}
            </strong>

          </div>

        </div>

        {/* PAYOUT */}

        <div className="earning-section payout-section">

          <div className="section-heading">

            <div>
              <h2>
                {translate("nextPayout")}
              </h2>

              <p>
                {translate("earningsTransferredAutomatically")}
              </p>
            </div>

            <div className="payout-icon">
              🏦
            </div>

          </div>

          <div className="payout-amount">
            ₹—
          </div>

          <div className="payout-date">
            📅 {translate("expectedPayout")}
            <strong>
              —
            </strong>
          </div>

          <div className="bank-preview">

            <div className="bank-logo">
              🏦
            </div>

            <div>

              <strong>
                Bank Account
              </strong>

              <span>
                •••• •••• 4521
              </span>

            </div>

            <span className="verified">
              ✓
            </span>

          </div>

          <button className="view-bank">
            {translate("viewBankDetails")}
          </button>

        </div>

      </div>

      {/* ================= RECENT HISTORY ================= */}

      <div className="earning-section history-section">

        <div className="section-heading">

          <div>
            <h2>
              {translate("recentEarnings")}
            </h2>

            <p>
              {translate("latestCompletedDeliveries")}
            </p>
          </div>

          <button className="view-all">
            {translate("viewAll")}
          </button>

        </div>

        <div className="history-list">

          {recentHistory.length === 0 ? (
            <div className="history-row">
              <div className="history-order">
                <div className="history-icon">
                  📦
                </div>

                <div>
                  <strong>
                    {loading
                      ? "Loading..."
                      : "No completed deliveries"}
                  </strong>

                  <span>
                    {loading
                      ? ""
                      : translate("keepDelivering")}
                  </span>
                </div>
              </div>

              <div className="history-right">
                <span className="completed">
                  —
                </span>
              </div>
            </div>
          ) : (
            recentHistory.map(
              (item) => (
                <div
                  className="history-row"
                  key={
                    item.assignmentId ||
                    item.orderId
                  }
                >

                  <div className="history-order">

                    <div className="history-icon">
                      📦
                    </div>

                    <div>
                      <strong>
                        Order #
                        {item.orderNumber ||
                          item.orderId}
                      </strong>

                      <span>
                        {formatHistoryTime(
                          item
                        )}
                      </span>
                    </div>

                  </div>

                  <div className="history-right">

                    <strong>
                      +₹
                      {Number(
                        item.riderEarning ||
                          0
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </strong>

                    <span className="completed">
                      {translate("completed")}
                    </span>

                  </div>

                </div>
              )
            )
          )}

        </div>

      </div>

      {/* ================= TIP ================= */}

      <div className="earning-tip">

        <div className="tip-icon">
          💡
        </div>

        <div>
          <strong>
            {translate("keepDelivering")}
          </strong>

          <p>
            {translate("keepDelivering")}
          </p>
        </div>

        <button>
          {translate("viewIncentives")}
        </button>

      </div>

    </div>
  );
}

export default Earnings;
