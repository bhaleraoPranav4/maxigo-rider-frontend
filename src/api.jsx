const BASE_URL = "https://api.maxigo.in/api";

const TOKEN_KEY = "maxigoRiderToken";
const USER_KEY = "maxigoRiderUser";


// =========================================================
// RIDER AUTH STORAGE
// =========================================================

export const getRiderToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};


export const getStoredRider = () => {
  try {
    const user = localStorage.getItem(USER_KEY);

    return user ? JSON.parse(user) : null;

  } catch (error) {

    console.error(
      "Failed to read rider user:",
      error
    );

    return null;
  }
};


export const saveRiderAuth = (response) => {

  if (response?.token) {

    localStorage.setItem(
      TOKEN_KEY,
      response.token
    );
  }

  const riderUser = {

    userId:
      response?.userId ?? null,

    name:
      response?.name ?? "",

    mobile:
      response?.mobile ?? "",

    role:
      response?.role ?? "RIDER",
  };

  localStorage.setItem(
    USER_KEY,
    JSON.stringify(riderUser)
  );
};


export const clearRiderAuth = () => {

  localStorage.removeItem(
    TOKEN_KEY
  );

  localStorage.removeItem(
    USER_KEY
  );
};


export const isRiderLoggedIn = () => {

  return Boolean(
    getRiderToken()
  );
};


// =========================================================
// COMMON API REQUEST
// =========================================================

export const apiRequest = async (
  endpoint,
  options = {}
) => {

  const token =
    getRiderToken();


  // =======================================================
  // SKIP AUTH OPTION
  // Login/Register सारख्या public APIs साठी
  // =======================================================

  const {
    skipAuth = false,
    ...fetchOptions
  } = options;


  const headers = {
    ...(fetchOptions.headers || {}),
  };


  // =======================================================
  // JSON CONTENT TYPE
  // =======================================================

  if (
    !(fetchOptions.body instanceof FormData) &&
    fetchOptions.body !== undefined
  ) {

    headers["Content-Type"] =
      "application/json";
  }


  // =======================================================
  // JWT
  // Login/Register ला जुना token पाठवायचा नाही
  // =======================================================

  if (
    token &&
    !skipAuth
  ) {

    headers["Authorization"] =
      `Bearer ${token}`;
  }


  // =======================================================
  // FETCH
  // =======================================================

  let response;


  try {

    response = await fetch(
      `${BASE_URL}${endpoint}`,
      {
        ...fetchOptions,
        headers,
      }
    );

  } catch (error) {

    console.error(
      "API Connection Error:",
      error
    );

    throw new Error(
      "Unable to connect to MaxiGo backend. Please make sure Spring Boot is running on port 8080."
    );
  }


  // =======================================================
  // RESPONSE DATA
  // =======================================================

  let data = null;


  const contentType =
    response.headers.get(
      "content-type"
    ) || "";


  if (
    response.status !== 204
  ) {

    if (
      contentType.includes(
        "application/json"
      )
    ) {

      try {

        data =
          await response.json();

      } catch {

        data = null;
      }

    } else {

      try {

        data =
          await response.text();

      } catch {

        data = null;
      }
    }
  }


  // =======================================================
  // ERROR HANDLING
  // =======================================================

  if (!response.ok) {

    // Unauthorized झाल्यावर फक्त authenticated
    // request चा token clear करायचा

    if (
      response.status === 401 &&
      !skipAuth
    ) {

      clearRiderAuth();
    }


    let message =
      "Something went wrong.";


    if (
      typeof data === "string" &&
      data.trim()
    ) {

      message = data;

    } else if (
      data?.message
    ) {

      message =
        data.message;

    } else if (
      data?.error
    ) {

      message =
        data.error;
    }


    throw new Error(
      message
    );
  }


  return data;
};


// =========================================================
// RIDER REGISTER
// =========================================================

export const riderRegister =
  async (payload) => {

    return apiRequest(
      "/rider/register",
      {
        method: "POST",

        // Register public API आहे
        // म्हणून जुना JWT पाठवायचा नाही
        skipAuth: true,

        body:
          JSON.stringify(
            payload
          ),
      }
    );
  };


// =========================================================
// RIDER LOGIN
// =========================================================

export const riderLogin =
  async (
    mobile,
    pin
  ) => {

    const response =
      await apiRequest(
        "/rider/login",
        {
          method: "POST",

          // IMPORTANT:
          // Login public API आहे.
          // जुना JWT पाठवायचा नाही.
          skipAuth: true,

          body:
            JSON.stringify({
              mobile:
                mobile.trim(),

              password:
                pin,
            }),
        }
      );


    // =====================================================
    // SAVE NEW JWT + RIDER DATA
    // =====================================================

    saveRiderAuth(
      response
    );


    return response;
  };


