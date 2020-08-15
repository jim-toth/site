/* http://mit-license.org/ */
var faviconId = "gondola-favicon-link";
(function (root, factory) {
    if (typeof define === "function" && define["amd"]) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof module === "object" && module["exports"]) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module["exports"] = factory();
    } else {
        // Browser globals (root is window)
        root["favicon"] = factory();
  }
}(typeof self !== "undefined" ? self : this, function () {
    var doc = document;
    // private

    var head = doc.getElementsByTagName("head")[0];
    var loopTimeout = null;
    var changeFavicon = function(iconURL) {
        doc.getElementById(faviconId).href = iconURL;
    };

    // public

    var favicon = {
        "defaultPause": 2000,
        "change": function(iconURL, optionalDocTitle) {
            clearTimeout(loopTimeout);
            if (optionalDocTitle) {
                doc.title = optionalDocTitle;
            }
            if (iconURL !== "") {
                changeFavicon(iconURL);
            }
        },
        "animate": function(icons, optionalDelay) {
            clearTimeout(loopTimeout);
            // preload icons
            icons.forEach(function(icon) {
                (new Image()).src = icon;
            });
            optionalDelay = optionalDelay || this["defaultPause"];
            var iconIndex = 0;
            changeFavicon(icons[iconIndex]);
            loopTimeout = setTimeout(function animateFunc() {
                iconIndex = (iconIndex + 1) % icons.length;
                changeFavicon(icons[iconIndex]);
                loopTimeout = setTimeout(animateFunc, optionalDelay);
            }, optionalDelay);
        },
        "stopAnimate": function() {
            clearTimeout(loopTimeout);
        }
    };

    return favicon;
}));
