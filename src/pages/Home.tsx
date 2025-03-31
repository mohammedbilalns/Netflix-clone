import Row from "../components/Row";
import requests from "../Requests";
import Main from "../components/Main";
import Footer from "../components/Footer";
export default function Home() {
  return (
    <>
      <Main></Main>
      <Row rowId="1" title="UpComing" fetchUrl={requests.requestUpcoming}></Row>
      <Row rowId="2" title="Popular" fetchUrl={requests.requestPopular}></Row>
      <Row rowId="3" title="Trending" fetchUrl={requests.requestTrending}></Row>
      <Row rowId="4" title="TopRated" fetchUrl={requests.requestTopRated}></Row>
      <Row rowId="5" title="Horror" fetchUrl={requests.requestHorror}></Row>
      <Footer></Footer>
    </>
  );
}
