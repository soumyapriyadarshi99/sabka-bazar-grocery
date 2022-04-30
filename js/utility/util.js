export const getData = async (url) => {
  try {
    const response = await fetch(url);

    if (response.status === 200) {
      const data = await response.json();

      return data;
    }

    throw "Something not right!!!";
  } catch (error) {
    console.log("ERROR in server", error);
  }
};
