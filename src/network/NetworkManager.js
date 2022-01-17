export const fetchBooks = async () => {
  try {
    const response = await fetch(
      "https://api.jsonbin.io/b/61d4465939a33573b322aed1/1"
    );
    const json = await response.json();

    for (var i = 0; i < json.length; i++) {
      json[i]["price"] = ((json[i].year % 10) + 1) * 10;
    }
    return json;
  } catch (error) {
    console.error(error);
  }
};

export const fetchLocalBooks = () => {
  return require("../assets/data/book.json");
};

export const getBookCoverSource = (uri) => {
  if (typeof uri === "string") {
    pathArray = uri.split("/");

    const imgUri =
      "http://training.pyther.com/books/978" +
      String(pathArray[pathArray.length - 1]);

    return imgUri;
  }

  return {};
};
