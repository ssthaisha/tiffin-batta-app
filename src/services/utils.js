import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions } from "react-native";

export const getDeviceWidth = () => {
  return Dimensions.get("window").width;
};

export const getDeviceHeight = () => {
  return Dimensions.get("window").height;
};

export const compareDate = (a, b) => {
  return new Date(a).getTime() - new Date(b).getTime();
};

export const sortFormsAlphabetical = (a, b) => {
  if ((a.name || "").toLowerCase() < (b.name || "").toLowerCase()) {
    return -1;
  }
  if ((a.name || "").toLowerCase() > (b.name || "").toLowerCase()) {
    return 1;
  }
  return 0;
};

export const storeUser = async (data) => {
  try {
    const res = await AsyncStorage.setItem("user", JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
};

export const storeUserAndTokens = async (data) => {
  console.log(data, "check asnyn");
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem("user", jsonValue);
    await AsyncStorage.setItem("token", data.token);
    // await AsyncStorage.setItem("refresh", data.refresh);
    // console.log(data, 'check to store');
  } catch (e) {
    // saving error
    console.log(e);
    alert("Error in storing data");
  }
};

export const sortArrayBy = (arr, stringField, type) => {
  return arr.sort((a, b) => {
    if (
      (a[stringField] || "").toLowerCase() <
      (b[stringField] || "").toLowerCase()
    ) {
      return type === "asc" ? -1 : 1;
    }
    if (
      (a[stringField] || "").toLowerCase() >
      (b[stringField] || "").toLowerCase()
    ) {
      return type === "asc" ? 1 : -1;
    }
    return 0;
  });
};

export const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const toTitleCase = (text = "") => {
  return text
    .toLowerCase()
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");
};

export const hasDuplicate = (id, data = []) => {
  const alreadyHasId = data.some((x) => x._id === id || x.id === id);
  return alreadyHasId;
};

export const getFileType = (uri) => {
  const extensions = uri.split(".");
  switch (extensions[extensions.length - 1].toLowerCase()) {
    case "jpg":
    case "jpeg":
    case "png":
    case "bmp":
    case "gif":
      return "image";
    case "pdf":
      return "pdf";
    case "mp4":
      return "mp4";
    case "mp4":
      return "mp3";
    default:
      return "other";
  }
};

export const isJson = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const getDistanceFromLatLonInM = (lat1, lon1, lat2, lon2) => {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d * 1000; //distance in m
};

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export const getIdFromObject = (value) => {
  return value?.id || value?._id || null;
};

export const getUrlExtension = (url = "") => {
  // const ext = url.split(/[#?]/)[0].split('.').pop().trim() || '';
  const ext = url.substring(url.lastIndexOf(".") + 1, url.length) || "";
  return ext.toLowerCase();
};

export const getSequenceNumber = () => {
  let date = new Date().toISOString();

  let dateAndTime = date.split(".")[0];
  console.log("object", dateAndTime);
  let sequenceNumber = dateAndTime
    .replace(/-/g, "")
    .replace(/T/g, "")
    .replace(/:/g, "");
  return sequenceNumber;
};

export const isImage = (url = "") => {
  const fileType = getUrlExtension(url);
  if (
    fileType === "jpg" ||
    fileType === "jpeg" ||
    fileType === "png" ||
    fileType === "bmp" ||
    fileType === "gif"
  ) {
    return true;
  }
};

export const isFile = (url = "") => {
  const fileType = getUrlExtension(url);
  if (
    fileType === "pdf" ||
    fileType === "xls" ||
    fileType === "xlsx" ||
    fileType === "ppt" ||
    fileType === "pptx" ||
    fileType === "doc" ||
    fileType === "docx"
  ) {
    return true;
  }
};

export const isAudioVideo = (url = "") => {
  const fileType = getUrlExtension(url);
  if (fileType === "mp4" || fileType === "mp3") {
    return true;
  }
};

export const renderParsedTextWithMentions = (matchingString) => {
  // matches => ["[@michel:5455345]", "@michel", "5455345"]
  let markdownRegex = /\[([^ ]+?)\]\((.+)?\)/;
  let formRegex = /###([^ ]+?)## (\$\$(.+)?\$)/;
  if (formRegex.test(matchingString)) {
    return matchingString.replace(formRegex, function (markdown) {
      let tempMarkDown;
      if (markdown.trim()) {
        tempMarkDown = markdown.replace(/###([^ ]+?)##/, "");
        tempMarkDown = tempMarkDown.split("$$").join("Form: ");
        tempMarkDown = tempMarkDown.split("$").join("");
        return tempMarkDown;
      }
    });
  } else {
    return matchingString.replace(markdownRegex, function (markdown) {
      let tempMarkDown;
      if (markdown.trim()) {
        tempMarkDown = markdown.replace(/\[([^ ]+?)\]/g, "");
        // tempMarkDown = tempMarkDown.split(']').join('');
        tempMarkDown = tempMarkDown.split("(").join("@");
        tempMarkDown = tempMarkDown.split(")").join("");
        return tempMarkDown;
      }
    });
  }
};

export const isForm = (string) => {
  let formRegex = /###([^ ]+?)## (\$\$(.+)?\$)/;
  return formRegex.test(string);
};
export const getIdFromFormText = (string) => {
  let tempMarkDown = string.replace(/(\$\$(.+)?\$)/g, "");
  tempMarkDown = tempMarkDown.split("###").join("");
  tempMarkDown = tempMarkDown.split("##").join("");
  tempMarkDown = tempMarkDown.split(" ").join("");
  return tempMarkDown;
};

export const getParsedMentions = (matchingString, matches) => {
  // matches => ["[@michel:5455345]", "@michel", "5455345"]
  let markdownRegex = /\[([^ ]+?)\]\((.+)?\)/;

  return matchingString.replace(markdownRegex, function (markdown) {
    let tempMarkDown;
    if (markdown.trim()) {
      tempMarkDown = markdown.replace(/\[([^ ]+?)\]/g, "");
      // tempMarkDown = tempMarkDown.split(']').join('');
      tempMarkDown = tempMarkDown.split("(").join("@");
      tempMarkDown = tempMarkDown.split(")").join("");
      return tempMarkDown;
    }
  });
};

export const withHttp = (url) =>
  url.replace(/^(?:(.*:)?\/\/)?(.*)/i, (match, schemma, nonSchemmaUrl) =>
    schemma ? match : `https://${nonSchemmaUrl}`
  );

export const getParsedForm = (matchingString, matches) => {
  // matches => ["[@michel:5455345]", "@michel", "5455345"]
  let markdownRegex = /###([^ ]+?)## (\$\$(.+)?\$)/;
  return matchingString.replace(markdownRegex, function (markdown) {
    let tempMarkDown;
    if (markdown.trim()) {
      tempMarkDown = markdown.replace(/###([^ ]+?)##/, "");
      tempMarkDown = tempMarkDown.split("$$").join("Form: ");
      tempMarkDown = tempMarkDown.split("$").join("");
      return tempMarkDown;
    }
  });
};

export const youTubeIdFromLink = (url) =>
  url.match(
    /(?:https?:\/\/)?(?:www\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\/?\?v=|\/embed\/|\/)([^\s&]+)/
  )[1];

export const getTextWithMentionsFormat = (mstring = "", members) => {
  let modified = mstring;
  let regexp = /(@\S+)/gi;
  const matches = mstring.match(regexp);
  const array = matches && matches.length ? [...matches] : [];
  console.log("all", array);
  array.forEach((match, i) => {
    const filtered = members.filter(
      (x) => `@${x.name.split(" ").join("_")}` === match
    );
    if (filtered && filtered.length) {
      modified = modified.replace(
        `@${filtered[0].name.split(" ").join("_")}`,
        `[${filtered[0]._id || filtered[0].id}](${filtered[0].name})`
      );
    } else if (match === "@all") {
      modified = modified.replace("@all", "[all](all)");
    }
  });
  console.log("modified", modified);

  return modified;
};
