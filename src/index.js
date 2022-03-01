
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import WordCloud from "./components/word-cloud";
import Metadata from "./components/metadata";
import "./styles.css";

const App = () => {
  const [data, setData] = React.useState([]);
  // let metadata;
  const [metadata, setMetadata] = React.useState();
  const [wordCloudData, setWordCloudData] = React.useState([]);


  useEffect(() => { 
    const getData = async () => {
      const data = await fetchData();
      const formatCloudData = data.map(({ label, volume, sentimentScore }) => ({
        label,
        volume,
        sentimentScore,
      }));
      setWordCloudData(formatCloudData);
      setData(data);
    };

    getData();
  }, []);

  const fetchData = async () => {
    const response = await fetch("http://localhost:4000/topics");
    const data = await response.json();
    return data;
  };

  const onClickHandler = (index) => {
    const dataClone = [...data];
    const metadata = {
      label: dataClone[index].label,
      sentiment: dataClone[index].sentiment,
      volume: dataClone[index].volume,
    };
    setMetadata(metadata);
  };

  return (
    <div className="app">
      <h1 className="header">My topics challenge - React</h1>
      <div className="container">
        <WordCloud wordsData={wordCloudData} onClickHandler={onClickHandler} />
        {metadata && <Metadata metadata={metadata}></Metadata>}
      </div>
      <footer><a href="https://github.com/Milanche74">https://github.com/Milanche74</a></footer>
    </div>
  );
};

export default App

ReactDOM.render(<App />, document.getElementById("root"));
