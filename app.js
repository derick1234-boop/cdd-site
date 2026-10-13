
(function () {
    var d = document,
        r = d.documentElement;

    r.classList.add("js");

    function hide() {
        var l = d.getElementById("ld");
        l && l.classList.add("h");
    }

    window.addEventListener("load", function () {
        setTimeout(hide, 400);
    });

    setTimeout(hide, 2500);

    var th = d.getElementById("th");

    function ap(t) {
        r.setAttribute("data-theme", t);
        th.textContent = t === "dark" ? "☀" : "☾";
    }

    var cur = matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

    try {
        cur = localStorage.getItem("cddt") || cur;
    } catch (e) {}

    ap(cur);

    th.onclick = function () {
        cur = cur === "dark" ? "light" : "dark";
        ap(cur);

        try {
            localStorage.setItem("cddt", cur);
        } catch (e) {}
    };

    d.getElementById("bg").onclick = function () {
        d.getElementById("nav").classList.toggle("open");
    };

    function cnt(e) {
        var t = +e.dataset.c,
            i = 0,
            s = setInterval(function () {
                i++;
                e.textContent = Math.round(t * i / 40);

                if (i >= 40) {
                    clearInterval(s);
                    e.textContent = t + (t == 100 ? "+" : "");
                }
            }, 30);
    }

    var io = new IntersectionObserver(function (es) {
        es.forEach(function (x) {
            if (x.isIntersecting) {
                x.target.classList.add("in");

                if (x.target.dataset.c && !x.target.dn) {
                    x.target.dn = 1;
                    cnt(x.target);
                }

                io.unobserve(x.target);
            }
        });
    }, {
        threshold: 0.12
    });

    window.cddObs = function () {
        d.querySelectorAll(
            ".card,.sv,.st>div,section h2,.ph,.ban,details,.car,.cta,.tw,[data-c]"
        ).forEach(function (e) {
            if (!e.classList.contains("rv")) {
                e.classList.add("rv");
            }

            io.observe(e);
        });
    };

    cddObs();

    var sl = d.querySelectorAll(".sl"),
        k = 0;

    function sh(n) {
        if (!sl.length) return;

        sl[k].classList.remove("on");
        k = (n + sl.length) % sl.length;
        sl[k].classList.add("on");
    }

    var pv = d.getElementById("pv"),
        nx = d.getElementById("nx");

    if (pv) {
        pv.onclick = function () {
            sh(k - 1);
        };

        nx.onclick = function () {
            sh(k + 1);
        };

        setInterval(function () {
            sh(k + 1);
        }, 6000);
    }

    var f = location.pathname.split("/").pop() || "index.html";

    d.querySelectorAll("[data-p]").forEach(function (a) {
        if (a.getAttribute("href") === f) {
            a.classList.add("on");
        }
    });

    var s = d.getElementById("send");

    if (s) {
        s.onclick = function () {
            var t = "Bonjour CDD, je suis "
                + d.getElementById("fn").value
                + " ("
                + d.getElementById("ft").value
                + "). "
                + d.getElementById("fm").value;

            window.open(
                "https://wa.me/237693919999?text=" + encodeURIComponent(t),
                "_blank"
            );
        };
    }
})();