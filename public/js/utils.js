var Utils;
(function (Utils) {
    var youTubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    var urlRegex = /\b(?:https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;*(){}\[\]]*[-A-Z0-9+&@#\/%=~_|;*(){}\[\]]/gim;
    /**
     * Returns a random integer between minValue (inclusive) and maxValue (exclusive).
     */
    function getRandomInt(minValue, maxValue) {
        return Math.floor(Math.random() * (maxValue - minValue)) + minValue;
    }
    Utils.getRandomInt = getRandomInt;
    /**
     * Parses a string to a boolean. 'true' and '1' map to true, everything else maps to false.
     */
    function parseBoolean(str) {
        var lowerStr = str.toLowerCase();
        return lowerStr === "true" || lowerStr === "1";
    }
    Utils.parseBoolean = parseBoolean;
    /**
     * Parses a string to an array of points. For example, [[3,4],[0,-2]].
     */
    function parsePointArray(str, defaultValue) {
        try {
            return toPointArray(JSON.parse(str));
        }
        catch (e) {
            return defaultValue;
        }
    }
    Utils.parsePointArray = parsePointArray;
    /**
     * Converts a normal array to an array of points. For example, [2, 3] becomes an array consisting of (2,3), and [[3,4],[4,4]] becomes an array of two points.
     * @param arr The array.
     */
    function toPointArray(arr) {
        if (arr instanceof Array) {
            if (arr.length === 0) {
                return [];
            }
            if (typeof arr[0] === "number") {
                // Single point
                return [new Point(arr[0], arr[1])];
            }
            return arr.map(function (a) { return new Point(a[0], a[1]); });
        }
    }
    Utils.toPointArray = toPointArray;
    /**
     * Converts a point array to JSON 2D array format.
     */
    function pointArrayToJSON(arr) {
        return JSON.stringify(arr.map(function (p) { return [p.x, p.y]; }));
    }
    Utils.pointArrayToJSON = pointArrayToJSON;
    /**
     * Gets query string parameter by name.
     * @param name The name of the parameter.
     * @param defaultValue The default value in case the parameter is not present.
     */
    function getQueryAsString(name, defaultValue) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search);
        return results === null ? defaultValue : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    Utils.getQueryAsString = getQueryAsString;
    /**
     * Gets query string parameter by name, as a number.
     * @param name The name of the parameter.
     * @param defaultValue The default value in case the parameter is not present.
     */
    function getQueryAsNumber(name, defaultValue) {
        var queryString = getQueryAsString(name);
        return queryString === void 0 ? defaultValue : +queryString;
    }
    Utils.getQueryAsNumber = getQueryAsNumber;
    /**
     * Gets query string parameter by name, as an integer.
     * @param name The name of the parameter.
     * @param defaultValue The default value in case the parameter is not present.
     */
    function getQueryAsInteger(name, defaultValue) {
        var queryString = getQueryAsString(name);
        return queryString === void 0 ? defaultValue : parseInt(queryString, 10);
    }
    Utils.getQueryAsInteger = getQueryAsInteger;
    /**
     * Gets query string parameter by name, as a boolean.
     * @param name The name of the parameter.
     * @param defaultValue The default value in case the parameter is not present.
     */
    function getQueryAsBoolean(name, defaultValue) {
        var queryString = getQueryAsString(name);
        return queryString === void 0 ? defaultValue : parseBoolean(queryString);
    }
    Utils.getQueryAsBoolean = getQueryAsBoolean;
    /**
     * Gets query string parameter by name, as a list of points.
     * @param name The name of the parameter.
     * @param defaultValue The default value in case the parameter is not present.
     */
    function getQueryAsPointArray(name, defaultValue) {
        var queryString = getQueryAsString(name);
        return queryString === void 0 ? defaultValue : parsePointArray(queryString, defaultValue);
    }
    Utils.getQueryAsPointArray = getQueryAsPointArray;
    /**
     * Returns an index in the array, if an element in the array satisfies the provided testing function. Otherwise -1 is returned.
     * @param list The array.
     * @param predicate The function to execute on each value in the array.
     * @returns An index in the array if an element passes the test; otherwise, -1.
     */
    function findIndex(list, predicate) {
        for (var i = 0; i < list.length; i++) {
            if (predicate(list[i], i, list)) {
                return i;
            }
        }
        return -1;
    }
    Utils.findIndex = findIndex;
    /**
     * Binds the enter key for an input control to a button.
     * @param input The input control.
     * @param button The button to click.
     */
    function bindEnterKeyToButton(input, button) {
        input.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                button.click();
            }
        });
    }
    Utils.bindEnterKeyToButton = bindEnterKeyToButton;
    function uploadToSite(formData, success, error) {
        $.ajax({
            url: "/Home/Upload",
            type: "POST",
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: success,
            error: error
        });
    }
    Utils.uploadToSite = uploadToSite;
    /**
     * Loads an altar (custom or not) and returns a promise for the load.
     * If the altar already exists, returns an empty resolved promise.
     * If it doesn't exist, it fetches it from the server and adds it to AltarData.
     * @param altar The altar ID.
     */
    function loadAltar(altar) {
        if (altar in AltarData && AltarData[altar].name != null && AltarData[altar].grid != null && AltarData[altar].spawns != null) {
            return $.Deferred().resolve().promise();
        }
        var t0 = performance.now();
        return $.getJSON("/api/altars/" + altar).done(function (data) {
            var t1 = performance.now();
            console.debug("Fetched altar " + altar + " in " + (t1 - t0) + " ms");
            AltarData[altar] = {
                name: data.name,
                grid: JSON.parse(data.grid),
                spawns: parsePointArray(data.spawns),
                groundColor: JSON.parse(data.groundColor),
                waterColor: JSON.parse(data.waterColor),
                groundPattern: JSON.parse(data.groundPattern)
            };
        });
    }
    Utils.loadAltar = loadAltar;
    /**
     * Loads an altar range (custom or not) and returns a promise for the load.
     * @param altar The altar ID.
     */
    function loadAltars(min, max) {
        var t0 = performance.now();
        return $.getJSON("/api/altars?min=" + min + "&max=" + max).done(function (data) {
            var t1 = performance.now();
            console.debug("Fetched altars " + min + " to " + max + " in " + (t1 - t0) + " ms");
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var item = data_1[_i];
                AltarData[item.id] = {
                    name: item.name,
                    grid: JSON.parse(item.grid),
                    spawns: parsePointArray(item.spawns),
                    groundColor: JSON.parse(item.groundColor),
                    waterColor: JSON.parse(item.waterColor),
                    groundPattern: JSON.parse(item.groundPattern)
                };
            }
        });
    }
    Utils.loadAltars = loadAltars;
    /**
     * Loads all altar names.
     */
    function loadAltarNames() {
        var t0 = performance.now();
        return $.getJSON("/api/altars/names").done(function (data) {
            var t1 = performance.now();
            console.debug("Fetched all altar names in " + (t1 - t0) + " ms");
            for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
                var item = data_2[_i];
                if (AltarData[item.id] !== undefined) {
                    AltarData[item.id].name = item.name;
                }
                else {
                    AltarData[item.id] = { name: item.name };
                }
            }
        });
    }
    Utils.loadAltarNames = loadAltarNames;
    /**
     * Transforms a YouTube video link into a link containing the title of the YouTube video.
     * @param text The message text.
     */
    function transformYouTubeVideoLink(text) {
        var deferred = $.Deferred();
        var matches = text.match(youTubeRegex);
        if (matches == null) {
            deferred.resolve(null);
        }
        else {
            var id = matches[1];
            $.ajax({
                url: "https://www.googleapis.com/youtube/v3/videos?id=" + id + "&key=AIzaSyBSyv4ZxBcMN7o2nvFc5XCZ6hzxq3ANeRU&fields=items(snippet(title))&part=snippet",
                success: function (data) {
                    if (data.items.length > 0) {
                        deferred.resolve("<a target=\"_blank\" class=\"youtube\" href=\"" + text + "\">" + data.items[0].snippet.title + " - YouTube</a>");
                    }
                    else {
                        deferred.resolve(null);
                    }
                },
                error: function () {
                    deferred.resolve(null);
                }
            });
        }
        return deferred.promise();
    }
    Utils.transformYouTubeVideoLink = transformYouTubeVideoLink;
    /**
     * Formats a chat message text.
     * @param text The text to format.
     */
    function formatMessageText(text) {
        var matches = text.match(urlRegex);
        if (matches != null) {
            var links_1 = {};
            var promises = matches.map(function (value) { return transformYouTubeVideoLink(value).done(function (result) {
                links_1[value] = result != null ? result : "<a href=\"" + value + "\" target=\"_blank\">" + value + "</a>";
            }); });
            return $.when.apply($, promises).then(function () {
                return text.replace(urlRegex, function (substring) { return links_1[substring]; });
            });
        }
        return $.Deferred().resolve(text).promise();
    }
    Utils.formatMessageText = formatMessageText;
    /**
     * Tests if the current user agent is a search crawler.
     */
    function isSearchCrawler() {
        return /bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent);
    }
    Utils.isSearchCrawler = isSearchCrawler;
})(Utils || (Utils = {}));