// =========================================================
// RIDER PROFILE
// =========================================================

export const getRiderProfile =
  async () => {

    return apiRequest(
      "/rider/profile"
    );
  };


export const updateRiderProfile =
  async ({
    vehicleType,
    vehicleNumber,
    licenseNumber,
  }) => {

    const params =
      new URLSearchParams();


    if (
      vehicleType !== undefined
    ) {

      params.append(
        "vehicleType",
        vehicleType
      );
    }


    if (
      vehicleNumber !== undefined
    ) {

      params.append(
        "vehicleNumber",
        vehicleNumber
      );
    }


    if (
      licenseNumber !== undefined
    ) {

      params.append(
        "licenseNumber",
        licenseNumber
      );
    }


    return apiRequest(
      `/rider/profile?${params.toString()}`,
      {
        method: "PUT",
      }
    );
  };


export const deleteRiderProfile =
  async () => {

    return apiRequest(
      "/rider/profile",
      {
        method: "DELETE",
      }
    );
  };


// =========================================================
// RIDER AVAILABILITY
// =========================================================

export const updateRiderAvailability =
  async (status) => {

    return apiRequest(
      `/rider/availability?status=${encodeURIComponent(
        status
      )}`,
      {
        method: "PUT",
      }
    );
  };


// =========================================================
// RIDER LOCATION
// =========================================================

export const updateRiderLocation =
  async (
    latitude,
    longitude
  ) => {

    const params =
      new URLSearchParams();


    params.append(
      "latitude",
      latitude
    );


    params.append(
      "longitude",
      longitude
    );


    return apiRequest(
      `/rider/location?${params.toString()}`,
      {
        method: "PUT",
      }
    );
  };


// =========================================================
// RIDER DASHBOARD
// =========================================================

export const getRiderDashboard =
  async () => {

    return apiRequest(
      "/rider/dashboard"
    );
  };


export const getRiderEarnings =
  async () => {

    return apiRequest(
      "/rider/earnings"
    );
  };


export const getRiderDeliveryHistory =
  async () => {

    return apiRequest(
      "/rider/deliveries/history"
    );
  };


// =========================================================
// RIDER ORDERS
// =========================================================

export const getAvailableOrders =
  async () => {

    return apiRequest(
      "/rider/orders/available"
    );
  };


export const getMyOrders =
  async () => {

    return apiRequest(
      "/rider/orders/my"
    );
  };


export const getActiveOrders =
  async () => {

    return apiRequest(
      "/rider/orders/active"
    );
  };


export const getRiderOrder =
  async (orderId) => {

    return apiRequest(
      `/rider/orders/${orderId}`
    );
  };


// =========================================================
// DELIVERY ASSIGNMENTS
// =========================================================

export const getRiderAssignments =
  async () => {

    return apiRequest(
      "/rider/assignments"
    );
  };


export const getRiderActiveAssignments =
  async () => {

    return apiRequest(
      "/rider/assignments/active"
    );
  };


export const getRiderAssignmentByOrder =
  async (orderId) => {

    return apiRequest(
      `/rider/assignments/order/${orderId}`
    );
  };


// =========================================================
// DELIVERY ACTIONS
// =========================================================

export const acceptRiderOrder =
  async (orderId) => {

    return apiRequest(
      `/rider/assignments/order/${orderId}/accept`,
      {
        method: "PUT",
      }
    );
  };


export const pickupRiderOrder =
  async (orderId, latitude, longitude) => {

    const params =
      new URLSearchParams({
        latitude: String(latitude),
        longitude: String(longitude),
      });

    return apiRequest(
      `/rider/assignments/order/${orderId}/pickup?${params.toString()}`,
      {
        method: "PUT",
      }
    );
  };


export const startRiderDelivery =
  async (orderId) => {

    return apiRequest(
      `/rider/assignments/order/${orderId}/start-delivery`,
      {
        method: "PUT",
      }
    );
  };


export const markRiderDelivered =
  async (orderId, latitude, longitude) => {

    const params =
      new URLSearchParams({
        latitude: String(latitude),
        longitude: String(longitude),
      });

    return apiRequest(
      `/rider/assignments/order/${orderId}/delivered?${params.toString()}`,
      {
        method: "PUT",
      }
    );
  };