const curentDoc = doc => {
  return {
    type: "CURENTDOC",
    payload: doc
  };
};

export default curentDoc;
