// type is 'success' or 'error'
const $161e2f81030591bc$export$516836c6a9dfc573 = ()=>{
    const el = document.querySelector(".alert");
    if (el) el.parentElement.removeChild(el);
};
const $161e2f81030591bc$export$de026b00723010c1 = (type, msg, time = 5)=>{
    $161e2f81030591bc$export$516836c6a9dfc573();
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
    setTimeout($161e2f81030591bc$export$516836c6a9dfc573, time * 1000);
};


const $d77c3630eda1238d$export$7200a869094fec36 = async ({ name: name , email: email , password: password , passwordConfirm: passwordConfirm  })=>{
    try {
        const res = await fetch("/api/v1/users/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                passwordConfirm: passwordConfirm
            })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        if (data.status === "success") {
            (0, $161e2f81030591bc$export$de026b00723010c1)("success", `Welcome! ${name}`);
            setTimeout(()=>location.assign("/"), 1500);
        }
    } catch (err) {
        (0, $161e2f81030591bc$export$de026b00723010c1)("error", err.message);
    }
};
const $d77c3630eda1238d$export$596d806903d1f59e = async (email, password)=>{
    try {
        const res = await fetch("/api/v1/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        if (data.status === "success") {
            (0, $161e2f81030591bc$export$de026b00723010c1)("success", "Logged in successfully!");
            setTimeout(()=>location.assign("/"), 1500);
        }
    } catch (err) {
        (0, $161e2f81030591bc$export$de026b00723010c1)("error", err.message);
    }
};
const $d77c3630eda1238d$export$66791fb2cfeec3e = async (email)=>{
    try {
        const res = await fetch("/api/v1/users/forgotPassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email
            })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        if (data.status === "success") (0, $161e2f81030591bc$export$de026b00723010c1)("success", "token was sent to your email!", 10);
    } catch (err) {
        (0, $161e2f81030591bc$export$de026b00723010c1)("error", err.message);
    }
};
const $d77c3630eda1238d$export$5e6ce816cc4182a = async (password, passwordConfirm, token)=>{
    try {
        const res = await fetch(`/api/v1/users/resetPassword/${token}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password: password,
                passwordConfirm: passwordConfirm
            })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        if (data.status === "success") {
            (0, $161e2f81030591bc$export$de026b00723010c1)("success", "Logged in successfully!");
            setTimeout(()=>location.assign("/"), 1500);
        }
    } catch (err) {
        (0, $161e2f81030591bc$export$de026b00723010c1)("error", err.message);
    }
};
const $d77c3630eda1238d$export$a0973bcfe11b05c9 = async ()=>{
    try {
        const res = await fetch("/api/v1/users/logout");
        const data = await res.json();
        if (data.status === "success") location.assign("/");
    } catch (err) {
        (0, $161e2f81030591bc$export$de026b00723010c1)("error", "Error logging out! Try again");
    }
};


const $c3d4c293228c4c1a$export$4c5dd147b21b9176 = (locations)=>{
    mapboxgl.accessToken = "pk.eyJ1IjoiYWJuZXItZGV2IiwiYSI6ImNsZDNudmo3cDAzcnQzcHBjYTdvcjZkYWEifQ.-mHsAuY7iZdt3W7WqBkCRQ";
    const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/abner-dev/cld3va24d000e01rrlbuu5871",
        scrollZoom: false
    });
    const bounds = new mapboxgl.LngLatBounds();
    const createPopup = (options)=>{
        new mapboxgl.Popup({
            offset: 30,
            closeOnClick: false
        }).setLngLat(options.coordinates).setHTML(`<p class='popup-${options.day}'>Day ${options.day} ${options.description}</p>`).addTo(map);
    };
    locations.forEach((location)=>{
        // Create marker
        const element = document.createElement("div");
        element.classList.add("marker");
        element.addEventListener("click", function() {
            if (document.querySelector(`.popup-${location.day}`)) return;
            createPopup(location);
        });
        // Add marker to map
        new mapboxgl.Marker({
            element: element,
            anchor: "bottom"
        }).setLngLat(location.coordinates).addTo(map);
        // Add popup to map
        createPopup(location);
        // Extends map bounds to include current location
        bounds.extend(location.coordinates);
    });
    map.fitBounds(bounds, {
        padding: {
            top: 200,
            bottom: 200,
            left: 100,
            right: 100
        }
    });
};




const $72b362f0eb2ca650$export$f558026a994b6051 = async (data, type)=>{
    try {
        let url;
        let optionsFetch = {
            method: "PATCH",
            body: data
        };
        if (type === "password") {
            url = "/api/v1/users/updateMyPassword";
            optionsFetch.headers = {
                "Content-Type": "application/json"
            };
        } else url = "/api/v1/users/updateMe";
        const res = await fetch(url, optionsFetch);
        const dataAPI = await res.json();
        if (!res.ok) throw new Error(dataAPI.message);
        if (dataAPI.status === "success") {
            (0, $161e2f81030591bc$export$de026b00723010c1)("success", `${type.toUpperCase()} update successfully!`);
            setTimeout(()=>location.assign("/me"), 1500);
        }
    } catch (err) {
        (0, $161e2f81030591bc$export$de026b00723010c1)("error", err.message);
    }
};



const $40a0618291107590$var$stripe = Stripe("pk_test_51MVfI4FXr2koWylriEG8sStwOuvADLGu5K6gIAl4H5sE7ZuyxkB4zyElQRRYAckQZjWaCl0ByZ2DLA6mxqvqk1P200fpeeYHZR");
const $40a0618291107590$export$8d5bdbf26681c0c2 = async (tourId)=>{
    try {
        // 1) Get checkout session from API
        const res = await fetch(`/api/v1/bookings/checkout-session/${tourId}`);
        const session = await res.json();
        // 2) Create checkout form + chanre credit card
        await $40a0618291107590$var$stripe.redirectToCheckout({
            sessionId: session.data.session.id
        });
    } catch (err) {
        (0, $161e2f81030591bc$export$de026b00723010c1)("error", err.message);
    }
};



const $e69319f6da3eb3f2$var$getInputsForm = (form)=>{
    const dataArr = [
        ...new FormData(form)
    ];
    const data = Object.fromEntries(dataArr);
    return data;
};
const $e69319f6da3eb3f2$var$removeInputsForm = (form)=>{
    const inputs = form.querySelectorAll("input");
    inputs.forEach((el)=>el.value = "");
};
// DOM ELEMENTS
const $e69319f6da3eb3f2$var$mapBox = document.querySelector("#map");
const $e69319f6da3eb3f2$var$loginForm = document.querySelector(".form--login");
const $e69319f6da3eb3f2$var$singUpForm = document.querySelector(".form--signup");
const $e69319f6da3eb3f2$var$forgotPasswordForm = document.querySelector(".form--forgotPassword");
const $e69319f6da3eb3f2$var$recoverAccountForm = document.querySelector(".form--recoverAccount");
const $e69319f6da3eb3f2$var$logOutBtn = document.querySelector(".nav__el--logout");
const $e69319f6da3eb3f2$var$userDataForm = document.querySelector(".form-user-data");
const $e69319f6da3eb3f2$var$userPasswordForm = document.querySelector(".form-user-password");
const $e69319f6da3eb3f2$var$bookBtn = document.querySelector("#book-tour");
// DELEGATION
if ($e69319f6da3eb3f2$var$mapBox) {
    const locations = JSON.parse($e69319f6da3eb3f2$var$mapBox.dataset.locations);
    (0, $c3d4c293228c4c1a$export$4c5dd147b21b9176)(locations);
}
if ($e69319f6da3eb3f2$var$singUpForm) $e69319f6da3eb3f2$var$singUpForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;
    (0, $d77c3630eda1238d$export$7200a869094fec36)({
        name: name,
        email: email,
        password: password,
        passwordConfirm: passwordConfirm
    });
});
if ($e69319f6da3eb3f2$var$loginForm) $e69319f6da3eb3f2$var$loginForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    (0, $d77c3630eda1238d$export$596d806903d1f59e)(email, password);
});
if ($e69319f6da3eb3f2$var$forgotPasswordForm) $e69319f6da3eb3f2$var$forgotPasswordForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    (0, $d77c3630eda1238d$export$66791fb2cfeec3e)(email);
});
if ($e69319f6da3eb3f2$var$recoverAccountForm) $e69319f6da3eb3f2$var$recoverAccountForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;
    const token = window.location.href.split("/").at(-1);
    (0, $d77c3630eda1238d$export$5e6ce816cc4182a)(password, passwordConfirm, token);
});
if ($e69319f6da3eb3f2$var$logOutBtn) $e69319f6da3eb3f2$var$logOutBtn.addEventListener("click", (0, $d77c3630eda1238d$export$a0973bcfe11b05c9));
if ($e69319f6da3eb3f2$var$userDataForm) $e69319f6da3eb3f2$var$userDataForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const form = new FormData();
    form.append("name", document.getElementById("name").value);
    form.append("email", document.getElementById("email").value);
    form.append("photo", document.getElementById("photo").files[0]);
    // const data = getInputsForm(userDataForm);
    (0, $72b362f0eb2ca650$export$f558026a994b6051)(form, "data");
});
if ($e69319f6da3eb3f2$var$userPasswordForm) $e69319f6da3eb3f2$var$userPasswordForm.addEventListener("submit", async function(e) {
    e.preventDefault();
    document.querySelector(".btn--save-password").textContent = "Updating...";
    const data = $e69319f6da3eb3f2$var$getInputsForm($e69319f6da3eb3f2$var$userPasswordForm);
    await (0, $72b362f0eb2ca650$export$f558026a994b6051)(JSON.stringify(data), "password");
    document.querySelector(".btn--save-password").textContent = "Save password";
    $e69319f6da3eb3f2$var$removeInputsForm($e69319f6da3eb3f2$var$userPasswordForm);
});
if ($e69319f6da3eb3f2$var$bookBtn) $e69319f6da3eb3f2$var$bookBtn.addEventListener("click", async function(e) {
    e.target.textContent = "Processing...";
    const tourId = e.target.dataset.tourId;
    await (0, $40a0618291107590$export$8d5bdbf26681c0c2)(tourId);
});
const $e69319f6da3eb3f2$var$alertMessage = document.querySelector("body").dataset.alert;
if ($e69319f6da3eb3f2$var$alertMessage) (0, $161e2f81030591bc$export$de026b00723010c1)("success", $e69319f6da3eb3f2$var$alertMessage, 20);


//# sourceMappingURL=bundle.js.map
